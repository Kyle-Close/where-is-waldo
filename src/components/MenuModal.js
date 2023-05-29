import React from 'react';

import MenuSelectCard from './MenuSelectCard';

import '../styles/MainMenuModal.css';
import PS3 from '../img/Ps3.png';

function MainMenuModal() {
	const [currentlySelected, setCurrentlySelected] = React.useState(null);

	const gameSelectCards = [
		{
			isActive: false,
			difficulty: 'Easy',
			highscore: '32',
			name: 'Playstation 3',
			characters: ['Kratos', 'Ratchet', 'Sack Boy'],
			backgroundImage: PS3,
		},
		{
			isActive: false,
			difficulty: 'Medium',
			highscore: '125',
			name: 'Nintendo',
			characters: ['Link', 'Mario', 'Bowser'],
			backgroundImage: PS3,
		},
	];

	const menuCards = gameSelectCards.map((card, index) => (
		<MenuSelectCard
			key={index}
			card={card}
			isActive={card.isActive}
		/>
	));

	return (
		<div className='main-menu-modal'>
			<div
				className='background'
				style={{ backgroundImage: `url(${PS3})` }}
			></div>
			<div></div>
			<div className='menu-contents'>
				<div className='map-selection-cards'>{menuCards}</div>
			</div>
		</div>
	);
}

export default MainMenuModal;
