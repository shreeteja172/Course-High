'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { useApp } from '@/context/AppContext';
import { XMarkIcon, CalendarIcon, DocumentTextIcon, TagIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Task } from '@/types';
import { format } from 'date-fns';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

export const TaskModal = ({ isOpen, onClose, courseId }: TaskModalProps) => {
  const { dispatch } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      courseId,
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('pending');
    onClose();
  };

  const toggleStatus = () => {
    setStatus(status === 'pending' ? 'completed' : 'pending');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add New Task
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={toggleStatus}
                      className="group relative"
                    >
                      <div className={`w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${
                        status === 'completed' ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'
                      }`}>
                        <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                          status === 'completed' ? 'translate-x-6' : 'translate-x-0'
                        }`}>
                          <CheckCircleIcon className={`w-4 h-4 absolute top-1 left-1 transition-colors ${
                            status === 'completed' ? 'text-green-500' : 'text-gray-400'
                          }`} />
                        </div>
                      </div>
                    </button>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TagIcon className="w-5 h-5 text-gray-400" />
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter task title"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                  </div>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Enter task description"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Due Date
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      id="dueDate"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors appearance-none"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <CalendarIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {dueDate && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                    >
                      {format(new Date(dueDate), 'EEEE, MMMM d, yyyy')}
                    </motion.p>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Create Task
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 