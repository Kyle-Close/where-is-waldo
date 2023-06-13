import './App.css';
import React from 'react';

import MenuModal from './components/MenuModal';
import Canvas from './components/Canvas';
import PlayGameHeader from './components/PlayGameHeader';
import {
	getAllMaps,
	getAllMapsData,
	setFirebaseMapData,
	retrieveFoldersAndImages,
} from './firebase';

function App() {
	const [isMainMenuActive, setIsMainMenuActive] = React.useState(true);
	const [allMaps, setAllmaps] = React.useState(null);
	const [currentMap, setCurrentMap] = React.useState(null);
	const [allMapsData, setAllMapsData] = React.useState(null);
	const [currentMapData, setCurrentMapData] = React.useState(null);
	const [isGameOver, setIsGameOver] = React.useState(false);
	const [targetName, setTargetName] = React.useState(null);
	const [allMapsTargetImages, setAllMapsTargetImages] = React.useState(null);
	const [currentMapTargetImages, setCurrentMapTargetImages] =
		React.useState(null);

	function lightUpFoundTarget(targetName) {
		setTargetName(targetName);
	}

	React.useEffect(() => {
		console.log(currentMapData);
		if (currentMapData && currentMapData.rectangles.length === 0) {
			//game over
			setIsGameOver(true);
		}
	}, [currentMapData]);

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

		const fetchAllMapsTargetImages = async () => {
			const mapsTargetImages = await retrieveFoldersAndImages();
			setAllMapsTargetImages(mapsTargetImages);
		};

		fetchAllMaps();
		fetchAllMapsData();
		fetchAllMapsTargetImages();
	}, []);

	function selectCurrentMapFromArray(index) {
		// Set the selected map image for game
		const currentMap = allMaps[index];
		setCurrentMap(currentMap);
		// Set the current target images
		const currentMapTargetImagesArr = [];
		allMapsTargetImages[index].images.forEach((image) => {
			console.log('Here', image);
			const obj = {
				img: image,
				isFound: false,
			};
			currentMapTargetImagesArr.push(obj);
		});

		setCurrentMapTargetImages(currentMapTargetImagesArr);
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

	function resetGame() {
		setIsGameOver(false);
		setIsMainMenuActive(true);
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
						<PlayGameHeader
							currentMapData={currentMapData}
							targetName={targetName}
							currentMapTargetImages={currentMapTargetImages}
							setCurrentMapTargetImages={setCurrentMapTargetImages}
						/>
						<Canvas
							isDevMode={false}
							handleClick={handleClickDev}
							handleRightClick={handleRightClickDev}
							image={currentMap}
							rectangles={currentMapData.rectangles}
							setCurrentMapData={setCurrentMapData}
							lightUpFoundTarget={lightUpFoundTarget}
							isGameOver={isGameOver}
							setIsGameOver={setIsGameOver}
							resetGame={resetGame}
						/>
					</>
				)
			)}
		</div>
	);
}

export default App;
