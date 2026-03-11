import { useCallback } from 'react';
import { useReportStore } from '@/store/reportStore';
import { reportApi } from '@/services/reportApi';
import { toast } from 'sonner';

export const useReportOperations = () => {
  const {
    setFiles,
    addFile,
    removeFile,
    setPreviewA,
    setPreviewB,
    setComparisonResult,
    setIsComparing,
    setIsLoadingFiles,
    setIsLoadingPreviewA,
    setIsLoadingPreviewB,
    selectedReportA,
    selectedReportB,
  } = useReportStore();

  /**
   * Load all available files
   */
  const loadFiles = useCallback(async () => {
    try {
      setIsLoadingFiles(true);
      const files = await reportApi.listFiles();
      setFiles(files);
      return files;
    } catch (error) {
      toast.error('Failed to load files');
      console.error(error);
      return [];
    } finally {
      setIsLoadingFiles(false);
    }
  }, [setFiles, setIsLoadingFiles]);

  /**
   * Upload a new file
   */
  const uploadFile = useCallback(
    async (file: File) => {
      try {
        const uploadedFile = await reportApi.uploadFile(file);
        addFile(uploadedFile);
        toast.success(`File "${file.name}" uploaded successfully`);
        return uploadedFile;
      } catch (error) {
        toast.error('Failed to upload file');
        console.error(error);
        return null;
      }
    },
    [addFile]
  );

  /**
   * Load preview for Report A
   */
  const loadPreviewA = useCallback(async () => {
    if (!selectedReportA) {
      toast.error('Please select Report A');
      return;
    }

    try {
      setIsLoadingPreviewA(true);
      const preview = await reportApi.getFilePreview(selectedReportA);
      setPreviewA(preview);
    } catch (error) {
      toast.error('Failed to load Report A preview');
      console.error(error);
    } finally {
      setIsLoadingPreviewA(false);
    }
  }, [selectedReportA, setPreviewA, setIsLoadingPreviewA]);

  /**
   * Load preview for Report B
   */
  const loadPreviewB = useCallback(async () => {
    if (!selectedReportB) {
      toast.error('Please select Report B');
      return;
    }

    try {
      setIsLoadingPreviewB(true);
      const preview = await reportApi.getFilePreview(selectedReportB);
      setPreviewB(preview);
    } catch (error) {
      toast.error('Failed to load Report B preview');
      console.error(error);
    } finally {
      setIsLoadingPreviewB(false);
    }
  }, [selectedReportB, setPreviewB, setIsLoadingPreviewB]);

  /**
   * Load both previews
   */
  const loadBothPreviews = useCallback(async () => {
    if (!selectedReportA || !selectedReportB) {
      toast.error('Please select both Report A and Report B');
      return;
    }

    try {
      setIsLoadingPreviewA(true);
      setIsLoadingPreviewB(true);

      const [previewA, previewB] = await Promise.all([
        reportApi.getFilePreview(selectedReportA),
        reportApi.getFilePreview(selectedReportB),
      ]);

      setPreviewA(previewA);
      setPreviewB(previewB);
      toast.success('Reports loaded successfully');
    } catch (error) {
      toast.error('Failed to load reports');
      console.error(error);
    } finally {
      setIsLoadingPreviewA(false);
      setIsLoadingPreviewB(false);
    }
  }, [selectedReportA, selectedReportB, setPreviewA, setPreviewB, setIsLoadingPreviewA, setIsLoadingPreviewB]);

  /**
   * Compare two reports
   */
  const compareReports = useCallback(async () => {
    if (!selectedReportA || !selectedReportB) {
      toast.error('Please select both Report A and Report B');
      return;
    }

    if (selectedReportA === selectedReportB) {
      toast.error('Please select different reports to compare');
      return;
    }

    try {
      setIsComparing(true);
      const result = await reportApi.compareReports(selectedReportA, selectedReportB);
      setComparisonResult(result);
      toast.success(`Comparison complete: ${result.summary.modified} modifications, ${result.summary.added} additions, ${result.summary.removed} removals`);
      return result;
    } catch (error) {
      toast.error('Failed to compare reports');
      console.error(error);
      return null;
    } finally {
      setIsComparing(false);
    }
  }, [selectedReportA, selectedReportB, setComparisonResult, setIsComparing]);

  /**
   * Download diff report
   */
  const downloadDiffReport = useCallback(async () => {
    if (!selectedReportA || !selectedReportB) {
      toast.error('Please select both Report A and Report B');
      return;
    }

    try {
      const blob = await reportApi.downloadDiffReport(selectedReportA, selectedReportB);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `diff_${selectedReportA}_vs_${selectedReportB}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Diff report downloaded successfully');
    } catch (error) {
      toast.error('Failed to download diff report');
      console.error(error);
    }
  }, [selectedReportA, selectedReportB]);

  /**
   * Delete a file
   */
  const deleteFile = useCallback(
    async (fileId: string) => {
      try {
        await reportApi.deleteFile(fileId);
        removeFile(fileId);
        toast.success('File deleted successfully');
      } catch (error) {
        toast.error('Failed to delete file');
        console.error(error);
      }
    },
    [removeFile]
  );

  /**
   * Clear all files
   */
  const clearAllFiles = useCallback(async () => {
    try {
      await reportApi.clearAllFiles();
      setFiles([]);
      toast.success('All files cleared');
    } catch (error) {
      toast.error('Failed to clear files');
      console.error(error);
    }
  }, [setFiles]);

  return {
    loadFiles,
    uploadFile,
    loadPreviewA,
    loadPreviewB,
    loadBothPreviews,
    compareReports,
    downloadDiffReport,
    deleteFile,
    clearAllFiles,
  };
};
