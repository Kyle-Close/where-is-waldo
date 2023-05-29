import './App.css';
import PS3 from './img/Ps3.png';

import PlayGame from './components/PlayGame';
import MainMenuModal from './components/MainMenuModal';

import gameImage from './img/Ps3.png'; // temporary. this needs to be taken from the firebase database.

function App() {
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
