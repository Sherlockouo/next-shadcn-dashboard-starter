'use client';
import { Task } from '@/types/todo';
import { useState, ChangeEvent } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="mx-auto mt-10 w-full px-4">
      <h1 className="mb-4 text-2xl font-bold">Magic ToDo</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          className="flex-grow rounded border border-gray-300 p-2"
          value={newTask}
          onChange={handleInputChange}
        />
        <button
          className="ml-2 rounded bg-blue-500 p-2 text-white"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={` mb-2  flex gap-2  align-center${
              task.completed ? 'line-through' : ''
            }`}
          >
            <Checkbox
              id="todo"
              checked={task.completed}
              onClick={() => {
                task.completed = !task.completed;
              }}
            />
            <Label htmlFor="todo">{task.text}</Label>
            <Label>
              <button
                className="ml-2 rounded bg-red-500 p-1 text-white"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
