import { Search, MapPin, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function GoalSetting() {
  const [searchParams] = useSearchParams();

  const [showRolePopup, setShowRolePopup] = useState(false);
  const [role, setRole] = useState("learner");

  const email = searchParams.get("email");

  // ✅ CHECK ROLE FROM BACKEND
  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch("http://localhost:3000/users/checkrole", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error checking role");
        }

        // 👉 if pending → show popup
        if (data.status === "pending") {
          setShowRolePopup(true);
        }

      } catch (err) {
        console.error(err);
      }
    };

    if (email) {
      checkRole();
    }
  }, [email]);

  // ✅ SAVE ROLE
  const handleSaveRole = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to set role");
      }

      setShowRolePopup(false);

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>

          <h1 className="text-4xl font-bold text-purple-700 mb-2">
            Define Your Career Path
          </h1>

          <p className="text-purple-300 mb-8">
            Step 2 of 4: Goal Setting
          </p>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="h-3 bg-purple-100 rounded-full">
              <div className="h-3 w-1/2 bg-gradient-to-r from-purple-400 to-purple-700 rounded-full"></div>
            </div>

            <div className="flex items-center mt-3 text-sm text-purple-700">
              <CheckCircle size={18} className="mr-2 text-green-500"/>
              Basic Info
            </div>
          </div>

          {/* Job */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Target Job Title
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
              <Search className="text-gray-400 mr-2"/>
              <input
                type="text"
                placeholder="e.g., Data Analyst"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-2">
              Target Location
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
              <MapPin className="text-gray-400 mr-2"/>
              <input
                type="text"
                placeholder="e.g., Remote or Mumbai"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button className="w-full py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 shadow-md hover:scale-105 transition">
            Save & Continue
          </button>

          <p className="text-center text-purple-300 mt-4 cursor-pointer">
            Skip for Now
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex justify-center">
          <div className="w-72 h-72 bg-purple-100 rounded-full flex items-center justify-center">
            <p className="text-purple-500 text-center px-6">
              Illustration Here
            </p>
          </div>
        </div>

      </div>

      {/* 🔥 ROLE POPUP */}
      {showRolePopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-96 shadow-lg">

            <h2 className="text-xl font-semibold mb-4 text-center">
              Select Your Role
            </h2>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setRole("learner")}
                className={`w-1/2 py-2 rounded-lg border ${
                  role === "learner"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                Learner
              </button>

              <button
                onClick={() => setRole("mentor")}
                className={`w-1/2 py-2 rounded-lg border ${
                  role === "mentor"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                Mentor
              </button>
            </div>

            <button
              onClick={handleSaveRole}
              className="w-full py-2 bg-purple-600 text-white rounded-lg"
            >
              Continue
            </button>

          </div>
        </div>
      )}
    </div>
  );
}