import React, { useEffect, useState } from 'react';
import ProductCard from '@/Modules/Market/components/ProductCard/ProductCard';
import useStyles from './CardSlider.style';

interface CardSliderProps {
	index: number;
}

const CardSlider = ({ index }: CardSliderProps) => {
	const { styles } = useStyles();

	const [cc, setCC] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	// const [page, setPage] = useState(1);
	// const [offset, setOffset] = useState(0);
	// const [count, setCount] = useState(index);

	// const setArray = (idx: number) => {
	// 	if (idx > 0) {
	// 		setPage((prev) => prev + 1);
	// 		cc.splice(offset, index);
	// 		setCC(cc);
	// 		setOffset(page * index);
	// 	}
	// };

	useEffect(() => {
		// setArray(index);
	}, [index]);

	return (
		<div className={styles.wrapper}>
			<div className="mainSlider">
				<div className="slider">
					{cc.map((item) => {
						return <ProductCard name={item} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default CardSlider;
