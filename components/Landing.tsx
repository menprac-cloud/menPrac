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
  useEffect(() => { fetch(url).then((r) => r.json()).then(setData); }, [url]);
  return data;
}

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
        background: "radial-gradient(circle,#4F2DFF55,#6C63FF22,transparent 70%)",
        filter: "blur(120px)",
        top: -200,
        left: -200,
        zIndex: 0,
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
    <div style={{ background: BRAND.dark, color: "white", fontFamily: "Inter, sans-serif", position:"relative" }}>
      <GlowBg/>

      {/* NAVBAR WITH LOGO */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px",maxWidth:"1200px",margin:"auto"}}>
        <motion.div initial={{opacity:0,x:-40}} animate={{opacity:1,x:0}} style={{display:"flex",alignItems:"center",gap:12}}>
          <Image src="/logo.png" alt="MenPrac Logo" width={40} height={40}/>
          <h1 style={{fontSize:24,fontWeight:700}}>MenPrac</h1>
        </motion.div>

        <motion.div whileHover={{scale:1.1}}>
          <Link href="/waitlist" style={{
            padding:"10px 22px",
            borderRadius:12,
            fontWeight:600,
            background:`linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
            color:"white",textDecoration:"none"}}>
            Join Waitlist
          </Link>
        </motion.div>
      </div>

      {/* HERO */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:60,alignItems:"center",padding:"80px 24px",maxWidth:1200,margin:"auto"}}>
        <motion.div initial="hidden" animate="visible" variants={reveal}>
          <h2 style={{fontSize:52,fontWeight:800,lineHeight:1.2}}>
            Precision in Practice.
          </h2>
          <p style={{opacity:.7,fontSize:20,marginTop:20,maxWidth:520}}>
            Smarter Systems for Medical Health Professionals.
          </p>
          <motion.div whileHover={{scale:1.08}}>
            <Link href="/waitlist" style={{
              display:"inline-block",marginTop:40,padding:"18px 36px",
              borderRadius:16,fontSize:18,fontWeight:700,
              background:`linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
              color:"white",textDecoration:"none"}}>
              Request Early Access
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{duration:1}}>
          {heroAnim && <Lottie animationData={heroAnim} loop />}
        </motion.div>
      </div>

      {/* FEATURES + LOTTIE HEADER */}
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{once:true}} style={{padding:"100px 24px",maxWidth:1200,margin:"auto"}}>
        {featuresAnim && <div style={{maxWidth:300,margin:"auto"}}><Lottie animationData={featuresAnim} loop/></div>}
        <h3 style={{fontSize:36,fontWeight:700,textAlign:"center"}}>Features</h3>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:30,marginTop:60}}>
          {["AI Clinical Documentation","Predictive No-Show Intelligence","Revenue Optimization Engine","HIPAA-Ready Infrastructure","Multi-Location Control Center","Real-Time Analytics"]
          .map((feature,i)=>(
            <motion.div key={i} whileHover={{y:-12,scale:1.05}} style={{
              background:BRAND.glass,border:`1px solid ${BRAND.border}`,
              borderRadius:24,padding:28,boxShadow:"0 0 20px #6C63FF22"}}>
              <h4 style={{fontSize:20,fontWeight:600}}>{feature}</h4>
              <p style={{opacity:.6,marginTop:10}}>
                Designed to reduce operational friction and improve outcomes.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* BENEFITS + LOTTIE */}
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{once:true}} style={{background:BRAND.glass,padding:"100px 24px"}}>
        <div style={{maxWidth:1100,margin:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:50,alignItems:"center"}}>
          {benefitsAnim && <Lottie animationData={benefitsAnim} loop/>}
          <div>
            <h3 style={{fontSize:40,fontWeight:800}}>
              Empowering clinics with AI-powered multidisciplinary clinical system
            </h3>
            <ul style={{marginTop:20,lineHeight:2,opacity:.8}}>
              <li>✔ Reduce patient no-shows by 35%</li>
              <li>✔ Automate repetitive admin tasks</li>
              <li>✔ Increase revenue efficiency</li>
              <li>✔ Improve patient experience</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* FINAL CTA + LOTTIE */}
      <div style={{textAlign:"center",padding:"120px 20px"}}>
        {ctaAnim && <div style={{maxWidth:260,margin:"auto"}}><Lottie animationData={ctaAnim} loop/></div>}
        <h3 style={{fontSize:42,fontWeight:800}}>Ready for the upgrade?</h3>
        <motion.div whileHover={{scale:1.1}}>
          <Link href="/waitlist" style={{
            display:"inline-block",marginTop:40,padding:"20px 40px",
            borderRadius:18,fontSize:20,fontWeight:700,
            background:`linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
            color:"white",textDecoration:"none"}}>
            Join the Waitlist
          </Link>
        </motion.div>
      </div>

      {/* FOOTER */}
      <div style={{borderTop:`1px solid ${BRAND.border}`,padding:30,textAlign:"center",opacity:.5}}>
        © 2026 MenPrac. All rights reserved.
      </div>
    </div>
  );
}
