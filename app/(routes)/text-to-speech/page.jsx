"use client";
import { ArrowBigRightIcon,  ScrollText, } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMessageArray } from "@/context/MessageArrayContext";

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [voice, setVoice] = useState("shimmer");
  const { speechArray, setSpeechArray } = useMessageArray();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setPrompt(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt,voice:voice }), // Pass text to the API
      });
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      setSpeechArray([...speechArray, { audioUrl: audioUrl }]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("speechArray");
    if (data) {
      setSpeechArray(JSON.parse(data));
    }
  }, [setSpeechArray]);

  useEffect(() => {
    if (speechArray.length > 0) {
      localStorage.setItem("speechArray", JSON.stringify(speechArray));
    }
  }, [speechArray]);

  return (
    <>
      <div className="flex gap-2 items-center py-6 px-7">
        <div className="text-yellow-600 bg-yellow-100 p-3 rounded-xl">
          <ScrollText size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bauhaus font-bold">
            Generate Authentic voices from your texts
          </h1>
          <p className="text-gray-500 font-writing">With 2 different voices</p>
        </div>
      </div>
      <div className="relative px-5">
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
          <textarea
            required
            placeholder="Dumbledore asked calmly!"
            onChange={handleChange}
            value={prompt}
            type="text"
            className="text-xl w-full h-96 border-2 border-b-2 border-gray-200 focus:outline-none focus:border-gray-400 py-3 px-1 resize-none rounded-xl"
          />
          <select name="chooseVoice" id="" className="px-10 py-3 rounded-xl border outline-none" value={voice} onChange={(e) => setVoice(e.target.value)}>
            <option value="shimmer">Shimmer</option>
            <option value="alloy">Alloy</option>
            <option value="nova">Nova</option>
          </select>
          <button
            className=" bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-xl"
            type="submit"
          >
            <ArrowBigRightIcon />
          </button>
        </form>
        <div className="absolute text-center left-5 right-5 my-10">
          {loading && (
            <Skeleton className="bg-gray-300 w-full h-[50px] rounded-xl p-3" />
          )}
        </div>
      </div>
      <div className="w-full min-h-96 px-10 py-20 flex flex-col gap-4">
        {!loading &&
          speechArray.length > 0 &&
          speechArray.map((item, idx) => (
            <audio key={idx} controls className="w-full">
              <source src={item.audioUrl} type="audio/mpeg" />
            </audio>
          ))}
      </div>
    </>
  );
};

export default Page;
