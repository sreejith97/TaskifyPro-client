"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Workers = () => {

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newWorker, setNewWorker] = useState({
    email: "",
    password: "",
    role: "WORKER",
    name: "",
  }); 
  const token = useSelector((state) => state.auth.token);

  
  const fetchWorkers = async () => {
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
      setWorkers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch workers.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []); 

  
  const toggleWorkerStatus = async (workerId, currentStatus) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_PROD_SERVER}/user/update-status`,
        {
          workerId: workerId,
          status: !currentStatus,
        },
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     
      fetchWorkers();
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  const createWorker = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_PROD_SERVER}/user/create-worker`,
        {
          email: newWorker.email,
          password: newWorker.password,
          role: newWorker.role,
          name: newWorker.name,
        },
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsModalOpen(false);
      fetchWorkers();
    } catch (err) {
      setError("Failed to create worker.");
    }
  };

  const memoizedWorkers = useMemo(() => workers, [workers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker((prevState) => ({
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
        <h2 className="text-[25px] mb-2 sm:mb-0">My Workers</h2>
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
            <h2 className="text-xl font-medium mb-4">Create Worker</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newWorker.name}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              autoComplete="off"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newWorker.email}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newWorker.password}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              autoComplete="off"
            />
            <select
              name="role"
              value={newWorker.role}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            >
              <option value="WORKER">Worker</option>
              <option value="ADMIN">Admin</option>
            </select>
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
              Worker Name
            </th>
            <th className="p-4 text-left bg-gray-100 dark:bg-gray-700">
              Email
            </th>
            <th className="p-4 text-left bg-gray-100 dark:bg-gray-700">
              Created By
            </th>
            <th className="p-4 text-left bg-gray-100 dark:bg-gray-700">
              Active
            </th>
          </tr>
        </thead>
        <tbody>
          {memoizedWorkers.map((worker) => (
            <tr key={worker.email}>
              <td className="p-4">{worker.workerName}</td>
              <td className="p-4">{worker.email}</td>
              <td className="p-4">{worker.createdBy}</td>
              <td className="p-4">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={worker.active}
                    onChange={() =>
                      toggleWorkerStatus(worker.workerId, worker.active)
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workers;
