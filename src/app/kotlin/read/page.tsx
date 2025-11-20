"use client";
import { useEffect, useState } from "react";

export default function ReadIotPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/iot")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      <h1 className="text-xl font-semibold mb-4">Data Monitoring Hidroponik</h1>
      <table className="w-full max-w-3xl bg-white rounded-2xl shadow-md">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Moisture</th>
            <th className="p-3">Temperature</th>
            <th className="p-3">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.moisture}</td>
              <td className="p-3">{item.temperature}</td>
              <td className="p-3">{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
