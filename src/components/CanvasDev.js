import React from 'react';

function CanvasDev({ handleHeightChange, handleWidthChange }) {
	return (
		<>
			<label>Height</label>
			<input
				onChange={handleHeightChange}
				type='number'
				defaultValue={50}
				style={{
					width: '50px',
					marginLeft: '5px',
					marginRight: '10px',
					padding: '0',
				}}
			></input>
			<label>Width</label>
			<input
				onChange={handleWidthChange}
				type='number'
				defaultValue={50}
				style={{ width: '50px', marginLeft: '5px', padding: '0' }}
			></input>
			<button>Update Hitboxes</button>
		</>
	);
}

export default CanvasDev;
