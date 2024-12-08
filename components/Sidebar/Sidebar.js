import axios from "axios";
import React, { useEffect } from "react";
import { MdArrowForwardIos, MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";

const Sidebar = ({
  isOpen,
  onClose,
  projectDetails,
  myWorkers,
  fetchProjectDetails,
  fetchProjects,
}) => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const handleClickOutside = (e) => {
    if (e.target.id === "sidebar-overlay") {
      onClose();
    }
  };

  const addWorkerToProject = async (workerId) => {
    console.log("heyy");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_PROD_SERVER}/projects/{adminId}/assign-workers`, 
        {
          projectId: projectDetails?.projectId,
          workers: [workerId],
        },
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }
      );

      fetchProjectDetails(projectDetails?.projectId);
      fetchProjects();

      // setSelectedProjectDetails(response.data.data);
      // setIsSidebarOpen(true);
    } catch (err) {
      console.log("Failed to add worker project details.");
    }
  };

  return (
    <div
      id="sidebar-overlay"
      onClick={handleClickOutside}
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed right-0 top-0 h-full bg-gray-800 overflow-auto text-white p-6 w-[550px] shadow-xl transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="flex flex-row items-center justify-between gap-x-1  text-white px-4 py-2 rounded-lg  mb-4"
          onClick={onClose}
        >
          Close
          <MdArrowForwardIos className="text-[13px]" />
        </button>
        {projectDetails && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {projectDetails?.projectName}
            </h2>

            <div className="table">
              <div className="row">
                <div className="cell w-[200px] text-start">
                  {" "}
                  <p className="font-medium">Project ID</p>
                </div>
                <div className="cell flex-1">
                  <p>{projectDetails.projectId}</p>
                </div>
              </div>

              <div className="row">
                <div className="cell w-[200px] text-start">
                  {" "}
                  <p className="font-medium">Total Workers</p>
                </div>
                <div className="cell flex-1">
                  <p>{projectDetails.totalWorkers}</p>
                </div>
              </div>
              <div className="row">
                <div className="cell w-[200px] text-start">
                  {" "}
                  <p className="font-medium">Total Tasks</p>
                </div>
                <div className="cell flex-1">
                  <p>{projectDetails.totalTasks}</p>
                </div>
              </div>

              <div className="row">
                <div className="cell w-[200px] text-start">
                  {" "}
                  <p className="font-medium">Project ID</p>
                </div>
                <div className="cell flex-1">
                  <p>{projectDetails.projectId}</p>
                </div>
              </div>

              <div className="row">
                <div className="cell w-[200px] text-start">
                  {" "}
                  <p className="font-medium">Project ID</p>
                </div>
                <div className="cell flex-1">
                  <p>{projectDetails.projectId}</p>
                </div>
              </div>

              <div className="row">
                <div className="cell w-[200px] text-start">
                  {" "}
                  <p className="font-medium">Assigned Workers</p>
                </div>
                <div className="cell flex-1 flex flex-row flex-wrap gap-x-2 gap-y-2">
                  {projectDetails.assignedWorkers.map((worker) => (
                    <div key={worker.workerId}>
                      <div
                        className="bg-gray-600 rounded-md px-2 py-1 flex flex-row items-center justify-center gap-x-3"
                        key={worker.workerId}
                      >
                        {worker.workerName}
                      </div>
                    </div>
                  ))}
                  {role === "ADMIN"
                    ? myWorkers
                        ?.filter(
                          (worker) =>
                            !projectDetails?.assignedWorkers
                              .map((worker) => worker?.workerId)
                              ?.includes(worker.workerId)
                        )
                        ?.map((worker) => (
                          <div key={worker.workerId}>
                            <div
                              className="bg-gray-600 rounded-md px-2 py-1 flex flex-row items-center justify-center gap-x-3"
                              key={worker.workerId}
                            >
                              {worker.workerName}
                              <div>
                                <MdOutlineClose
                                  className="cursor-pointer text-[20px] rotate-45"
                                  onClick={() =>
                                    addWorkerToProject(worker?.workerId)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))
                    : ""}

         
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
