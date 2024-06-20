import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaChartLine, FaCog, FaWarehouse } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function Sidebar() {
  const [isTransaksiOpen, setTransaksiOpen] = useState(false);
  const [isLaporanOpen, setLaporanOpen] = useState(false);
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [isPengaturanOpen, setIsPengaturanOpen] = useState(false);

  const toggleTransaksi = (event) => {
    event.stopPropagation();
    setTransaksiOpen(!isTransaksiOpen);
  };

  const toggleLaporan = (event) => {
    event.stopPropagation();
    setLaporanOpen(!isLaporanOpen);
  };

  const toggleMaster = (event) => {
    event.stopPropagation();
    setIsMasterOpen(!isMasterOpen);
  };

  const togglePengaturan = (event) => {
    event.stopPropagation();
    setIsPengaturanOpen(!isPengaturanOpen);
  };

  return (
    <div className="w-64 bg-white text-gray-800 shadow-md">
    <div className="p-5 border-b border-gray-300 text-center">
      <img src="Logo TSM.png" alt="Logo TSM" className="mb-4 mx-auto w-20" />
    </div>
      <ul>
        <li className="p-4 hover:bg-gray-100">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <FaHome className="text-lg" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="p-3 hover:bg-gray-100" onClick={toggleMaster}>
  <div className="flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <FaBoxOpen className="text-lg" />
      <span>Master</span>
    </div>
    {isMasterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
  </div>
  {isMasterOpen && (
    <ul className="ml-4 mt-2">
      <li className="p-2 hover:bg-gray-200" onClick={(e) => e.stopPropagation()}>
        <Link to="/items-data">Items Data</Link>
      </li>
      <li className="p-2 hover:bg-gray-200" onClick={(e) => e.stopPropagation()}>
        <Link to="/items-type">Items Type</Link>
      </li>
    </ul>
  )}
</li>
        <li className="p-3 hover:bg-gray-100" onClick={toggleTransaksi}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              < FaWarehouse className="text-lg" />
              <span>Transaksi</span>
            </div>
            {isTransaksiOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isTransaksiOpen && (
            <ul className="ml-4 mt-2">
              <li className="p-2 hover:bg-gray-200">
                <Link to="/barang-masuk">Barang Masuk</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/barang-keluar">Barang Keluar</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="p-3 hover:bg-gray-100" onClick={toggleLaporan}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaChartLine className="text-lg" />
              <span>Laporan</span>
            </div>
            {isLaporanOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isLaporanOpen && (
            <ul className="ml-4 mt-2">
              <li className="p-2 hover:bg-gray-200">
                <Link to="/laporan-stock">Laporan Stock</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/laporan-barang-masuk">Laporan Barang Masuk</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/laporan-barang-keluar">Laporan Barang Keluar</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="p-3 hover:bg-gray-100" onClick={togglePengaturan}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaCog className="text-lg" />
              <span>Pengaturan</span>
            </div>
            {isPengaturanOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isPengaturanOpen && (
            <ul className="ml-4 mt-2">
              <li className="p-2 hover:bg-gray-200">
                <Link to="/manajemen-user">Manajemen User</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
