"use client"
import { useContext,createContext,useState, useEffect } from "react";

const MessageArrayContext = createContext();

const MessageArrayProvider = ({ children }) => {
    const [messageArray, setMessageArray] = useState([]);
    const [imageArray, setImageArray] = useState([]);
    const [musicArray, setMusicArray] = useState([]);
    const [videoArray, setVideoArray] = useState([]);
    const [speechArray, setSpeechArray] = useState([]);
    const [credits, setCredits] = useState(10);


    return (
        <MessageArrayContext.Provider value={{ messageArray, setMessageArray,imageArray, setImageArray,musicArray,setMusicArray,videoArray,setVideoArray,speechArray,setSpeechArray,credits,setCredits }}>
        {children}
        </MessageArrayContext.Provider>
    );
}
export const useMessageArray = () => useContext(MessageArrayContext);

export default MessageArrayProvider;