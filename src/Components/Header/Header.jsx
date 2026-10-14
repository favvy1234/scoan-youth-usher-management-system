import {
  FaSearch,
  FaBell,
  FaMoon,
  FaUserCircle,
} from "react-icons/fa";

function Header() {
  return (
    <header className="h-20 bg-[#1f2937] border-b border-gray-700 flex items-center justify-between px-8">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm">
          Welcome back, Admin
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-[#111827] border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white outline-none w-72"
          />
        </div>

        <button className="w-11 h-11 rounded-xl bg-[#111827] text-white flex items-center justify-center">
          <FaMoon />
        </button>

        <button className="w-11 h-11 rounded-xl bg-[#111827] text-white flex items-center justify-center">
          <FaBell />
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-4xl text-yellow-400" />

          <div>
            <h3 className="text-white font-semibold">
              Scoan Youth & Uher 
            </h3>

            <p className="text-gray-400 text-sm">
              Administrator
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Header;