import React from 'react';

import ratchet from '../img/ratchet.webp';
import kratos from '../img/Kratos.png';
import sackboy from '../img/sackboy.webp';

function PlayGameHeader() {
	return (
		<div className='play-game-header'>
			<div>
				<img src={ratchet} />
			</div>
			<div>
				<img src={kratos} />
			</div>
			<div>
				<img src={sackboy} />
			</div>
			<div>
				<h3>1:32</h3>
			</div>
		</div>
	);
}

export default PlayGameHeader;
