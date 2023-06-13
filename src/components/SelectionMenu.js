import React, { useState } from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';

function SelectionMenu({
	style,
	rectangles,
	setCurrentMapData,
	rectanglesOverlap,
	selectedRect,
	lightUpFoundTarget,
}) {
	const [selectedValue, setSelectedValue] = useState('');

	const characterList = rectangles.map((rectObj, key) => (
		<MenuItem
			value={key}
			key={key}
		>
			{rectObj.character}
		</MenuItem>
	));

	const selectStyle = {
		backgroundColor: '#ffffff',
		height: '2.5rem',
	};

	const handleSelectionChange = (event) => {
		const index = event.target.value;
		setSelectedValue(index);
		// Check if selection overlaps with character
		const targetRect = {
			x: rectangles[index].x,
			y: rectangles[index].y,
			width: rectangles[index].width,
			height: rectangles[index].height,
		};

		if (rectanglesOverlap(selectedRect, targetRect)) {
			setCurrentMapData((prevMapData) => {
				const currentRects = prevMapData.rectangles;
				const removedRect = currentRects.splice(index, 1);
				lightUpFoundTarget(removedRect[0].character);
				return {
					mapName: prevMapData.mapName,
					rectangles: [...currentRects],
				};
			});
		} else console.log('Not overlapping');
	};

	return (
		<FormControl
			style={style}
			sx={{ m: 1, minWidth: 80 }}
		>
			<Select
				value={selectedValue}
				onChange={handleSelectionChange}
				style={selectStyle}
			>
				{characterList}
			</Select>
		</FormControl>
	);
}

export default SelectionMenu;
