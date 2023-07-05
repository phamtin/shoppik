import React, { ReactNode, useEffect, useState } from 'react';
import ProductCard from '@/Modules/Market/components/ProductCard/ProductCard';
import useStyles from './card-slider.style';

export interface CardSliderProps {
	width: number | string;
	elements: ReactNode[];
}

const CardSlider = (props: CardSliderProps) => {
	const { elements, width } = props;
	const { styles } = useStyles({ width });

	const [cc, setCC] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.elements}>{elements}</div>
		</div>
	);
};

export default CardSlider;
