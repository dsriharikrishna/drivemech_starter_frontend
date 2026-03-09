"use client";

import React, { useCallback, useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";

interface UploadedFile {
  file: File;
  preview?: string;
}

interface DocumentState {
  bankQR: UploadedFile | null;
  gstCertificate: UploadedFile | null;
  panCard: UploadedFile | null;
  addressProof: UploadedFile | null;
  workshopPhotos: UploadedFile[];
}

const DocumentsManager = () => {
  const [documents, setDocuments] = useState<DocumentState>({
    bankQR: null,
    gstCertificate: null,
    panCard: null,
    addressProof: null,
    workshopPhotos: [],
  });

  // File input refs
  const bankQRRef = useRef<HTMLInputElement>(null);
  const gstRef = useRef<HTMLInputElement>(null);
  const panRef = useRef<HTMLInputElement>(null);
  const addressProofRef = useRef<HTMLInputElement>(null);
  const workshopPhotosRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldName: keyof Omit<DocumentState, "workshopPhotos">
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        // Create preview for images
        const preview = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined;
        setDocuments((prev) => ({
          ...prev,
          [fieldName]: { file, preview },
        }));
      }
    },
    []
  );

  const handleMultipleFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        const newPhotos = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        setDocuments((prev) => ({
          ...prev,
          workshopPhotos: [...prev.workshopPhotos, ...newPhotos],
        }));
      }
    },
    []
  );

  const removeFile = useCallback(
    (fieldName: keyof Omit<DocumentState, "workshopPhotos">) => {
      // Revoke object URL if exists
      const doc = documents[fieldName];
      if (doc?.preview) {
        URL.revokeObjectURL(doc.preview);
      }
      setDocuments((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    },
    [documents]
  );

  const removePhotoAt = useCallback(
    (index: number) => {
      const photo = documents.workshopPhotos[index];
      if (photo?.preview) {
        URL.revokeObjectURL(photo.preview);
      }
      setDocuments((prev) => ({
        ...prev,
        workshopPhotos: prev.workshopPhotos.filter((_, i) => i !== index),
      }));
    },
    [documents.workshopPhotos]
  );

  return (
    <div className="space-y-8">
      {/* Bank QR Scanner Section */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Upload Bank Scanner
        </p>
        <div
          onClick={() => bankQRRef.current?.click()}
          className="border border-dashed border-gray-300 rounded-lg p-8 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
        >
          {documents.bankQR ? (
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-green-500" />
              <span className="text-sm text-gray-700">
                {documents.bankQR.file.name}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile("bankQR");
                }}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                <Upload size={24} className="text-orange-500" />
              </div>
              <p className="text-sm text-orange-500 font-medium">Bank QR</p>
              <p className="text-xs text-blue-500 mt-1">
                Click to Upload or drag and drop
              </p>
            </>
          )}
          <input
            ref={bankQRRef}
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, "bankQR")}
          />
        </div>
      </div>

      {/* Required Documents Section */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Required Documents
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* GST Certificate */}
          <div
            onClick={() => gstRef.current?.click()}
            className="border border-dashed border-gray-300 rounded-lg p-6 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors min-h-[140px]"
          >
            {documents.gstCertificate ? (
              <div className="flex flex-col items-center gap-2">
                <FileText size={20} className="text-green-500" />
                <span className="text-xs text-gray-700 text-center break-all">
                  {documents.gstCertificate.file.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile("gstCertificate");
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-2">
                  <FileText size={20} className="text-orange-500" />
                </div>
                <p className="text-sm text-orange-500 font-medium">
                  GST Certificate
                </p>
                <p className="text-xs text-blue-500 mt-1">Click to Upload</p>
              </>
            )}
            <input
              ref={gstRef}
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(e, "gstCertificate")}
            />
          </div>

          {/* Pan Card */}
          <div
            onClick={() => panRef.current?.click()}
            className="border border-dashed border-gray-300 rounded-lg p-6 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors min-h-[140px]"
          >
            {documents.panCard ? (
              <div className="flex flex-col items-center gap-2">
                <FileText size={20} className="text-green-500" />
                <span className="text-xs text-gray-700 text-center break-all">
                  {documents.panCard.file.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile("panCard");
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-2">
                  <FileText size={20} className="text-orange-500" />
                </div>
                <p className="text-sm text-orange-500 font-medium">Pan Card</p>
                <p className="text-xs text-blue-500 mt-1">Click to Upload</p>
              </>
            )}
            <input
              ref={panRef}
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(e, "panCard")}
            />
          </div>

          {/* Address Proof */}
          <div
            onClick={() => addressProofRef.current?.click()}
            className="border border-dashed border-gray-300 rounded-lg p-6 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors min-h-[140px]"
          >
            {documents.addressProof ? (
              <div className="flex flex-col items-center gap-2">
                <FileText size={20} className="text-green-500" />
                <span className="text-xs text-gray-700 text-center break-all">
                  {documents.addressProof.file.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile("addressProof");
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-2">
                  <FileText size={20} className="text-orange-500" />
                </div>
                <p className="text-sm text-orange-500 font-medium">
                  Address Proof
                </p>
                <p className="text-xs text-blue-500 mt-1">Click to Upload</p>
              </>
            )}
            <input
              ref={addressProofRef}
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(e, "addressProof")}
            />
          </div>
        </div>
      </div>

      {/* Workshop Photos Section */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Workshop Photos ( Min. 3 photos)
        </p>
        <div
          onClick={() => workshopPhotosRef.current?.click()}
          className="border border-dashed border-gray-300 rounded-lg p-8 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
        >
          {documents.workshopPhotos.length > 0 ? (
            <div className="w-full">
              <p className="text-sm text-green-600 font-medium mb-4 text-center">
                {documents.workshopPhotos.length} photo(s) uploaded
              </p>
              <div className="grid grid-cols-3 gap-3">
                {documents.workshopPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
                  >
                    {photo.preview && (
                      <img
                        src={photo.preview}
                        alt={`Workshop photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhotoAt(index);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                <Upload size={24} className="text-orange-500" />
              </div>
              <p className="text-sm text-orange-500 font-medium">
                Upload workshop photos
              </p>
              <p className="text-xs text-blue-500 mt-1">
                Click to Upload or drag and drop
              </p>
            </>
          )}
          <input
            ref={workshopPhotosRef}
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleMultipleFiles}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentsManager;
