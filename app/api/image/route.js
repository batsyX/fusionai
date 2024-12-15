// import Replicate from "replicate";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});



export  async function POST(req,res) {

    try{
      const body=await req.json();
      const {prompt}=body;
      const image = await openai.images.generate({ model: "dall-e-3", prompt: prompt });
      const imageUrl=image.data[0].url;
      const uploadPreset = 'fusion';
      const formData = new FormData();
      formData.append('file', imageUrl); 
      formData.append('upload_preset', uploadPreset);
      
      const cloudinaryResponse = await fetch(process.env.CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
    
      if (!cloudinaryResponse.ok) {
        throw new Error(`Cloudinary upload failed: ${cloudinaryResponse.statusText}`);
      }
      const cloudinaryData = await cloudinaryResponse.json();
      console.log('Uploaded to Cloudinary:', cloudinaryData);

      return NextResponse.json(cloudinaryData);
      
    }catch(error){
       return NextResponse.json(error);
    }
  }
