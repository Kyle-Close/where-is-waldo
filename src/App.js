import './App.css';
import { useEffect } from 'react';

import PS3 from './img/Ps3.png';
import BackgroundPattern from './img/pattern.jpg';

import PlayGame from './components/PlayGame';
import MenuModal from './components/MenuModal';

import gameImage from './img/Ps3.png'; // temporary. this needs to be taken from the firebase database.

function App() {
	return (
		<div className='App'>
			{/* <MenuModal /> */}
			<img src={BackgroundPattern} />
			<PlayGame
				isDisabled={false}
				gameImage={gameImage}
			/>
		</div>
	);
}

export default App;
