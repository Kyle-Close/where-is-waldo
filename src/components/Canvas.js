import React, { useRef, useEffect } from 'react';
import CanvasDev from './CanvasDev';
import SelectionMenu from './SelectionMenu';
import TransitionsModal from './Modal';
import '../styles/Canvas.css';

function Canvas({
	isDevMode,
	image,
	rectangles,
	setCurrentMapData,
	handleClick,
	handleRightClick,
	isGameOver,
	setIsGameOver,
	resetGame
}) {
	// States
	const [rectHeight, setRectHeight] = React.useState(50);
	const [rectWidth, setRectWidth] = React.useState(50);
	const [isSelection, setIsSelection] = React.useState(false);
	const [selectionBoxStyles, setSelectionBoxStyles] = React.useState(null);
	const [selectedRect, setSelectedRect] = React.useState(null);

	// Refs
	const canvasRef = useRef(null);
	const img = useRef(null);

	// Variables
	const numRects = rectangles.length;

	// Utility Functions
	function rectanglesOverlap(rect1, rect2) {
		const rect1Right = rect1.x + rect1.width;
		const rect1Bottom = rect1.y + rect1.height;
		const rect2Right = rect2.x + rect2.width;
		const rect2Bottom = rect2.y + rect2.height;

		return (
			rect1.x < rect2Right &&
			rect1Right > rect2.x &&
			rect1.y < rect2Bottom &&
			rect1Bottom > rect2.y
		);
	}

	function clearSelection(e) {
		e.preventDefault();
		setIsSelection(false);
	}

	function placeSelectionBox(e) {
		setIsSelection(true);
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const boundingRect = e.target.getBoundingClientRect();
		const scale = e.target.width / img.current.width;

		const x = Math.round((e.clientX - boundingRect.left) / scale);
		const y = Math.round((e.clientY - boundingRect.top) / scale);

		drawImageScaled(canvas, ctx, img.current);

		drawPlacementRect(canvas, ctx, img.current, x, y, 50, 50);

		let menuX = e.clientX - boundingRect.left;
		let menuY = e.clientY - boundingRect.top;

		menuY += 60 * scale;

		setSelectionBoxStyles({
			position: 'absolute',
			left: menuX,
			top: menuY,
		});

		setSelectedRect({
			x: x,
			y: y,
			width: 50,
			height: 50,
		});
	}

	const drawImageScaled = (canvas, ctx, img) => {
		const scale = window.innerWidth / img.width;
		canvas.width = window.innerWidth;
		canvas.height = img.height * scale;

		const x = 0;
		const y = 0;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, x, y, canvas.width, canvas.height);
	};

	const drawRect = (canvas, ctx, img, x, y, width, height, strokeStyle) => {
		const scale = canvas.width / img.width;
		const scaledRectX = x * scale;
		const scaledRectY = y * scale;
		const scaledWidth = width * scale;
		const scaledHeight = height * scale;

		const lengthAndGap = [10 * scale, 10 * scale];

		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = 5 * scale;

		ctx.setLineDash(lengthAndGap);
		ctx.strokeRect(scaledRectX, scaledRectY, scaledWidth, scaledHeight);
		ctx.setLineDash([]);
	};

	function drawPlacementRect(canvas, ctx, img, x, y, width, height) {
		const scale = canvas.width / img.width;
		const scaledRectX = x * scale;
		const scaledRectY = y * scale;
		const scaledWidth = width * scale;
		const scaledHeight = height * scale;

		ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 4 * scale;

		ctx.fillRect(scaledRectX, scaledRectY, scaledWidth, scaledHeight);
		ctx.strokeRect(scaledRectX, scaledRectY, scaledWidth, scaledHeight);
	}

	const handleHeightChange = (e) => {
		setRectHeight(e.target.value);
	};

	const handleWidthChange = (e) => {
		setRectWidth(e.target.value);
	};

	// Use Effects
	useEffect(() => {
		if (isSelection) return;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		img.current = new Image();
		img.current.src = image;

		img.current.onload = function () {
			drawImageScaled(canvas, ctx, img.current);
			for (let i = 0; i < numRects; i++) {
				const x = rectangles[i].x;
				const y = rectangles[i].y;
				const width = rectangles[i].width;
				const height = rectangles[i].height;

				if (isDevMode)
					drawPlacementRect(canvas, ctx, img.current, x, y, width, height);
			}
		};

		const handleResize = () => {
			drawImageScaled(canvas, ctx, img.current);
			for (let i = 0; i < numRects; i++) {
				const x = rectangles[i].x;
				const y = rectangles[i].y;
				if (isDevMode)
					drawPlacementRect(
						canvas,
						ctx,
						img.current,
						x,
						y,
						rectHeight,
						rectWidth
					);
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [image, rectangles, numRects, isDevMode, isSelection]);

	useEffect(() => {
		if (isDevMode || isSelection) return;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const handleMouseMove = (e) => {
			var boundingRect = e.target.getBoundingClientRect();
			var scale = e.target.width / img.current.width;

			const x = Math.round((e.clientX - boundingRect.left) / scale);
			const y = Math.round((e.clientY - boundingRect.top) / scale);

			drawImageScaled(canvas, ctx, img.current);

			drawRect(canvas, ctx, img.current, x, y, 50, 50, 'black');
		};

		canvas.addEventListener('mousemove', handleMouseMove);

		return () => {
			canvas.removeEventListener('mousemove', handleMouseMove);
		};
	}, [canvasRef, isSelection]); // Add any other dependencies for this useEffect here.

	return (
		<>
			{isDevMode && (
				<>
					<CanvasDev
						handleHeightChange={handleHeightChange}
						handleWidthChange={handleWidthChange}
					/>
					<canvas
						style={{ marginTop: '10px' }}
						onClick={(event) => handleClick(event, img, rectWidth, rectHeight)}
						onContextMenu={isDevMode && handleRightClick}
						ref={canvasRef}
					/>
				</>
			)}
			{!isDevMode && (
				<>
				<button style={{position:'absolute', zIndex: '5'}} onClick={() => {
					setIsGameOver(true)
				}}>
					Set isGameOver
					</button>
					<canvas
						ref={canvasRef}
						onClick={placeSelectionBox}
						onContextMenu={clearSelection}
					/>
					{isSelection && selectionBoxStyles && (
						<SelectionMenu
							style={selectionBoxStyles}
							rectangles={rectangles}
							setCurrentMapData={setCurrentMapData}
							rectanglesOverlap={rectanglesOverlap}
							selectedRect={selectedRect}
						/>
					)}
					{ isGameOver && (<TransitionsModal resetGame={resetGame}/>)}
				</>
			)}
		</>
	);
}

export default Canvas;
