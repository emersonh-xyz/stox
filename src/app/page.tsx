'use client';

import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    const createStars = () => {
      const starContainer = document.getElementById("star-container");
      if (starContainer) {
        for (let i = 0; i < 100; i++) {
          const star = document.createElement("div");
          star.className = "star";
          star.style.top = `${Math.random() * 100}vh`;
          star.style.left = `${Math.random() * 100}vw`;
          star.style.animationDelay = `${Math.random() * 2}s`;
          starContainer.appendChild(star);
        }
      }
    };
    createStars();
  }, []);

  return (
    <div className="h-screen bg-slate-600 flex justify-center px-20 py-20 relative overflow-hidden">
      <div id="star-container" className="absolute inset-0"></div>
      <motion.div
        className="fixed left-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2, ease: "easeOut", }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-9xl font-bold text-left text-white">MoonstoX.</h1>
            <p className="text-2xl text-white">we let you look at your stocks or something, who cares!</p>
          </div>
          <div className="flex  flex-col gap-2">

            <SignInButton>
              <div className="container hover:cursor-pointer hover:scale-105 hover:animate-pulse">
                <img
                  className=""
                  alt="star" width={200} height={200} src="https://images.vexels.com/content/283648/preview/pink-rounded-star-9619ee.png" />
                <span className="centered font-bold text-zinc-600 text-2xl">Login</span>
              </div>
            </SignInButton>

            <SignUpButton>
              <div className="container-two hover:cursor-pointer hover:scale-105 hover:animate-pulse">
                <img
                  className=""
                  alt="star" width={128} height={128} src="https://images.vexels.com/content/283648/preview/pink-rounded-star-9619ee.png" />
                <span className="centered font-bold text-zinc-600 text-xl">Sign-up</span>
              </div>
            </SignUpButton>
          </div>
        </div>

      </motion.div>

      <motion.img
        src="/giphy.gif"
        alt="rocket"
        initial={{ x: '800px', y: '100vh', rotate: 0, opacity: 0 }}
        animate={{ x: '500px', y: '40px', opacity: 1 }}
        transition={{ type: 'spring', stiffness: 25, damping: 10, delay: 2 }}
        className="absolute h-[750px]"
      />

    </div>
  );
}

