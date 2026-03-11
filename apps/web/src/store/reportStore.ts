import { create } from 'zustand';

export interface ReportFile {
  fileId: string;
  fileName: string;
  rows: number;
  columns: string[];
}

export interface DiffItem {
  row: number;
  column: string;
  oldValue: any;
  newValue: any;
  status: 'added' | 'removed' | 'modified';
}

export interface ComparisonResult {
  differences: DiffItem[];
  summary: {
    added: number;
    removed: number;
    modified: number;
  };
}

export interface ReportPreview {
  fileId: string;
  fileName: string;
  totalRows: number;
  previewRows: number;
  columns: string[];
  data: Record<string, any>[];
}

interface ReportStore {
  // Files
  files: ReportFile[];
  setFiles: (files: ReportFile[]) => void;
  addFile: (file: ReportFile) => void;
  removeFile: (fileId: string) => void;

  // Selected reports
  selectedReportA: string | null;
  selectedReportB: string | null;
  setSelectedReportA: (fileId: string | null) => void;
  setSelectedReportB: (fileId: string | null) => void;

  // Previews
  previewA: ReportPreview | null;
  previewB: ReportPreview | null;
  setPreviewA: (preview: ReportPreview | null) => void;
  setPreviewB: (preview: ReportPreview | null) => void;

  // Comparison
  comparisonResult: ComparisonResult | null;
  setComparisonResult: (result: ComparisonResult | null) => void;
  isComparing: boolean;
  setIsComparing: (isComparing: boolean) => void;

  // UI State
  activeTab: 'reportA' | 'reportB' | 'differences';
  setActiveTab: (tab: 'reportA' | 'reportB' | 'differences') => void;

  // Loading states
  isLoadingFiles: boolean;
  setIsLoadingFiles: (loading: boolean) => void;
  isLoadingPreviewA: boolean;
  setIsLoadingPreviewA: (loading: boolean) => void;
  isLoadingPreviewB: boolean;
  setIsLoadingPreviewB: (loading: boolean) => void;

  // Reset
  reset: () => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  // Files
  files: [],
  setFiles: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (fileId) =>
    set((state) => ({
      files: state.files.filter((f) => f.fileId !== fileId),
    })),

  // Selected reports
  selectedReportA: null,
  selectedReportB: null,
  setSelectedReportA: (fileId) => set({ selectedReportA: fileId }),
  setSelectedReportB: (fileId) => set({ selectedReportB: fileId }),

  // Previews
  previewA: null,
  previewB: null,
  setPreviewA: (preview) => set({ previewA: preview }),
  setPreviewB: (preview) => set({ previewB: preview }),

  // Comparison
  comparisonResult: null,
  setComparisonResult: (result) => set({ comparisonResult: result }),
  isComparing: false,
  setIsComparing: (isComparing) => set({ isComparing }),

  // UI State
  activeTab: 'reportA',
  setActiveTab: (activeTab) => set({ activeTab }),

  // Loading states
  isLoadingFiles: false,
  setIsLoadingFiles: (isLoadingFiles) => set({ isLoadingFiles }),
  isLoadingPreviewA: false,
  setIsLoadingPreviewA: (isLoadingPreviewA) => set({ isLoadingPreviewA }),
  isLoadingPreviewB: false,
  setIsLoadingPreviewB: (isLoadingPreviewB) => set({ isLoadingPreviewB }),

  // Reset
  reset: () =>
    set({
      files: [],
      selectedReportA: null,
      selectedReportB: null,
      previewA: null,
      previewB: null,
      comparisonResult: null,
      isComparing: false,
      activeTab: 'reportA',
      isLoadingFiles: false,
      isLoadingPreviewA: false,
      isLoadingPreviewB: false,
    }),
}));
