import Replicate from "replicate";
import { NextResponse } from "next/server";




export  async function POST(req,res) {
  const replicate = new Replicate({
    auth: process.env.REPLICATeE_API_TOKEN,
  });
    try{
      const body=await req.json();
      const {prompt}=body;

      const output = await replicate.run(
        "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
        {
          input: {
            prompt : prompt,
            duration: 60,
          }
        }
      );
      return NextResponse.json(output);
      
    }catch(error){
       return NextResponse.json(error);
    }
  }
