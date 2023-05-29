import React from 'react';
import '../styles/MainMenuModal.css';

import PS3 from '../img/Ps3.png';

function MainMenuModal() {
	const backgroundImageStyle = {
		backgroundImage: `url(${PS3})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
	};
	return (
		<div className='main-menu-modal'>
			<div
				className='background'
				style={{ backgroundImage: `url(${PS3})` }}
			></div>
			<div></div>
			<div className='menu-contents'>
				<div className='map-selection-cards'>
					<div className='selection-card'>
						<div
							className='background background-card'
							style={backgroundImageStyle}
						></div>
						<h5 className='player-highscore'>36s</h5>
						<h3 className='map-name'>Playstation 3</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainMenuModal;
