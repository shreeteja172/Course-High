export type Course = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface Task {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export type ThemeMode = 'light' | 'dark'; 