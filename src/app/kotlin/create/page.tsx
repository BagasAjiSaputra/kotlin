"use client";
import { useState } from "react";

export default function CreateIotPage() {
  const [moisture, setMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/iot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moisture, temperature }),
    });
    const data = await res.json();
    setMessage(res.ok ? "Data berhasil ditambahkan!" : data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">Tambah Data Sensor</h1>
        <input
          type="text"
          placeholder="Moisture"
          value={moisture}
          onChange={(e) => setMoisture(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />
        <input
          type="text"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Tambahkan
        </button>
        {message && <p className="text-center text-sm mt-3 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
