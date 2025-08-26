import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLawyers } from "../store/slice/userSlice";
import { createChat,  } from "../store/slice/chatSlice";
import { useNavigate } from "react-router-dom";

const LawyerPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { users,user, loading } = useSelector((state) => state.user);
  const { currentChat } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchLawyers());
   
  }, [dispatch]);

 
  const lawyers = Array.isArray(user)
  ? user.filter((u) => u.role === "lawyer")
  : []; 
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (currentChat) {
     
  //   }
  // }, [currentChat, navigate]);
  const handleCreateChat = (otherUserId) => {
    navigate("/chat");
    dispatch(createChat(otherUserId))
  };
  const filteredLawyers = lawyers?.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#111418] text-[32px] font-bold leading-tight">
              Lawyer Directory
            </p>
            <p className="text-[#60758a] text-sm">
              Find the right legal expert for your needs.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full items-stretch rounded-lg h-full bg-[#f0f2f5]">
              <div className="text-[#60758a] flex items-center justify-center pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or specialization"
                className="form-input flex w-full px-4 text-base bg-[#f0f2f5] border-none focus:outline-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Lawyers List */}
        {loading ? (
          <p>Loading lawyers...</p>
        ) : (
          filteredLawyers.map((lawyer, idx) => (
            <div key={idx} className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-lg">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#111418] text-base font-bold leading-tight">
                    {lawyer.name}
                  </p>
                  <p className="text-[#60758a] text-sm">
                    
                  </p>
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleCreateChat(lawyer._id)}
                    >
                      Chat
                    </button>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                  style={{ backgroundImage: `url(${lawyer.profilePhoto})` }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LawyerPage;
