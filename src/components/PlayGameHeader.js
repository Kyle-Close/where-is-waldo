import React from 'react';
import { Timestamp } from 'firebase/firestore/lite';

import ratchet from '../img/ratchet.webp';
import kratos from '../img/Kratos.png';
import sackboy from '../img/sackboy.webp';

import '../styles/PlayGameHeader.css';

function PlayGameHeader() {
	const [seconds, setSeconds] = React.useState(0);
	const [startTime, setStartTime] = React.useState();

	// Get time on first render for firebase
	React.useEffect(() => {
		setStartTime(Timestamp.now());
	}, []);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((seconds) => seconds + 1);
		}, 1000);

		// Clear interval on unmount
		return () => {
			clearInterval(interval);
		};
	}, []);
	function handleClick() {
		console.log(Timestamp.now() - startTime);
	}
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
				<h3 onClick={handleClick}>{seconds}</h3>
			</div>
		</div>
	);
}

export default PlayGameHeader;
