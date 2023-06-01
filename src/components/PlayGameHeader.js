import React from "react";

import ratchet from '../img/ratchet.webp'
import kratos from '../img/Kratos.jpg'
import sackboy from '../img/sackboy.webp'

function PlayGameHeader(){
    return (
        <div className="play-game-header">
            <img src={ratchet} />
            <img src={kratos} />
            <img src={sackboy} />
            <h3>1:32</h3>
        </div>
    )
}

export default PlayGameHeader