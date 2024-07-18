"use client";

import React, { useState } from 'react';
import { Settings, Layout, PenTool, Cloud, Cat, Coffee, Plus, Users, Moon, MoreHorizontal, Eclipse, Circle, Library, CircleCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [tasks, setTasks] = useState({
    inbox: [
      { id: 1, text: 'Review project proposal', completed: false, icon: '📄' },
      { id: 2, text: 'Call mom', completed: false, icon: '📞' },
      { id: 3, text: 'Buy groceries', completed: false, icon: '🛒' },
      { id: 4, text: 'Schedule dentist appointment', completed: false, icon: '🦷' },
      { id: 5, text: 'Update resume', completed: false, icon: '💼' },
    ],
    // ... other task lists ...
  });

  const toggleTaskCompletion = (listName: string, taskId: number) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [listName]: prevTasks[listName].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const SidebarItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode; active?: boolean }> = ({ icon, children, active }) => (
    <li className={`p-2 rounded ${active ? ' bg-[#3a3a3a] 1border border-gray-500 border-opacity-10' : 'hover:bg-gray-700'} transition-colors duration-200 flex items-center`}>
      {icon}
      <span className="ml-2">{children}</span>
    </li>
  );

  const TaskList: React.FC<{ title: string; tasks: any[]; listName: string; className?: string }> = ({ title, tasks, listName, className }) => (
    <div className={`bg-[#252526] rounded-lg p-4 border border-gray-500 border-opacity-10 ${className}`}>
      <h2 className=" font-semibold mb-4 flex items-center">
        <span className="w-3 h-3 bg-white rounded-full mr-2"></span>
        {title}
      </h2>
      <div className="bg-[#3a3a3a] rounded p-2 mb-4">
        + Add tasks here
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="py-3 flex items-center justify-between border-b border-[#3a3a3a] last:border-b-0">
            <div className="flex items-center">
              <button
                onClick={() => toggleTaskCompletion(listName, task.id)}
                className="mr-3 w-6 h-6 rounded-full flex items-center justify-center"
              >
                {task.completed ? <CircleCheck className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-gray-400" />}
              </button>
              <span>{task.text}</span>
            </div>
            <span>{task.icon}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const goToPreviousDay = () => {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setDate(prevDate.getDate() - 1);
        return newDate;
      });
    };

    const goToNextDay = () => {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setDate(prevDate.getDate() + 1);
        return newDate;
      });
    };

    return (
      <div className="bg-[#252526] rounded-lg p-4 border border-gray-500 border-opacity-10 text-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Calendar</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-[#3a3a3a] rounded">Day</button>
            <button className="px-3 py-1 bg-[#3a3a3a] rounded">Week</button>
            <button className="px-3 py-1 bg-[#3a3a3a] rounded">Month</button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold">{formatDate(currentDate)}</div>
          <div className="flex space-x-2">
            <button onClick={goToPreviousDay} className="p-1 bg-[#3a3a3a] rounded"><ChevronLeft size={16} /></button>
            <button onClick={goToNextDay} className="p-1 bg-[#3a3a3a] rounded"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="border-t border-[#3a3a3a]">
          {hours.map(hour => (
            <div key={hour} className="flex border-b border-[#3a3a3a] py-2">
              <div className="w-16 text-xs text-gray-500">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              <div className="flex-grow"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-[#e0e0e0]">
      {/* Sidebar */}
      <div className="bg-[#252525] w-64 flex flex-col">
        <div className="p-4 flex items-center">
          <Library size={32} className="mr-2" />
          <span className="text-lg font-semibold">Chrono</span>
          <div className="ml-auto flex space-x-2">
            <Settings size={18} />
            <Layout size={18} />
          </div>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-1 p-2">
            <SidebarItem icon={<Eclipse size={18} />} active>Planner</SidebarItem>
            <SidebarItem icon={<PenTool size={18} />}>Notes</SidebarItem>
            <SidebarItem icon={<Cloud size={18} />}>Journal</SidebarItem>
            <SidebarItem icon={<Cat size={18} />}>Side Projects</SidebarItem>
            <SidebarItem icon={<Coffee size={18} />}>Personal</SidebarItem>
            <SidebarItem icon={<Plus size={18} />}>New space</SidebarItem>
          </ul>
        </nav>
        <div className="p-4">
          <ul className="space-y-2">
            <SidebarItem icon={<Users size={18} />}>Join Discord</SidebarItem>
            <SidebarItem icon={<Coffee size={18} />}>Support Us</SidebarItem>
            <SidebarItem icon={<Moon size={18} />}>Toggle Theme</SidebarItem>
            <li className="p-2 rounded hover:bg-gray-700 transition-colors duration-200 flex items-center">
              <img src="https://i.pravatar.cc/300" alt="Guo" className="w-6 h-6 mr-2 rounded-full" />
              Alireza
              <MoreHorizontal size={18} className="ml-auto" />
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <header className="bg-[#252526] p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Planner</h1>
          <button className="px-3 py-1 bg-[#3a3a3a] rounded border border-gray-500 border-opacity-10 ">Customize</button>
        </header>
        <main className="flex-grow p-2 overflow-auto">
          <div className="grid grid-cols-3 gap-2 h-full items-stretch">
            <div className="col-span-2 grid grid-cols-2 gap-2 auto-rows-fr">
              <TaskList title="Inbox" tasks={tasks.inbox} listName="inbox" />
              <TaskList title="Schedule Later" tasks={[]} listName="later" />
              <TaskList title="Not Urgent, Important" tasks={[]} listName="important" />
              <TaskList title="Schedule Today" tasks={[]} listName="today" />
            </div>
            <Calendar />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;