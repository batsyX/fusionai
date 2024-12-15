"use client"
import { ArrowBigRightIcon, BotIcon, ImageIcon, MessageSquareIcon, User2Icon, UserRoundIcon } from "lucide-react"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"
import { useMessageArray } from "@/context/MessageArrayContext"
import { saveAs } from "file-saver";
import Swal from "sweetalert2"



const Page = () => {

  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState(1)

  const {imageArray, setImageArray,credits,setCredits}=useMessageArray();
  
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
    if(credits==0){
      Swal.fire({
            title: "All free Credits exhausted",
            text: "Get the premium plan to get more credits",
            icon: "warning",
            confirmButtonColor: "#3085d6",
          });
      return;
    }
    setLoading(true);
    try {
      const response =await axios.post('/api/image',{
        prompt:prompt
      })
      const img=response.data.url;
      setImageArray([...imageArray,{url:img}]);
      setCredits((prev)=>prev-1)
    } catch (error) {
      console.log(error)
    }finally{

      setLoading(false);
    }
    
  }
  const handleDownload = (url) => {
    saveAs(url, "generated-image.png"); // Downloads the file with the specified filename
  };
  
  useEffect(() => {
    const data = localStorage.getItem("imageArray");
    if (data) {
      setImageArray(JSON.parse(data));
    }
  }, [setImageArray]);

  useEffect(() => {
    if (imageArray.length > 0) {
      localStorage.setItem("imageArray", JSON.stringify(imageArray));
    }
  }, [imageArray]);
  return (
    <div className="pt-16 text-white">
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
          <input placeholder="An astronaut flying in space" onChange={handleChange} name="prompts" value={prompt} type="text" className="text-xl w-full rounded-xl bg-gray-800 border-0 border-b-2 border-gray-600 focus:outline-none focus:border-gray-500 py-3 px-1" required
          autoComplete="off"
          />

          <button className="w-32 bg-gradient-to-br from-green-400 to-blue-400 font-bold text-white p-2 rounded-xl max-md:w-full" type="submit">Generate</button>
        </div>
      </form>

          <div className="absolute text-center left-5 right-5 mt-10">
          {
            loading && (
              
              <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1 gap-4">
                      <Skeleton  className="bg-gray-300 w-[200px] h-[200px] rounded-xl p-3"/>                  
              </div>
              
            )
          }
        </div>
    </div>
    <div className="w-full min-h-96 px-10 py-20 text-center  gap-5 flex flex-wrap flex-shrink ">
    {!loading &&
      imageArray.length>0 &&
        imageArray.map((image,idx)=>(
          
            <div key={idx} className=" bg-white bg-opacity-5 rounded-xl flex flex-col py-5 gap-5 items-center justify-center w-[250px]">
              <img  className="w-[200px] h-[200px] object-cover rounded-xl" src={image.url} alt="image"/>
              <div>
                <button className="bg-gradient-to-tr from-green-400 to-blue-400 px-10 py-2 rounded-xl text-white hover:scale-105 transition-all duration-200"
                onClick={() => handleDownload(image.url)}
                >
                  Download
                </button>
              </div>
            </div>
          
        ))
    }
    </div>
    
    </div>
  )
}

export default Page
