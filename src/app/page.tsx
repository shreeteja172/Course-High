'use client';

import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, CalendarIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    text: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transition: {
        type: "spring",
        mass: 0.6
      }
    }
  };

  const features = [
    {
      icon: CheckCircleIcon,
      title: "Track Tasks",
      description: "Manage your assignments with ease",
      delay: 0.2
    },
    {
      icon: CalendarIcon,
      title: "Smart Calendar",
      description: "Never miss important deadlines",
      delay: 0.4
    },
    {
      icon: SparklesIcon,
      title: "Stay Organized",
      description: "Keep your courses well structured",
      delay: 0.6
    }
  ];

  return (
    <main className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-primary-900/5 to-gray-900" />
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-40 -right-40 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] top-[20%] -left-40 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute w-[800px] h-[800px] bottom-[-100px] right-[-100px] bg-primary-700/20 rounded-full blur-3xl" />
      </div>

      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-white/30 rounded-full pointer-events-none z-50 backdrop-blur-sm hidden md:block"
        variants={variants}
        animate={cursorVariant}
      />

      <Navigation />

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="relative inline-block"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Manage Your Courses
              </motion.h1>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-primary-500"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Track Your Progress
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl mx-auto text-xl text-gray-300"
            >
              A modern course management system to help you organize your studies,
              track assignments, and never miss a deadline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/courses">
                <Button
                  className="group relative px-8 py-3 text-lg overflow-hidden hover:text-white transition-colors"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center">
                    Get Started
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/calendar">
                <Button
                  variant="ghost"
                  className="px-8 py-3 text-lg border border-gray-400/30 hover:border-primary-500 hover:bg-primary-500/10 backdrop-blur-sm text-white transition-all duration-300 relative group"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0.95 }}
                    whileHover={{ scale: 1 }}
                  />
                  <span className="relative flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    View Calendar
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="relative group"
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div className="relative z-10 p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 transition-colors group-hover:bg-gray-800/70">
                  <feature.icon className="w-8 h-8 text-primary-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
