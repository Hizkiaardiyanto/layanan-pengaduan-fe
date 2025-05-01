import React, { useEffect, useState } from "react";
import axios from "axios";

interface Pengaduan {
  id: number;
  judul: string;
  isi: string;
  kategori: string;
  status: string;
  tanggalPengaduan: string;
}


const ManajemenPengaduan: React.FC = () => {
  const [pengaduanList, setPengaduanList] = useState<Pengaduan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:3000/api/manajemen-pengaduan",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      setPengaduanList(res.data);
    } catch (err) {
      console.error("Gagal mengambil data pengaduan", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const deletePengaduan = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }

    if (window.confirm("Yakin ingin menghapus pengaduan ini?")) {
      try {
        await axios.delete(
          `http://localhost:3000/api/manajemen-pengaduan/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          }
        );
        setPengaduanList((prev) => prev.filter((p) => p.id !== id)); // Menghapus dari state lokal
      } catch (err) {
        console.error("Gagal menghapus pengaduan", err);
      }
    }
  };

  if (loading) return <p>Memuat data...</p>;

  return (
<div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">
      <div className="w-full max-w-6xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manajemen Pengaduan</h1>

        {pengaduanList.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada pengaduan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-100 text-gray-800">
                  <th className="p-3 border text-left">No</th>
                  <th className="p-3 border text-left">Judul</th>
                  <th className="p-3 border text-left">Kategori</th>
                  <th className="p-3 border text-left">Status</th>
                  <th className="p-3 border text-left">Tanggal</th>
                  <th className="p-3 border text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pengaduanList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border text-center">{index + 1}</td>
                    <td className="p-3 border">{item.judul}</td>
                    <td className="p-3 border">{item.kategori}</td>
                    <td className="p-3 border">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Selesai"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Diproses"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 border">
                      {new Date(item.tanggalPengaduan).toLocaleDateString()}
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => deletePengaduan(item.id)}
                        className="text-sm text-red-600 hover:text-red-800 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManajemenPengaduan;