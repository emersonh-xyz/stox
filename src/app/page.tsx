'use client';

import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {



  const [stocks, setStocks] = useState(50123);
  const [users, setUsers] = useState(9);
  const [posts, setPosts] = useState(3);


  const springStocks = useSpring(0, { bounce: 0, duration: 6000 });
  const springUsers = useSpring(0, { bounce: 0, duration: 6000 });
  const springPosts = useSpring(0, { bounce: 0, duration: 6000 });

  useEffect(() => {
    springStocks.on('change', (v) => setStocks(Math.round(v)));
    springUsers.on('change', (v) => setUsers(Math.round(v)));
    springPosts.on('change', (v) => setPosts(Math.round(v)));

    springStocks.set(50123);
    springUsers.set(9);
    springPosts.set(3);
  }, [springStocks, springUsers, springPosts]);

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
            <h1 className="text-9xl font-bold text-left text-white">StoX.</h1>
            <p className="text-2xl text-white">we let you look at your stocks or something!</p>
          </div>
          <div className="flex flex-col gap-2 items-start ">

            <SignInButton>
              <button className='btn  drop-shadow-none w-full text-lg'>Login</button>
            </SignInButton>

            <SignUpButton>
              <button className='btn btn-primary w-full text-lg'>Sign-up</button>

            </SignUpButton>
          </div>
        </div>

      </motion.div>

      <motion.div
        className="fixed right-[300px] top-[100px] w-[500px] p-4 rounded-lg text-right "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5, ease: "easeOut" }}
      >
        <h2 className="tracking-tight drop-shadow-md max-w-5xl text-xl md:text-2xl lg:text-3xl text-gray-200">
          Join <span className="font-bold text-[#FFA630]">{users}</span> other users
          and pick from over <span className="font-bold text-[#FFA630]">{stocks}</span> different stocks!
        </h2>
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

