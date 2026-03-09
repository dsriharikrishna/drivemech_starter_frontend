"use client";

import React, { useState, useCallback } from "react";
import { Plus } from "phosphor-react";
import Button from "@/components/ui/Button";
import DesignationsTable from "@/components/vendor/management/employees/DesignationsTable";
import EmployeesTable from "@/components/vendor/management/employees/EmployeesTable";
import AddDesignationModal from "@/components/vendor/management/employees/AddDesignationModal";
import AddEmployeeModal from "@/components/vendor/management/employees/AddEmployeeModal";
import DeleteModal from "@/components/modals/DeleteModal";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "add" | "edit";
type Tab = "designations" | "employees";

const EmployeesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as Tab) || "designations";

  const [isDesgModalOpen, setIsDesgModalOpen] = useState(false);
  const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [initialData, setInitialData] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<Tab>("employees");
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const setActiveTab = useCallback((tab: Tab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const handleAddEmployee = useCallback(() => {
    setMode("add");
    setInitialData(null);
    setIsEmpModalOpen(true);
  }, []);

  const handleEditEmployee = useCallback((employee: any) => {
    setMode("edit");
    setInitialData(employee);
    setIsEmpModalOpen(true);
  }, []);

  const handleAddDesignation = useCallback(() => {
    setMode("add");
    setInitialData(null);
    setIsDesgModalOpen(true);
  }, []);

  const handleEditDesignation = useCallback((designation: any) => {
    setMode("edit");
    setInitialData({
      designationName: designation.designationInfo,
      description: designation.description,
      permissions: [], // Mocking permissions for now
    });
    setIsDesgModalOpen(true);
  }, []);

  const handleViewEmployee = useCallback((employee: any) => {
    router.push(`/vendor/management/employees/${employee.id}`);
  }, [router]);

  const handleViewDesignation = useCallback((designation: any) => {
    handleEditDesignation(designation);
  }, [handleEditDesignation]);

  const handleDeleteDesignation = useCallback((designation: any) => {
    setDeleteType("designations");
    setItemToDelete(designation);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteEmployee = useCallback((employee: any) => {
    setDeleteType("employees");
    setItemToDelete(employee);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    if (deleteType === "designations") {
      console.log("Deleting designation:", itemToDelete);
    } else {
      console.log("Deleting employee:", itemToDelete);
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  }, [deleteType, itemToDelete]);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm border border-border p-4 min-h-full flex flex-col gap-2">
          {/* Header Actions Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
            {/* Tabs */}
            <div className="flex bg-white p-1 rounded-lg border border-border">
              <button
                onClick={() => setActiveTab("designations")}
                className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-md transition-colors ${activeTab === "designations"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Manage Designations
              </button>
              <button
                onClick={() => setActiveTab("employees")}
                className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-md transition-colors ${activeTab === "employees"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Manage Employees
              </button>
            </div>

            {/* Action Button */}
            {activeTab === "designations" ? (
              <Button
                variant="primary-blue"
                startIcon={<Plus weight="bold" />}
                startIconClassName="rounded-full bg-white text-blue-500 p-1"
                onClick={handleAddDesignation}
              >
                New Designation
              </Button>
            ) : (
              <Button
                variant="success"
                startIcon={<Plus weight="bold" />}
                startIconClassName="rounded-full bg-white text-green-500 p-1"
                onClick={handleAddEmployee}
              >
                New Employee
              </Button>
            )}
          </div>

          {/* Title Bar like in design */}
          <div className="bg-blue-50 px-4 py-3 rounded-lg flex flex-col md:flex-row gap-2 justify-between items-start lg:items-center">
            <h2 className="font-semibold text-gray-800"> 
              {activeTab === "designations"
                ? "Manage Designations"
                : "Employee Info"}
            </h2>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder={
                  activeTab === "designations" ? "Search" : "Search employee"
                }
                className="pl-9 pr-4 py-1.5 bg-white rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className="overflow-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {activeTab === "designations" ? (
              <DesignationsTable
                onEdit={handleEditDesignation}
                onView={handleViewDesignation}
                onDelete={handleDeleteDesignation}
              />
            ) : (
              <EmployeesTable
                onEdit={handleEditEmployee}
                onView={handleViewEmployee}
                onDelete={handleDeleteEmployee}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddDesignationModal
        isOpen={isDesgModalOpen}
        onClose={() => setIsDesgModalOpen(false)}
        mode={mode}
        initialData={initialData}
      />
      <AddEmployeeModal
        isOpen={isEmpModalOpen}
        onClose={() => setIsEmpModalOpen(false)}
        mode={mode}
        initialData={initialData}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={deleteType === "designations" ? "Delete Designation" : "Delete Employee"}
        description={`Are you sure you want to delete this ${deleteType === "designations" ? "designation" : "employee"}?`}
      />


    </div>
  );
};

export default EmployeesPage;
