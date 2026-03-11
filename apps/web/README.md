# Excel Report Comparator

A modern, enterprise-grade web application for comparing Excel reports with advanced diff analysis, side-by-side viewing, and comprehensive reporting capabilities.

## Features

- **File Upload & Management**: Upload Excel (.xlsx, .xls) and CSV files with automatic validation
- **Side-by-Side Comparison**: View Report A and Report B previews simultaneously
- **Advanced Diff Analysis**: Automatic detection of added, removed, and modified rows/values
- **Interactive Data Tables**: Virtualized AG Grid tables for handling large datasets efficiently
- **Status Badges**: Color-coded indicators (green for additions, red for removals, amber for modifications)
- **Diff Summary**: Quick overview of comparison statistics
- **Download Reports**: Export diff results as Excel files
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Built-in dark theme support
- **Enterprise Architecture**: Scalable, maintainable, production-ready codebase

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS 4
- **Data Grid**: AG Grid Community Edition
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Routing**: Wouter

### Backend
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **Data Processing**: Pandas
- **Excel Handling**: OpenPyXL
- **Validation**: Pydantic

### DevOps
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm (frontend), pip (backend)

## Project Structure

```
excel-report-comparator/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ReportSelector.tsx   # File upload and report selection
│   │   │   ├── ReportPreview.tsx    # Report preview with AG Grid
│   │   │   ├── DifferencesTable.tsx # Diff results display
│   │   │   └── ui/                  # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Main application page
│   │   │   └── NotFound.tsx         # 404 page
│   │   ├── hooks/
│   │   │   └── useReportOperations.ts  # Custom hooks for API operations
│   │   ├── services/
│   │   │   └── reportApi.ts         # API client service
│   │   ├── store/
│   │   │   └── reportStore.ts       # Zustand state management
│   │   ├── App.tsx                  # Root component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── public/                      # Static assets
│   ├── index.html                   # HTML template
│   └── package.json
│
├── backend/                         # FastAPI backend
│   ├── main.py                      # FastAPI application
│   ├── requirements.txt             # Python dependencies
│   ├── Dockerfile                   # Backend container config
│   └── README.md                    # Backend documentation
│
├── docker-compose.yml               # Docker Compose configuration
├── Dockerfile.frontend              # Frontend container config
├── README.md                        # This file
├── ideas.md                         # Design philosophy document
└── package.json                     # Root package configuration

```

## Installation & Setup

### Prerequisites

- Node.js 22+ and pnpm
- Python 3.9+
- Docker & Docker Compose (optional, for containerized deployment)

### Local Development

#### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

#### 2. Start Backend Server

```bash
cd backend
python main.py
```

The backend API will be available at `http://localhost:8000`

#### 3. Start Frontend Development Server

```bash
pnpm run dev
```

The frontend will be available at `http://localhost:3000`

#### 4. Access the Application

Open your browser and navigate to `http://localhost:3000`

### Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## API Endpoints

### Health Check
- **GET** `/health` - Check API status

### File Management
- **POST** `/upload` - Upload Excel/CSV file
- **GET** `/files` - List all uploaded files
- **GET** `/file/{file_id}` - Get file preview
- **DELETE** `/file/{file_id}` - Delete a file
- **DELETE** `/clear-all` - Clear all files

### Comparison
- **POST** `/compare?reportA={id}&reportB={id}` - Compare two reports
- **POST** `/download-diff?reportA={id}&reportB={id}` - Download diff as Excel

### API Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Usage Guide

### Basic Workflow

1. **Upload Reports**: Click "Upload File" and select Excel/CSV files
2. **Select Reports**: Choose Report A (original) and Report B (updated)
3. **View Reports**: Click "View Reports" to see side-by-side previews
4. **Get Differences**: Click "Get Differences" to analyze changes
5. **Review Results**: Examine the differences table with color-coded status
6. **Download**: Export the diff report as an Excel file

### Understanding Diff Results

- **Added** (Green): Rows or values present in Report B but not in Report A
- **Removed** (Red): Rows or values present in Report A but not in Report B
- **Modified** (Amber): Values that changed between Report A and Report B

## Design Philosophy

The application follows a **Modern Enterprise Analytics** design approach:

- **Professional Trust**: Deep slate-blue primary color conveys reliability
- **Data-Driven Clarity**: Clean whitespace and hierarchical layout for digestible comparisons
- **Intuitive Insights**: Color psychology guides users naturally to differences
- **Sophisticated Interaction**: Smooth animations and micro-interactions create a premium feel
- **Scalability**: Design accommodates large datasets without visual clutter

### Color Palette

- **Primary**: Deep Slate Blue (#1e3a5f) - Trust and professionalism
- **Added**: Emerald Green (#10b981) - Positive changes
- **Removed**: Coral Red (#ef4444) - Deletions
- **Modified**: Amber (#f59e0b) - Changes requiring attention
- **Neutral**: Cool Grays - Professional backgrounds

### Typography

- **Display**: Geist (modern, geometric sans-serif)
- **Body**: Inter (neutral, highly readable)
- **Monospace**: JetBrains Mono (cell values and code)

## Development

### Frontend Development

```bash
# Start dev server with hot reload
pnpm run dev

# Type checking
pnpm run check

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Format code
pnpm run format
```

### Backend Development

```bash
# Run development server with auto-reload
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run tests (when added)
pytest

# Format code
black .
```

## Deployment

### Production Build

```bash
# Build frontend
pnpm run build

# Build Docker images
docker build -f Dockerfile.frontend -t excel-comparator-frontend .
docker build -f backend/Dockerfile -t excel-comparator-backend ./backend
```

### Environment Variables

Create a `.env` file in the backend directory:

```
FASTAPI_ENV=production
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=https://yourdomain.com
```

### Deployment Platforms

The application can be deployed to:

- **Heroku**: Using Docker containers
- **AWS**: ECS, Elastic Beanstalk, or EC2
- **Google Cloud**: Cloud Run, App Engine, or GKE
- **Azure**: Container Instances or App Service
- **DigitalOcean**: App Platform or Droplets
- **Vercel/Netlify**: Frontend only (requires backend API elsewhere)

## Performance Considerations

- **Virtualized Tables**: AG Grid handles 10,000+ rows efficiently
- **Pagination**: Results paginated to 20 rows per page
- **Lazy Loading**: File previews loaded on demand
- **Caching**: Browser caching for static assets
- **Compression**: Gzip compression for API responses

## Limitations & Future Enhancements

### Current Limitations

- In-memory file storage (files lost on server restart)
- No user authentication
- Single-threaded comparison processing
- Maximum file size depends on available RAM

### Planned Enhancements

- Database integration for persistent storage
- User authentication and authorization
- Multi-file comparison
- Scheduled comparison jobs
- Email notifications
- Advanced filtering and search
- Diff history and versioning
- Role-based access control
- Rate limiting and API keys
- Webhook support
- Real-time collaboration features

## Troubleshooting

### Frontend Issues

**Port 3000 already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Module not found errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Backend Issues

**Port 8000 already in use**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

**Python dependency issues**
```bash
# Create fresh virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### CORS Errors

Ensure the backend CORS configuration includes your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [API documentation](http://localhost:8000/docs)
3. Check backend logs: `docker-compose logs backend`
4. Check frontend console: Browser Developer Tools > Console

## Changelog

### Version 1.0.0 (Initial Release)

- Complete Excel comparison functionality
- Side-by-side report viewing
- Advanced diff analysis with color-coded status
- File upload and management
- Download diff reports
- Responsive design with dark mode support
- Docker containerization
- Comprehensive API documentation

## Roadmap

- [ ] Database integration (PostgreSQL)
- [ ] User authentication (OAuth2)
- [ ] File versioning and history
- [ ] Advanced filtering and search
- [ ] Email notifications
- [ ] Scheduled comparisons
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] CLI tool for batch processing

---

**Built with ❤️ for enterprise data analysis**
