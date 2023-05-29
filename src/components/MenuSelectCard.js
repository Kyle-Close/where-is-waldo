import React from 'react';

function MenuSelectCard({ card, isActive }) {
	let activeClass = isActive ? 'selection-card-active' : null;

	function handleOnClick() {
		console.log('Selected');
	}

	return (
		<div
			onClick={handleOnClick}
			className={
				activeClass ? `selection-card ${activeClass}` : 'selection-card'
			}
		>
			<div className='highscore-difficulty-section'>
				<p className={`difficulty ${getClassName(card.difficulty)}`}>
					{card.difficulty}
				</p>
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

function getClassName(difficulty) {
	let cardClass;
	if (difficulty === 'Easy') {
		cardClass = 'easy';
	} else if (difficulty === 'Medium') {
		cardClass = 'medium';
	} else if (difficulty === 'Medium') {
		cardClass = 'hard';
	}
	return cardClass;
}

export default MenuSelectCard;
