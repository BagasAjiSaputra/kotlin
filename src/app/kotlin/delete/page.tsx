"use client";
import { useState } from "react";

export default function DeleteIotPage() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/iot?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    setMessage(res.ok ? "Data berhasil dihapus!" : data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <form onSubmit={handleDelete} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">Hapus Data Sensor</h1>
        <input
          type="text"
          placeholder="Masukkan ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Hapus
        </button>
        {message && <p className="text-center text-sm mt-3 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
