import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/AuthForm';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import ItemsData from './Pages/Items/ItemsData';
import EntriItemsData from './Pages/Items/EntriItemsData';
import ItemsType from './Pages/Items/ItemsType';
import EntriItemsType from './Pages/Items/EntriItemsType';
import ItemDescription from './Pages/Items/ItemDescription';
import BarangMasuk from './Pages/Barang/BarangMasuk';
import EntriBarangMasuk from './Pages/Barang/EntriBarangMasuk';
import BarangKeluar from './Pages/Barang/BarangKeluar';
import EntriBarangKeluar from './Pages/Barang/EntriBarangKeluar';
import LaporanStock from './Pages/Laporan/LaporanStock';
import LaporanBarangMasuk from './Pages/Laporan/LaporanBarangMasuk';
import LaporanBarangKeluar from './Pages/Laporan/LaporanBarangKeluar';
import ManajemenUser from './Pages/Manajemen User/ManajemenUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<WithSidebar><Dashboard /></WithSidebar>} />
        <Route path="/items-data" element={<WithSidebar><ItemsData /> </WithSidebar> } />
        <Route path="/entri-items-data"element={<WithSidebar><EntriItemsData /></WithSidebar>} />
        <Route path="/items-type" element={<WithSidebar><ItemsType /> </WithSidebar> } />
        <Route path="/entri-items-type"element={<WithSidebar><EntriItemsType /></WithSidebar>} />
        <Route path="/item-description/:id" element={<WithSidebar><ItemDescription /></WithSidebar>} />
        <Route path="/barang-masuk" element={<WithSidebar><BarangMasuk /></WithSidebar>} />
        <Route path="/entri-barang-masuk" element={<WithSidebar><EntriBarangMasuk /></WithSidebar>} />
        <Route path="/barang-keluar" element={<WithSidebar><BarangKeluar /></WithSidebar>} />
        <Route path="/entri-barang-keluar" element={<WithSidebar><EntriBarangKeluar /></WithSidebar>} />
        <Route path='/laporan-stock'element={<WithSidebar><LaporanStock /></WithSidebar>} />
        <Route path='/laporan-barang-masuk'element={<WithSidebar><LaporanBarangMasuk /></WithSidebar>} />
        <Route path='/laporan-barang-keluar'element={<WithSidebar><LaporanBarangKeluar /></WithSidebar>} />
        <Route path="/manajemen-user" element={<WithSidebar><ManajemenUser /></WithSidebar>} />
      </Routes>
    </Router>
  );
};

const WithSidebar = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <main className="flex-grow">
      {children}
    </main>
  </div>
);

export default App;
