from io import BytesIO
from typing import List, Dict, Any

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

import pandas as pd
import numpy as np

app = FastAPI(title="Excel Report Comparator API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for uploaded files
uploaded_files: Dict[str, pd.DataFrame] = {}


class DiffResult(BaseModel):
    row: int
    column: str
    oldValue: Any
    newValue: Any
    status: str  # "added", "removed", "modified"


class ComparisonResponse(BaseModel):
    differences: List[DiffResult]
    summary: Dict[str, int]


def convert_to_serializable(obj: Any) -> Any:
    """Convert numpy types to Python native types for JSON serialization"""
    if isinstance(obj, np.integer):
        return int(obj)
    elif isinstance(obj, np.floating):
        return float(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    elif pd.isna(obj):
        return None
    return obj


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "Excel Report Comparator API is running"}


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload an Excel file for comparison"""
    try:
        if not file.filename.endswith((".xlsx", ".xls", ".csv")):
            raise HTTPException(
                status_code=400,
                detail="Only Excel (.xlsx, .xls) and CSV files are supported",
            )

        contents = await file.read()

        # Read the file based on extension
        if file.filename.endswith(".csv"):
            df = pd.read_csv(BytesIO(contents))
        else:
            df = pd.read_excel(BytesIO(contents))

        # Store the dataframe
        file_id = file.filename
        uploaded_files[file_id] = df

        return {
            "fileId": file_id,
            "fileName": file.filename,
            "rows": len(df),
            "columns": list(df.columns),
            "message": "File uploaded successfully",
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error uploading file: {str(e)}")


@app.get("/files")
async def list_files():
    """List all uploaded files"""
    files = []
    for file_id, df in uploaded_files.items():
        files.append(
            {
                "fileId": file_id,
                "fileName": file_id,
                "rows": len(df),
                "columns": list(df.columns),
            }
        )
    return {"files": files}


@app.get("/file/{file_id}")
async def get_file_preview(file_id: str):
    """Get preview of a file"""
    if file_id not in uploaded_files:
        raise HTTPException(status_code=404, detail="File not found")

    df = uploaded_files[file_id]

    # Return first 100 rows as preview
    preview_df = df.head(100)

    return {
        "fileId": file_id,
        "fileName": file_id,
        "totalRows": len(df),
        "previewRows": len(preview_df),
        "columns": list(df.columns),
        "data": preview_df.fillna("").to_dict(orient="records"),
    }


@app.post("/compare")
async def compare_reports(reportA: str, reportB: str):
    """Compare two Excel reports and return differences"""
    try:
        if reportA not in uploaded_files:
            raise HTTPException(
                status_code=404, detail=f"Report A '{reportA}' not found"
            )
        if reportB not in uploaded_files:
            raise HTTPException(
                status_code=404, detail=f"Report B '{reportB}' not found"
            )

        df_a = uploaded_files[reportA].copy()
        df_b = uploaded_files[reportB].copy()

        # Normalize column names
        df_a.columns = df_a.columns.str.strip().str.lower()
        df_b.columns = df_b.columns.str.strip().str.lower()

        differences: List[DiffResult] = []
        summary = {"added": 0, "removed": 0, "modified": 0}

        # Get common columns
        common_columns = list(set(df_a.columns) & set(df_b.columns))

        # Compare rows
        max_rows = max(len(df_a), len(df_b))

        for row_idx in range(max_rows):
            # Check if row exists in both dataframes
            row_a_exists = row_idx < len(df_a)
            row_b_exists = row_idx < len(df_b)

            if not row_a_exists and row_b_exists:
                # Row added in B
                for col in df_b.columns:
                    value = df_b.iloc[row_idx][col]
                    differences.append(
                        DiffResult(
                            row=int(row_idx + 1),
                            column=str(col),
                            oldValue=None,
                            newValue=convert_to_serializable(value),
                            status="added",
                        )
                    )
                summary["added"] += 1
            elif row_a_exists and not row_b_exists:
                # Row removed from B
                for col in df_a.columns:
                    value = df_a.iloc[row_idx][col]
                    differences.append(
                        DiffResult(
                            row=int(row_idx + 1),
                            column=str(col),
                            oldValue=convert_to_serializable(value),
                            newValue=None,
                            status="removed",
                        )
                    )
                summary["removed"] += 1
            else:
                # Both rows exist, compare columns
                for col in common_columns:
                    val_a = df_a.iloc[row_idx][col]
                    val_b = df_b.iloc[row_idx][col]

                    # Handle NaN values
                    val_a_is_nan = pd.isna(val_a)
                    val_b_is_nan = pd.isna(val_b)

                    if val_a_is_nan and val_b_is_nan:
                        continue
                    elif val_a_is_nan or val_b_is_nan or val_a != val_b:
                        differences.append(
                            DiffResult(
                                row=int(row_idx + 1),
                                column=str(col),
                                oldValue=(
                                    convert_to_serializable(val_a)
                                    if not val_a_is_nan
                                    else None
                                ),
                                newValue=(
                                    convert_to_serializable(val_b)
                                    if not val_b_is_nan
                                    else None
                                ),
                                status="modified",
                            )
                        )
                        summary["modified"] += 1

        return ComparisonResponse(differences=differences, summary=summary)
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error comparing reports: {str(e)}"
        )


@app.post("/download-diff")
async def download_diff(reportA: str, reportB: str):
    """Generate a downloadable diff report"""
    try:
        comparison = await compare_reports(reportA, reportB)

        # Convert to DataFrame for export
        diff_data = []
        for diff in comparison.differences:
            diff_data.append(
                {
                    "Row": diff.row,
                    "Column": diff.column,
                    "Old Value": diff.oldValue,
                    "New Value": diff.newValue,
                    "Status": diff.status.upper(),
                }
            )

        diff_df = pd.DataFrame(diff_data)

        # Create Excel file in memory
        output = BytesIO()
        with pd.ExcelWriter(output, engine="openpyxl") as writer:
            diff_df.to_excel(writer, sheet_name="Differences", index=False)

        output.seek(0)

        return {
            "message": "Diff report generated",
            "fileName": f"diff_{reportA}_vs_{reportB}.xlsx",
            "summary": comparison.summary,
        }
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error generating diff report: {str(e)}"
        )


@app.delete("/file/{file_id}")
async def delete_file(file_id: str):
    """Delete an uploaded file"""
    if file_id not in uploaded_files:
        raise HTTPException(status_code=404, detail="File not found")

    del uploaded_files[file_id]
    return {"message": f"File '{file_id}' deleted successfully"}


@app.delete("/clear-all")
async def clear_all_files():
    """Clear all uploaded files"""
    uploaded_files.clear()
    return {"message": "All files cleared"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
