"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [recovery, setRecovery] = useState("");
  const [step, setStep] = useState<"pin" | "recovery">("pin");
  const [msg, setMsg] = useState("");

  const keypad = ["1","2","3","4","5","6","7","8","9","0"];

  const pressKey = (num: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
    }
  };

  const erase = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const submitPin = async () => {
    if (pin.length !== 6) {
      setMsg("PIN harus 6 digit");
      return;
    }

    const res = await fetch("/api/account/verify/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/");
    } else {
      setMsg("PIN salah! Gunakan recovery code");
      setStep("recovery");
      setPin("");
    }
  };

const submitRecovery = async () => {
  const res = await fetch("/api/account/verify/recovery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: recovery, newPin: "000000" }), // atau kosong dulu
  });

  const data = await res.json();

  if (data.success) {
    router.push("/");
  } else {
    setMsg(data.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg border"
      >
        <h1 className="text-xl font-semibold text-center mb-4">
          {step === "pin" ? "Masukkan PIN" : "Recovery Code"}
        </h1>

        {/* ---------- PIN SCREEN ---------- */}
        {step === "pin" && (
          <>
            {/* PIN DOTS */}
            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full border ${
                    pin.length > i ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* KEYPAD */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {keypad.slice(0, 9).map((n) => (
                <motion.button
                  key={n}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => pressKey(n)}
                  className="p-4 bg-gray-100 rounded-xl text-xl font-medium"
                >
                  {n}
                </motion.button>
              ))}

              {/* EMPTY BOX */}
              <div></div>

              {/* KEY 0 */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => pressKey("0")}
                className="p-4 bg-gray-100 rounded-xl text-xl font-medium"
              >
                0
              </motion.button>

              {/* DELETE */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={erase}
                className="p-4 bg-red-100 text-red-600 rounded-xl font-medium"
              >
                Del
              </motion.button>
            </div>

            {/* SUBMIT */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={submitPin}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              Masuk
            </motion.button>

            {/* LUPA PIN */}
            <button
              onClick={() => setStep("recovery")}
              className="w-full text-blue-600 text-sm mt-3 underline"
            >
              Lupa PIN?
            </button>
          </>
        )}

        {/* ---------- RECOVERY SCREEN ---------- */}
        {step === "recovery" && (
          <>
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              type="text"
              className="w-full p-3 border rounded-xl mb-3 text-center"
              placeholder="Masukkan recovery code"
              value={recovery}
              onChange={(e) => setRecovery(e.target.value)}
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={submitRecovery}
              className="w-full bg-blue-600 text-white py-3 rounded-xl"
            >
              Recovery & Masuk
            </motion.button>

            {/* Kembali ke PIN */}
            <button
              onClick={() => setStep("pin")}
              className="w-full text-gray-600 text-sm mt-3 underline"
            >
              Kembali ke PIN
            </button>
          </>
        )}

        {msg && <p className="text-center text-red-500 text-sm mt-3">{msg}</p>}
      </motion.div>
    </div>
  );
}
