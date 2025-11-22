"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TriggerPage() {
  const [msg, setMsg] = useState("");

  const sendTrigger = async () => {
    await fetch("/api/control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ send: true }),
    });

    setMsg("Trigger dikirim!");

    // auto hilang setelah 2 detik
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={sendTrigger}
        className="px-6 py-4 bg-blue-600 text-white rounded-2xl shadow-md"
      >
        Trigger Kirim Data
      </motion.button>

      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
  );
}
