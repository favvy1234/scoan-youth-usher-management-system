import { useEffect, useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaUserCheck,
  FaCalendarAlt,
} from "react-icons/fa";

function Attendance() {
  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [search, setSearch] = useState("");
  const [attendanceType, setAttendanceType] =
    useState("Sunday");

  const [loadingMembers, setLoadingMembers] =
    useState(true);

  const [loadingAttendance, setLoadingAttendance] =
    useState(true);

  const [savingId, setSavingId] = useState(null);

  // ==========================================
  // LOAD MEMBERS
  // ==========================================
  const fetchMembers = async () => {
    try {
      setLoadingMembers(true);

      const response = await fetch(
        "http://localhost:5000/api/members"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load members."
        );
      }

      setMembers(data.members || []);
    } catch (error) {
      console.error(
        "Error loading members:",
        error
      );

      alert(
        "Could not load members. Make sure the backend is running."
      );
    } finally {
      setLoadingMembers(false);
    }
  };

  // ==========================================
  // LOAD TODAY'S ATTENDANCE
  // ==========================================
  const fetchAttendance = async () => {
    try {
      setLoadingAttendance(true);

      const response = await fetch(
        `http://localhost:5000/api/attendance/today?type=${attendanceType}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load attendance."
        );
      }

      setAttendance(data.attendance || []);
    } catch (error) {
      console.error(
        "Error loading attendance:",
        error
      );
    } finally {
      setLoadingAttendance(false);
    }
  };

  // ==========================================
  // LOAD DATA WHEN PAGE OPENS
  // ==========================================
  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [attendanceType]);

  // ==========================================
  // MARK ATTENDANCE
  // ==========================================
  const markAttendance = async (
    memberId,
    status
  ) => {
    try {
      setSavingId(memberId);

      const response = await fetch(
        "http://localhost:5000/api/attendance",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            memberId,
            status,
            attendanceType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to record attendance."
        );
      }

      alert(
        `${data.attendance.member.fullName} marked ${status}.`
      );

      await fetchAttendance();
    } catch (error) {
      console.error(
        "Attendance error:",
        error
      );

      alert(
        error.message ||
          "Failed to record attendance."
      );
    } finally {
      setSavingId(null);
    }
  };

  // ==========================================
  // CHECK IF MEMBER IS ALREADY PRESENT
  // ==========================================
  const isPresent = (memberId) => {
    return attendance.some(
      (record) =>
        record.member?._id === memberId
    );
  };

  // ==========================================
  // GET MEMBER'S ATTENDANCE STATUS
  // ==========================================
  const getAttendanceStatus = (memberId) => {
    const record = attendance.find(
      (item) =>
        item.member?._id === memberId
    );

    return record?.status || null;
  };

  // ==========================================
  // FILTER MEMBERS
  // ==========================================
  const filteredMembers = members.filter(
    (member) => {
      const searchText =
        search.toLowerCase();

      return (
        member.fullName
          ?.toLowerCase()
          .includes(searchText) ||
        member.phone
          ?.toLowerCase()
          .includes(searchText) ||
        member.workingGroup
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  // ==========================================
  // STATISTICS
  // ==========================================
  const totalMembers = members.length;

  const totalPresent = attendance.length;

  const totalEarly = attendance.filter(
    (item) => item.status === "Early"
  ).length;

  const totalLate = attendance.filter(
    (item) => item.status === "Late"
  ).length;

  const attendancePercentage =
    totalMembers > 0
      ? Math.round(
          (totalPresent / totalMembers) * 100
        )
      : 0;

  // ==========================================
  // DATE
  // ==========================================
  const today = new Date().toLocaleDateString(
    "en-NG",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-[#0f172a] p-8">
      <div className="max-w-7xl mx-auto">

        {/* =====================================
            PAGE HEADER
        ====================================== */}
        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h1 className="text-4xl font-bold text-white">
                Attendance
              </h1>

              <p className="text-gray-400 mt-2">
                Record and manage member attendance.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#1e293b] border border-gray-700 px-5 py-4 rounded-2xl">
              <FaCalendarAlt className="text-yellow-500" />

              <div>
                <p className="text-xs text-gray-500">
                  TODAY
                </p>

                <p className="text-white font-semibold">
                  {today}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* =====================================
            ATTENDANCE TYPE
        ====================================== */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-3xl p-6 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h2 className="text-xl font-bold text-white">
                Attendance Type
              </h2>

              <p className="text-gray-400 mt-1">
                Select the service or class you are recording.
              </p>
            </div>

            <select
              value={attendanceType}
              onChange={(e) =>
                setAttendanceType(
                  e.target.value
                )
              }
              className="bg-[#111827] border border-gray-600 text-white rounded-xl px-5 py-3 outline-none focus:border-yellow-400"
            >
              <option value="Sunday">
                Sunday Service
              </option>

              <option value="Saturday">
                Saturday Posting
              </option>

              <option value="Wednesday">
                Wednesday Class
              </option>
            </select>

          </div>

        </div>

        {/* =====================================
            STATISTICS
        ====================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* TOTAL MEMBERS */}
          <div className="bg-[#1e293b] border border-gray-700 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400">
                  Total Members
                </p>

                <p className="text-3xl font-bold text-white mt-2">
                  {totalMembers}
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <FaUsers className="text-blue-400 text-xl" />
              </div>

            </div>

          </div>

          {/* PRESENT */}
          <div className="bg-[#1e293b] border border-gray-700 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400">
                  Present Today
                </p>

                <p className="text-3xl font-bold text-white mt-2">
                  {totalPresent}
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <FaUserCheck className="text-green-400 text-xl" />
              </div>

            </div>

          </div>

          {/* EARLY */}
          <div className="bg-[#1e293b] border border-gray-700 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400">
                  Early
                </p>

                <p className="text-3xl font-bold text-green-400 mt-2">
                  {totalEarly}
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <FaCheckCircle className="text-green-400 text-xl" />
              </div>

            </div>

          </div>

          {/* LATE */}
          <div className="bg-[#1e293b] border border-gray-700 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400">
                  Late
                </p>

                <p className="text-3xl font-bold text-red-400 mt-2">
                  {totalLate}
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center">
                <FaClock className="text-red-400 text-xl" />
              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            ATTENDANCE PERCENTAGE
        ====================================== */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-3xl p-6 mb-8">

          <div className="flex items-center justify-between mb-3">

            <div>
              <p className="text-gray-400">
                Today's Attendance Percentage
              </p>

              <p className="text-2xl font-bold text-white mt-1">
                {attendancePercentage}%
              </p>
            </div>

            <p className="text-gray-400">
              {totalPresent} / {totalMembers}
            </p>

          </div>

          <div className="w-full bg-gray-700 rounded-full h-3">

            <div
              className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${attendancePercentage}%`,
              }}
            />

          </div>

        </div>

        {/* =====================================
            MEMBER SIGN-IN
        ====================================== */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-3xl">

          {/* HEADER */}
          <div className="p-8 border-b border-gray-700">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Member Sign-In
                </h2>

                <p className="text-gray-400 mt-1">
                  Select a member and record their attendance.
                </p>
              </div>

              <div className="relative">

                <FaSearch className="absolute left-4 top-4 text-gray-500" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search member..."
                  className="w-full md:w-80 bg-[#111827] border border-gray-600 rounded-xl pl-11 pr-5 py-3 text-white outline-none focus:border-yellow-400"
                />

              </div>

            </div>

          </div>

          {/* MEMBERS */}
          <div className="p-8">

            {loadingMembers ? (

              <div className="text-center py-12">
                <p className="text-gray-400">
                  Loading members...
                </p>
              </div>

            ) : filteredMembers.length === 0 ? (

              <div className="text-center py-12">

                <FaUsers className="mx-auto text-5xl text-gray-600 mb-4" />

                <p className="text-gray-400">
                  No members found.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {filteredMembers.map(
                  (member) => {

                    const present =
                      isPresent(member._id);

                    const status =
                      getAttendanceStatus(
                        member._id
                      );

                    return (
                      <div
                        key={member._id}
                        className="bg-[#111827] border border-gray-700 rounded-2xl p-5"
                      >

                        {/* MEMBER INFO */}
                        <div className="flex items-center gap-4 mb-5">

                          <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">

                            <FaUserCheck className="text-yellow-400" />

                          </div>

                          <div className="min-w-0">

                            <h3 className="text-white font-bold truncate">
                              {member.fullName}
                            </h3>

                            <p className="text-gray-500 text-sm">
                              {member.workingGroup ||
                                "No Department"}
                            </p>

                          </div>

                        </div>

                        {/* STATUS */}
                        {present ? (

                          <div
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-4 ${
                              status === "Early"
                                ? "bg-green-500/10 border border-green-500/30"
                                : "bg-red-500/10 border border-red-500/30"
                            }`}
                          >

                            {status === "Early" ? (
                              <FaCheckCircle className="text-green-400" />
                            ) : (
                              <FaClock className="text-red-400" />
                            )}

                            <span
                              className={
                                status === "Early"
                                  ? "text-green-400 font-semibold"
                                  : "text-red-400 font-semibold"
                              }
                            >
                              {status}
                            </span>

                          </div>

                        ) : (

                          <div className="grid grid-cols-2 gap-3">

                            {/* EARLY BUTTON */}
                            <button
                              type="button"
                              disabled={
                                savingId ===
                                member._id
                              }
                              onClick={() =>
                                markAttendance(
                                  member._id,
                                  "Early"
                                )
                              }
                              className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                            >

                              <FaCheckCircle />

                              Early

                            </button>

                            {/* LATE BUTTON */}
                            <button
                              type="button"
                              disabled={
                                savingId ===
                                member._id
                              }
                              onClick={() =>
                                markAttendance(
                                  member._id,
                                  "Late"
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                            >

                              <FaClock />

                              Late

                            </button>

                          </div>

                        )}

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </div>

        {/* =====================================
            TODAY'S ATTENDANCE
        ====================================== */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-3xl mt-8">

          <div className="p-8 border-b border-gray-700">

            <h2 className="text-2xl font-bold text-white">
              Today's Attendance
            </h2>

            <p className="text-gray-400 mt-1">
              Members who have signed in today.
            </p>

          </div>

          <div className="p-8 overflow-x-auto">

            {loadingAttendance ? (

              <p className="text-center text-gray-400 py-10">
                Loading attendance...
              </p>

            ) : attendance.length === 0 ? (

              <div className="text-center py-10">

                <FaUserCheck className="mx-auto text-5xl text-gray-600 mb-4" />

                <p className="text-gray-400">
                  No attendance recorded yet.
                </p>

              </div>

            ) : (

              <table className="w-full min-w-[700px]">

                <thead>

                  <tr className="border-b border-gray-700">

                    <th className="text-left text-gray-400 px-5 py-4">
                      #
                    </th>

                    <th className="text-left text-gray-400 px-5 py-4">
                      Member
                    </th>

                    <th className="text-left text-gray-400 px-5 py-4">
                      Department
                    </th>

                    <th className="text-left text-gray-400 px-5 py-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {attendance.map(
                    (record, index) => (

                      <tr
                        key={record._id}
                        className="border-b border-gray-800"
                      >

                        <td className="px-5 py-5 text-gray-400">
                          {index + 1}
                        </td>

                        <td className="px-5 py-5 text-white font-semibold">
                          {record.member?.fullName ||
                            "Unknown Member"}
                        </td>

                        <td className="px-5 py-5 text-gray-300">
                          {record.member
                            ?.workingGroup ||
                            "-"}
                        </td>

                        <td className="px-5 py-5">

                          {record.status ===
                          "Early" ? (

                            <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold">

                              <FaCheckCircle />

                              Early

                            </span>

                          ) : (

                            <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full font-semibold">

                              <FaClock />

                              Late

                            </span>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Attendance;