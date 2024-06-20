// komponen tabel tapi lupa di taroh di pages mana
import React from 'react';

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm bg-white">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">No</th>
            <th scope="col" className="px-6 py-3 text-left">ID Transaksi</th>
            <th scope="col" className="px-6 py-3 text-left">Date In</th>
            <th scope="col" className="px-6 py-3 text-left">Type</th>
            <th scope="col" className="px-6 py-3 text-left">Stok In</th>
            <th scope="col" className="px-6 py-3 text-left">Total Stok</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{item.transactionId}</td>
              <td className="px-6 py-4">{item.dateIn}</td>
              <td className="px-6 py-4">{item.type}</td>
              <td className="px-6 py-4">{item.stockIn}</td>
              <td className="px-6 py-4">{item.totalStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
