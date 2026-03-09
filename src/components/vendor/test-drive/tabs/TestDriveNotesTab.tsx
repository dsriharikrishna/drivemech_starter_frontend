import React from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import Button from "@/components/ui/Button";

interface TestDriveCheckItem {
  sNo: number;
  service: string;
  qcDescription: string;
  status: "Pass" | "Fail" | null;
}

interface TestDriveNotesTabProps {
  testDriveChecks: TestDriveCheckItem[];
  checkStatuses: Record<number, "Pass" | "Fail" | null>;
  onStatusChange: (sNo: number, status: "Pass" | "Fail") => void;
  onComplete: () => void;
}

const TestDriveNotesTab: React.FC<TestDriveNotesTabProps> = ({
  testDriveChecks,
  checkStatuses,
  onStatusChange,
  onComplete,
}) => {
  const testDriveColumns: TableColumn<TestDriveCheckItem>[] = [
    {
      key: "sNo",
      header: "S.No",
      width: "60px",
      render: (check) => (
        <span className="text-sm text-gray-900">{check.sNo}</span>
      ),
    },
    {
      key: "service",
      header: "Service",
      width: "250px",
      render: (check) => (
        <span className="text-sm text-gray-900">{check.service}</span>
      ),
    },
    {
      key: "qcDescription",
      header: "QC Description / Action",
      minWidth: "400px",
      render: (check) => (
        <span className="text-sm text-gray-600">{check.qcDescription}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (check) => {
        const status = checkStatuses[check.sNo];
        return (
          <div className="flex items-center">
            {status === "Pass" && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                Pass
              </span>
            )}
            {status === "Fail" && (
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                Fail
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "markAs",
      header: "Mark As",
      width: "220px",
      render: (check) => {
        const status = checkStatuses[check.sNo];
        return (
          <div className="flex gap-2">
            <button
              onClick={() => onStatusChange(check.sNo, "Fail")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${status === "Fail"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border border-red-500 hover:bg-red-50"
                }`}
            >
              Fail
            </button>
            <button
              onClick={() => onStatusChange(check.sNo, "Pass")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${status === "Pass"
                ? "bg-green-500 text-white"
                : "bg-white text-green-500 border border-green-500 hover:bg-green-50"
                }`}
            >
              Pass
            </button>
          </div>
        );
      },
    },
  ];

  const allPassed = testDriveChecks.every(
    (check) => checkStatuses[check.sNo] === "Pass"
  );
  const anyFailed = testDriveChecks.some(
    (check) => checkStatuses[check.sNo] === "Fail"
  );
  const allChecked = testDriveChecks.every(
    (check) => checkStatuses[check.sNo] !== null
  );

  return (
    <div className="mt-6">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
        <Table
          columns={testDriveColumns}
          data={testDriveChecks}
          keyExtractor={(check) => check.sNo}
          emptyMessage="No test drive checks found"
          striped={false}
          hoverable
          className="h-full"
          style={{ height: "100%" }}
        />
      </div>

      {/* Result Bars */}
      <div className="mt-8">
        {!allChecked && (
          <div className="border border-gray-100 rounded-[32px] p-1.5 flex items-center gap-2 bg-white shadow-sm">
            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-[26px] py-4 flex items-center justify-center">
              <p className="text-gray-500 font-semibold text-sm">
                Please check all services (Pass or Fail) to complete the test drive.
              </p>
            </div>
            <button
              disabled
              className="bg-gray-200 text-gray-400 px-8 py-4 rounded-[24px] text-sm font-bold flex items-center gap-2 cursor-not-allowed uppercase tracking-wide"
            >
              Complete QC Check
            </button>
          </div>
        )}

        {anyFailed && allChecked && (
          <div className="border border-gray-100 rounded-[32px] p-1.5 flex items-center gap-2 bg-white shadow-sm">
            <div className="flex-1 bg-[#FFF5F5] border border-[#FFE4E4] rounded-[26px] py-4 flex items-center justify-center">
              <p className="text-[#FF5252] font-semibold text-sm">
                One or more services failed QC. This requires technician follow-up.
              </p>
            </div>
            <button
              className="bg-[#FF5252] hover:bg-[#FF3B3B] text-white px-6 py-4 rounded-[24px] text-sm font-bold flex items-center gap-2 transition-all shadow-md group whitespace-nowrap"
            >
              Revert to Service (Repair Required)
              <div className="bg-white/20 rounded-full p-0.5 group-hover:bg-white/30 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </button>
          </div>
        )}

        {allPassed && allChecked && (
          <div className="border border-gray-100 rounded-[32px] p-1.5 flex items-center gap-2 bg-white shadow-sm">
            <div className="flex-1 bg-[#F0FDF4] border border-[#DCFCE7] rounded-[26px] py-4 flex items-center justify-center">
              <p className="text-[#22C55E] font-semibold text-sm">
                All services passed Quality Check
              </p>
            </div>
            <button
              onClick={onComplete}
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-md group whitespace-nowrap"
            >
              Proceed to Ready For Delivery
              <div className="bg-white/20 rounded-full p-0.5 group-hover:bg-white/30 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDriveNotesTab;
