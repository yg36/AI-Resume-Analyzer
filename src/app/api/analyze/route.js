import { NextResponse } from "next/server"
import OpenAI from "openai"
import pdf from "pdf-parse"

export const runtime = "nodejs"

export async function POST(req) {
  try {

    const formData = await req.formData()
    const file = formData.get("resume")
    const role = formData.get("role")
    const jobDescription = formData.get("jobDescription")

    if (!file) {
      return NextResponse.json(
        { error: "No resume uploaded" },
        { status: 400 }
      )
    }

    // Convert uploaded file → Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Extract text from PDF
    const parsedPDF = await pdf(buffer)
    let resumeText = parsedPDF.text

    // Prevent huge prompts
    resumeText = resumeText.slice(0, 12000)

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const prompt = `
You are an ATS resume analyzer.

Evaluate the resume for this role: ${role}
Job description: ${jobDescription}

Return ONLY valid JSON in this format:

{
"score": number,
"skill_match" : percentage,
"matched_skills": [],
"strengths": [],
"weaknesses": [],
"missing_skills": [],
"improvements": []
}

Resume:
${resumeText}
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional resume reviewer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3
    })

    let result = completion.choices[0].message.content

    // Remove markdown code blocks if the model adds them
    result = result.replace(/```json/g, "")
    result = result.replace(/```/g, "")
    result = result.trim()

    // Convert string → real JSON
    const parsedResult = JSON.parse(result)

    return NextResponse.json(parsedResult)

  } catch (error) {

    console.error("SERVER ERROR:", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}