import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export  async function POST(req, res) {
    try {
        const body =await req.json();
    const {prompt} = body;
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      const response=(completion.choices[0]);
     return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
    
}