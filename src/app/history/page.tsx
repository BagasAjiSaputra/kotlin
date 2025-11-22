"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type HistoryItem = {
  id: number;
  time: string;
  soil: number;
  humidity: number;
  temperature: number;
};

export default function DataPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Ubah endpoint ke API baru sensorlog2
      const res = await fetch("/api/data/latest");
      const json = await res.json();

      if (json.success) {
        setHistory(json.history ?? []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">History Sensor</h1>

        {/* Loading State */}
        {loading && (
          <p className="text-gray-500 text-center animate-pulse">
            Mengambil data...
          </p>
        )}

        {/* No Data */}
        {!loading && history.length === 0 && (
          <p className="text-gray-500 text-center">Belum ada data...</p>
        )}

        {/* List Data */}
        {!loading && history.length > 0 && (
          <div className="flex flex-col gap-4">
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 bg-gray-50 rounded-xl shadow-sm border"
              >
                <p className="text-xs text-gray-500">
                  {new Date(item.time).toLocaleString()}
                </p>

                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Soil</p>
                    <p className="text-lg font-semibold text-blue-700">
                      {item.soil}%
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Humidity</p>
                    <p className="text-lg font-semibold text-green-700">
                      {item.humidity}%
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Temp</p>
                    <p className="text-lg font-semibold text-orange-700">
                      {item.temperature}°C
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
