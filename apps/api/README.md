# Excel Report Comparator - FastAPI Backend

## Overview

This is the backend API for the Excel Report Comparator application. It handles Excel file uploads, storage, and comparison logic using Python, Pandas, and OpenPyXL.

## Tech Stack

- **Framework**: FastAPI (modern, fast Python web framework)
- **Server**: Uvicorn (ASGI server)
- **Data Processing**: Pandas (data manipulation and analysis)
- **Excel Processing**: OpenPyXL (Excel file handling)
- **Validation**: Pydantic (data validation)

## Features

- File upload and storage (Excel and CSV files)
- Advanced Excel comparison algorithm
- Difference detection (added, removed, modified rows/columns)
- File preview functionality
- Diff report export
- RESTful API with comprehensive endpoints

## Installation

### Prerequisites

- Python 3.9 or higher
- pip or poetry

### Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

### Development Mode

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Endpoints

### Health Check
- **GET** `/health` - Check API status

### File Management
- **POST** `/upload` - Upload an Excel/CSV file
- **GET** `/files` - List all uploaded files
- **GET** `/file/{file_id}` - Get file preview
- **DELETE** `/file/{file_id}` - Delete a file
- **DELETE** `/clear-all` - Clear all files

### Comparison
- **POST** `/compare` - Compare two reports
  - Query params: `reportA`, `reportB`
  - Returns: Differences list with summary

- **POST** `/download-diff` - Generate downloadable diff report
  - Query params: `reportA`, `reportB`
  - Returns: Excel file with differences

## API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Comparison Algorithm

The comparison engine:

1. Loads both Excel files into Pandas DataFrames
2. Normalizes column names (lowercase, trimmed)
3. Identifies common columns
4. Compares row by row:
   - Detects added rows (in B but not in A)
   - Detects removed rows (in A but not in B)
   - Detects modified values (different in A and B)
5. Returns structured diff data with row, column, old value, new value, and status

## File Structure

```
backend/
├── main.py              # FastAPI application and endpoints
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Environment Variables

Create a `.env` file in the backend directory:

```
FASTAPI_ENV=development
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## CORS Configuration

The API is configured to accept requests from any origin. For production, update the CORS settings in `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Error Handling

All errors return JSON responses with appropriate HTTP status codes:

- `400 Bad Request` - Invalid file or comparison parameters
- `404 Not Found` - File not found
- `500 Internal Server Error` - Server error

## Limitations

- In-memory file storage (files are lost on server restart)
- Maximum file size depends on available RAM
- Supports Excel (.xlsx, .xls) and CSV files

## Future Enhancements

- Database integration for persistent storage
- File size limits and chunked uploads
- Advanced filtering and search
- Scheduled comparison jobs
- Email notifications
- User authentication and authorization
- Rate limiting
- Caching layer

## Deployment

### Docker

Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:

```bash
docker build -t excel-comparator-api .
docker run -p 8000:8000 excel-comparator-api
```

### Heroku

```bash
heroku create your-app-name
git push heroku main
```

## Support

For issues or questions, refer to the main project README or contact the development team.
