import React from 'react';

import PlayGameHeader from './PlayGameHeader';

function PlayGame({ gameImage, isDisabled }) {
	const className = isDisabled ? 'play-game-disabled' : 'play-game-enabled';
	return (
		<div className='play-game-container'>
			<PlayGameHeader />
			<img
				className={className}
				src={gameImage}
				alt='Game Image'
			/>
		</div>
	);
}

export default PlayGame;
