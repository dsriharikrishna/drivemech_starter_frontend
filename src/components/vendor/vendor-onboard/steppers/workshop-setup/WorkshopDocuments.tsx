"use client";

import React, { useCallback, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import { setDocuments } from "@/store/slices/vendor-onboarding/workshopSetupSlice";

const WorkshopDocuments = () => {
  const { setValue, watch } = useFormContext();
  const dispatch = useAppDispatch();

  // Watch form values
  const bankQRFile = watch("documents.bankQR");
  const gstFile = watch("documents.gstCertificate");
  const panFile = watch("documents.panCard");
  const addressProofFile = watch("documents.addressProof");
  const workshopPhotos = watch("documents.workshopPhotos") || [];

  // File input refs
  const bankQRRef = useRef<HTMLInputElement>(null);
  const gstRef = useRef<HTMLInputElement>(null);
  const panRef = useRef<HTMLInputElement>(null);
  const addressProofRef = useRef<HTMLInputElement>(null);
  const workshopPhotosRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue(`documents.${fieldName}`, file, { shouldValidate: true });
        // Update Redux
        dispatch(setDocuments({ [fieldName]: file }));
      }
    },
    [setValue, dispatch]
  );

  const handleMultipleFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        // Append new files to existing ones
        const newPhotos = [...workshopPhotos, ...files];
        setValue("documents.workshopPhotos", newPhotos, {
          shouldValidate: true,
        });
        // Update Redux
        dispatch(setDocuments({ workshopPhotos: newPhotos }));
      }
    },
    [workshopPhotos, setValue, dispatch]
  );

  const removeFile = useCallback(
    (fieldName: string) => {
      setValue(`documents.${fieldName}`, null, { shouldValidate: true });
      dispatch(setDocuments({ [fieldName]: undefined }));
    },
    [dispatch, setValue]
  );

  const removePhotoAt = useCallback(
    (index: number) => {
      const newPhotos = workshopPhotos.filter(
        (_: any, i: number) => i !== index
      );
      setValue("documents.workshopPhotos", newPhotos, { shouldValidate: true });
      dispatch(setDocuments({ workshopPhotos: newPhotos }));
    },
    [workshopPhotos, setValue, dispatch]
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText size={20} className="text-gray-900" />
          <h4 className="text-lg font-bold text-gray-900">Workshop Details</h4>
        </div>

        {/* Bank QR Scanner Section */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Upload Bank QR Code
          </p>
          <div
            onClick={() => bankQRRef.current?.click()}
            className="border border-dashed border-gray-300 rounded-lg p-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {bankQRFile ? (
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-green-500" />
                <span className="text-sm text-gray-700">{bankQRFile.name}</span>
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
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-2">
                  <Upload size={20} className="text-orange-500" />
                </div>
                <p className="text-sm text-orange-500 font-medium">Bank QR</p>
                <p className="text-xs text-blue-500 mt-1">
                  Click to upload or drag and drop
                </p>
              </>
            )}
            <input
              ref={bankQRRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "bankQR")}
            />
          </div>
        </div>

        {/* Required Documents Section */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Required Documents
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* GST Certificate */}
            <div
              onClick={() => gstRef.current?.click()}
              className="border border-dashed border-gray-300 rounded-lg p-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {gstFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText size={20} className="text-green-500" />
                  <span className="text-xs text-gray-700 text-center">
                    {gstFile.name}
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
                  <p className="text-xs text-blue-500 mt-1">Click to upload</p>
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
              className="border border-dashed border-gray-300 rounded-lg p-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {panFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText size={20} className="text-green-500" />
                  <span className="text-xs text-gray-700 text-center">
                    {panFile.name}
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
                  <p className="text-sm text-orange-500 font-medium">
                    Pan Card
                  </p>
                  <p className="text-xs text-blue-500 mt-1">Click to upload</p>
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
              className="border border-dashed border-gray-300 rounded-lg p-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {addressProofFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText size={20} className="text-green-500" />
                  <span className="text-xs text-gray-700 text-center">
                    {addressProofFile.name}
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
                  <p className="text-xs text-blue-500 mt-1">Click to upload</p>
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

        {/* Upload Workshop Photos */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Upload Workshop Photos
          </p>
          <div
            onClick={() => workshopPhotosRef.current?.click()}
            className="border border-dashed border-gray-300 rounded-lg p-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {workshopPhotos.length > 0 ? (
              <div className="w-full">
                <p className="text-sm text-green-600 font-medium mb-2">
                  {workshopPhotos.length} photo(s) selected
                </p>
                <div className="flex flex-wrap gap-2">
                  {workshopPhotos.map((photo: File, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs"
                    >
                      <span className="text-gray-700">{photo.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhotoAt(index);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-2">
                  <Upload size={20} className="text-orange-500" />
                </div>
                <p className="text-sm text-orange-500 font-medium">
                  Upload workshop photos
                </p>
                <p className="text-xs text-blue-500 mt-1">
                  Click to upload or drag and drop
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
    </div>
  );
};

export default WorkshopDocuments;
