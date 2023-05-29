import './App.css';
import { getMenuCards } from './firebase';
import PS3 from './img/Ps3.png';

import PlayGame from './components/PlayGame';
import MainMenuModal from './components/MenuModal';

import gameImage from './img/Ps3.png'; // temporary. this needs to be taken from the firebase database.

function App() {
	async function fetchMenuCards() {
		const cards = await getMenuCards();
		console.log(cards);
	}
	fetchMenuCards();

	return (
		<div className='App'>
			<MainMenuModal />
			<PlayGame
				isDisabled={true}
				gameImage={gameImage}
			/>
		</div>
	);
}

export default App;
