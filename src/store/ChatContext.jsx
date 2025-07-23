import axios from "axios";
import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [msg, setMsg] = useState([]);
  const [input, setInput] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: "user", content: input };
    const typingMsg = { id: "typing", role: "assistant", content: "Typing..." };

    const newMsg = [...msg, userMsg, typingMsg];
    setMsg(newMsg);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "tngtech/deepseek-r1t2-chimera:free",
          messages: [...msg, userMsg], // don’t send 'typing' to OpenRouter
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = res.data.choices?.[0]?.message;

      if (reply) {
        setMsg((prev) =>
          prev.map((m) =>
            m.id === "typing" ? { ...reply, id: Date.now() } : m
          )
        );
      }
    } catch (e) {
      console.error("OpenRouter Error:", e);
      setMsg((prev) =>
        prev.map((m) =>
          m.id === "typing"
            ? {
                id: Date.now(),
                role: "assistant",
                content: "⚠️ Failed to load response.",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{ msg, input, setInput, sendMessage, isloading }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
