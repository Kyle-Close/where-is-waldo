import './App.css';
import React from 'react';

import MenuModal from './components/MenuModal';
import Canvas from './components/Canvas';
import PlayGameHeader from './components/PlayGameHeader';
import { getAllMaps, getAllMapsData, setFirebaseMapData } from './firebase';

function App() {
	const [isMainMenuActive, setIsMainMenuActive] = React.useState(true);
	const [allMaps, setAllmaps] = React.useState(null);
	const [currentMap, setCurrentMap] = React.useState(null);
	const [allMapsData, setAllMapsData] = React.useState(null);
	const [currentMapData, setCurrentMapData] = React.useState(null);

	const maps = [
		{
			mapName: 'Map 0',
			rectangles: [
				{
					character: 'Kratos',
					x: 415,
					y: 650,
					width: 50,
					height: 70,
				},
				{
					character: 'Ratchet',
					x: 300,
					y: 1150,
					width: 60,
					height: 50,
				},
				{
					character: 'Test',
					x: 600,
					y: 1150,
					width: 90,
					height: 90,
				},
			],
		},
		{
			mapName: 'Map 1',
			rectangles: [
				{
					character: 'Jimbo',
					x: 415,
					y: 650,
					width: 50,
					height: 70,
				},
				{
					character: 'Randy',
					x: 500,
					y: 100,
					width: 100,
					height: 150,
				},
			],
		},
		//...more maps
	];

	React.useEffect(() => {
		//setFirebaseMapData(maps);

		const fetchAllMaps = async () => {
			const maps = await getAllMaps();
			if (!allMaps) setAllmaps(maps);
		};

		const fetchAllMapsData = async () => {
			const mapsData = await getAllMapsData();
			setAllMapsData(mapsData);
		};

		fetchAllMaps();
		fetchAllMapsData();
	}, []);

	function selectCurrentMapFromArray(index) {
		// Set the selected map image for game
		const currentMap = allMaps[index];
		setCurrentMap(currentMap);
		// Set the selected map data for game (hit boxes)
		let currentMapData;

		allMapsData.forEach((mapData) => {
			if (mapData.mapName.includes(index)) currentMapData = mapData;
		});

		setCurrentMapData(currentMapData);
	}

	function handleClickDev(event, img, width, height) {
		/* 		const { x, y } = getScaledrectangles(event, img);

		console.log(` ++ Placing rect at [${x}, ${y}]...`);
		setRectangles((prevRectangles) => [
			...prevRectangles,
			{ x, y, width, height },
		]); */
	}

	function handleRightClickDev(e) {
		/* 		e.preventDefault();
		if (rectangles.length === 0) return;
		setRectangles((prevRectangles) => {
			const newRectangles = [...prevRectangles];
			const removedCoords = newRectangles.pop();
			console.log(
				` -- Removing rect at [${removedCoords.x}, ${removedCoords.y}]`
			);
			return newRectangles;
		}); */
	}

	function getScaledrectangles(e, img) {
		// Gets rectangles in terms of img original size
		var boundingRect = e.target.getBoundingClientRect();
		var scale = e.target.width / img.current.width;

		const x = Math.round((e.clientX - boundingRect.left) / scale);
		const y = Math.round((e.clientY - boundingRect.top) / scale);
		return { x: x, y: y };
	}

	return (
		<div className='App'>
			{isMainMenuActive ? (
				<MenuModal
					setIsMainMenuActive={setIsMainMenuActive}
					setCurrentMap={selectCurrentMapFromArray}
				/>
			) : (
				currentMapData &&
				currentMap && (
					<>
						<PlayGameHeader />
						<Canvas
							isDevMode={false}
							handleClick={handleClickDev}
							handleRightClick={handleRightClickDev}
							image={currentMap}
							rectangles={currentMapData.rectangles}
							setCurrentMapData={setCurrentMapData}
						/>
					</>
				)
			)}
		</div>
	);
}

export default App;
