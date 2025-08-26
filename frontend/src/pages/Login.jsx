import React, { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated , loading , user} = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="   flex h-full grow flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="layout-content-container flex flex-col w-[512px] max-w-[960px] py-5 flex-1"
      >
        <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Log in to your account
        </h2>

        {/* Email */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4  py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">
              Email
            </p>
            <input
              type="email"
              placeholder="Email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Password */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4  py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">
              Password
            </p>
            <input
              type="password"
              placeholder="Password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

      

        {/* Submit Button */}
        <div className="flex  py-3">
          <button
            type="submit"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#0d80f2] text-white text-base font-bold leading-normal tracking-[0.015em]"
            disabled = {loading}
          >
            <span className="truncate">{loading ? "Loading..." : "Log in"}</span>
          </button>
        </div>

        {/* Links */}
        <p className="text-[#60758a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer">
          Forgot password?
        </p>
        <p className="text-[#60758a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer">
          Don&apos;t have an account? Sign up
        </p>
      </form>
    </div>
  );
};

export default Login;
