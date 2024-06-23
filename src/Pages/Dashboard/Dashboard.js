import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Card from '../../components/Card';
import Table from '../../components/Table';
import SearchBar from '../../components/Searchbar';
import Profile from '../../components/Profile';
import { FaTruckLoading, FaTruckMoving, FaBoxes, FaWarehouse } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [barangMasuk, setBarangMasuk] = useState('');
  const [barangKeluar, setBarangKeluar] = useState('');
  const [jenisBarang, setJenisBarang] = useState('');
  const [stokBarang, setStokBarang] = useState('');
  const [laporanMasuk, setLaporan] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMasuk = await fetch('http://localhost:3001/barangMasuk');
        const dataMasuk = await responseMasuk.json();
        setBarangMasuk(dataMasuk.totalAmount);

        const responseKeluar = await fetch('http://localhost:3001/barangKeluar');
        const dataKeluar = await responseKeluar.json();
        setBarangKeluar(dataKeluar.totalAmount);

        const responseJenisBarang = await fetch('http://localhost:3001/jenisBarang');
        const dataJenisBarang = await responseJenisBarang.json();
        setJenisBarang(dataJenisBarang.totalJenis);

        const responseStokBarang = await fetch('http://localhost:3001/stokBarang');
        const dataStokBarang = await responseStokBarang.json();
        setStokBarang(dataStokBarang.totalStok);

        const responseLaporanStok = await fetch('http://localhost:3001/api/laporan-masuk');
        const dataLaporan = await responseLaporanStok.json();
        setLaporan(dataLaporan);

        const responseChart = await fetch('http://localhost:3001/api/types');
        const dataChart = await responseChart.json();
        setChartData({
          labels: dataChart.map(item => item.type),
          datasets: [
            {
              label: 'Current Stock',
              data: dataChart.map(item => item.currentStock),
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Component Stock Levels',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <SearchBar onSearch={value => console.log(value)} />
        <Profile />
      </div>
      <div className="mb-6 max-w-4xl mx-auto">
        <Bar data={chartData} options={options} />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card 
          title="Barang Masuk" 
          data={`${barangMasuk} unit`} 
          icon={<FaTruckLoading size="3em" className="text-green-500" />}
        />
        <Card 
          title="Barang Keluar" 
          data={`${barangKeluar} unit`} 
          icon={<FaTruckMoving size="3em" className="text-red-500" />}
        />
        <Card 
          title="Jenis Barang" 
          data={`${jenisBarang} jenis`} 
          icon={<FaBoxes size="3em" className="text-blue-500" />}
        />
        <Card 
          title="Stok Barang" 
          data={`${stokBarang} unit`} 
          icon={<FaWarehouse size="3em" className="text-yellow-500" />}
        />
      </div>
      <div className="mt-6">
        <Table data={laporanMasuk} />
      </div>
    </div>
  );
}

export default Dashboard;
