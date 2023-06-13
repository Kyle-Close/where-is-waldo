import './App.css';
import React from 'react';

import MenuModal from './components/MenuModal';
import Canvas from './components/Canvas';
import PlayGameHeader from './components/PlayGameHeader';
import {
	getAllMaps,
	getAllMapsData,
	retrieveFoldersAndImages,
} from './firebase';

function App() {
	const [startTime, setStartTime] = React.useState(null);
	const [endTime, setEndTime] = React.useState(null);
	const [totalTime, setTotalTime] = React.useState(null);
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

	React.useEffect(() => {
		setTotalTime(endTime - startTime);
	}, [endTime]);

	function lightUpFoundTarget(targetName) {
		setTargetName(targetName);
	}

	React.useEffect(() => {
		if (currentMapData && currentMapData.rectangles.length === 0) {
			//game over
			setIsGameOver(true);
		}
	}, [currentMapData]);

	React.useEffect(() => {
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
	}, [isGameOver]);

	function selectCurrentMapFromArray(index) {
		// Set the selected map image for game
		const currentMap = allMaps[index];
		setCurrentMap(currentMap);
		// Set the current target images
		const currentMapTargetImagesArr = [];
		allMapsTargetImages[index].images.forEach((image) => {
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
			if (mapData.mapName.includes(index)) {
				currentMapData = mapData;
			}
		});

		setCurrentMapData(currentMapData);
	}

	function handleClickDev(event, img, width, height) {
		const { x, y } = getScaledrectangles(event, img);

		console.log(` ++ Placing rect at [${x}, ${y}]...`);
	}

	/* 	function handleRightClickDev(e) {
		e.preventDefault();
		if (currentMapData.length === 0) return;
		setCurrentMapData((prevRectangles) => {
			const newRectangles = [...prevRectangles];
			const removedCoords = newRectangles.pop();
			console.log(
				` -- Removing rect at [${removedCoords.x}, ${removedCoords.y}]`
			);
			return newRectangles;
		});
	} */

	function resetGame() {
		console.log('Resetting Game');
		setIsGameOver(false);
		setIsMainMenuActive(true);
		setCurrentMap(null);
		setCurrentMapData(null);
		setTargetName(null);
		setCurrentMapTargetImages(null);
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
							setStartTime={setStartTime}
						/>
						<Canvas
							isDevMode={false}
							handleClick={handleClickDev}
							/* handleRightClick={handleRightClickDev} */
							image={currentMap}
							rectangles={currentMapData.rectangles}
							setCurrentMapData={setCurrentMapData}
							lightUpFoundTarget={lightUpFoundTarget}
							isGameOver={isGameOver}
							setIsGameOver={setIsGameOver}
							resetGame={resetGame}
							setEndTime={setEndTime}
							totalTime={totalTime}
						/>
					</>
				)
			)}
		</div>
	);
}

export default App;
