import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const speechFile = path.resolve("./speech.mp3");

export async function POST(req,res){
    try {
        const body =await req.json();
    
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: body.prompt,
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        const response = new NextResponse(buffer, {
            status: 200,
            headers: {
              "Content-Type": "audio/mpeg", // This indicates that the response is an audio file
              "Content-Disposition": 'attachment; filename="generated-audio.mp3"', // Suggests filename for download
            },
          });
        // await fs.promises.writeFile(speechFile, buffer);
        return response;

    } catch (error) {
        console.error("Error generating audio:", error);
        return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
    }
}