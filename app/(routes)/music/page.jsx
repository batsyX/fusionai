"use client"
import { AudioWaveformIcon } from "lucide-react"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"
import { useMessageArray } from "@/context/MessageArrayContext"
import Swal from "sweetalert2"
import MusicCard from "@/components/MusicCard"


const Page = () => {

  const [prompt, setPrompt] = useState('')
  const [type, setType] = useState('ai')
  const {musicArray,setMusicArray} = useMessageArray();
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    if(name === 'prompts'){
      setPrompt(value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(type==='ai'){
      Swal.fire({
        title: "Not a premium user",
        text: "You need to be a premium user to generate videos. Please upgrade to premium to generate videos.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    setLoading(true);
    try {
      const response =await axios.post('/api/music',{
        prompt:prompt
      })
      console.log(response.data.data);
      setMusicArray(response.data.data);
    } catch (error) {
      console.log(error)
    }finally{

      setLoading(false);
    }
    
  }

  useEffect(() => {
    const data = localStorage.getItem("musicArray");
    if (data) {
      setMusicArray(JSON.parse(data));
    }
  }, [setMusicArray]);

  useEffect(() => {
    if (musicArray.length > 0) {
      localStorage.setItem("musicArray", JSON.stringify(musicArray));
    }
  }, [musicArray]);


  return (
    <div className="pt-16 text-white">
      <div className="flex gap-2 items-center py-6 px-7">
      <div className="text-purple-600 bg-purple-100 p-3 rounded-xl">
        <AudioWaveformIcon size={32} />
      </div>
      <div>
        <h1 className="text-2xl font-bauhaus font-bold">Generate Music</h1>
        <p className="text-gray-500 font-writing">Or find real songs as per your choice</p>
      </div>
    </div>
    <div className="relative px-5">
      <form onSubmit={handleSubmit} className="flex max-md:flex-col items-center gap-4" >
        <div className="w-full flex flex-col gap-4">
          <input onChange={handleChange} name="prompts" value={prompt} type="text" className="text-xl w-full rounded-xl bg-gray-800 border-0 border-b-2 border-gray-600 focus:outline-none focus:border-gray-500 py-3 px-1" required autoComplete="off"/>
          <select name="" id="" className="w-3/12 py-2 rounded-xl bg-gray-800 border-0 border-b-2 border-gray-600 focus:outline-none focus:border-gray-500" value={type} onChange={(e)=>setType(e.target.value)}>
            <option value="ai">AI generated</option>
            <option value="real">Authentic</option>
          </select>
          <button className=" bg-gradient-to-br from-purple-400 to-pink-600 font-bold text-white p-2 rounded-xl max-md:w-full" type="submit">Generate</button>
        </div>
      </form>

          <div className="absolute text-center left-5 right-5 mt-10">
          {
            loading && (
               <Skeleton  className="bg-gray-300 w-full h-[50px] rounded-xl p-3"/>
            )
          }
        </div>
    </div>

    <div className="w-full min-h-96 px-10 py-20 flex flex-wrap justify-center gap-10">
    {!loading &&
      musicArray.length>0 &&
        musicArray.map((item,idx)=>(
          
          <MusicCard key={idx} album={item.album} artist={item.artist} link={item.preview} />
          
        ))
    }
    </div>
    
    </div>
  )
}

export default Page