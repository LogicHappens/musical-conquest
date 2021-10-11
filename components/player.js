import { useState } from 'react'

const Player = () => {
    const [counter, setCounter] = useState(0)

    return(
        <div className="player">
            <h1 onClick={()=>setCounter(counter+1)}>Player: {counter}</h1>
        </div>
    )
}

export default Player
