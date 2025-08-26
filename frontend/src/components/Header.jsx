import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3 bg-black">
      {/* Left Side - Logo + Title */}
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          LegalConnect
        </h2>
      </div>

      {/* Right Side - Links + Button */}
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a
            className="text-white text-sm font-medium leading-normal"
            href="#"
          >
            For Lawyers
          </a>
        </div>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Sign up</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
