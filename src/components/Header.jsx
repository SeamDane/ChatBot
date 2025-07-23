

function Header() {
  return (
    <div className="w-full py-3 bg-blue-900 sticky top-0 z-50">
        <div className="w-[90%] lg:w-[80%] mx-auto">
            <div className="flex items-center">
                <img src="./image/logo.png" alt="" className="w-[60px] h-[60px] object-cover overflow-hidden " />
                <div className="ms-2">
                    <h1 className="font-bold text-xl text-amber-400">ETEC AI</h1>
                    <p className="text-gray-200">Ai assistant for you</p>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default Header
