import { NextResponse } from "next/server";
import axios from "axios";



export  async function POST(req,res) {
  
    try{
      const body=await req.json();
      const {prompt}=body;
      const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: {q: prompt},
        headers: {
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.X_RAPIDAPI_HOST
        }
      };
      const response = await axios.request(options);
      return NextResponse.json(response.data);
      
    }catch(error){
       return NextResponse.json(error);
    }
  }
