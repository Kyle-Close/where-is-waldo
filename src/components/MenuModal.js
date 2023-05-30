import React from 'react';

import MenuSelectCard from './MenuSelectCard';
import { getMenuCards } from '../firebase';

import '../styles/MainMenuModal.css';
import PS3 from '../img/Ps3.png';

function MainMenuModal() {
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
			<div
				className='background'
				style={{ backgroundImage: `url(${PS3})` }}
			></div>
			<div className='menu-title'>
				pixel<span>Pursuit</span>
			</div>
			<div className='menu-contents'>
				<div className='map-selection-cards'>{menuCards}</div>
			</div>
			<button className='play-game-button'>Play</button>
		</div>
	);
}

async function fetchMenuCards() {
	const cards = await getMenuCards();
	console.log(cards);
}

function modifyArrayProperty(arr, index, property, newValue) {
	// Create a new array by mapping over the original array
	const newArr = arr.map((obj, i) => {
		// If the current index matches the desired index, modify the property
		if (i === index) {
			// Return a new object with the modified property
			return { ...obj, [property]: newValue };
		}
		// If it's not the desired index, return the original object
		return obj;
	});

	// Return the modified array
	return newArr;
}

export default MainMenuModal;
