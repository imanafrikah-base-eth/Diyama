"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#0a0a0a",
        color: "white",
        flexDirection: "column",
        fontFamily: "Arial",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚀 DIYAMA ADMIN RUNNING SUCCESSFULLY
      </motion.h1>
      <p style={{ marginTop: 10, opacity: 0.8 }}>
        Local server active on http://localhost:3000
      </p>
    </main>
  );
}
