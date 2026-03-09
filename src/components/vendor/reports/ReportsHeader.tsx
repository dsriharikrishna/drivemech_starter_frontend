import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons/DashboardIcons";
import { ArrowRightIcon, DownloadIcon, PrinterIcon } from "@/components/icons/ManageWorkshopIcons";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ReportsHeaderProps {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    handleDownload: () => void;
    handlePrint: () => void;
}

const ReportsHeader = ({ title, isExpanded, onToggle, handleDownload, handlePrint }: ReportsHeaderProps) => {
    return (
        <div className="bg-[#E7F0FF] text-black px-4 py-3 flex items-center justify-between rounded-t-xl">
            <h3 className="text-sm font-semibold">{title}</h3>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleDownload}
                    className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                    title="Download"
                >
                    <DownloadIcon className="w-4 h-4" />
                </button>
                <button
                    onClick={handlePrint}
                    className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                    title="Print"
                >
                    <PrinterIcon className="w-4 h-4" />
                </button>
                <button
                    onClick={onToggle}
                    className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                    {isExpanded ? (
                        <ArrowUpIcon className="w-4 h-4 font-bold text-black" />
                    ) : (
                        <ArrowDownIcon className="w-4 h-4 font-bold text-black" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default ReportsHeader;