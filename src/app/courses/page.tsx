'use client';

import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/Button';
import { CourseModal } from '@/components/CourseModal';
import { TaskModal } from '@/components/TaskModal';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { PlusIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function CoursesPage() {
  const { state } = useApp();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const getTasksForCourse = (courseId: string) => {
    return state.tasks.filter(task => task.courseId === courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
              My Courses
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Button
              onClick={() => setIsAddingCourse(true)}
              className="inline-flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Course
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
        >
          {state.courses.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No courses yet
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get started by creating a new course.
              </p>
              <div className="mt-6">
                <Button onClick={() => setIsAddingCourse(true)}>
                  <PlusIcon className="w-5 h-5 mr-2" />
                  New Course
                </Button>
              </div>
            </div>
          ) : (
            state.courses.map((course) => {
              const courseTasks = getTasksForCourse(course.id);
              const completedTasks = courseTasks.filter(task => task.status === 'completed').length;
              const recentTasks = courseTasks
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 3);
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col rounded-xl shadow-sm overflow-hidden bg-white dark:bg-gray-800"
                >
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                        {course.description}
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Recent Tasks ({completedTasks}/{courseTasks.length})
                        </h4>
                        <Link href={`/courses/${course.id}`}>
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-500">
                            View All
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                      <div className="space-y-2">
                        {recentTasks.map(task => (
                          <div
                            key={task.id}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon 
                                className={`w-5 h-5 ${
                                  task.status === 'completed' 
                                    ? 'text-green-500' 
                                    : 'text-gray-400'
                                }`}
                              />
                              <span className={`text-sm ${
                                task.status === 'completed'
                                  ? 'line-through text-gray-500 dark:text-gray-400'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}>
                                {task.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {format(new Date(task.dueDate), 'MMM d')}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                        onClick={() => {
                          setSelectedCourseId(course.id);
                          setIsAddingTask(true);
                        }}
                      >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add Task
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </main>

      <CourseModal
        isOpen={isAddingCourse}
        onClose={() => setIsAddingCourse(false)}
      />
      
      <TaskModal
        isOpen={isAddingTask}
        onClose={() => {
          setIsAddingTask(false);
          setSelectedCourseId(null);
        }}
        courseId={selectedCourseId || ''}
      />
    </div>
  );
} 