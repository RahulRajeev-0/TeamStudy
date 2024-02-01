import React from 'react'
import { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.net.min";
import * as THREE from "three";

const ThreeDBackground = ({children}) => {

    const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xdd9cff,
          backgroundColor: 0xe8e8e8
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);


  return (
    <div ref={vantaRef}>
      <p style={{ color: "#fff", paddingTop: "20px" }}>

        {children}  
      </p>
      
    </div>
  )
}

export default ThreeDBackground
