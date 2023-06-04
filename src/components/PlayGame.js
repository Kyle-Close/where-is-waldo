import React from 'react';

import PlayGameHeader from './PlayGameHeader';
import GameBoard from './GameBoard';

function PlayGame({ gameImage, isDisabled }) {
	return (
		<div className='play-game-container'>
			<PlayGameHeader />
			<GameBoard
				gameImage={gameImage}
				isDisabled={isDisabled}
			/>
		</div>
	);
}

export default PlayGame;
