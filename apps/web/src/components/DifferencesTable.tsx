import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { DiffItem, ComparisonResult } from "@/store/reportStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useReportOperations } from "@/hooks/useReportOperations";
import { useReportStore } from "@/store/reportStore";

interface DifferencesTableProps {
  result: ComparisonResult | null;
  isLoading: boolean;
}

export function DifferencesTable({ result, isLoading }: DifferencesTableProps) {
  const { downloadDiffReport } = useReportOperations();
  const { selectedReportA, selectedReportB } = useReportStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Comparing reports...
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Select two reports and click "Get Differences" to see the comparison
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "added":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "removed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "modified":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "added":
        return "✓";
      case "removed":
        return "✕";
      case "modified":
        return "⟳";
      default:
        return "•";
    }
  };

  const columnDefs: any[] = [
    {
      field: "row",
      headerName: "Row",
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: "column",
      headerName: "Column",
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      field: "oldValue",
      headerName: "Old Value",
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const value = params.value;
        return (
          <span className="text-slate-700 dark:text-slate-300 break-words">
            {value !== null && value !== undefined ? String(value) : "—"}
          </span>
        );
      },
    },
    {
      field: "newValue",
      headerName: "New Value",
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const value = params.value;
        return (
          <span className="text-slate-700 dark:text-slate-300 break-words">
            {value !== null && value !== undefined ? String(value) : "—"}
          </span>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const status = params.value;
        return (
          <Badge className={`${getStatusColor(status)} cursor-default`}>
            <span className="mr-1">{getStatusIcon(status)}</span>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
  ];

  const rowData = result.differences;

  return (
    <div className="space-y-4">
      {/* Summary Section */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-1">
            Added
          </p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {result.summary.added}
          </p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">
            Removed
          </p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {result.summary.removed}
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1">
            Modified
          </p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {result.summary.modified}
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => downloadDiffReport()}
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={!selectedReportA || !selectedReportB}
        >
          <Download className="w-4 h-4" />
          Download Diff Report
        </Button>
      </div>

      {/* Differences Table */}
      <div className="ag-theme-quartz dark:ag-theme-quartz-dark rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
        <div style={{ height: "380px", width: "100%" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            pagination={true}
            paginationPageSize={20}
            domLayout="autoHeight"
            suppressMovableColumns={false}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
            }}
          />
        </div>
      </div>

      {/* Total Differences */}
      <div className="text-sm text-slate-600 dark:text-slate-400">
        Total differences:{" "}
        <span className="font-semibold">{rowData.length}</span>
      </div>
    </div>
  );
}
