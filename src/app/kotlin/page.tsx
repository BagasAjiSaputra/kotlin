'use client';

import { useEffect, useState } from 'react';

type IotData = {
  id: number;
  moisture: string;
  temperature: string;
};

export default function HomePage() {
  const [data, setData] = useState<IotData[]>([]);
  const [moisture, setMoisture] = useState('');
  const [temperature, setTemperature] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  // ambil data semua
  const fetchData = async () => {
    const res = await fetch('/api/iot');
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // tambah data
  const addData = async () => {
    if (!moisture || !temperature) return;
    await fetch('/api/iot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moisture, temperature }),
    });
    setMoisture('');
    setTemperature('');
    fetchData();
  };

  // mulai edit data
  const startEdit = (item: IotData) => {
    setEditId(item.id);
    setMoisture(item.moisture);
    setTemperature(item.temperature);
  };

  // update data
  const updateData = async () => {
    if (editId === null) return;
    await fetch(`/api/iot/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moisture, temperature }),
    });
    setMoisture('');
    setTemperature('');
    setEditId(null);
    fetchData();
  };

  // hapus data
  const deleteData = async (id: number) => {
    await fetch(`/api/iot/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">CRUD IoT Test Page</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Moisture"
          value={moisture}
          onChange={(e) => setMoisture(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="border p-2 flex-1"
        />
        {editId ? (
          <button
            onClick={updateData}
            className="bg-yellow-500 text-white px-4 py-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addData}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Add
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {data.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {item.moisture} - {item.temperature}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(item)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteData(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
