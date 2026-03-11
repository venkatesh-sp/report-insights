import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useReportStore } from '@/store/reportStore';
import { Upload, FileUp } from 'lucide-react';
import { useRef } from 'react';
import { useReportOperations } from '@/hooks/useReportOperations';

export function ReportSelector() {
  const {
    files,
    selectedReportA,
    selectedReportB,
    setSelectedReportA,
    setSelectedReportB,
  } = useReportStore();

  const { uploadFile, loadBothPreviews, compareReports } = useReportOperations();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadFile(file);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleViewReports = async () => {
    await loadBothPreviews();
  };

  const handleCompare = async () => {
    await compareReports();
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Upload Excel Reports
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Upload .xlsx, .xls, or .csv files to compare
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="default"
            size="lg"
            className="gap-2"
          >
            <FileUp className="w-4 h-4" />
            Upload File
          </Button>
        </div>
      </div>

      {/* Report Selection Section */}
      <div className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Select Reports to Compare
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Report A Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Report A (Original)
            </label>
            <Select value={selectedReportA || ''} onValueChange={setSelectedReportA}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Report A" />
              </SelectTrigger>
              <SelectContent>
                {files.map((file) => (
                  <SelectItem key={file.fileId} value={file.fileId}>
                    {file.fileName} ({file.rows} rows)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Report B Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Report B (Updated)
            </label>
            <Select value={selectedReportB || ''} onValueChange={setSelectedReportB}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Report B" />
              </SelectTrigger>
              <SelectContent>
                {files.map((file) => (
                  <SelectItem key={file.fileId} value={file.fileId}>
                    {file.fileName} ({file.rows} rows)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleViewReports}
            variant="outline"
            className="flex-1"
            disabled={!selectedReportA || !selectedReportB}
          >
            <Upload className="w-4 h-4 mr-2" />
            View Reports
          </Button>
          <Button
            onClick={handleCompare}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            disabled={!selectedReportA || !selectedReportB}
          >
            Get Differences
          </Button>
        </div>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">
            Uploaded Files ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.fileId}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                    {file.fileName}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {file.rows} rows × {file.columns.length} columns
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
