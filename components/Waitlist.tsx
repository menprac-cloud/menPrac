"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SUCCESS_URL = "https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json";

const BRAND = {
  dark: "#0B0F2F",
  primary: "#4F2DFF",
  secondary: "#6C63FF",
  glass: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.12)",
};

function useLottieData(url:string){
  const [data,setData] = useState<any>(null);
  useEffect(()=>{ fetch(url).then(r=>r.json()).then(setData); },[url]);
  return data;
}

export default function Waitlist(){

  const successAnim = useLottieData(SUCCESS_URL);
  const [showModal,setShowModal] = useState(false);
  const [loading,setLoading] = useState(false);
  const [form,setForm] = useState({name:"",email:"",role:"",clinic:""});

  const inputStyle = {
    width:"100%",
    padding:"16px 18px",
    borderRadius:14,
    border:`1px solid ${BRAND.border}`,
    background:BRAND.glass,
    color:"white",
    fontSize:16,
    outline:"none"
  };

  const submit = async (e:any)=>{
    e.preventDefault();
    setLoading(true);

    try{
      await emailjs.send("service_menprac","template_waitlist",form,"PUBLIC_KEY");
      confetti({ particleCount:180, spread:120 });
      setShowModal(true);
    }catch{
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      background:BRAND.dark,
      padding:20
    }}>

      {/* CARD */}
      <motion.form
        initial={{opacity:0,y:40}}
        animate={{opacity:1,y:0}}
        onSubmit={submit}
        style={{
          width:"100%",
          maxWidth:520,
          padding:40,
          borderRadius:28,
          background:BRAND.glass,
          border:`1px solid ${BRAND.border}`,
          backdropFilter:"blur(12px)",
          boxShadow:"0 30px 80px rgba(0,0,0,0.4)",
          color:"white"
        }}
      >
        <h2 style={{fontSize:34,fontWeight:800,textAlign:"center"}}>
          Join Early Access
        </h2>

        <p style={{opacity:.6,textAlign:"center",marginTop:10}}>
          Be among the first healthcare leaders onboarded.
        </p>

        <div style={{marginTop:30,display:"grid",gap:16}}>

          <input
            placeholder="Full Name"
            required
            onChange={(e)=>setForm({...form,name:e.target.value})}
            style={inputStyle}
          />

          <input
            placeholder="Institutional Email"
            type="email"
            required
            onChange={(e)=>setForm({...form,email:e.target.value})}
            style={inputStyle}
          />

          <select
            required
            onChange={(e)=>setForm({...form,role:e.target.value})}
            style={inputStyle}
          >
            <option value="">Select Professional Role</option>
            <option>Doctor</option>
            <option>Dentist</option>
            <option>Therapist</option>
            <option>Clinic Manager</option>
            <option>Hospital Admin</option>
          </select>

          <input
            placeholder="Clinic / Organization"
            onChange={(e)=>setForm({...form,clinic:e.target.value})}
            style={inputStyle}
          />

          <button
            disabled={loading}
            style={{
              padding:"18px",
              borderRadius:16,
              border:"none",
              fontSize:18,
              fontWeight:700,
              cursor:"pointer",
              background:`linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
              color:"white"
            }}
          >
            {loading ? "Submitting..." : "Request Access"}
          </button>

          <Link href="/" style={{textAlign:"center",opacity:.6,marginTop:10}}>
            ← Back to homepage
          </Link>

        </div>
      </motion.form>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            style={{
              position:"fixed",
              inset:0,
              background:"rgba(0,0,0,0.75)",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              backdropFilter:"blur(8px)"
            }}
          >
            <motion.div
              initial={{scale:.8,opacity:0}}
              animate={{scale:1,opacity:1}}
              exit={{scale:.8,opacity:0}}
              style={{
                background:"#13174B",
                padding:40,
                borderRadius:30,
                textAlign:"center",
                width:"90%",
                maxWidth:420,
                border:`1px solid ${BRAND.border}`
              }}
            >
              {successAnim && <Lottie animationData={successAnim} loop={false}/>}

              <h3 style={{fontSize:26,fontWeight:800,marginTop:10}}>
                Application Received 🎉
              </h3>

              <p style={{opacity:.6,marginTop:10}}>
                Our team will contact you shortly.
              </p>

              <button
                onClick={()=>setShowModal(false)}
                style={{
                  marginTop:20,
                  padding:"12px 24px",
                  borderRadius:12,
                  border:"none",
                  cursor:"pointer",
                  background:BRAND.primary,
                  color:"white",
                  fontWeight:600
                }}
              >
                Close
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
