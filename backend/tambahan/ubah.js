import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarangKeluar from './BarangKeluar';
import EntriBarangKeluar from './EntriBarangKeluar';
import UpdateItem from './UpdateItem';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BarangKeluar />} />
        <Route path="/entri-barang-keluar" element={<EntriBarangKeluar />} />
        <Route path="/update-item/:id" element={<UpdateItem />} />
      </Routes>
    </Router>
  );
};

export default App;
