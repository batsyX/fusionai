"use client";
import {
  ArrowBigRightIcon,
  BotIcon,
  MessageSquareIcon,
  UserRoundIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMessageArray } from "@/context/MessageArrayContext";
import { Skeleton } from "@/components/ui/skeleton";
import FormatMessageContent from "@/utils/FormatChecker";
import Swal from "sweetalert2";

const Page = () => {
  const { messageArray, setMessageArray,credits,setCredits } = useMessageArray();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credits==0){
      Swal.fire({
                  title: "All free Credits exhausted",
                  text: "Get the premeium plan to get more credits",
                  icon: "warning",
                  confirmButtonColor: "#3085d6",
                });
      return;
    }
    setLoading(true);
    setMessageArray([...messageArray, { role: "user", content: message }]);

    try {
      const response = await axios.post("/api/chat", { prompt: message });
      console.log(response);
      await setMessageArray((prev) => [
        ...prev,
        { role: "system", content: response.data.message.content },
      ]);
      setCredits(prev=>prev-1)
    } catch (error) {
      console.log(error);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };
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
    <div className="pt-16 text-white  min-h-screen ">
      <div className="flex flex-col gap-2 py-6 px-7">
        <div className="flex gap-2 items-center">
          <div className="text-red-500 bg-red-100 p-3 rounded-xl">
            <MessageSquareIcon size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-bauhaus">Chat with AI</h1>
            <p className="text-gray-500 font-writing">based on model GPT 3.5</p>
          </div>
        </div>
        <div className="w-full h-[2px] bg-white bg-opacity-10">
        </div>
      </div>

      <div className="px-5 pt-16 pb-20 min-h-32 flex flex-col gap-4">
        {messageArray &&
          messageArray.map((message, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                message.role === "user"
                  ? "justify-start flex-row-reverse"
                  : null
              } `}
            >
              <div
                className={` self-end text-${
                  message.role === "user" ? "green" : "red"
                }-500 bg-${
                  message.role === "user" ? "green" : "red"
                }-100 p-3 rounded-xl `}
              >
                {message.role === "user" ? (
                  <UserRoundIcon size={22} />
                ) : (
                  <BotIcon size={22} />
                )}
              </div>
              <div
                className={`flex flex-col gap-1  rounded-t-xl px-3 py-2 ${
                  message.role === "user"
                    ? "rounded-bl-xl bg-green-600"
                    : "rounded-br-xl bg-gray-600 "
                }`}
              >
                <span className="text-xl ">
                  {FormatMessageContent(message.content)}
                </span>
              </div>
            </div>
          ))}
      </div>
      <div className="ml-5">
          {loading && (
            <Skeleton className=" h-[30px] w-[300px] rounded-full bg-slate-600" />
          )}
        </div>
      <div className="fixed bottom-0 md:left-80 left-0 right-0 px-5 bg-[#1f1f1e] py-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <input
            required
            placeholder="what can you do for me?"
            onChange={handleChange}
            value={message}
            type="text"
            className="text-xl w-full rounded-xl bg-gray-800 border-0 border-b-2 border-gray-600 focus:outline-none focus:border-gray-500 py-3 px-1"
          />
          <button
            className=" bg-gradient-to-r from-pink-400 to-red-500 text-white p-2 rounded-xl"
            type="submit"
          >
            <ArrowBigRightIcon />
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Page;
