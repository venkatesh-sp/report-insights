import axios, { AxiosInstance } from 'axios';
import { ReportFile, ComparisonResult, ReportPreview } from '@/store/reportStore';

// Get API URL from environment or use localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ReportApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Check API health
   */
  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  /**
   * Upload an Excel file
   */
  async uploadFile(file: File): Promise<ReportFile> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.client.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        fileId: response.data.fileId,
        fileName: response.data.fileName,
        rows: response.data.rows,
        columns: response.data.columns,
      };
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  /**
   * Get list of all uploaded files
   */
  async listFiles(): Promise<ReportFile[]> {
    try {
      const response = await this.client.get('/files');
      return response.data.files;
    } catch (error) {
      console.error('Failed to list files:', error);
      throw error;
    }
  }

  /**
   * Get preview of a specific file
   */
  async getFilePreview(fileId: string): Promise<ReportPreview> {
    try {
      const response = await this.client.get(`/file/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get file preview:', error);
      throw error;
    }
  }

  /**
   * Compare two reports
   */
  async compareReports(reportA: string, reportB: string): Promise<ComparisonResult> {
    try {
      const response = await this.client.post('/compare', null, {
        params: {
          reportA,
          reportB,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to compare reports:', error);
      throw error;
    }
  }

  /**
   * Download diff report as Excel file
   */
  async downloadDiffReport(reportA: string, reportB: string): Promise<Blob> {
    try {
      const response = await this.client.post(
        '/download-diff',
        {},
        {
          params: {
            reportA,
            reportB,
          },
          responseType: 'blob',
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to download diff report:', error);
      throw error;
    }
  }

  /**
   * Delete a file
   */
  async deleteFile(fileId: string): Promise<{ message: string }> {
    try {
      const response = await this.client.delete(`/file/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete file:', error);
      throw error;
    }
  }

  /**
   * Clear all files
   */
  async clearAllFiles(): Promise<{ message: string }> {
    try {
      const response = await this.client.delete('/clear-all');
      return response.data;
    } catch (error) {
      console.error('Failed to clear all files:', error);
      throw error;
    }
  }

  /**
   * Set API base URL (useful for dynamic configuration)
   */
  setBaseURL(url: string): void {
    this.client.defaults.baseURL = url;
  }

  /**
   * Get current API base URL
   */
  getBaseURL(): string {
    return this.client.defaults.baseURL || API_BASE_URL;
  }
}

export const reportApi = new ReportApiService();
