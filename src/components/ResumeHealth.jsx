import { HeartPulse } from "lucide-react"

export default function ResumeHealth({ score }) {

  let label = "Needs Improvement"
  let color = "text-red-500"
  let bg = "bg-red-100"

  if (score >= 80) {
    label = "Excellent"
    color = "text-green-600"
    bg = "bg-green-100"
  }
  else if (score >= 60) {
    label = "Average"
    color = "text-yellow-600"
    bg = "bg-yellow-100"
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">

      <div className="flex items-center gap-2 mb-3">
        <HeartPulse className={color}/>
        <span className="font-semibold text-lg">Resume Health</span>
      </div>

      <div className={`inline-block px-4 py-2 rounded-full ${bg} ${color} font-semibold`}>
        {label}
      </div>

    </div>
  )
}