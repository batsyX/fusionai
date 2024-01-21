"use client"
import { Music2Icon } from "lucide-react"
import { useState } from "react"
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"
import { useMessageArray } from "@/context/MessageArrayContext"


const Page = () => {

  const [prompt, setPrompt] = useState('')
  
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
    setLoading(true);
    try {
      const response =await axios.post('/api/music',{
        prompt:prompt
      })
      console.log(response.data);
      setMusicArray([...musicArray, response.data]);
    } catch (error) {
      console.log(error)
    }finally{

      setLoading(false);
    }
    
  }




  return (
    <>
      <div className="flex gap-2 items-center py-6 px-7">
      <div className="text-purple-600 bg-purple-100 p-3 rounded-xl">
        <Music2Icon size={32} />
      </div>
      <div>
        <h1 className="text-2xl font-bauhaus font-bold">Generate Music</h1>
        <p className="text-gray-500 font-writing">Stable diffusion for real-time music generation</p>
      </div>
    </div>
    <div className="relative px-5">
      <form onSubmit={handleSubmit} className="flex max-md:flex-col items-center gap-4" >
        <div className="w-full flex flex-col max-md:flex-row gap-4">
        <input onChange={handleChange} name="prompts" value={prompt} type="text" className="text-xl w-full border-0 border-b-2 border-gray-200 focus:outline-none focus:border-gray-400 py-3 px-1" required/>
        
        </div>
        <button className=" bg-gradient-to-br from-purple-400 to-pink-600 font-bold text-white p-2 rounded-xl max-md:w-full" type="submit">Generate</button>
      </form>

          <div className="absolute text-center left-5 right-5 mt-10">
          {
            loading && (
               <Skeleton  className="bg-gray-300 w-full h-[50px] rounded-xl p-3"/>
            )
          }
        </div>
    </div>
    <div className="w-full min-h-96 px-10 py-20 flex flex-col gap-4">
    {!loading &&
      musicArray.length>0 &&
        musicArray.map(music=>(
          
          <audio key={music} controls className="w-full" >
            <source src={music}/>
          </audio>
          
        ))
    }
    </div>
    
    </>
  )
}

export default Page