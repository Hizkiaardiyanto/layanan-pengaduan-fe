// src/components/ProfileUser.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileUser: React.FC = () => {
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    bio: string;
    created_at: string;
    updated_at: string;
  } | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Anda belum login!');
        return;
      }

      try {
        const response = await axios.get('https://layanan-pengaduan-be.vercel.app/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setUserData(response.data);
      } catch (error: any) {
        console.error(error);
        if (error.response?.status === 401) {
          setMessage('Unauthorized: Silakan login ulang.');
        } else {
          setMessage('Gagal mengambil data profil.');
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profil Pengguna</h2>

        {message && (
          <p className="mb-4 text-center text-red-600 text-sm">{message}</p>
        )}

        {userData && (
          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold">Username:</span> {userData.username}</p>
            <p><span className="font-semibold">Email:</span> {userData.email}</p>
            <p><span className="font-semibold">Dibuat:</span> {new Date(userData.created_at).toLocaleString()}</p>
            <p><span className="font-semibold">Diperbarui:</span> {new Date(userData.updated_at).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
