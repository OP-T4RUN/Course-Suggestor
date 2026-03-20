import { useState } from "react";
import { UploadCloud, Plus } from "lucide-react";

export default function PortfolioPage() {
  const [skills, setSkills] = useState([
    "Python",
    "Project Management",
    "Data Analysis",
    "SQL",
    "AWS",
    "Skill Cloud",
  ]);

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Build Your Profile
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Step 3 of 4: Skills & Experience
        </p>

        {/* Progress */}
        <div className="w-full flex items-center justify-center mb-10">
          <div className="w-2/3">
            <p className="text-purple-600 mb-2">✔ Goal Setting</p>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div className="h-3 w-3/4 bg-gradient-to-r from-purple-400 to-purple-700 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Resume Upload */}
          <div>
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-10 text-center">
              <UploadCloud size={50} className="mx-auto text-purple-500 mb-4" />

              <h3 className="font-semibold mb-2">
                Auto-fill from Resume
              </h3>

              <p className="text-gray-500">
                Drag and drop your resume here or
              </p>

              <button className="text-purple-600 font-medium mt-2">
                Browse files
              </button>
            </div>

            <button className="mt-8 w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition">
              Save & Continue
            </button>

            <p className="text-center text-gray-400 mt-4">
              Skip for Now
            </p>
          </div>

          {/* Skills Section */}
          <div>

            <h2 className="text-2xl font-bold mb-2">
              Manual Skill Entry
            </h2>

            <p className="text-gray-500 mb-4">
              Add Skills & Tools
            </p>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-3 mb-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Add Skill */}
            <div className="flex gap-3 mb-8">
              <input
                type="text"
                placeholder="Add New Skills"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none"
              />

              <button
                onClick={addSkill}
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-3 rounded-lg"
              >
                <Plus />
              </button>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Certifications
                </h3>

                <button className="border px-4 py-2 rounded-lg text-sm">
                  Add Certification
                </button>
              </div>

              <div className="space-y-4">

                <div className="border rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      AWS Certified Solutions Architect
                    </p>
                    <p className="text-gray-500 text-sm">
                      Amazon Web Services
                    </p>
                  </div>
                  <span className="text-gray-400">⋮</span>
                </div>

                <div className="border rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      PMP - Project Management Professional
                    </p>
                    <p className="text-gray-500 text-sm">
                      PMI
                    </p>
                  </div>
                  <span className="text-gray-400">⋮</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}