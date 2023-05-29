import React from 'react';

function MenuSelectCard({ card }) {
	return (
		<div className='selection-card'>
			<div className='highscore-difficulty-section'>
				<p className='difficulty easy'>{card.difficulty}</p>
				<h5 className='player-highscore'>
					{card.highscore}
					<span>s</span>
				</h5>
			</div>
			<h3 className='map-name'>{card.name}</h3>
			<p>
				<span className='character-name-1'>{card.characters[0]}</span>
				<span className='character-name-2'>{card.characters[1]}</span>
				<span className='character-name-3'>{card.characters[2]}</span>
			</p>
		</div>
	);
}

export default MenuSelectCard;
