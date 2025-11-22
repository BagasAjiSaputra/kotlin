"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LogItem {
  id: number;
  time: string;
  soil: number;
  humidity: number;
  temperature: number;
}

export default function ForecastPage() {
  const [history, setHistory] = useState<LogItem[]>([]);
  const [prediction, setPrediction] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Ubah endpoint ke API baru (sensorlog2)
      const res = await fetch("/api/data/latest");
      const json = await res.json();
      setHistory(json.history);

      if (json.history.length > 0) {
        calculateKnn(json.history);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // -------------------------
  // SIMPLE KNN REGRESSION
  // -------------------------
  function calculateKnn(data: LogItem[]) {
    const k = 3;
    const targetSoil = 60;
    const secPerPercent = 0.1;

    const latest = data[0];

    const distances = data.map((item) => {
      const dist = Math.sqrt(
        Math.pow(item.soil - latest.soil, 2) +
          Math.pow(item.humidity - latest.humidity, 2) +
          Math.pow(item.temperature - latest.temperature, 2)
      );

      return { ...item, dist };
    });

    distances.sort((a, b) => a.dist - b.dist);
    const nearest = distances.slice(0, k);

    const avgSoil = nearest.reduce((sum, v) => sum + v.soil, 0) / k;

    let duration = (targetSoil - avgSoil) * secPerPercent;
    if (duration < 0) duration = 0;

    setPrediction(Number(duration.toFixed(2)));
  }

  // convert time to readable label
  const chartData = history
    .map((d) => ({
      ...d,
      label: new Date(d.time).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }))
    .reverse(); // ascending biar grafik urut

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-xl flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-center">
          Grafik Sensor + Forecast (KNN)
        </h1>

        {prediction !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-green-50 rounded-xl text-center shadow-sm"
          >
            <p className="text-gray-600 text-sm">Durasi Siram yang Disarankan</p>
            <p className="text-3xl font-bold text-green-700">
              {prediction} detik
            </p>
          </motion.div>
        )}

        {/* ----------------- CHART ----------------- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-72 bg-gray-50 p-4 rounded-xl border shadow-inner"
        >
          <h2 className="font-semibold mb-2 text-blue-700">Soil (%)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="soil"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-72 bg-gray-50 p-4 rounded-xl border shadow-inner"
        >
          <h2 className="font-semibold mb-2 text-green-700">Humidity (%)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-72 bg-gray-50 p-4 rounded-xl border shadow-inner"
        >
          <h2 className="font-semibold mb-2 text-orange-600">Temperature (°C)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#f97316"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ----------------- HISTORY LIST ----------------- */}
        <div className="flex flex-col gap-4">
          {history.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
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
      </motion.div>
    </div>
  );
}
