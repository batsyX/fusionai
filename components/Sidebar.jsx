"use client"
import { HomeIcon, ImageIcon, MessageSquareIcon, Music2Icon, VideoIcon ,SpeechIcon,CrownIcon } from "lucide-react"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { useMessageArray } from "@/context/MessageArrayContext"
import { useEffect } from "react"


const links=[
    {
        name:"Home",
        href:"/home",
        icon:<HomeIcon />,
        color:"text-white",
       
    },{
        name:"Chat",
        href:"/chat",
        icon:<MessageSquareIcon />,
        color:"text-red-400",
        
    },{
        name:"Image",
        href:"/image",
        icon:<ImageIcon />,
        color:"text-green-400",
        
    },
    {
        name:"Text to speech",
        href:"/text-to-speech",
        icon:<SpeechIcon />,
        color:"text-yellow-500",
    },
    {
        name:"Video",
        href:"/video",
        icon:<VideoIcon />,
        color:"text-blue-400",
        
    },{
        name:"Music",
        href:"/music",
        icon:<Music2Icon />,
        color:"text-purple-500",
        
    }
    
]

const Sidebar = () => {
    const path=usePathname();
    const {credits,setCredits}=useMessageArray();

    const handleUpgrade=()=>{
        setTimeout(()=>setCredits(1000),3000)
    }
  return (
    <div className="flex flex-col gap-2 h-full bg-[#1f1f1e] border-r border-[rgba(255,255,255,0.16)] ">
        
        <div className="flex flex-col gap-2 pt-12 px-4 ">
            {
                links.map((link,index)=>{
                    return(
                        <Link href={link.href} className={`flex items-center gap-2 px-4 py-3 rounded-xl  ${path===link.href?'bg-gray-600':null} hover:bg-slate-600 duration-200 clickable`} key={index}>
                            <div className={link.color}>
                                {link.icon}
                            </div>
                            <div  className="text-white text-xl font-writing ">{link.name}</div>
                        </Link>
                    )
                })
            }
        </div>
        <div className="w-full flex flex-col gap-4 items-center justify-center py-4 text-gray-400">
                <div>
                    <h3>Free plan : <span className={`text-green-400`}>{credits} credit(s) left</span></h3>
                </div>
                <a href="https://buy.stripe.com/test_aEUaHRc952fmfCw4gg" target="blank">
                    <button onClick={handleUpgrade} className="px-7 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 text-white flex gap-3 items-center">
                        <CrownIcon className="text-yellow-300" size={20} />
                        <span className="font-writing text-xl">Buy credits</span>
                    </button>
                </a>
        </div>
    </div>
  )
}

export default Sidebar