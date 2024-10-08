import { useState } from "react";

export default function JoinGame({onJoin}){

    const [name, setName] = useState('');

  const handleJoin = () => {
    if (name) {
      onJoin(name);
      setName('')
      
    }
  }
    return(
        <div className="flex flex-col md:text-xl font-Poppins">
            <h2 className="text-[#]  pb-5 ">Join the Game</h2>
            <input id="name" type="text" placeholder="Enter Your Name" className="my-5 border-2 md:p-5 w-[250px] md:w-full p-1 outline-none md:rounded-md hover:border-blue-500 active:border-blue-600  border-black" value={name}  onChange={(e) => setName(e.target.value)}/>
            <button type="button" onClick={handleJoin} className="bg-blue-500 md:h-14 w-[250px] md:w-full h-8 md:rounded-md text-white">JOIN</button>
        </div>
        )
}

