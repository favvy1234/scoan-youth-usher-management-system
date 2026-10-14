import { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import {
  FaUsers,
  FaClipboardCheck,
  FaTasks,
  FaChartLine,
} from "react-icons/fa";

function Dashboard() {
  const images = [
    "/tbjoshua.jpg",
    "/tbjoshua2.jpg",
    "/pastorevelynjoshua.jpg",
    "/pastorevelynjoshua2.jpg", 
    "/pastorevelynjoshua3.jpg",
    "/pastorevelynjoshua4.jpg",
    "/evangelistjames.jpg",
    "/evangelistjames2.jpg",
    "/evangelistjoseph.jpg",
    "/evangelistjoseph2.jpg",
    "/evangelistchisom.jpg",
     "/evangelistchisom2.jpg",
     "/evangelistopeyemi.jpg",
     "/evangelistopeyemi2.jpg",
    "/scoanfamily.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 2) % images.length);
    }, 1000);

    return () => clearInterval(slide);
  }, []);

  const cards = [
    {
      title: "Members",
      value: "0",
      icon: <FaUsers />,
      color: "from-blue-800 to-blue-400",
    },
    {
      title: "Attendance",
      value: "0",
      icon: <FaClipboardCheck />,
      color: "from-green-600 to-green-400",
    },
    {
      title: "Postings",
      value: "0",
      icon: <FaTasks />,
      color: "from-yellow-500 to-orange-400",
    },
    {
      title: "Reports",
      value: "0",
      icon: <FaChartLine />,
      color: "from-red-600 to-red-400",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-8">

          {/* SLIDESHOW */}

          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">

            <img
              src={images[current]}
              alt=""
              className="w-full h-half object-cover duration-700"
            />

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end pb-14 px-14">

              <h1 className="text-5xl font-bold text-white">
                SCOAN Youth & Usher
              </h1>

              <h2 className="text-4xl font-bold text-yellow-400 mt-2">
                Management System
              </h2>

              <p className="text-lg text-gray-200 mt-5 max-w-3xl leading-8">
                Welcome to the official SCOAN Youth & Usher Management System.
                Manage attendance, members, postings, reports and every church
                activity from one professional dashboard. 
                NOT MINE BUT GODS OWN.the vision remains thesame the journey continues.
                CHANGING LIVES CHANGING NATIONS AND CHANGING THE WORLD
                EMMANUEL GOD WITH US
              </p>

            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full ${
                    current === index ? "bg-yellow-400" : "bg-white/60"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* STATISTICS */}

          <div className="grid grid-cols-4 gap-6 mt-8">

            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-[#1e293b] rounded-2xl p-6 shadow-lg border border-gray-700 hover:scale-105 duration-300"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-gray-400">
                      {card.title}
                    </p>

                    <h1 className="text-5xl font-bold text-white mt-3">
                      {card.value}
                    </h1>

                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-3xl text-white`}
                  >
                    {card.icon}
                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* BOTTOM */}

          <div className="grid grid-cols-2 gap-6 mt-8">

            <div className="bg-[#1e293b] rounded-2xl p-8 border border-gray-700">

              <h2 className="text-2xl font-bold text-white mb-6">
                Recent Activities
              </h2>

              <div className="space-y-5">

                <div className="bg-[#0f172a] rounded-xl p-4">
                  <p className="text-white">
                    No attendance has been recorded today.
                  </p>
                </div>

                <div className="bg-[#0f172a] rounded-xl p-4">
                  <p className="text-white">
                    No new member has been registered.
                  </p>
                </div>

                <div className="bg-[#0f172a] rounded-xl p-4">
                  <p className="text-white">
                    Saturday and Sunday postings will appear here.
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-[#1e293b] rounded-2xl p-8 border border-gray-700">

              <h2 className="text-2xl font-bold text-white mb-6">
                Today's Summary
              </h2>

              <div className="space-y-6">

                <div className="flex justify-between">
                  <span className="text-gray-400">Present</span>
                  <span className="text-white font-bold">0</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Early</span>
                  <span className="text-green-400 font-bold">0</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Late</span>
                  <span className="text-red-400 font-bold">0</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Working Groups</span>
                  <span className="text-yellow-400 font-bold">4</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">QR Sign-ins</span>
                  <span className="text-blue-400 font-bold">0</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;