'use client';

import { Navigation } from '@/components/Navigation';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { TaskModal } from '@/components/TaskModal';
import { useState } from 'react';
import { PlusIcon, CheckCircleIcon, ArrowLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CourseTasksPage() {
  const { state, dispatch } = useApp();
  const params = useParams();
  const courseId = params.id as string;
  const [isAddingTask, setIsAddingTask] = useState(false);

  const course = state.courses.find(c => c.id === courseId);
  const tasks = state.tasks.filter(task => task.courseId === courseId)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const toggleTaskStatus = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          ...task,
          status: task.status === 'completed' ? 'pending' : 'completed',
          updatedAt: new Date(),
        },
      });
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course not found</h2>
          <Link href="/courses" className="mt-4 text-primary-600 hover:text-primary-500">
            Go back to courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Link href="/courses">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {course.title} - Tasks
            </h1>
          </div>
          <Button
            onClick={() => setIsAddingTask(true)}
            className="mt-4 md:mt-0"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Task
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  No tasks yet
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Get started by creating a new task.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden">
                <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="bg-gray-50 dark:bg-gray-800">
                    <div className="grid grid-cols-12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <div className="col-span-1">Status</div>
                      <div className="col-span-4">Task</div>
                      <div className="col-span-5">Description</div>
                      <div className="col-span-2">Due Date</div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {tasks.map(task => (
                      <div
                        key={task.id}
                        className={`grid grid-cols-12 px-6 py-4 ${
                          task.status === 'completed'
                            ? 'bg-gray-50 dark:bg-gray-700/50'
                            : ''
                        }`}
                      >
                        <div className="col-span-1">
                          <button
                            onClick={() => toggleTaskStatus(task.id)}
                            className="group"
                          >
                            <CheckCircleIcon
                              className={`w-5 h-5 ${
                                task.status === 'completed'
                                  ? 'text-green-500'
                                  : 'text-gray-400 group-hover:text-gray-500'
                              }`}
                            />
                          </button>
                        </div>
                        <div className="col-span-4">
                          <h3 className={`text-sm font-medium ${
                            task.status === 'completed'
                              ? 'line-through text-gray-500 dark:text-gray-400'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {task.title}
                          </h3>
                        </div>
                        <div className="col-span-5">
                          <p className={`text-sm ${
                            task.status === 'completed'
                              ? 'line-through text-gray-400 dark:text-gray-500'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {task.description}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                            <span className={`text-sm ${
                              task.status === 'completed'
                                ? 'text-gray-400 dark:text-gray-500'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <TaskModal
        isOpen={isAddingTask}
        onClose={() => setIsAddingTask(false)}
        courseId={courseId}
      />
    </div>
  );
} 