"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AccountPage() {
  const [pin, setPin] = useState("");
  const [recovery, setRecovery] = useState("");
  const [status, setStatus] = useState("");

  const updatePIN = async () => {
    const res = await fetch("/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  const updateRecovery = async () => {
    const res = await fetch("/api/account/recovery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recovery }),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-xl mx-auto space-y-6"
    >
      <h1 className="text-2xl font-semibold">Account Setting</h1>

      {/* PIN */}
      <div className="grid gap-2">
        <label className="text-sm">Update PIN</label>
        <input
          type="password"
          className="border p-2 rounded-lg"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={updatePIN}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Kirim PIN
        </motion.button>
      </div>

      {/* Recovery */}
      <div className="grid gap-2">
        <label className="text-sm">Update Recovery Code</label>
        <input
          type="text"
          className="border p-2 rounded-lg"
          value={recovery}
          onChange={(e) => setRecovery(e.target.value)}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={updateRecovery}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Kirim Recovery
        </motion.button>
      </div>

      {status && <p className="text-sm text-gray-600 mt-4">{status}</p>}
    </motion.div>
  );
}
