import React, { useState } from "react";
import { FiSearch, FiDownload, FiFileText, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const SecurityReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);

  // Mock Data - In production, replace with data from your Sequelize backend
  const reports = [
    { id: 1, visitor: "Jean Bosco", ref: "APT-26-001", dept: "FINANCE", type: "OFFICIAL", date: "2026-01-07", timeIn: "08:30", timeOut: "10:00" },
    { id: 2, visitor: "Alice Mutoni", ref: "APT-26-002", dept: "ACADEMICS", type: "VISITOR", date: "2026-01-07", timeIn: "09:15", timeOut: "11:30" },
    { id: 3, visitor: "Kevin Lee", ref: "APT-26-003", dept: "REGISTRAR", type: "CONTRACTOR", date: "2026-01-06", timeIn: "07:00", timeOut: "16:00" },
    // ... add more mock items
  ];

  // --- EXPORT LOGIC ---
  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("RP Security Access Report", 14, 15);
    doc.setFontSize(11);
    doc.setTextColor(100);
    
    // Use autoTable function directly instead of doc.autoTable
    const tableColumn = ["Visitor", "Ref", "Department", "Date", "In", "Out"];
    const tableRows = reports.map(r => [
      r.visitor, 
      r.ref, 
      r.dept, 
      r.date, 
      r.timeIn, 
      r.timeOut || "N/A"
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: 'grid',
      headStyles: { fillColor: [0, 102, 204] }, // Your RP Blue color
    });

    doc.save(`Security_Report_${new Date().getTime()}.pdf`);
  };


  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reports);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "Security_Report.xlsx");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="title">Reports</h2>
        <div className="flex gap-2">
          <button onClick={exportExcel} className="button-7 flex items-center gap-2 bg-green-600 text-white px-4 py-2 ">
            <FiDownload /> Excel
          </button>
          <button onClick={exportPDF} className="button-7 flex items-center gap-2 bg-red-500 text-white px-4 py-2 ">
            <FiFileText /> PDF
          </button>
        </div>
      </div>

      {/* --- FILTERS --- */}
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
  <div className="flex flex-col gap-4 md:flex-row md:items-end">

    {/* Search */}
    <div className="flex-1">
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search...."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black/10 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    {/* Date range */}
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Date range
      </label>
      <div className="flex items-center gap-2">
        <input
          type="date"
          className="flex-1 px-3 py-2.5 placeholder:text-sm placeholder:text-gray-500 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-black/10 focus:outline-none"
          onChange={(e) =>
            setDateRange({ ...dateRange, from: e.target.value })
          }
        />
        <span className="text-gray-400 text-sm">—</span>
        <input
          type="date"
          className="flex-1 px-3 py-2.5 rounded-xl placeholder:text-sm placeholder:text-gray-500 bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-black/10 focus:outline-none"
          onChange={(e) =>
            setDateRange({ ...dateRange, to: e.target.value })
          }
        />
      </div>
    </div>

    {/* Button */}
    <div>
        <button className="button-7 bg-secondary flex items-center py-2 px-3 gap-2 text-white text-sm">
            <FiFilter />
            Apply
        </button>
    </div>
  </div>
</div>
 
      {/* --- TABLE --- */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Visitor</th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Department</th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Time In/Out</th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {reports.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-700">
                    {row.visitor}
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{row.ref}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-rp px-2 py-1 rounded-lg text-[10px] font-black">{row.dept}</span>
                  </td>
                  <td className="p-4 text-gray-500 font-medium">{row.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-green-600 font-bold">{row.timeIn}</span>
                      <span className="text-gray-300">→</span>
                      <span className="text-red-400 font-bold">{row.timeOut || "--:--"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black">COMPLETED</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        <div className="p-4 bg-gray-50 flex items-center justify-between border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400">Showing 1-10 of 128 results</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-rp transition-all active:scale-90">
              <FiChevronLeft />
            </button>
            <button className="p-2 rounded-xl bg-rp text-white font-bold px-4 text-xs">1</button>
            <button className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 text-xs">2</button>
            <button className="p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-rp transition-all active:scale-90">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityReportsPage;