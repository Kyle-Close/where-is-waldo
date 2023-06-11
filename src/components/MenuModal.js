import React from 'react';

import MenuSelectCard from './MenuSelectCard';
import { getMenuCards } from '../firebase';

import '../styles/MainMenuModal.css';
import PS3 from '../img/Ps3.png';

function MainMenuModal({ setIsMainMenuActive, setCurrentMap }) {
	const [currentlySelected, setCurrentlySelected] = React.useState(-1);
	const [dbCardInfo, setDbCardInfo] = React.useState([]);

	// Hooks
	React.useEffect(() => {
		const fetchMenuCards = async () => {
			const cards = await getMenuCards();
			setDbCardInfo(cards);
		};
		fetchMenuCards();
	}, []);

	React.useEffect(() => {
		setDbCardInfo((prevDbCardInfo) => {
			return prevDbCardInfo.map((obj, i) => {
				if (i === currentlySelected) {
					return { ...obj, isActive: true };
				}
				return { ...obj, isActive: false };
			});
		});
	}, [currentlySelected]);

	// Functions
	function handleCardClick(index) {
		setCurrentlySelected(index);
	}

	function startGame() {
		if (currentlySelected !== -1) {
			setCurrentMap(currentlySelected);
			setIsMainMenuActive(false);
		}
	}

	// Variables
	let menuCards = dbCardInfo.map((card, index) => (
		<MenuSelectCard
			key={index}
			index={index}
			card={card}
			handleClick={handleCardClick}
			isActive={card.isActive}
		/>
	));

	return (
		<div className='main-menu-modal'>
			<img src={PS3} />
			<div className='menu-title'>
				<p>
					pixel<span>Pursuit</span>
				</p>
			</div>
			<div className='menu-contents'>
				<div className='map-selection-cards'>{menuCards}</div>
			</div>
			<button
				onClick={startGame}
				className='play-game-button'
			>
				Play
			</button>
		</div>
	);
}

export default MainMenuModal;
