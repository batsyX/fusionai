import React from "react";

const FormatMessageContent = (content) => {
  // Check for code blocks (multi-line)
  if (content.includes("```")) {
    const code = content.match(/```([\s\S]*?)```/)[1]; // Extract code between ```
    return (
      <pre className="bg-gray-200 text-black  rounded-md overflow-auto ">
        <code>{code}</code>
      </pre>
    );
  }

  // Check for lists (numbered or bullet points)
  if (content.match(/^\d+\.\s|\n\d+\.\s|^-|\n-/m)) {
    const listItems = content
      .split("\n")
      .filter((line) => line.match(/^\d+\.\s|^-|\n-/)); // Only keep list lines
    return (
      <ul className="list-disc ">
        {listItems.map((item, index) => (
          <li key={index} className="text-lg ">
            {item.replace(/^\d+\.\s|^-\s/, "")}
          </li>
        ))}
      </ul>
    );
  }

  // Fallback: Plain Text
  return <p className="text-lg">{content}</p>;
};


export default FormatMessageContent;
