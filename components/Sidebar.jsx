"use client"
import { HomeIcon, ImageIcon, MessageSquareIcon, Music2Icon, VideoIcon ,SpeechIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


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
    const path=usePathname()
  return (
    <div className="flex flex-col gap-2 h-full bg-gray-900">
        <Link href="/" className="flex items-center gap-5">
            <Image height={65} width={65} src="/logo.png" className=" py-5 pl-5 " />
            <h2 className="text-white text-2xl font-bauhaus">Fusion AI</h2>
         </Link>
        <div className="flex flex-col gap-2 pt-6 px-4">
            {
                links.map((link,index)=>{
                    return(
                        <Link href={link.href} className={`flex items-center gap-2 px-4 py-3 rounded-xl  ${path===link.href?'bg-gray-600':null} hover:bg-slate-600 duration-200 cursor-pointer`} key={index}>
                            <div className={link.color}>
                                {link.icon}
                            </div>
                            <div  className="text-white text-xl font-writing ">{link.name}</div>
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Sidebar