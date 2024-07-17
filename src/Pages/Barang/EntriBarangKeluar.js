import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EntriBarangKeluar = () => {
  const [formData, setFormData] = useState({
    products_id: '',
    amount: '',
    project: '',
    transaction_date: '',
    sebagai: ''
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    try {
      const response = await fetch('http://localhost:3001/insertBarangKeluar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          alert('Data berhasil ditambahkan');
        } else {
          alert('Gagal menambahkan data');
        }
      } else {
        alert('Gagal menambahkan data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menambahkan data');
    }
    navigate('/barang-keluar');
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Entri Data Barang Keluar</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <label htmlFor="products_id" className="block text-sm font-medium text-gray-700">ID Produk:</label>
            <select 
              name="products_id" 
              id="products_id" 
              value={formData.products_id} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none"
            >
              <option value="">Pilih Produk</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {`${product.category} / ${product.type} / ${product.batch_number} / ${product.manufacture_brand}`}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label htmlFor="transaction_date" className="block text-sm font-medium text-gray-700">Tanggal Transaksi:</label>
            <input 
              type="date" 
              name="transaction_date" 
              id="transaction_date" 
              value={formData.transaction_date} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none" 
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Jumlah:</label>
          <input 
            type="number" 
            name="amount" 
            id="amount" 
            value={formData.amount} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="project" className="block text-sm font-medium text-gray-700">Proyek:</label>
          <input 
            type="text" 
            name="project" 
            id="project" 
            value={formData.project} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sebagai" className="block text-sm font-medium text-gray-700">Sebagai:</label>
          <select
            name="sebagai"
            id="sebagai"
            value={formData.sebagai}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none"
          >
            <option value="">Pilih Salah Satu</option>
            <option value="Staff">Staff</option>
            <option value="Supplier">Supplier</option>
          </select>
        </div>
        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default EntriBarangKeluar;
