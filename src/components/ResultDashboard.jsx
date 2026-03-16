import ScoreCard from "./ScoreCard"
import SectionCard from "./SectionCard"
import ResumeHealth from "./ResumeHealth"

import {
  CheckCircle,
  AlertTriangle,
  Wrench,
  Sparkles,
  Target,
  CheckCircle2
} from "lucide-react"

export default function ResultDashboard({ result }) {

  if (!result) return null

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Score + Skill Match */}
      <div className="grid md:grid-cols-3 gap-8 pb-10">

        <ScoreCard score={result.score || 0} />

        <ResumeHealth score={result.score || 0} />

        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between hover:shadow-xl transition">

          <div className="flex items-center gap-3">
            <Target className="text-purple-500"/>
            <span className="font-semibold text-lg">Skill Match</span>
          </div>

          <div className="text-3xl font-bold">
            {result.skill_match ?? 0}%
          </div>

        </div>

      </div>

      {/* Analysis Sections */}
      <div className="grid md:grid-cols-2 gap-8">

        <SectionCard
          title="Matched Skills"
          items={result.matched_skills || []}
          icon={<CheckCircle2 className="text-green-500"/>}
        />

        <SectionCard
          title="Missing Skills"
          items={result.missing_skills || []}
          icon={<Wrench className="text-orange-500"/>}
        />

        <SectionCard
          title="Strengths"
          items={result.strengths || []}
          icon={<CheckCircle className="text-green-500"/>}
        />

        <SectionCard
          title="Weaknesses"
          items={result.weaknesses || []}
          icon={<AlertTriangle className="text-red-500"/>}
        />

        <SectionCard
          title="Improvements"
          items={result.improvements || []}
          icon={<Sparkles className="text-blue-500"/>}
        />

      </div>

    </div>
  )
}