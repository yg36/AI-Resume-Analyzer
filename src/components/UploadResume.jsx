"use client"

import { useState } from "react"
import {
  UploadCloud,
  Briefcase,
  FileText,
  File,
  Radar,
  CheckCircle2
} from "lucide-react"

export default function UploadResume({ setResult }) {

  const [file, setFile] = useState(null)
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [jobDescription, setJobDescription] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    if (!file) return alert("Upload a resume")

    const formData = new FormData()
    formData.append("resume", file)
    formData.append("role", role)
    formData.append("jobDescription", jobDescription)

    setLoading(true)

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    setResult(data)
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl max-w-2xl p-10 mx-auto space-y-10 hover:shadow-2xl transition"
    >

      {/* Header */}
      <div className="flex gap-3 mx-auto items-center justify-center ">

        <Radar className="text-blue-600 mt-1"/>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Resume Radar
          </h2>

          <p className="text-sm text-gray-500">
            AI powered resume diagnostics
          </p>
        </div>

      </div>


      {/* Radar Upload Section */}
      <div className="flex flex-col items-center justify-center space-y-6 py-6">

        <p className="text-gray-600 text-sm">
          Detect weaknesses in your resume
        </p>

        <label className="relative w-72 h-72 flex items-center justify-center cursor-pointer">

          {/* Radar Rings */}
          <div className="absolute w-full h-full rounded-full border border-blue-200"></div>
          <div className="absolute w-56 h-56 rounded-full border border-blue-200"></div>
          <div className="absolute w-40 h-40 rounded-full border border-blue-200"></div>

          {/* Radar Sweep */}
          <div className="absolute w-full h-full rounded-full overflow-hidden">

            <div className="absolute w-1/2 h-full bg-gradient-to-r from-blue-400/40 to-transparent origin-right animate-radar"></div>

          </div>

          {/* Radar Signal Dots */}
          <span className="absolute w-2 h-2 bg-red-500 rounded-full top-[30%] left-[65%] animate-pulse-slow"></span>
          <span className="absolute w-2 h-2 bg-red-500 rounded-full top-[20%] left-[25%] animate-pulse-slow"></span>
          <span className="absolute w-2 h-2 bg-red-500 rounded-full top-[85%] left-[50%] animate-pulse-slow"></span>

          {/* Upload Center */}
          <div className="relative bg-white border border-gray-200 shadow-lg px-4 py-3 rounded-3xl flex flex-col items-center hover:shadow-xl transition">

            <UploadCloud size={26} className="text-blue-600 mb-1"/>

            {!file && (
              <span className="text-sm text-gray-600">
                Upload Resume
              </span>
            )}

            {file && (
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <File size={16}/>
                {file.name}
              </div>
            )}

          </div>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e)=>setFile(e.target.files[0])}
            className="hidden"
          />

        </label>

        <p className="text-xs text-gray-400">
          Supports PDF • Max size 5MB
        </p>

      </div>


      {/* Role Input */}
      <div className="relative">

        <Briefcase
          size={18}
          className="absolute left-3 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Target Role (Frontend Developer, Data Analyst...)"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="border rounded-lg pl-10 pr-3 py-3 w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
        />

      </div>


      {/* Job Description */}
      <div className="relative">

        <FileText
          size={18}
          className="absolute left-3 top-4 text-gray-400"
        />

        <textarea
          placeholder="Paste the job description here for better analysis"
          value={jobDescription}
          onChange={(e)=>setJobDescription(e.target.value)}
          className="border rounded-lg pl-10 pr-3 py-3 w-full h-40 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition resize-none"
        />

      </div>


      {/* Button */}
      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] transition disabled:opacity-60 flex items-center justify-center gap-2"
      >

        {loading ? (
          "AI scanning your resume..."
        ) : (
          <>
            <Radar size={18}/>
            Analyze Resume
          </>
        )}

      </button>

      <p className="text-xs text-gray-400 text-center">
        Your resume is processed securely and never stored
      </p>


      {/* AI Checks Panel */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4 border">

        <h3 className="text-sm font-semibold text-gray-700">
          AI Analysis Includes
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {[
            "ATS compatibility",
            "Skill alignment",
            "Content clarity",
            "Formatting quality"
          ].map((item, i)=>(
            <div
              key={i}
              className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 text-sm text-gray-700 shadow-sm hover:shadow-md transition"
            >
              <CheckCircle2 size={16} className="text-green-500"/>
              {item}
            </div>
          ))}

        </div>

      </div>

    </form>
  )
}