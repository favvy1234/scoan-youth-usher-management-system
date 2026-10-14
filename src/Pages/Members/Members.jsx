import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaSearch,
  FaQrcode,
  FaTimes,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";

function Members() {
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    phone: "",
    address: "",
    workingGroup: "",
    status: "Active",
    
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedMember, setSelectedMember] =
    useState(null);

  // ==========================================
  // LOAD MEMBERS
  // ==========================================
  const fetchMembers = async () => {
    try {
      setLoading(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // RESET FORM
  // ==========================================
  const resetForm = () => {
    setFormData({
      fullName: "",
      gender: "",
      phone: "",
      address: "",
      workingGroup: "",
      status: "Active",
      dateJoined: "",
    });
  };

  // ==========================================
  // SAVE MEMBER
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.gender ||
      !formData.phone
    ) {
      alert(
        "Please enter full name, gender and phone number."
      );

      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5000/api/members",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save member."
        );
      }

      alert("Member Saved Successfully!");

      resetForm();

      await fetchMembers();
    } catch (error) {
      console.error(
        "Error saving member:",
        error
      );

      alert(
        error.message ||
          "Failed to save member."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // SEARCH
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

  return (
    <div className="min-h-screen bg-[#0f172a] p-8">
      <div className="max-w-7xl mx-auto">

        {/* =====================================
            PAGE HEADER
        ====================================== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Members
            </h1>

            <p className="text-gray-400 mt-2">
              Register and manage Youth and Usher members.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#1e293b] border border-gray-700 px-5 py-4 rounded-2xl">
            <FaUsers className="text-yellow-400 text-xl" />

            <div>
              <p className="text-xs text-gray-500">
                TOTAL MEMBERS
              </p>

              <p className="text-white font-bold text-xl">
                {members.length}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            ADD MEMBER FORM
        ====================================== */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-3xl p-8 mb-8">

          <div className="flex items-center gap-3 mb-7">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
              <FaUserPlus className="text-yellow-400 text-xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Add New Member
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Register a new member in the system.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* FULL NAME */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full bg-[#111827] border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                />
              </div>

              {/* GENDER */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-[#111827] border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                >
                  <option value="">
                    Select gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>
                </select>
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full bg-[#111827] border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                />
              </div>

              {/* WORKING GROUP */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Working Group
                </label>

                <input
                  type="text"
                  name="workingGroup"
                  value={formData.workingGroup}
                  onChange={handleChange}
                  placeholder="e.g. Youth, Usher, Choir"
                  className="w-full bg-[#111827] border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                />
              </div>

              {/* DATE JOINED */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Date Joined
                </label>

                <input
                  type="date"
                  name="dateJoined"
                  value={formData.dateJoined}
                  onChange={handleChange}
                  className="w-full bg-[#111827] border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-[#111827] border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

              {/* ADDRESS */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  rows="3"
                  className="w-full bg-[#111827] border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 resize-none"
                />
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-7">

              <button
                type="submit"
                disabled={saving}
                className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-bold px-7 py-3 rounded-xl transition"
              >
                {saving
                  ? "Saving..."
                  : "Save Member"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-7 py-3 rounded-xl transition"
              >
                Reset
              </button>

            </div>
          </form>
        </div>

        {/* =====================================
            MEMBER LIST
        ====================================== */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-3xl">

          <div className="p-8 border-b border-gray-700">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Registered Members
                </h2>

                <p className="text-gray-400 mt-1">
                  Members currently stored in the system.
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
                  placeholder="Search members..."
                  className="w-full md:w-80 bg-[#111827] border border-gray-600 rounded-xl pl-11 pr-5 py-3 text-white outline-none focus:border-yellow-400"
                />
              </div>

            </div>
          </div>

          <div className="p-8 overflow-x-auto">

            {loading ? (
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
              <table className="w-full min-w-[900px]">

                <thead>
                  <tr className="border-b border-gray-700">

                    <th className="text-left text-gray-400 px-5 py-4">
                      #
                    </th>

                    <th className="text-left text-gray-400 px-5 py-4">
                      Member
                    </th>

                    <th className="text-left text-gray-400 px-5 py-4">
                      Gender
                    </th>

                    <th className="text-left text-gray-400 px-5 py-4">
                      Phone
                    </th>

                    <th className="text-left text-gray-400 px-5 py-4">
                      Working Group
                    </th>

                    <th className="text-left text-gray-400 px-5 py-4">
                      Status
                    </th>

                    <th className="text-left text-gray-400 px-5 py-4">
                      QR Code
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredMembers.map(
                    (member, index) => (
                      <tr
                        key={member._id}
                        className="border-b border-gray-800 hover:bg-[#111827]"
                      >

                        <td className="px-5 py-5 text-gray-400">
                          {index + 1}
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-white font-semibold">
                            {member.fullName}
                          </p>

                          <p className="text-gray-500 text-sm mt-1">
                            {member.dateJoined
                              ? new Date(
                                  member.dateJoined
                                ).toLocaleDateString()
                              : "No date"}
                          </p>
                        </td>

                        <td className="px-5 py-5 text-gray-300">
                          {member.gender}
                        </td>

                        <td className="px-5 py-5 text-gray-300">
                          {member.phone}
                        </td>

                        <td className="px-5 py-5 text-gray-300">
                          {member.workingGroup ||
                            "Not assigned"}
                        </td>

                        <td className="px-5 py-5">

                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                              member.status ===
                              "Active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {member.status}
                          </span>

                        </td>

                        <td className="px-5 py-5">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedMember(
                                member
                              )
                            }
                            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl transition"
                          >
                            <FaQrcode />
                            View QR
                          </button>

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

      {/* =====================================
          QR CODE MODAL
      ====================================== */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5">

          <div className="bg-[#1e293b] border border-gray-700 rounded-3xl p-8 w-full max-w-md">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Member QR Code
                </h2>

                <p className="text-gray-400 mt-1">
                  Scan this code for attendance.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMember(null)
                }
                className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white"
              >
                <FaTimes />
              </button>

            </div>

            <div className="bg-white rounded-2xl p-6 flex justify-center">
              <QRCodeSVG
                value={selectedMember._id}
                size={240}
                level="H"
              />
            </div>

            <div className="text-center mt-6">

              <h3 className="text-white text-xl font-bold">
                {selectedMember.fullName}
              </h3>

              <p className="text-gray-400 mt-1">
                {selectedMember.workingGroup ||
                  "No Working Group"}
              </p>

              <p className="text-gray-600 text-xs mt-4 break-all">
                Member ID: {selectedMember._id}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedMember(null)
              }
              className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Members;