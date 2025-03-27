'use client';

import { useApp } from '@/context/AppContext';
import { Navigation } from '@/components/Navigation';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Link from 'next/link';
import { ClockIcon, BookOpenIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { state } = useApp();
  const courses = state.courses;
  const tasks = state.tasks;
  const pendingTasks = tasks.filter(task => task.status === 'pending');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const statCards = [
    {
      title: "Total Courses",
      value: courses.length,
      icon: BookOpenIcon,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ClockIcon,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Pending Tasks",
      value: pendingTasks.length,
      icon: CheckCircleIcon,
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent flex flex-col">
      <Navigation />
      
      {/* Main content area without inner scroll */}
      <main className="pt-20 flex-grow">
        <div className="max-w-7xl mx-auto px-6 pb-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-8 pb-16"
          >
            <h1 className="text-[3.5rem] leading-tight font-bold text-white mb-4">
              Welcome Back
            </h1>
            <p className="text-[#64748B] text-xl">
              Here's an overview of your courses and tasks
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-[#111827] rounded-xl p-6">
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-4xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <stat.icon className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pending Tasks Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Pending Tasks
              </h2>
            </div>

            <div className="bg-[#111827] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700/50 grid grid-cols-12 gap-4">
                <div className="col-span-5 text-xs font-medium text-gray-400">TASK</div>
                <div className="col-span-4 text-xs font-medium text-gray-400">COURSE</div>
                <div className="col-span-3 text-xs font-medium text-gray-400">DUE DATE</div>
              </div>

              {pendingTasks.length > 0 ? (
                <div>
                  {pendingTasks.map((task, index) => {
                    const course = courses.find(c => c.id === task.courseId);
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="px-6 py-4 grid grid-cols-12 gap-4 border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                      >
                        <div className="col-span-5 flex items-center gap-3">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {task.title}
                          </span>
                        </div>
                        <div className="col-span-4">
                          <Link 
                            href={`/courses/${course?.id}`}
                            className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                          >
                            {course?.title}
                          </Link>
                        </div>
                        <div className="col-span-3 text-sm text-gray-400">
                          {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  {...fadeInUp}
                  className="px-6 py-12 text-center"
                >
                  <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-400">No pending tasks. Great job! 🎉</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 