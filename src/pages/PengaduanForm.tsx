// src/components/PengaduanForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const PengaduanForm: React.FC = () => {
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    kategori: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
  
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Anda belum login!');
      return;
    }

    try {
      axios.post('http://localhost:3000/api/form-pengaduan', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      
      setMessage('Pengaduan berhasil dikirim!');
      setFormData({ judul: '', isi: '', kategori: '' });
    } catch (error: any) {
      console.error(error);
      setMessage('Gagal mengirim pengaduan.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form Pengaduan</h2>

        <div className="mb-4">
          <label htmlFor="judul" className="block font-medium text-gray-700 mb-1">Judul</label>
          <input
            type="text"
            id="judul"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isi" className="block font-medium text-gray-700 mb-1">Isi</label>
          <textarea
            id="isi"
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="kategori" className="block font-medium text-gray-700 mb-1">Kategori</label>
          <input
            type="text"
            id="kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Kirim Pengaduan
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default PengaduanForm;