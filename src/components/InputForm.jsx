import { useState, useEffect, useRef } from 'react'
import { useChat } from '../store/ChatContext'
import { TypeAnimation } from 'react-type-animation';
function InputForm() {
  
  const [time,setTime] = useState('');
  const {input,setInput,msg,sendMessage,isloading} = useChat();
  const chatRef = useRef();

  // Update live time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Scroll to bottom on new messages
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [msg])

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  function handleSend(e) {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage();
  }

  return (
    <div className="w-full flex flex-col items-center bg-transparent">
      {msg.length === 0 && (
        <div className="p-5 mt-5 text-center md:w-[400px]">
          <div className="w-50 h-50 mx-auto">
            <img
              src="./image/logo.png"
              alt="AI Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome to AI Assistant</h1>
            <p className="text-gray-500 text-lg">
              I'm here to help you with questions, provide information, and
              assist with various tasks. What would you like to know?
            </p>
          </div>
        </div>
      )}

      {/* Chat container */}
      <div
        ref={chatRef}
        className="duration  flex-1 w-full md:w-[80%] px-4 py-6 space-y-7 overflow-y-auto rounded-md pb-[120px]"
      >
        {msg.map((m, i) => (
          <div key={m.id || i}>
            {m.role === "user" ? (
              <div className="flex justify-end">
                <div className="text-end">
                  <div className="bg-blue-900 px-4 py-3 text-white rounded-2xl">
                    <h1>{m.content}</h1>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{time}</div>
                </div>
                <div className="w-[40px] h-[40px] bg-gray-500 ms-2 rounded-full overflow-hidden border-2 border-blue-950 ">
                  <img
                    src="https://assets.teenvogue.com/photos/66dee37da878cfddd6662e02/1:1/w_767,h_767,c_limit/1848942542"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-start mt-4 relative">
                <div className="absolute w-[40px] h-[40px] bg-blue-900 mr-2 rounded-full overflow-hidden border-2 border-blue-950 ">
                  <img
                    src="./image/logo.png"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div className="ms-[50px]">
                  <div className="bg-pink-900 px-4 py-3 text-white rounded-2xl">
                    <h1 className="">
                      <TypeAnimation
                        cursor={false}
                        sequence={[m.content]}
                        speed={50}
                        repeat={false}
                      />
                      {/* {m.content} */}
                    </h1>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{time}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="w-full md:w-[80%] px-4 py-4 fixed bottom-0 rounded-full overflow-hidden ">
        <form
          onSubmit={handleSend}
          className="flex bg-gray-200 rounded-full overflow-hidden"
        >
          <input
            disabled={isloading}
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full py-3 px-6 outline-none bg-transparent"
          />
          <button
            type="submit"
            className="bg-blue-950 px-6 text-white hover:bg-blue-900 transition"
            disabled={isloading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputForm
