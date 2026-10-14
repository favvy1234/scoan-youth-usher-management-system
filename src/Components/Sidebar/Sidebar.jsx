import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardCheck,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-[#1f2937] text-white border-r border-gray-700">

      <div className="p-8 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <img
            src="/Scoan.png"
            alt="SCOAN"
            className="w-12 h-12"
          />

          <div>
            <h1 className="text-xl font-bold">SCOAN</h1>
            <p className="text-sm text-gray-400">
              Youth & Usher
            </p>
          </div>
        </div>
      </div>

      <nav className="p-6 space-y-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-blue-600 transition"
        >
          <FaTachometerAlt />
          Dashboard
        </Link>

        <Link
          to="/members"
          className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-blue-600 transition"
        >
          <FaUsers />
          Members
        </Link>

        <Link
          to="/attendance"
          className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-blue-600 transition"
        >
          <FaClipboardCheck />
          Attendance
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-blue-600 transition"
        >
          <FaChartBar />
          Reports
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-blue-600 transition"
        >
          <FaCog />
          Settings
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;