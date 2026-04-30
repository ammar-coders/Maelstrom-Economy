import logo from "../../public/Logo.jpeg"

export function Header() { 
  return (
    <div className="relative top-0 left-0 right-0 flex bg-gray-800 text-gray-200 justify-between items-center h-20 px-1">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-18 h-18 rounded-full"/>
        <span className="text-3xl font-bold">Maelstrom Economy</span>
      </div>
      <div className="flex">
        
      </div>
    </div>
  )
}