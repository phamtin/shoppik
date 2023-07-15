import React, { ReactNode } from 'react';
import useStyles from './card-slider.style';

export interface CardSliderProps {
	width: number | string;
	elements: ReactNode[];
}

const CardSlider = (props: CardSliderProps) => {
	const { elements, width } = props;
	const { styles } = useStyles({ width });

	return (
		<div className={styles.wrapper}>
			<div className={styles.elements}>{elements}</div>
		</div>
	);
};

export default CardSlider;
