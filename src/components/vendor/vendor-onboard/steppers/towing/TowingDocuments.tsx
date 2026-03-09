"use client";

import React, { useCallback, useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setDocuments } from "@/store/slices/vendor-onboarding/towingServicesSlice";

const TowingDocuments = () => {
  const methods = useFormContext();
  const dispatch = useAppDispatch();
  const documents = useAppSelector(
    (state) => state.vendorTowingServices.documents
  );

  // File input refs
  const vehiclePhotosRef = useRef<HTMLInputElement>(null);
  const licenseRef = useRef<HTMLInputElement>(null);

  // Local state for files
  const [vehiclePhotos, setVehiclePhotos] = useState<File[]>([]);
  const [licenseFiles, setLicenseFiles] = useState<File[]>([]);

  const handleVehiclePhotos = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setVehiclePhotos(files);
        // Update Redux
        dispatch(setDocuments({ vehiclePhotos: files }));
      }
    },
    [dispatch]
  );

  const handleLicenseFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setLicenseFiles(files);
        // Update Redux
        dispatch(
          setDocuments({ license: files[0], insurance: files.slice(1) })
        );
      }
    },
    [dispatch]
  );

  const removeVehiclePhoto = useCallback(
    (index: number) => {
      const newPhotos = vehiclePhotos.filter((_, i) => i !== index);
      setVehiclePhotos(newPhotos);
      dispatch(setDocuments({ vehiclePhotos: newPhotos }));
    },
    [dispatch, vehiclePhotos]
  );

  const removeLicenseFile = useCallback(
    (index: number) => {
      const newFiles = licenseFiles.filter((_, i) => i !== index);
      setLicenseFiles(newFiles);
      dispatch(
        setDocuments({ license: newFiles[0], insurance: newFiles.slice(1) })
      );
    },
    [dispatch, licenseFiles]
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText size={20} className="text-gray-900" />
          <h4 className="text-lg font-bold text-gray-900">
            Documents & Images
          </h4>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Upload towing vehicle photos and licenses
        </p>

        <div className="space-y-8">
          {/* Towing Vehicle Images */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">
              Towing Vehicle Images
            </h5>
            <div
              onClick={() => vehiclePhotosRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-lg p-8 bg-white hover:border-gray-300 transition-colors cursor-pointer text-center group"
            >
              {vehiclePhotos.length > 0 ? (
                <div className="w-full">
                  <p className="text-sm text-green-600 font-medium mb-2">
                    {vehiclePhotos.length} photo(s) selected
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {vehiclePhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs"
                      >
                        <span className="text-gray-700">{photo.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeVehiclePhoto(index);
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
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 transition-colors">
                    <Upload size={20} className="text-orange-500" />
                  </div>
                  <p className="text-orange-500 font-medium mb-1">
                    Click to upload vehicle photos
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG (max. 5MB each)
                  </p>
                </>
              )}
              <input
                ref={vehiclePhotosRef}
                type="file"
                className="hidden"
                multiple
                accept="image/png, image/jpeg"
                onChange={handleVehiclePhotos}
              />
            </div>
          </div>

          {/* Licence & Permits */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">
              Licence & Permits
            </h5>
            <div
              onClick={() => licenseRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-lg p-8 bg-white hover:border-gray-300 transition-colors cursor-pointer text-center group"
            >
              {licenseFiles.length > 0 ? (
                <div className="w-full">
                  <p className="text-sm text-green-600 font-medium mb-2">
                    {licenseFiles.length} file(s) selected
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {licenseFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs"
                      >
                        <span className="text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeLicenseFile(index);
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
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 transition-colors">
                    <Upload size={20} className="text-orange-500" />
                  </div>
                  <p className="text-orange-500 font-medium mb-1">
                    Click to upload licenses
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, PDF (max. 5MB each)
                  </p>
                </>
              )}
              <input
                ref={licenseRef}
                type="file"
                className="hidden"
                multiple
                accept="image/png, image/jpeg, application/pdf"
                onChange={handleLicenseFiles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TowingDocuments;
