import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReportStore } from "@/store/reportStore";
import { useReportOperations } from "@/hooks/useReportOperations";
import { ReportSelector } from "@/components/ReportSelector";
import { ReportPreview } from "@/components/ReportPreview";
import { DifferencesTable } from "@/components/DifferencesTable";
import { BarChart3, FileText, Zap } from "lucide-react";

/**
 * Excel Report Comparator - Main Application
 *
 * Design Philosophy: Modern Enterprise Analytics
 * - Clean, data-forward interface with generous whitespace
 * - Hierarchical information architecture with clear visual separation
 * - Accent colors reserved for actionable insights (differences)
 * - Smooth transitions and micro-interactions for professional feel
 */
export default function Home() {
  const {
    activeTab,
    setActiveTab,
    previewA,
    previewB,
    comparisonResult,
    isLoadingPreviewA,
    isLoadingPreviewB,
    isComparing,
    selectedReportA,
    selectedReportB,
  } = useReportStore();

  const { loadFiles } = useReportOperations();

  // Load files on mount
  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white dark:text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Excel Report Comparator
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Advanced Excel file comparison and analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Report Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ReportSelector />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={(value: any) => setActiveTab(value)}
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="reportA" className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Report A</span>
                </TabsTrigger>
                <TabsTrigger value="reportB" className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Report B</span>
                </TabsTrigger>
                <TabsTrigger value="differences" className="gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">Differences</span>
                </TabsTrigger>
              </TabsList>

              {/* Report A Preview */}
              <TabsContent value="reportA" className="space-y-4">
                <div className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
                  <ReportPreview
                    preview={previewA}
                    isLoading={isLoadingPreviewA}
                    title={
                      selectedReportA
                        ? `Report A: ${selectedReportA}`
                        : "Report A"
                    }
                  />
                </div>
              </TabsContent>

              {/* Report B Preview */}
              <TabsContent value="reportB" className="space-y-4">
                <div className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
                  <ReportPreview
                    preview={previewB}
                    isLoading={isLoadingPreviewB}
                    title={
                      selectedReportB
                        ? `Report B: ${selectedReportB}`
                        : "Report B"
                    }
                  />
                </div>
              </TabsContent>

              {/* Differences */}
              <TabsContent value="differences" className="space-y-4">
                <div className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
                  <DifferencesTable
                    result={comparisonResult}
                    isLoading={isComparing}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="p-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2026 Excel Report Comparator. Enterprise-grade comparison tool.
            </p>
            <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
              <a
                href="#"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
