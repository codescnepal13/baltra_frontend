import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiDownload,
  FiFileText,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { RiFileExcel2Fill } from "react-icons/ri";
import API from "../../../redux/api/api";

const ExcelUploadLayout = ({ onClose, onBulkUpload, isLoading = false }) => {
  const [excelFile, setExcelFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // ─── Validation ─────────────────────────────────────────────────────────────
  const isValidExcelFile = (file) =>
    file &&
    (file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls"));

  // ─── Template Download ───────────────────────────────────────────────────────
  const handleDownloadTemplate = async () => {
    setIsDownloading(true);
    try {
      const response = await API.get("/products/downloadbulktemplate", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bulk_upload_template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      enqueueSnackbar("Template downloaded successfully!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to download template. Please try again.", {
        variant: "error",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // ─── Drag & Drop ─────────────────────────────────────────────────────────────
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && isValidExcelFile(file)) {
      setExcelFile(file);
    } else {
      enqueueSnackbar("Please select a valid Excel file (.xlsx or .xls)", {
        variant: "error",
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // ─── File Handlers ────────────────────────────────────────────────────────────
  const removeFile = () => setExcelFile(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && isValidExcelFile(file)) {
      setExcelFile(file);
    } else {
      enqueueSnackbar("Please select a valid Excel file", { variant: "error" });
    }
  };

  const handleBulkUpload = async () => {
    if (!excelFile) {
      enqueueSnackbar("Please select an Excel file first!", {
        variant: "warning",
      });
      return;
    }
    try {
      await onBulkUpload(excelFile);
      setExcelFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-emerald-700 to-green-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
              <RiFileExcel2Fill className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white text-base font-semibold leading-tight">
                Excel Bulk Upload
              </p>
              <p className="text-emerald-100 text-xs mt-0.5">
                Upload your Excel file for bulk product import
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors cursor-pointer"
            disabled={isLoading}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* ── Download Template Banner ── */}
        <div className="mx-6 mt-5 flex items-center justify-between gap-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <div className="flex items-start gap-3">
            <FiFileText className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                Download Sample Template
              </p>
              <p className="text-xs text-emerald-600 mt-0.5">
                Use this template to fill in your product data before uploading
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadTemplate}
            disabled={isDownloading}
            className={`flex-shrink-0 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150 active:scale-95
              ${
                isDownloading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200"
              }`}
          >
            {isDownloading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <FiDownload className="w-3.5 h-3.5" />
                Download
              </>
            )}
          </button>
        </div>

        <div className="p-6">
          {/* ── Drop Zone ── */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragOver
                ? "border-emerald-400 bg-emerald-50"
                : excelFile
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />

            {!excelFile ? (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FiUpload className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drop your Excel file here, or{" "}
                    <span className="text-emerald-600 font-semibold">
                      browse
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports .xlsx and .xls files up to 5MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RiFileExcel2Fill className="w-6 h-6 text-emerald-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-800 truncate max-w-xs">
                          {excelFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(excelFile.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      disabled={isLoading}
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Upload Button ── */}
          {excelFile && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleBulkUpload}
                disabled={isLoading}
                className={`px-8 py-3 rounded-lg cursor-pointer font-semibold text-white text-sm transition-all duration-200 flex items-center gap-2
                  ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiUpload className="w-4 h-4" />
                    Start Bulk Upload
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Guidelines ── */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-800 mb-1">
                  Upload Guidelines
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • Ensure your Excel file contains the required columns
                  </li>
                  <li>• Maximum file size: 5MB</li>
                  <li>• Supported formats: .xlsx, .xls</li>
                  <li>• First row should contain column headers</li>
                  <li>• Download the sample template above before uploading</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExcelUploadLayout);
