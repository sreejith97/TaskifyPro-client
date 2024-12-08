"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdOutlineOpenInNew } from "react-icons/md";
import Sidebar from "@/components/Sidebar/Sidebar";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [myWorkers, setMyWorkers] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PROD_SERVER}/projects`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch projects.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(selectedProjectDetails);
  }, [selectedProjectDetails]);

  const fetchMyWorkers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PROD_SERVER}/user/workers`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      setMyWorkers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch my workers.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchMyWorkers();
  }, []);

  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PROD_SERVER}/projects/${projectId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedProjectDetails(response.data.data);
      setIsSidebarOpen(true);
    } catch (err) {
      setError("Failed to fetch project details.");
    }
  };

  const createWorker = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_PROD_SERVER}/projects`,
        { name: newProject.name },
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      setError("Failed to create worker.");
    }
  };

  const memoizedProjects = useMemo(() => projects, [projects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center pb-8 px-4 sm:px-2">
      <div className="text-white w-full py-3 font-medium flex justify-between items-center flex-wrap">
        <h2 className="text-[25px] mb-2 sm:mb-0">My Projects</h2>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Create
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-medium mb-4">Create</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newProject.name}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              autoComplete="off"
            />
            <div className="flex justify-between">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={createWorker}
              >
                Create
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600 text-gray-300 mt-4">
        <thead>
          <tr>
            <th className="p-4 text-left bg-gray-100 dark:bg-gray-700">
              Project Name
            </th>
            <th className="p-4 text-left bg-gray-100 dark:bg-gray-700">
              Project Id
            </th>
            <th className="p-4 text-left bg-gray-100 dark:bg-gray-700">
              Total workers
            </th>
            <th className="p-4 text-left bg-gray-100 dark:bg-gray-700">
              Total tasks
            </th>
            <th className="p-4 text-left bg-gray-100 dark:bg-gray-700">
              Current status
            </th>
            <th className="p-4 text-left bg-gray-100 dark:bg-gray-700">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {memoizedProjects.map((project, index) => (
            <tr key={project.id || index}>
              <td className="p-4">{project?.projectName || "Project name"}</td>
              <td className="p-4">{project.projectId || "project ID"}</td>
              <td className="p-4">{project.totalWorkers || 0}</td>
              <td className="p-4">{project.totalTasks || 0}</td>
              <td className="p-4">Active</td>
              <td className="p-4">
                <MdOutlineOpenInNew
                  onClick={() => fetchProjectDetails(project.projectId)}
                  className="cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projectDetails={selectedProjectDetails}
        myWorkers={myWorkers}
        fetchProjectDetails={fetchProjectDetails}
        fetchProjects={fetchProjects}
      />
    </div>
  );
};

export default Projects;
