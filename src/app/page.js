"use client"

import { useState } from "react"
import UploadResume from "@/components/UploadResume"
import ResultDashboard from "@/components/ResultDashboard"

export default function Home() {

  const [result, setResult] = useState(null)

  return (
    <main className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        AI Resume Analyzer
      </h1>

      <UploadResume setResult={setResult} />

      {result && (
        <div className="mt-12">
          <ResultDashboard result={result}/>
        </div>
      )}

    </main>
  )
}