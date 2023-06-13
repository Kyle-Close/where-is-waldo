import React from 'react';
import { Timestamp } from 'firebase/firestore/lite';

import ratchet from '../img/ratchet.webp';
import kratos from '../img/Kratos.png';
import sackboy from '../img/sackboy.webp';

import '../styles/PlayGameHeader.css';

function PlayGameHeader({
	currentMapData,
	targetName,
	currentMapTargetImages,
	setCurrentMapTargetImages,
}) {
	const [seconds, setSeconds] = React.useState(0);
	const [startTime, setStartTime] = React.useState();
	const originalMapData = React.useRef();

	React.useEffect(() => {
		originalMapData.current = JSON.parse(JSON.stringify(currentMapData));
	}, []);

	React.useEffect(() => {
		console.log('New currentMapTargetImages: ', currentMapTargetImages);
	}, [currentMapTargetImages]);

	React.useEffect(() => {
		if (targetName && currentMapData) {
			const index = getFoundTargetIndex(targetName);
			console.log('HERE', index);
			setCurrentMapTargetImages((prev) => {
				const newArray = prev.map((obj, i) => {
					console.log(i, index);
					if (i === index) {
						return { ...obj, isFound: true };
					}
					return obj;
				});

				return newArray;
			});
		}
	}, [currentMapData, setCurrentMapTargetImages, targetName]);

	function getFoundTargetIndex(targetName) {
		console.log('shit fucker: ', targetName);
		const foundIndex = originalMapData.current.rectangles.findIndex(
			(data) => data.character === targetName
		);
		return foundIndex;
	}

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

	const images = currentMapTargetImages.map((obj, key) => {
		const style = obj.isFound ? { backgroundColor: 'green' } : {};
		console.log(obj);
		return (
			<div
				key={key}
				style={style}
			>
				<img src={obj.img} />
			</div>
		);
	});

	return (
		<div className='play-game-header'>
			{images}
			<div>
				<h3 onClick={handleClick}>{seconds}</h3>
			</div>
		</div>
	);
}

export default PlayGameHeader;
