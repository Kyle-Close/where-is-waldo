import React from 'react';
import { calculateBox, isOverlap } from '../components/GameBoard';

// CalculateBox()
// Input: top left coordinates of the box, length of 1 side of the box (square)
// Output: Object with the topleft and bottomright coordinates
test('Calculates box coordinates (Top left, Bottom right)', () => {
	const test1 = calculateBox([0, 0], 64);
	const result1 = { topLeft: [0, 0], bottomRight: [64, 64] };

	expect(test1).toEqual(result1);
});

describe('checkSquaresOverlap', () => {
	test('should return true if squares overlap', () => {
		const square1 = {
			topLeft: [0, 0],
			bottomRight: [64, 64],
		};
		const square2 = {
			topLeft: [64, 64],
			bottomRight: [128, 128],
		};
		expect(isOverlap(square1, square2)).toBe(true);
	});

	test('should return false if squares do not overlap', () => {
		const square1 = {
			topLeft: [0, 0],
			bottomRight: [64, 64],
		};
		const square2 = {
			topLeft: [65, 65],
			bottomRight: [129, 129],
		};
		expect(isOverlap(square1, square2)).toBe(false);
	});
});
