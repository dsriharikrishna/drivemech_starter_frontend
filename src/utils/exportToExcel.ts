export type ExcelColumn<T> = {
  key: keyof T;
  header: string;
  width?: number;
};

export type ExportExcelOptions<T> = {
  fileName: string;
  sheetName?: string;
  data: T[];
  columns?: ExcelColumn<T>[];
};

export async function exportToExcel<T extends object>({
  fileName,
  sheetName = "Sheet1",
  data,
  columns,
}: ExportExcelOptions<T>): Promise<void> {
  if (!data || data.length === 0) {
    console.warn("exportToExcel: No data to export");
    return;
  }

  try {
    const ExcelJS = await import("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Define columns
    if (columns && columns.length > 0) {
      // Use custom column configuration
      worksheet.columns = columns.map((col) => ({
        header: col.header,
        key: String(col.key),
        width: col.width || calculateColumnWidth(col, data),
      }));

      // Add data rows
      data.forEach((item) => {
        const row: Record<string, any> = {};
        columns.forEach((col) => {
          row[String(col.key)] = item[col.key];
        });
        worksheet.addRow(row);
      });
    } else {
      // Auto-generate columns from data keys
      const keys = Object.keys(data[0]) as (keyof T)[];
      worksheet.columns = keys.map((key) => ({
        header: String(key),
        key: String(key),
        width: calculateAutoColumnWidth(String(key), data),
      }));

      // Add data rows
      data.forEach((item) => {
        worksheet.addRow(item as any);
      });
    }

    // Style the header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE0E0E0" },
    };

    // Generate and download the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("exportToExcel: Failed to export", error);
    // You might want to show a toast notification here if you have a toast system
  }
}

// Helper function to calculate column width based on column config and data
function calculateColumnWidth<T>(col: ExcelColumn<T>, data: T[]): number {
  if (col.width) return col.width;

  const headerWidth = col.header.length;
  const maxContentWidth = Math.max(
    ...data.map((row) => {
      const val = row[col.key];
      return val ? String(val).length : 0;
    })
  );

  // Add padding and return (ExcelJS uses character width)
  return Math.min(Math.max(headerWidth, maxContentWidth) + 2, 50);
}

// Helper function to auto-calculate column width
function calculateAutoColumnWidth<T>(key: string, data: T[]): number {
  const maxContentWidth = Math.max(
    key.length,
    ...data.map((row) => {
      // @ts-ignore - we know row is an object
      const val = row[key];
      return val ? String(val).length : 0;
    })
  );

  // Add padding and return (ExcelJS uses character width)
  return Math.min(maxContentWidth + 2, 50);
}

// import { exportToExcel } from '@/utils/exportToExcel';
// // Simple export
// await exportToExcel({
//   fileName: 'my-data',
//   data: myDataArray,
// });
// // Export with custom columns
// await exportToExcel({
//   fileName: 'customers',
//   sheetName: 'Customer List',
//   data: customers,
//   columns: [
//     { key: 'name', header: 'Customer Name', width: 30 },
//     { key: 'email', header: 'Email Address', width: 35 },
//     { key: 'phone', header: 'Phone', width: 15 },
//   ],
// });
