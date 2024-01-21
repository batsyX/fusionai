"use client"
import { useContext,createContext,useState } from "react";

const MessageArrayContext = createContext();

const MessageArrayProvider = ({ children }) => {
    const [messageArray, setMessageArray] = useState([]);
    const [imageArray, setImageArray] = useState([]);
    const [musicArray, setMusicArray] = useState([]);
    const [videoArray, setVideoArray] = useState([]);
    
    return (
        <MessageArrayContext.Provider value={{ messageArray, setMessageArray,imageArray, setImageArray,musicArray,setMusicArray,videoArray,setVideoArray }}>
        {children}
        </MessageArrayContext.Provider>
    );
}
export const useMessageArray = () => useContext(MessageArrayContext);

export default MessageArrayProvider;