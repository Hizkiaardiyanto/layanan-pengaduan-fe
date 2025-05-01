import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData({
          totalPengaduan: 120,
          pengaduanTertunda: 15,
          pengaduanSelesai: 100,
          pengaduanDitolak: 5,
        });
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen text-gray-800 flex items-center justify-center px-6 py-12 bg-cover bg-center"
      style={{
        backgroundImage: `url('')`,
      }}
    >
      <div className="bg-white bg-opacity-10 p-10 rounded-xl shadow-xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold">
          <span className="text-gray-900">Website</span>{' '}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Pengaduan
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          Ajukan pengaduan, pantau statusnya, dan kelola proses penyelesaiannya di satu tempat.
        </p>

        <a
          href="/pengaduan"
          className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-medium rounded-full hover:opacity-90 transition"
        >
          Ajukan Pengaduan
        </a>

        <div className="mt-6 text-purple-600 text-6xl"></div>
      </div>
    </div>
  );
};

export default Dashboard;
