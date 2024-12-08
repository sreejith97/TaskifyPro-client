"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskCreatePopup from "@/components/TaskCreatePopup/TaskCreatePopup";

const fetchProjects = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROD_SERVER}/projects`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  if (data && data.data) {
    return data.data;
  }
  throw new Error("Failed to fetch projects");
};

const fetchTasks = async (projectId, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROD_SERVER}/tasks/${projectId}`,
    {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tasks = await response.json();
  return tasks;
};

const updateTaskStatus = async (taskId, status, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROD_SERVER}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    }
  );
  return response.json();
};

const TaskBoard = ({ tasks, status, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`flex flex-col p-4 w-[full] max-w-[300px] max-h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition-all ${
        isOver ? "ring-2 ring-blue-500 bg-blue-100 dark:bg-blue-700" : ""
      }`}
    >
      <h2 className="text-xl font-semibold text-center mb-4">{status}</h2>

      <ul className="mt-2 space-y-4 overflow-y-auto">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <DraggableTask key={task.id} task={task} />
          ))}
      </ul>
      <div
        className={`flex-1 p-2 rounded border-dashed border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-center flex items-center justify-center ${
          tasks.filter((task) => task.status === status).length === 0
            ? "visible"
            : "invisible"
        }`}
      >
        Drop here
      </div>
    </div>
  );
};

const DraggableTask = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={`p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md transition-all ${
        isDragging ? "opacity-50" : "hover:shadow-lg"
      }`}
    >
      <strong className="block text-lg">{task.title}</strong>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        {task.description}
      </p>
    </li>
  );
};

const Page = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectList = await fetchProjects(token);
        setProjects(projectList);
        setLoading(false);
      } catch (err) {
        setError("Error fetching projects");
        setLoading(false);
      }
    };

    loadProjects();
  }, [token]);

  function getAssignedWorkers(projectId) {
    const project = projects.find((p) => p.projectId === projectId);
    return project ? project.assignedWorkers : [];
  }

  const handleProjectChange = async (event) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId);

    try {
      setLoading(true);
      const taskList = await fetchTasks(projectId, token);
      setTasks(taskList);
      setLoading(false);
    } catch (err) {
      setError("Error fetching tasks");
      setLoading(false);
    }
  };

  const handleTaskDrop = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus, token);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (err) {
      setError("Error updating task status");
    }
  };

  const handleNewTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to the list
    setShowPopup(false); // Close the popup after adding the task
  };
  console.log(projects);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <h1 className="text-2xl font-semibold mb-6 text-start">
          Task Management
        </h1>

        {loading && <p className="text-center text-lg">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex flex-row justify-between items-center ">
          <div className="mb-6 max-w-[300px]">
            <label htmlFor="project-dropdown" className="block text-lg mb-2">
              Select Project:
            </label>
            <select
              id="project-dropdown"
              value={selectedProjectId}
              onChange={handleProjectChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading || !projects.length}
            >
              <option value="">--Select a Project--</option>
              {projects.map((project) => (
                <option key={project.projectId} value={project.projectId}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>
          {selectedProjectId ? (
            <button
              onClick={() => setShowPopup(true)}
              className="p-3 bg-blue-500 text-white rounded-lg mb-6 h-[50px]"
            >
              Add New Task
            </button>
          ) : (
            ""
          )}
        </div>

        {showPopup && (
          <TaskCreatePopup
            onClose={() => setShowPopup(false)}
            onCreate={handleNewTask}
            projectId={selectedProjectId}
            token={token}
            availableWorkers={getAssignedWorkers(selectedProjectId)}
          />
        )}

        {selectedProjectId && (
          <div className="grid grid-cols-4 gap-3">
            {["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "OVERDUE"].map(
              (status) => (
                <TaskBoard
                  key={status}
                  tasks={tasks}
                  status={status}
                  onDrop={handleTaskDrop}
                />
              )
            )}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Page;
