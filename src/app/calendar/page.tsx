'use client';

import { Navigation } from '@/components/Navigation';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CalendarPage() {
  const { state } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date: Date) => {
    return state.tasks.filter(task => 
      isSameDay(new Date(task.dueDate), date)
    );
  };

  const getCourseTitle = (courseId: string) => {
    const course = state.courses.find(c => c.id === courseId);
    return course?.title || 'Unknown Course';
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Calendar
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="bg-gray-100 dark:bg-gray-800 py-2 text-center"
                >
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {day}
                  </span>
                </div>
              ))}
              {days.map((day, dayIdx) => {
                const tasks = getTasksForDate(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isCurrentDay = isToday(day);

                return (
                  <motion.div
                    key={day.toString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: dayIdx * 0.01 }}
                    className={`min-h-[120px] bg-white dark:bg-gray-800 p-2 relative ${
                      !isCurrentMonth ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 mb-1 mx-auto rounded-full ${
                      isCurrentDay 
                        ? 'bg-primary-500 text-white' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {tasks.map(task => (
                        <Link
                          key={task.id}
                          href={`/courses/${task.courseId}`}
                          className="block"
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-2 rounded-lg text-xs ${
                              task.status === 'completed'
                                ? 'bg-green-50 dark:bg-green-900/20'
                                : 'bg-primary-50 dark:bg-primary-900/20'
                            }`}
                          >
                            <div className="flex items-start space-x-1">
                              <CheckCircleIcon 
                                className={`w-4 h-4 flex-shrink-0 ${
                                  task.status === 'completed'
                                    ? 'text-green-500'
                                    : 'text-primary-500'
                                }`}
                              />
                              <div>
                                <p className={`font-medium line-clamp-1 ${
                                  task.status === 'completed'
                                    ? 'text-green-700 dark:text-green-300 line-through'
                                    : 'text-primary-700 dark:text-primary-300'
                                }`}>
                                  {task.title}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 line-clamp-1">
                                  {getCourseTitle(task.courseId)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 