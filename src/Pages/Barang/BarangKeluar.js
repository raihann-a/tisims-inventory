import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BarangKeluar = () => {
  const [barangKeluarData, setBarangKeluarData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/barang-keluar');
        const data = await response.json();
        setBarangKeluarData(data);
      } catch (error) {
        console.error('Error fetching barang keluar data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-GB'); // Contoh format: 'DD/MM/YYYY'
  };

  const handleAddEntry = () => {
    navigate('/entri-barang-keluar');  
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Barang Keluar</h1>
        <button onClick={handleAddEntry} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          + Entri Data
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">No</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Transaction ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Product ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Project</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tanggal Keluar</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Stock Keluar</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Stok Sekarang</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {barangKeluarData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="text-left py-3 px-4">{index + 1}</td>
                <td className="text-left py-3 px-4">{item.id}</td>
                <td className="text-left py-3 px-4">{item.products_id}</td>
                <td className="text-left py-3 px-4">{item.project}</td>
                <td className="text-left py-3 px-4">{item.type}</td>
                <td className="text-left py-3 px-4">{formatDate(item.transaction_date)}</td>
                <td className="text-left py-3 px-4">{item.amount}</td>
                <td className="text-left py-3 px-4">{item.total_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BarangKeluar;
