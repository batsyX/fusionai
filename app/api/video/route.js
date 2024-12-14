import Replicate from "replicate";
import { NextResponse } from "next/server";
import axios from "axios";



export  async function POST(req,res) {

  const replicate = new Replicate({
      auth: process.env.REPLICATeE_API_TOKEN,
  });
  const body = await req.json();
  const {prompt}=body;
  const input = {
    prompt: "a woman is walking through a busy Tokyo street at night, she is wearing dark sunglasses"
  };

    try{
      const output = await replicate.run("minimax/video-01", { input });
      const buffer= await Buffer.
	    console.log(response.data);
      return NextResponse.json(response.data);
    }catch(error){
       return NextResponse.json(error);
    }
  }
