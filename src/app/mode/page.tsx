"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ModePage() {
  const [mode, setMode] = useState<"smart" | "manual">("manual");

  const [idle, setIdle] = useState(0); // detik
  const [sleep, setSleep] = useState(0); // detik
  const [duration, setDuration] = useState(0); // detik

  const [manualDuration, setManualDuration] = useState(0); // detik
  const [servoState, setServoState] = useState<"open" | "close">("close");

  const [loading, setLoading] = useState(false);

  // Fetch data awal
  useEffect(() => {
    fetch("/api/mode")
      .then((res) => res.json())
      .then((data) => {
        setMode(data.mode);
        setIdle(Math.floor(data.smart.idle / 1000)); // konversi ms → detik
        setSleep(Math.floor(data.smart.sleep / 1000));
        setDuration(Math.floor(data.smart.duration / 1000));
        setManualDuration(Math.floor(data.manual.duration / 1000));
        setServoState(data.manual.state);
      });
  }, []);

  // Update Smart
  const updateSmart = async () => {
    setLoading(true);

    await fetch("/api/mode", {
      method: "POST",
      body: JSON.stringify({
        mode: "smart",
        idle: idle * 1000, // konversi detik → ms
        sleep: sleep * 1000,
        duration: duration * 1000,
      }),
    });

    setLoading(false);
  };

  // Update Manual
  const updateManual = async (value: "open" | "close") => {
    setLoading(true);

    await fetch("/api/mode", {
      method: "POST",
      body: JSON.stringify({
        mode: "manual",
        servo: value,
        duration: manualDuration * 1000, // konversi detik → ms
      }),
    });

    setServoState(value);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg p-6 rounded-2xl bg-neutral-900 border border-neutral-800"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Mode Control
        </h1>

        {/* MODE SWITCH */}
        <div className="flex gap-4 justify-center mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode("smart")}
            className={`px-6 py-3 rounded-xl border ${
              mode === "smart"
                ? "bg-green-600 border-green-400"
                : "bg-neutral-800 border-neutral-700"
            }`}
          >
            Smart
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode("manual")}
            className={`px-6 py-3 rounded-xl border ${
              mode === "manual"
                ? "bg-blue-600 border-blue-400"
                : "bg-neutral-800 border-neutral-700"
            }`}
          >
            Manual
          </motion.button>
        </div>

        {/* SMART MODE UI */}
        {mode === "smart" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 space-y-4"
          >
            <div>
              <label className="text-sm text-neutral-400">Idle Time (s)</label>
              <input
                type="number"
                className="w-full mt-1 p-3 rounded-xl bg-neutral-800 border border-neutral-700"
                value={idle}
                onChange={(e) => setIdle(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400">Sleep Time (s)</label>
              <input
                type="number"
                className="w-full mt-1 p-3 rounded-xl bg-neutral-800 border border-neutral-700"
                value={sleep}
                onChange={(e) => setSleep(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400">
                Duration Watering (s)
              </label>
              <input
                type="number"
                className="w-full mt-1 p-3 rounded-xl bg-neutral-800 border border-neutral-700"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={updateSmart}
              className="w-full p-3 rounded-xl bg-green-600 hover:bg-green-500 transition"
            >
              Save Smart Mode Config
            </motion.button>
          </motion.div>
        )}

        {/* MANUAL MODE UI */}
        {mode === "manual" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 space-y-4"
          >
            <div>
              <label className="text-sm text-neutral-400">
                Manual Duration (s)
              </label>
              <input
                type="number"
                className="w-full mt-1 p-3 rounded-xl bg-neutral-800 border border-neutral-700"
                value={manualDuration}
                onChange={(e) => setManualDuration(Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateManual("open")}
                className={`p-4 rounded-xl border ${
                  servoState === "open"
                    ? "bg-green-600 border-green-400"
                    : "bg-neutral-800 border-neutral-700"
                }`}
              >
                ON
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateManual("close")}
                className={`p-4 rounded-xl border ${
                  servoState === "close"
                    ? "bg-red-600 border-red-400"
                    : "bg-neutral-800 border-neutral-700"
                }`}
              >
                OFF
              </motion.button>
            </div>
          </motion.div>
        )}

        {loading && (
          <p className="text-center mt-4 text-sm text-neutral-500">
            Processing...
          </p>
        )}
      </motion.div>
    </div>
  );
}