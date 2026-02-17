"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const HERO_URL = "https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json";

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
    fetch(url).then((r) => r.json()).then(setData);
  }, [url]);
  return data;
}

/* floating dashboard animation used in BENEFITS section */
function FloatingDashboard() {
  return (
    <div style={{
      position:"relative",
      height:320,
      borderRadius:30,
      overflow:"hidden",
      background:"linear-gradient(135deg,#4F2DFF33,#6C63FF33)"
    }}>
      <motion.div
        animate={{ x:[0,40,-40,0], y:[0,-30,30,0] }}
        transition={{ duration:10, repeat:Infinity }}
        style={{
          position:"absolute",
          width:200,
          height:200,
          background:"#6C63FF55",
          filter:"blur(80px)",
          borderRadius:"50%"
        }}
      />

      <motion.div
        animate={{ y:[0,-20,0] }}
        transition={{ duration:3, repeat:Infinity }}
        style={{
          position:"absolute",
          top:40,left:40,
          padding:"12px 18px",
          borderRadius:16,
          background:"rgba(255,255,255,0.1)",
          backdropFilter:"blur(10px)"
        }}>
        🤖 AI booked appointment
      </motion.div>

      <div style={{position:"absolute",bottom:40,left:40,display:"flex",gap:6}}>
        {[40,80,60,100].map((h,i)=>(
          <motion.div key={i}
            animate={{height:[20,h,20]}}
            transition={{duration:3,repeat:Infinity,delay:i*0.2}}
            style={{width:6,background:"white",borderRadius:4}}
          />
        ))}
      </div>

      <motion.div
        animate={{ y:[0,-15,0] }}
        transition={{ duration:4, repeat:Infinity }}
        style={{
          position:"absolute",
          right:30,bottom:30,
          padding:"12px 18px",
          borderRadius:16,
          background:"rgba(255,255,255,0.1)"
        }}>
        +35% efficiency
      </motion.div>
    </div>
  );
}

export default function Landing() {
  const heroAnim = useLottieData(HERO_URL);

  const reveal = {
    hidden:{opacity:0,y:40},
    visible:{opacity:1,y:0,transition:{duration:.8}}
  };

  return (
    <div style={{background:BRAND.dark,color:"white",fontFamily:"Inter, sans-serif"}}>

      {/* NAVBAR */}
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"24px",
        maxWidth:"1200px",
        margin:"auto"
      }}>
        <h1 style={{fontSize:24,fontWeight:700}}>MenPrac</h1>

        <Link href="/waitlist" style={{
          padding:"10px 22px",
          borderRadius:12,
          fontWeight:600,
          background:`linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
          color:"white",
          textDecoration:"none"
        }}>
          Join Waitlist
        </Link>
      </div>

      {/* HERO */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
        gap:60,
        alignItems:"center",
        padding:"80px 24px",
        maxWidth:1200,
        margin:"auto"
      }}>
        <motion.div initial="hidden" animate="visible" variants={reveal}>
          <h2 style={{fontSize:52,fontWeight:800,lineHeight:1.2}}>
            Intelligence for the modern clinic.
          </h2>

          <p style={{opacity:.7,fontSize:20,marginTop:20,maxWidth:520}}>
            Scheduling, telehealth, analytics and AI workflows built for modern healthcare teams.
          </p>

          <Link href="/waitlist" style={{
            display:"inline-block",
            marginTop:40,
            padding:"18px 36px",
            borderRadius:16,
            fontSize:18,
            fontWeight:700,
            background:`linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
            color:"white",
            textDecoration:"none"
          }}>
            Request Early Access
          </Link>
        </motion.div>

        <motion.div
          initial={{opacity:0,scale:.8}}
          animate={{opacity:1,scale:1}}
          transition={{duration:1}}
        >
          {heroAnim && <Lottie animationData={heroAnim} loop />}
        </motion.div>
      </div>

      {/* FEATURES */}
      <motion.div
        variants={reveal} initial="hidden" whileInView="visible"
        viewport={{once:true}}
        style={{padding:"100px 24px",maxWidth:1200,margin:"auto"}}
      >
        <h3 style={{fontSize:36,fontWeight:700,textAlign:"center"}}>
          Precision Engineering
        </h3>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
          gap:30,
          marginTop:60
        }}>
          {[
            "AI Clinical Documentation",
            "Predictive No-Show Intelligence",
            "Revenue Optimization Engine",
            "HIPAA-Ready Infrastructure",
            "Multi-Location Control Center",
            "Real-Time Analytics"
          ].map((feature,i)=>(
            <motion.div key={i} whileHover={{y:-10}} style={{
              background:BRAND.glass,
              border:`1px solid ${BRAND.border}`,
              borderRadius:24,
              padding:28
            }}>
              <h4 style={{fontSize:20,fontWeight:600}}>{feature}</h4>
              <p style={{opacity:.6,marginTop:10}}>
                Designed to reduce operational friction and improve outcomes.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* BENEFITS */}
      <motion.div
        variants={reveal} initial="hidden" whileInView="visible"
        viewport={{once:true}}
        style={{background:BRAND.glass,padding:"100px 24px"}}
      >
        <div style={{
          maxWidth:1100,
          margin:"auto",
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
          gap:50,
          alignItems:"center"
        }}>
          <FloatingDashboard />

          <div>
            <h3 style={{fontSize:40,fontWeight:800}}>
              Empowering clinics with AI
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

      {/* FINAL CTA */}
      <div style={{textAlign:"center",padding:"120px 20px"}}>
        <h3 style={{fontSize:42,fontWeight:800}}>
          Ready for the upgrade?
        </h3>

        <Link href="/waitlist" style={{
          display:"inline-block",
          marginTop:40,
          padding:"20px 40px",
          borderRadius:18,
          fontSize:20,
          fontWeight:700,
          background:`linear-gradient(90deg,${BRAND.primary},${BRAND.secondary})`,
          color:"white",
          textDecoration:"none"
        }}>
          Join the Waitlist
        </Link>
      </div>

      {/* FOOTER */}
      <div style={{
        borderTop:`1px solid ${BRAND.border}`,
        padding:30,
        textAlign:"center",
        opacity:.5
      }}>
        © 2026 MenPrac. All rights reserved.
      </div>

    </div>
  );
}
