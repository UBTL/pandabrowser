import React from 'react';
import styles from './Rating.css';

/**
 * 
 * @param {{half?: boolean, full?: boolean, onClick?: () => void}} args
 * @returns 
 */
const Star = ({ half = false, full = false, onClick = undefined }) => (
	<span onClick={onClick} className={`${styles.star} ${half ? styles.half : full ? styles.full : ''}`.trim()} />
);

export default Star;