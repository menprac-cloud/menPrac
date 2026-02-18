"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SUCCESS_URL =
  "https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json";

const FORMSPREE_URL = "https://formspree.io/f/xdaldzop";

const BRAND = {
  dark: "#0B0F2F",
  primary: "#4F2DFF",
  secondary: "#6C63FF",
  glass: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.12)",
};

function useLottieData(url: string) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [url]);
  return data;
}

export default function Waitlist() {
  const successAnim = useLottieData(SUCCESS_URL);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    clinic: "",
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, type: "success" });

  const inputStyle = {
    width: "100%",
    padding: "16px 18px",
    borderRadius: 14,
    border: `1px solid ${BRAND.border}`,
    background: BRAND.glass,
    color: "white",
    fontSize: 16,
    outline: "none",
  };

  // 🎉 confetti
  const fireConfetti = async () => {
    const confetti = (await import("canvas-confetti")).default;
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 } });
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  // 🚀 FORM SUBMIT → FORMSPREE
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      await fireConfetti();

      setModal({ show: true, type: "success" });
      setForm({ name: "", email: "", role: "", clinic: "" });
    } catch {
      setModal({ show: true, type: "error" });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (modal.show) {
      const timer = setTimeout(() => setModal({ ...modal, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [modal]);

  const fieldAnim = {
    hidden: { opacity: 0, y: 25 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12 },
    }),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.dark,
        padding: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🌈 animated glow background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #4F2DFF55, #6C63FF22, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: 520,
          padding: 40,
          borderRadius: 28,
          background: BRAND.glass,
          border: `1px solid ${BRAND.border}`,
          backdropFilter: "blur(14px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          color: "white",
          position: "relative",
        }}
      >
        {/* ✨ animated heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 34, fontWeight: 800, textAlign: "center" }}
        >
          Join Early Access
        </motion.h2>

        <div style={{ marginTop: 30, display: "grid", gap: 16 }}>
          {["name", "email", "role", "clinic"].map((field, i) => (
            <motion.div
              key={field}
              variants={fieldAnim}
              initial="hidden"
              animate="show"
              custom={i}
            >
              {field === "role" ? (
                <select
                  required
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                  style={inputStyle}
                >
                  <option value="">Select Professional Role</option>
                  <option>Pediatrics</option>
                  <option>Dentist</option>
                  <option>Therapist</option>
                  <option>Physical (PT)</option>
                  <option>Speech (SLP)</option>
                  <option>Occupational (OT)</option>
                </select>
              ) : (
                <input
                  required={field !== "clinic"}
                  placeholder={
                    field === "name"
                      ? "Full Name"
                      : field === "email"
                      ? "Institutional Email"
                      : "Clinic / Organization"
                  }
                  value={(form as any)[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  style={inputStyle}
                />
              )}
            </motion.div>
          ))}

          {/* 🚀 animated button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            style={{
              padding: "18px",
              borderRadius: 16,
              border: "none",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              background: `linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
              color: "white",
            }}
          >
            {loading ? "Submitting..." : "Request Access"}
          </motion.button>

          <Link href="/" style={{ textAlign: "center", opacity: 0.6 }}>
            ← Back to homepage
          </Link>
        </div>
      </motion.form>

      {/* 🎉 SUCCESS MODAL */}
      <AnimatePresence>
        {modal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: "#13174B",
                padding: 40,
                borderRadius: 30,
                textAlign: "center",
                width: "90%",
                maxWidth: 420,
              }}
            >
              {successAnim && <Lottie animationData={successAnim} loop={false} />}
              <h3 style={{ fontSize: 26, fontWeight: 800 }}>
                🎉 You're on the waitlist!
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
