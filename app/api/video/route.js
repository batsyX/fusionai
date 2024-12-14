import Replicate from "replicate";
import { NextResponse } from "next/server";
import axios from "axios";



export  async function POST(req,res) {

  const body = await req.json();
  const {prompt}=body;
  const options = {
    method: 'POST',
    url: 'https://runwayml.p.rapidapi.com/generate/text',
    headers: {
      'x-rapidapi-key': '56a6521287msh95911a5ca94bec7p1080b4jsnd23e30a0da3d',
      'x-rapidapi-host': 'runwayml.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      text_prompt: prompt,
      model: 'gen3',
      width: 1344,
      height: 768,
      motion: 5,
      seed: 0,
      callback_url: '',
      time: 5
    }
  };
    try{
      const response = await axios.request(options);
	    console.log(response.data);
      return NextResponse.json(response.data);
    }catch(error){
       return NextResponse.json(error);
    }
  }

export async function GET(req,res) {
  const options = {
    method: 'GET',
    url: 'https://runwayml.p.rapidapi.com/status',
    params: {
      uuid: '25c9e36c-f9d8-4cd6-95c2-0e414eaa23ac'
    },
    headers: {
      'x-rapidapi-key': '56a6521287msh95911a5ca94bec7p1080b4jsnd23e30a0da3d',
      'x-rapidapi-host': 'runwayml.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}