"use client"
import { ArrowBigRightIcon, BotIcon, ImageIcon, MessageSquareIcon, User2Icon, UserRoundIcon, VideoIcon } from "lucide-react"
import { useState } from "react"
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"
import { useMessageArray } from "@/context/MessageArrayContext"


const Page = () => {

  const [prompt, setPrompt] = useState('')
  const [frames, setFrames] = useState(48)
  const [rate, setRate] = useState(5)

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
      const response =await axios.post('/api/video',{
        prompt:prompt,
        num_frames:frames,
        fps:rate
      })
      console.log(response.data);
      setVideoArray([...videoArray,response.data]);
    } catch (error) {
      console.log(error)
    }finally{

      setLoading(false);
    }
    
  }




  return (
    <>
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
        <input onChange={handleChange} name="prompts" value={prompt} type="text" className="text-xl w-full border-0 border-b-2 border-gray-200 focus:outline-none focus:border-gray-400 py-3 px-1" required/>
        <div className="flex items-center gap-3">
          <label htmlFor="frames">No of Frames</label>
          <select value={frames} onChange={handleChange} name="frames" className="w-20 transform duration-700 rounded-xl border border-green-500 outline-none py-2">
              <option value="48">48</option>
              <option value="96">96</option>
              <option value="120">120</option>
              <option value="168">168</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="rate">Frame rate</label>
          <select value={rate} onChange={handleChange} name="rate" className="w-20 transform duration-700 rounded-xl border border-green-500 outline-none py-2">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="16">16</option>
              <option value="24">24</option>
              
          </select>
        </div>
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
    
    </>
  )
}

export default Page