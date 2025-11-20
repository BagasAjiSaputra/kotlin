"use client";
import { useState } from "react";

export default function UpdateIotPage() {
  const [id, setId] = useState("");
  const [moisture, setMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Fungsi buat random nilai sensor
  const handleCalibrate = () => {
    const randomMoisture = (Math.random() * 100).toFixed(2); // 0 - 100 %
    const randomTemperature = (20 + Math.random() * 15).toFixed(2); // 20 - 35 °C
    setMoisture(randomMoisture);
    setTemperature(randomTemperature);
    setMessage("Sensor dikalibrasi otomatis!");
  };

  // 🔹 Fungsi untuk update data ke API
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/iot?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moisture, temperature }),
    });
    const data = await res.json();
    setMessage(res.ok ? "Data berhasil diupdate!" : data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">
          Update Data Sensor
        </h1>

        <input
          type="text"
          placeholder="ID Data"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        <input
          type="text"
          placeholder="Moisture Baru"
          value={moisture}
          onChange={(e) => setMoisture(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        <input
          type="text"
          placeholder="Temperature Baru"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        {/* 🔹 Tombol Kalibrasi */}
        <button
          type="button"
          onClick={handleCalibrate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
        >
          Kalibrasi Otomatis
        </button>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          Update
        </button>

        {message && (
          <p className="text-center text-sm mt-3 text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
}
