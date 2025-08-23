import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({ name, email, password, agree });
    // Call signup API here
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="layout-content-container flex flex-col w-[512px] max-w-[960px] py-5 px-4 bg-white shadow-md rounded-2xl"
      >
        <h2 className="text-[#111418] text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Create an account
        </h2>

        {/* Name */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 self-center w-full">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium pb-2">Full Name</p>
            <input
              type="text"
              placeholder="Your name"
              className="form-input w-full rounded-lg border border-[#dbe0e6] h-14 p-[15px] text-base text-[#111418] placeholder:text-[#60758a] focus:outline-0 focus:ring-0 focus:border-[#dbe0e6]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Email */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 self-center w-full">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium pb-2">Email</p>
            <input
              type="email"
              placeholder="Email"
              className="form-input w-full rounded-lg border border-[#dbe0e6] h-14 p-[15px] text-base text-[#111418] placeholder:text-[#60758a] focus:outline-0 focus:ring-0 focus:border-[#dbe0e6]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Password */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 self-center w-full">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium pb-2">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="form-input w-full rounded-lg border border-[#dbe0e6] h-14 p-[15px] text-base text-[#111418] placeholder:text-[#60758a] focus:outline-0 focus:ring-0 focus:border-[#dbe0e6]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Confirm Password */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 self-center w-full">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium pb-2">
              Confirm Password
            </p>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input w-full rounded-lg border border-[#dbe0e6] h-14 p-[15px] text-base text-[#111418] placeholder:text-[#60758a] focus:outline-0 focus:ring-0 focus:border-[#dbe0e6]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center gap-2 px-4 py-3">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-[#dbe0e6] border-2 text-[#0d80f2] focus:ring-0 focus:outline-none"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <p className="text-[#60758a] text-sm">
            I agree to the <span className="underline cursor-pointer">Terms & Conditions</span>
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex px-4 py-3">
          <button
            type="submit"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 flex-1 bg-[#0d80f2] text-white text-base font-bold tracking-[0.015em]"
          >
            <span className="truncate">Sign up</span>
          </button>
        </div>

        {/* Already have an account? */}
        <p className="text-[#60758a] text-sm text-center pb-3 pt-1 px-4">
          Already have an account?{" "}
          <span className="underline cursor-pointer">Log in</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
