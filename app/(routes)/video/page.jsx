"use client"
import { ArrowBigRightIcon, BotIcon, ImageIcon, MessageSquareIcon, User2Icon, UserRoundIcon, VideoIcon } from "lucide-react"
import { useState } from "react"
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"
import { useMessageArray } from "@/context/MessageArrayContext"


const Page = () => {

  const [prompt, setPrompt] = useState('')
  const {setGenerations}=useMessageArray();
  const {videoArray,setVideoArray}=useMessageArray();
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    if(name === 'prompts'){
      setPrompt(value)
    }else if(name === 'frames'){
      setFrames(value)
    }else if(name === 'rate'){
      setRate(value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response =await axios.post('/api/video',{prompt:prompt })
      const newRes=await axios.get('/api/video');
      console.log(newRes.data)
      setVideoArray([...videoArray,newRes.data]);
      setGenerations(prev=>prev+1);
    } catch (error) {
      console.log(error)
    }finally{

      setLoading(false);
    }
    
  }




  return (
    <div className="pt-16 text-white ">
      <div className="flex gap-2 items-center py-6 px-7">
      <div className="text-blue-500 bg-blue-100 p-3 rounded-xl">
        <VideoIcon size={32} />
      </div>
      <div>
        <h1 className="text-2xl font-bauhaus font-bold">Generate Videos</h1>
        <p className="text-gray-500 font-writing">Multi-stage text-to-video generation</p>
      </div>
    </div>
    <div className="relative px-5">
      <form onSubmit={handleSubmit} className="flex max-md:flex-col items-center gap-4" >
        <div className="w-full flex flex-col  gap-4">
        <input onChange={handleChange} name="prompts" value={prompt} type="text" className="text-xl w-full rounded-xl bg-gray-800 border-0 border-b-2 border-gray-600 focus:outline-none focus:border-gray-500 py-3 px-1" required autoComplete="off"/>
        
        
        <button className="w-32 bg-gradient-to-br  from-blue-200 to-blue-500 text-white font-bold p-2 rounded-xl max-md:w-full" type="submit">Generate</button>
        </div>
      </form>

          <div className="absolute  left-5 right-5 mt-10">
          {
            loading && (
            
            <div className="w-full flex items-center justify-center">
              <Skeleton  className="bg-gray-300 w-[550px] h-[300px]  p-3"/>
            </div>  
            
            )
          }
        </div>
    </div>
    <div className="w-full min-h-96 px-10 py-20 flex flex-col items-center ">
    {!loading &&
      videoArray.length>0 &&
        videoArray.map(video=>(
          
            <video key={video} width={550} height={350} controls>
              <source src={video}/>
            </video>
          
        ))
    }
    </div>
    
    </div>
  )
}

export default Page