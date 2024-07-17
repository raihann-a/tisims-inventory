import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const LaporanStock = () => {
    const [laporanData, setLaporanData] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(10); // Default number of items to show
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [selectedType, setSelectedType] = useState(''); // State for selected type
    const [types, setTypes] = useState([]); // State for storing types

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/laporan-data');
                const result = await response.json();
                setLaporanData(result);

                // Get unique types from the result
                const uniqueTypes = [...new Set(result.map(item => item.type))];
                setTypes(uniqueTypes);
            } catch (error) {
                console.error('Error fetching laporan masuk data:', error);
            }
        };

        fetchData(); 
    }, []);

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('en-GB'); // Contoh format: 'DD/MM/YYYY'
    };

    const handleDateChange = (e) => {
        setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    // Filter data based on selected type
    const filteredData = selectedType 
        ? laporanData.filter(item => item.type === selectedType) 
        : laporanData;

    const handleExportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["No", "Tanggal", "Project", "Type", "Part Number", "Manufacture", "Jumlah Stock"];
        const tableRows = [];

        filteredData.slice(0, itemsToShow).forEach((item, index) => {
            const itemData = [
                index + 1,
                formatDate(item.transaction_date),
                item.project,
                item.type,
                item.batch_number,
                item.manufacture_brand,
                item.total_stock
            ];
            tableRows.push(itemData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Laporan Stock", 14, 15);
        doc.save(`laporan_stock_${new Date().toISOString()}.pdf`);
    };

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            filteredData.slice(0, itemsToShow).map((item, index) => ({
                No: index + 1,
                Tanggal: formatDate(item.transaction_date),
                Project: item.project,
                Type: item.type,
                "Part Number": item.batch_number,
                Manufacture: item.manufacture_brand,
                "Jumlah Stock": item.total_stock
            }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Laporan Stock");
        XLSX.writeFile(wb, `laporan_stock_${new Date().toISOString()}.xlsx`);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Laporan Stock</h1>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <label>Show</label>
                    <select value={itemsToShow} onChange={(e) => setItemsToShow(e.target.value)} className="border border-gray-300 rounded py-1 px-2">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <input type="date" name="start" value={dateRange.start} onChange={handleDateChange} className="border border-gray-300 rounded py-1 px-2 ml-2" />
                    <input type="date" name="end" value={dateRange.end} onChange={handleDateChange} className="border border-gray-300 rounded py-1 px-2 ml-2" />
                    <select value={selectedType} onChange={handleTypeChange} className="border border-gray-300 rounded py-1 px-2 ml-2">
                        <option value="">All Types</option>
                        {types.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={handleExportPDF} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
                        <FaFilePdf className="mr-2" /> Cetak PDF
                    </button>
                    <button onClick={handleExportExcel} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
                        <FaFileExcel className="mr-2" /> Export Excel
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-red-500 text-white">
                        <tr>
                            <th className="px-4 py-3 uppercase font-semibold text-sm">No</th>
                            <th className="px-4 py-3 uppercase font-semibold text-sm">Tanggal</th>
                            <th className="px-4 py-3 uppercase font-semibold text-sm">Sebagai</th>
                            <th className="px-4 py-3 uppercase font-semibold text-sm">Project</th>
                            <th className="px-4 py-3 uppercase font-semibold text-sm">Type</th>
                            <th className="px-4 py-3 uppercase font-semibold text-sm">Part Number</th>
                            <th className="px-4 py-3 uppercase font-semibold text-sm">Manufacture</th>
                            <th className="px-4 py-3 uppercase font-semibold text-sm">Jumlah Stock</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredData.slice(0, itemsToShow).map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{formatDate(item.transaction_date)}</td>
                                <td className="px-4 py-3">{(item.sebagai)}</td>
                                <td className="px-4 py-3">{item.project}</td>
                                <td className="px-4 py-3">{item.type}</td>
                                <td className="px-4 py-3">{item.batch_number}</td>
                                <td className="px-4 py-3">{item.manufacture_brand}</td>
                                <td className="px-4 py-3">{item.total_stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LaporanStock;
