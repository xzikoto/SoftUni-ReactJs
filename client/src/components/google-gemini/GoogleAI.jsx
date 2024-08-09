import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function GoogleAI({ title, description, onGenerate }) {
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBirHOJnqqKWTe2TkTLdlADQ5jjJwXve1o"
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Make a comment about a blog post by the this guy. You can act like you know him from years without knowing his name. The idea is to have a comment as a final result, that will make the comments section engaging by other people. Here is the blog info title: ${title} description: ${description}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = await response.text();
      onGenerate(text);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <button
      onClick={handleClick}
      className="text-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:text-white dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-500 dark:to-purple-500 dark:hover:bg-gradient-to-bl dark:focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      {loading ? "Generating..." : "Gemini AI"}
    </button>
  );
}

export default GoogleAI;
