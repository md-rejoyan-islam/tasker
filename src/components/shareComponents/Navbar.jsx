import { useState } from "react";
import logo from "../../assets/tasker.png";
import SearchForm from "../SearchForm";
export default function Navbar() {
  return (
    <nav className="py-6 md:py-8 fixed top-0 right-0  w-full !bg-[#191D26] z-50">
      <div className="xl:max-w-[1350px] container mx-auto flex items-center justify-between gap-x-6">
        {/* Logo  */}
        <a href="/" className="flex gap-2 items-center">
          <img className="h-[45px]" src={logo} alt="Lws" />{" "}
          <span className="text-[#f5bf42] text-2xl font-bold">Tasker</span>
        </a>
        {/* Logo Ends  */}
      </div>
    </nav>
  );
}
