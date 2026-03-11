import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ReportPreview as ReportPreviewType } from '@/store/reportStore';
import { Skeleton } from '@/components/ui/skeleton';

interface ReportPreviewProps {
  preview: ReportPreviewType | null;
  isLoading: boolean;
  title: string;
}

export function ReportPreview({ preview, isLoading, title }: ReportPreviewProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!preview) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Select a report and click "View Reports" to preview
          </p>
        </div>
      </div>
    );
  }

  const columnDefs = preview.columns.map((col) => ({
    field: col,
    headerName: col,
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
    wrapText: true,
    autoHeight: true,
  }));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
          {title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {preview.previewRows} of {preview.totalRows} rows displayed
        </p>
      </div>

      <div className="ag-theme-quartz dark:ag-theme-quartz-dark rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
        <div style={{ height: '400px', width: '100%' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={preview.data}
            pagination={true}
            paginationPageSize={10}
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
    </div>
  );
}
