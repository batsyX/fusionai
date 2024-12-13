"use client"
import { ArrowBigRightIcon, BotIcon, MessageSquareIcon, User2Icon, UserRoundIcon } from "lucide-react"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useMessageArray } from "@/context/MessageArrayContext"
import { Skeleton } from "@/components/ui/skeleton"
import FormatMessageContent from "@/utils/FormatChecker"

const Page = () => {
  const { messageArray, setMessageArray } = useMessageArray();
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessageArray([...messageArray, {role:"user",content:message}]);
    
    try {
      const response =await axios.post('/api/chat', {prompt:message});
      console.log(response);
      await setMessageArray((prev) => 
      [...prev, {role:"system",content:response.data.message.content}]);
    } catch (error) {
      console.log(error)
    }finally{
      setMessage('');
      setLoading(false);
    }
  }
  useEffect(() => {
    const data = localStorage.getItem("messageArray");
    if (data) {
      setMessageArray(JSON.parse(data));
    }
  }, [setMessageArray]);

  useEffect(() => {
    if (messageArray.length > 0) {
      localStorage.setItem("messageArray", JSON.stringify(messageArray));
    }
  }, [messageArray]);

  return (
    <>
      <div className="flex gap-2 items-center py-6 px-7">
      <div className="text-red-500 bg-red-100 p-3 rounded-xl">
        <MessageSquareIcon size={32} />
      </div>
      <div>
        <h1 className="text-2xl font-bold font-bauhaus">Chat with AI</h1>
        <p className="text-gray-500 font-writing">based on model GPT 3.5</p>
      </div>
    </div>
    <div className="relative px-5">
      <form onSubmit={handleSubmit} className="flex items-center gap-4" >
        <input required placeholder="what can you do for me?" onChange={handleChange} value={message} type="text" className="text-xl w-full border-0 border-b-2 border-gray-200 focus:outline-none focus:border-gray-400 py-3 px-1" />
        <button className=" bg-gradient-to-r from-pink-400 to-red-500 text-white p-2 rounded-xl" type="submit"><ArrowBigRightIcon/></button>
      </form>

      <div className="absolute -bottom-14 left-5 right-5">
      {
        loading && (
          
          <Skeleton className=" h-[30px] w-[300px] rounded-full bg-slate-300" />  
          
        )
      }
    </div>
    </div>
    <div className="px-5 py-16  min-h-32 flex flex-col gap-4">
      {
        messageArray && messageArray.map((message,index) => (
          <div key={index} className={`flex items-center gap-2 ${message.role==='user'?'justify-end ':null} `}>
            <div className={`text-${message.role==="user"?"green":"red"}-500 bg-${message.role==="user"?"green":"red"}-100 p-3 rounded-xl `}>
              {
                message.role==="user"?<UserRoundIcon size={22} />:<BotIcon size={22} />
              }
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xl ">
                {
                  FormatMessageContent(message.content)
                }
              </span>
            </div>
          </div>
        ))
      }
    </div>
    
    </>
  )
}

export default Page