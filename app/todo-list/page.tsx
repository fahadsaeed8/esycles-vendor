"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Trash2, PlusCircle, ClipboardList } from "lucide-react";
import DashboardLayout from "../../components/layout/dashboard-layout";

interface Task {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage or set mock todos
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([
        { text: "Buy new e-cycle accessories", completed: false },
        { text: "Schedule e-cycle maintenance", completed: true },
        { text: "Check battery health", completed: false },
      ]);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <DashboardLayout>
      <div className="">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-transparent bg-clip-text flex items-center justify-center gap-2">
              <ClipboardList size={30} /> Esycles Vendor Todo List
            </h1>
            <p className="text-gray-600 mt-2">
              Keep track of your e-cycle tasks, goals, and reminders.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-700">Total Tasks</h3>
              <p className="text-2xl font-bold text-[#f59e0b]">{tasks.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
              <p className="text-2xl font-bold text-red-500">{pendingCount}</p>
            </div>
          </div>

          {/* Input Field */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a new task..."
              className="flex-1 px-4 py-3 border rounded-lg focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:border-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:bg-white"
            />
            <button
              onClick={handleAddTask}
              className="flex items-center justify-center sm:justify-start gap-2 px-5 py-3 rounded-lg cursor-pointer bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white font-semibold shadow hover:opacity-90"
            >
              <PlusCircle size={18} /> Add
            </button>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center">No tasks yet. Add some!</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((t, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center px-4 py-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleComplete(index)}
                        className="cursor-pointer w-5 h-5 accent-[#f59e0b]"
                      />
                      <span
                        className={`text-gray-800 ${
                          t.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {t.text}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Clear All Button */}
          {tasks.length > 0 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={clearAllTasks}
                className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TodoList;
