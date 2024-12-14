"use client"
import { HomeIcon, ImageIcon, MessageSquareIcon, Music2Icon, SpeechIcon, VideoIcon } from "lucide-react"
import Link from "next/link"


const links=[
{
      name:"Chat",
      href:"/chat",
      icon:<MessageSquareIcon />,
      color:"red-400",
      
  },{
      name:"Image",
      href:"/image",
      icon:<ImageIcon />,
      color:"green-400",
      
  },
  {
      name:"Text to speech",
        href:"/text-to-speech",
        icon:<SpeechIcon />,
        color:"yellow-500",
  },
  {
      name:"Video",
      href:"/video",
      icon:<VideoIcon />,
      color:"blue-400",
      
  },{
      name:"Music",
      href:"/music",
      icon:<Music2Icon />,
      color:"purple-500",
      
  }
  
]



const Page = () => {
  return (
    <div className="md:pt-20 flex flex-col items-center">
      <div className=" w-11/12 home-box rounded-xl h-[250px] flex flex-col items-center justify-center">
        <h1 className='font-bauhaus fonr-bold text-4xl text-white text-center'>Unleash the power of
          <span className=" bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"> Artificial Intelligence </span>
        with your imagination
        </h1>
      </div>
      <div className='flex flex-col items-center w-full px-10 max-md:px-2 pt-10 gap-10 text-white'>
            <p className='text-center text-lg italic'>Harness the power of artificial intelligence to elevate your projects and streamline your creative process. <br/> Unleash the potential of smart automation and transform your ideas into reality with the help of our state-of-the-art AI tools.</p>

            <div className="w-11/12 max-md:w-full flex flex-col gap-7 py-20 px-10 max-md:px-5 rounded-xl shadow-2xl  shadow-slate-900 mb-10 ring-1 ring-slate-100  ">
            {
                links.map((link,index)=>{
                    return(
                        <Link href={link.href} className={`flex items-center gap-2 w-full  px-4 py-3 rounded-xl border duration-200 hover:bg-slate-800 cursor-pointer`} key={index}>
                            <div className={`text-${link.color} 
                             p-2 text-xl`}>
                                {link.icon}
                            </div>
                            <div  className={` text-xl font-writing `}>{link.name}</div>
                        </Link>
                    )
                })
            }
            </div>


      </div>
      

    </div>
  )
}

export default Page