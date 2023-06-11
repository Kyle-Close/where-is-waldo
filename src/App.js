import './App.css';
import { useState } from 'react';

import BackgroundPattern from './img/pattern.jpg';

import MenuModal from './components/MenuModal';
import Canvas from './components/Canvas';
import PlayGameHeader from './components/PlayGameHeader';

import gameImage from './img/Ps3.png';

function App() {
	const [rectangles, setRectangles] = useState([
		{
			character: 'Kratos',
			x: 415,
			y: 650,
			width: 50,
			height: 70,
		},
		{
			character: 'Ratchet',
			x: 300,
			y: 1150,
			width: 60,
			height: 50,
		},
	]);

	function handleClickDev(event, img, width, height) {
		const { x, y } = getScaledrectangles(event, img);

		console.log(` ++ Placing rect at [${x}, ${y}]...`);
		setRectangles((prevRectangles) => [
			...prevRectangles,
			{ x, y, width, height },
		]);
	}

	function handleRightClickDev(e) {
		e.preventDefault();
		if (rectangles.length === 0) return; // Don't allow removal if the array is empty
		setRectangles((prevRectangles) => {
			const newRectangles = [...prevRectangles];
			const removedCoords = newRectangles.pop();
			console.log(
				` -- Removing rect at [${removedCoords.x}, ${removedCoords.y}]`
			);
			return newRectangles;
		});
	}

	function getScaledrectangles(e, img) {
		// Gets rectangles in terms of img original size
		var boundingRect = e.target.getBoundingClientRect();
		var scale = e.target.width / img.current.width;

		const x = Math.round((e.clientX - boundingRect.left) / scale);
		const y = Math.round((e.clientY - boundingRect.top) / scale);
		return { x: x, y: y };
	}

	return (
		<div className='App'>
			{/* <MenuModal /> */}
			{rectangles && (
				<>
					<PlayGameHeader />
					<Canvas
						isDevMode={false}
						handleClick={handleClickDev}
						handleRightClick={handleRightClickDev}
						imageUrl={gameImage}
						rectangles={rectangles}
						setRectangles={setRectangles}
					/>
				</>
			)}
		</div>
	);
}

export default App;
