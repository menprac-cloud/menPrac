"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const HERO_URL = "https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json";
const FEATURES_LOTTIE = "https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json";
const BENEFITS_LOTTIE = "https://assets2.lottiefiles.com/packages/lf20_x62chJ.json";
const CTA_LOTTIE = "https://assets10.lottiefiles.com/packages/lf20_touohxv0.json";

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
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [url]);
  return data;
}

/* FIXED BACKGROUND GLOW (no click blocking) */
function GlowBg() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      style={{
        position: "fixed",
        width: 900,
        height: 900,
        borderRadius: "50%",
        background:
          "radial-gradient(circle,#4F2DFF55,#6C63FF22,transparent 70%)",
        filter: "blur(120px)",
        top: -200,
        left: -200,
        zIndex: 0,
        pointerEvents: "none", // 🔥 IMPORTANT FIX
      }}
    />
  );
}

export default function Landing() {
  const heroAnim = useLottieData(HERO_URL);
  const featuresAnim = useLottieData(FEATURES_LOTTIE);
  const benefitsAnim = useLottieData(BENEFITS_LOTTIE);
  const ctaAnim = useLottieData(CTA_LOTTIE);

  const reveal = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      style={{
        background: BRAND.dark,
        color: "white",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <GlowBg />

      {/* MAIN CONTENT WRAPPER */}
      <div style={{ position: "relative", zIndex: 2 }}>

        {/* NAVBAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 24px",
            maxWidth: "1200px",
            margin: "auto",
            position: "sticky",
            top: 0,
            backdropFilter: "blur(10px)",
            background: "rgba(11,15,47,0.6)",
            zIndex: 10,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <Image
              src="/logo.png"
              alt="MenPrac Logo"
              width={42}
              height={42}
              priority
            />
            <h1 style={{ fontSize: 20, fontWeight: 700 }}></h1>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <Link
              href="/waitlist"
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                fontWeight: 600,
                background: `linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
                color: "white",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Join Waitlist
            </Link>
          </motion.div>
        </div>

        {/* HERO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 60,
            alignItems: "center",
            padding: "80px 24px",
            maxWidth: 1200,
            margin: "auto",
          }}
        >
          <motion.div initial="hidden" animate="visible" variants={reveal}>
            <h2
              style={{
                fontSize: 44,
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Precision in Practice.
            </h2>

            <p
              style={{
                opacity: 0.7,
                fontSize: 18,
                marginTop: 20,
                maxWidth: 520,
              }}
            >
              Smarter Systems for Medical Health Professionals.
            </p>

            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/waitlist"
                style={{
                  display: "inline-block",
                  marginTop: 40,
                  padding: "16px 32px",
                  borderRadius: 14,
                  fontSize: 16,
                  fontWeight: 700,
                  background: `linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Request Early Access
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {heroAnim && <Lottie animationData={heroAnim} loop />}
          </motion.div>
        </div>

        {/* FEATURES */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ padding: "100px 24px", maxWidth: 1200, margin: "auto" }}
        >
          {featuresAnim && (
            <div style={{ maxWidth: 280, margin: "auto" }}>
              <Lottie animationData={featuresAnim} loop />
            </div>
          )}

          <h3
            style={{
              fontSize: 32,
              fontWeight: 700,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Features
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(240px,1fr))",
              gap: 24,
              marginTop: 50,
            }}
          >
            {[
              "AI Clinical Documentation",
              "Predictive No-Show Intelligence",
              "Revenue Optimization Engine",
              "HIPAA-Ready Infrastructure",
              "Multi-Location Control Center",
              "Real-Time Analytics",
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.03 }}
                style={{
                  background: BRAND.glass,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 20,
                  padding: 24,
                }}
              >
                <h4 style={{ fontSize: 18, fontWeight: 600 }}>
                  {feature}
                </h4>
                <p style={{ opacity: 0.6, marginTop: 10 }}>
                  Designed to reduce operational friction and improve
                  outcomes.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FINAL CTA */}
        <div style={{ textAlign: "center", padding: "120px 20px" }}>
          {ctaAnim && (
            <div style={{ maxWidth: 220, margin: "auto" }}>
              <Lottie animationData={ctaAnim} loop />
            </div>
          )}

          <h3 style={{ fontSize: 36, fontWeight: 800 }}>
            Ready for the upgrade?
          </h3>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/waitlist"
              style={{
                display: "inline-block",
                marginTop: 40,
                padding: "18px 36px",
                borderRadius: 16,
                fontSize: 18,
                fontWeight: 700,
                background: `linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
                color: "white",
                textDecoration: "none",
              }}
            >
              Join the Waitlist
            </Link>
          </motion.div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            borderTop: `1px solid ${BRAND.border}`,
            padding: 30,
            textAlign: "center",
            opacity: 0.5,
          }}
        >
          © 2026 MenPrac. All rights reserved.
        </div>
      </div>
    </div>
  );
}
