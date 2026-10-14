import { useState } from "react";
import { FaTimes, FaCamera } from "react-icons/fa";

function AddMemberModal({ isOpen, onClose }) {
  const [member, setMember] = useState({
    fullName: "",
    gender: "",
    phone: "",
    address: "",
    workingGroup: "",
    status: "Active",
    dateJoined: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMember((previousMember) => ({
      ...previousMember,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setMember({
      fullName: "",
      gender: "",
      phone: "",
      address: "",
      workingGroup: "",
      status: "Active",
      dateJoined: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!member.fullName.trim()) {
      alert("Please enter the member's full name.");
      return;
    }

    if (!member.gender) {
      alert("Please select the member's gender.");
      return;
    }

    if (!member.phone.trim()) {
      alert("Please enter the member's phone number.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(member),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save member."
        );
      }

      console.log("Member saved successfully:", data.member);

      alert("Member Saved Successfully! ✅");

      resetForm();
      onClose();

    } catch (error) {
      console.error("Error saving member:", error);

      alert(
        error.message ||
          "Failed to save member. Please make sure the backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-8 py-6">

          <h2 className="text-2xl font-semibold text-blue-900">
            Add New Member
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 transition hover:text-red-500 disabled:opacity-50"
          >
            <FaTimes size={22} />
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[80vh] overflow-y-auto p-8 space-y-6"
        >

          {/* PROFILE PHOTO */}
          <div className="flex justify-center">

            <div className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-100 transition hover:bg-gray-200">

              <FaCamera className="mb-2 text-3xl text-gray-500" />

              <span className="text-sm text-gray-500">
                Upload Photo
              </span>

            </div>

          </div>

          {/* FULL NAME + GENDER */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={member.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Gender
              </label>

              <select
                name="gender"
                value={member.gender}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

          </div>

          {/* PHONE + DATE JOINED */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={member.phone}
                onChange={handleChange}
                placeholder="080..."
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Date Joined
              </label>

              <input
                type="date"
                name="dateJoined"
                value={member.dateJoined}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* ADDRESS */}
          <div>

            <label className="mb-2 block font-medium">
              Address
            </label>

            <textarea
              rows="3"
              name="address"
              value={member.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full resize-none rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* WORKING GROUP + STATUS */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium">
                Working Group
              </label>

              <select
                name="workingGroup"
                value={member.workingGroup}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select Working Group
                </option>

                <option value="Choir">
                  Choir
                </option>

                <option value="Bakery">
                  Bakery
                </option>

                <option value="Prophecy Department">
                  Prophecy Department
                </option>

                <option value="Supervisors">
                  Supervisors
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Status
              </label>

              <select
                name="status"
                value={member.status}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 border-t pt-6">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border px-6 py-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-900 px-8 py-3 text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Member"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddMemberModal;