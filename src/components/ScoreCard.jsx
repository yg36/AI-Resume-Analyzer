import { Trophy } from "lucide-react"

export default function ScoreCard({ score }) {

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">

      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-yellow-500"/>
        <span className="font-semibold text-lg">ATS Score</span>
      </div>

      <div className="text-3xl font-bold mb-3">
        {score}/100
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>

    </div>
  )
}