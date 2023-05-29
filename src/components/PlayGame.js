import React from 'react';

function PlayGame({ gameImage, isDisabled }) {
	const className = isDisabled ? 'play-game-disabled' : 'play-game-enabled';
	return (
		<div className='play-game-container'>
			<img
				className={className}
				src={gameImage}
				alt='Game Image'
			/>
		</div>
	);
}

export default PlayGame;
