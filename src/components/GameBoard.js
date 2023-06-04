import React from 'react';
import { useRef, useEffect } from 'react';

import cursorImg from '../img/dotted-square.png';
import cursorFilled from '../img/dotted-square-filled.png';

function GameBoard({ gameImage, isDisabled }) {
	const imgRef = useRef(); // To access image properties
	const [placedCursor, setPlacedCursor] = React.useState(null);

	const className = isDisabled ? 'play-game-disabled' : 'play-game-enabled';

	const myCustomCursor = {
		cursor: `url(${cursorImg}), auto`,
	};

	useEffect(() => {
		if (!placedCursor) return;

		const { x, y } = placedCursor;
		const originalCoords = getOriginalImageCoords([x, y], imgRef);
		const selectionBox = calculateBox(originalCoords, 64);

		// For testing
		const targetBox = {
			topLeft: [300, 1200],
			bottomRight: [364, 1264],
		};

		console.log(isOverlap(selectionBox, targetBox));
	}, [placedCursor]);

	function handleClick(event) {
		const coords = getClickCoords(event, imgRef);

		setPlacedCursor({
			x: coords[0],
			y: coords[1],
		});
	}

	return (
		<>
			<img
				ref={imgRef}
				style={myCustomCursor}
				onClick={handleClick}
				className={className}
				src={gameImage}
				alt='Game Image'
			/>
			{placedCursor && (
				<img
					src={cursorFilled}
					style={{
						position: 'absolute',
						left: `${placedCursor.x}px`,
						top: `${placedCursor.y}px`,
						zIndex: '2',
					}}
					alt='Placed Cursor'
				/>
			)}
		</>
	);
}

function getClickCoords(event, imgRef) {
	const rect = imgRef.current.getBoundingClientRect();

	const x = event.clientX - rect.left; //x position within the element.
	const y = event.clientY - rect.top; //y position within the element.

	return [x, y];
}

function getOriginalImageCoords(coords, imgRef) {
	const rect = imgRef.current.getBoundingClientRect();
	const [x, y] = coords;

	const scaleX = imgRef.current.naturalWidth / rect.width; // scaling factor in x-direction
	const scaleY = imgRef.current.naturalHeight / rect.height; // scaling factor in y-direction

	const originalX = Math.round(x * scaleX); // x-position in original image size
	const originalY = Math.round(y * scaleY); // y-position in original image size

	return [originalX, originalY];
}

export function calculateBox(topLeftCoords, size) {
	return {
		topLeft: topLeftCoords,
		bottomRight: [topLeftCoords[0] + size, topLeftCoords[1] + size],
	};
}

export function isOverlap(selectionBox, targetBox) {
	if (
		selectionBox.topLeft[0] <= targetBox.bottomRight[0] &&
		selectionBox.bottomRight[0] >= targetBox.topLeft[0] &&
		selectionBox.topLeft[1] <= targetBox.bottomRight[1] &&
		selectionBox.bottomRight[1] >= targetBox.topLeft[1]
	) {
		return true;
	} else {
		return false;
	}
}

export default GameBoard;
