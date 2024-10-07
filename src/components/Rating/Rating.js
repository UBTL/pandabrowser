import React from 'react';
import Star from './Star';

/**
 * 
 * @param {{value: number, onClick?: (i: number) => void}} args
 * @returns 
 */
const Rating = ({ value = 0, onClick = undefined }) => {
	let rating = +value + 1;
	const starConfig = new Array(5).fill('').map(() => {
		rating -= 1;
		if (rating < 0.25) {
			return {};
		}
		if (rating < 0.75) {
			return { half: true };
		}
		return { full: true };
	});

	return starConfig.map((e, i) => (
		<Star key={i} onClick={() => onClick && onClick(i + 1)} {...e} />
	));
};

export default Rating;