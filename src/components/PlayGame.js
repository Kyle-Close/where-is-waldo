import React from 'react';
import { useRef } from 'react';

import PlayGameHeader from './PlayGameHeader';
import cursorImg from '../img/dotted-square.png';
import cursorFilled from '../img/dotted-square-filled.png';

function PlayGame({ gameImage, isDisabled }) {
	const [placedCursor, setPlacedCursor] = React.useState(null);
	const className = isDisabled ? 'play-game-disabled' : 'play-game-enabled';
	const myCustomCursor = {
		cursor: `url(${cursorImg}), auto`,
	};
	const imgRef = useRef(); // To access image properties

	function handleClick(event) {
		const rect = imgRef.current.getBoundingClientRect();
		const x = event.clientX - rect.left; //x position within the element.
		const y = event.clientY - rect.top; //y position within the element.

		const scaleX = imgRef.current.naturalWidth / rect.width; // scaling factor in x-direction
		const scaleY = imgRef.current.naturalHeight / rect.height; // scaling factor in y-direction

		const originalX = x * scaleX; // x-position in original image size
		const originalY = y * scaleY; // y-position in original image size

		console.log(
			'Original Left: ' + originalX + ', Original Top: ' + originalY + '.'
		);
		setPlacedCursor({ x: x, y: y });
	}

	return (
		<div className='play-game-container'>
			<PlayGameHeader />
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
						width: '43px',
					}}
				/>
			)}
		</div>
	);
}

export default PlayGame;
