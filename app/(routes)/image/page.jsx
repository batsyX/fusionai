"use client"
import { ArrowBigRightIcon, BotIcon, ImageIcon, MessageSquareIcon, User2Icon, UserRoundIcon } from "lucide-react"
import { useState } from "react"
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"
import { useMessageArray } from "@/context/MessageArrayContext"


const Page = () => {

  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState(1)

  const {imageArray, setImageArray}=useMessageArray();
  
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    if(name === 'prompts'){
      setPrompt(value)
    }else if(name === 'outputs'){
      setOutput(value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response =await axios.post('/api/image',{
        prompt:prompt,
        num_outputs:output
      })
      console.log(response.data);
      setImageArray(...imageArray,response.data);
    } catch (error) {
      console.log(error)
    }finally{

      setLoading(false);
    }
    
  }




  return (
    <>
      <div className="flex gap-2 items-center py-6 px-7">
      <div className="text-green-500 bg-green-100 p-3 rounded-xl">
        <ImageIcon size={32} />
      </div>
      <div>
        <h1 className="text-2xl font-bauhaus font-bold">Generate Images</h1>
        <p className="text-gray-500 font-writing">with RealVisXL V3.0 Turbo based on SDXL</p>
      </div>
    </div>
    <div className="relative px-5">
      <form onSubmit={handleSubmit} className="flex max-md:flex-col items-center gap-4" >
        <div className="w-full flex flex-col  gap-4">
          <input placeholder="An astronaut flying in space" onChange={handleChange} name="prompts" value={prompt} type="text" className="text-xl w-full border-0 border-b-2 border-gray-200 focus:outline-none focus:border-gray-400 py-3 px-1" required/>
          <div className="flex items-center gap-3">
            <label htmlFor="output">No of Outputs</label>
            <select value={output} onChange={handleChange} name="outputs" className="w-20 transform duration-700 rounded-xl border border-green-500 outline-none py-2">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
          </div>
          <button className="w-32 bg-gradient-to-br from-green-400 to-blue-400 font-bold text-white p-2 rounded-xl max-md:w-full" type="submit">Generate</button>
        </div>
      </form>

          <div className="absolute text-center left-5 right-5 mt-10">
          {
            loading && (
              
              <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
                      <Skeleton  className="bg-gray-300 w-[200px] h-[200px] rounded-xl p-3"/>
                      <Skeleton  className="bg-gray-300 w-[200px] h-[200px] rounded-xl p-3"/>
                      <Skeleton  className="bg-gray-300 w-[200px] h-[200px] rounded-xl p-3"/>
                      <Skeleton  className="bg-gray-300 w-[200px] h-[200px] rounded-xl p-3"/>
                  
              </div>
              
            )
          }
        </div>
    </div>
    <div className="w-full min-h-96 px-10 py-20 grid grid-cols-4 max-md:grid-cols-2 gap-4">
    {!loading &&
      imageArray.length>0 &&
        imageArray.map(image=>(
          
            <img className="w-[400px] h-[400px] object-cover rounded-xl" src={image} alt="image"/>
          
        ))
    }
    </div>
    
    </>
  )
}

export default Page