import React, { useState } from 'react';
import { Button, Menu, MenuItem, FormControl } from '@mui/material';

function SelectionMenu({
	style,
	rectangles,
	setCurrentMapData,
	rectanglesOverlap,
	selectedRect,
	lightUpFoundTarget,
}) {
	const [selectedValue, setSelectedValue] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (index) => {
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

	const characterList = rectangles.map((rectObj, index) => (
		<MenuItem
			onClick={() => handleMenuItemClick(index)}
			key={index}
		>
			{rectObj.character}
		</MenuItem>
	));

	const selectStyle = {
		backgroundColor: '#ffffff',
		height: '2.5rem',
	};

	return (
		<FormControl
			style={style}
			sx={{ m: 1, minWidth: 80 }}
		>
			<Button
				aria-controls='simple-menu'
				aria-haspopup='true'
				onClick={handleClick}
				style={selectStyle}
			>
				Select
			</Button>
			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				{characterList}
			</Menu>
		</FormControl>
	);
}

export default SelectionMenu;
