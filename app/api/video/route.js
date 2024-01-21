import Replicate from "replicate";
import { NextResponse } from "next/server";




export  async function POST(req,res) {
  const replicate = new Replicate({
    auth: process.env.REPLICATeE_API_TOKEN,
  });
    try{
      const body=await req.json();
      const {prompt,num_frames,fps}=body;

      const output = await replicate.run(
        "cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755",
        {
          input: {
            prompt: prompt,
            num_frames: parseInt(num_frames),
            fps: parseInt(fps),
          }
        }
      );
      return NextResponse.json(output);
      
    }catch(error){
       return NextResponse.json(error);
    }
  }