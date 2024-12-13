// import Replicate from "replicate";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});



export  async function POST(req,res) {

  // const replicate = new Replicate({
  //   auth: process.env.REPLICATeE_API_TOKEN,
  // });
    try{
      const body=await req.json();
      const {prompt,num_outputs}=body;

      // const output = await replicate.run(
      //   "fofr/realvisxl-v3:33279060bbbb8858700eb2146350a98d96ef334fcf817f37eb05915e1534aa1c",
      //   {
      //     input: {
      //       prompt: prompt,
      //       num_outputs: parseInt(num_outputs),
      //     }
      //   }
      // );
      const image = await openai.images.generate({ model: "dall-e-3", prompt: prompt });
      return NextResponse.json(image.data);
      
    }catch(error){
       return NextResponse.json(error);
    }
  }
