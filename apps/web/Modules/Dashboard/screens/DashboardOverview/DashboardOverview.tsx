'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from 'ui/components/Core';
import CardSlider from '@/Components/CardSlider/CardSlider';
import Banner from '../../components/Banner/Banner';
import BestSeller from '../../components/BestSeller/BestSeller';
import CardHeader from '../../components/CardHeader/CardHeader';
import RecentView from '../../components/RecentView/RecentView';
import useStyles from './DashboardOverview.style';

const cc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DashboardOverview = () => {
	const { styles } = useStyles();
	const trendingRef = useRef<any>(null);
	const timer = useRef<any>(null);

	const [width, setWidth] = useState(0);
	const [index, setIndex] = useState(0);

	const onResize = () => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => {
			setWidth(trendingRef?.current?.clientWidth);
		}, 800);
	};

	useEffect(() => {
		onResize();
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
			clearTimeout(timer.current);
		};
	}, []);

	const handleSlide = (action: 'left' | 'right') => () => {
		// const itemWidth = 186;
		// const spacing = 32;
		// const currentIndex = Math.round(width / (itemWidth + spacing));
		// console.log('currentIndex', currentIndex);
		// setIndex(currentIndex);

		const slider = document.getElementById('slider');
		slider.scrollLeft = slider?.scrollTo(4);
	};

	const handleLeft = () => {
		// const slider = document.getElementById('slider');
		// slider.scroll = slider?.scrollTo({
		// 	left: 4,
		// 	behavior: 'smooth',
		// });
	};
	const handleRight = () => {
		// const slider = document.getElementById('slider');
		// slider.scrollTo = slider?.scrollTo({
		// 	left: 4,
		// 	behavior: 'smooth',
		// });
	};

	return (
		<div className={styles.wrapper}>
			<div className="leftWrapper">
				<Banner />
				<div className="trendingWrapper">
					<CardHeader title="Trending" />
					<div className="trendingCards" ref={trendingRef}>
						<Button
							onClick={handleLeft}
							title="left"
							style={{
								background: 'red',
								borderRadius: '100%',
								position: 'absolute',
								cursor: 'pointer',
								zIndex: 1,
								alignItems: 'center',
								top: '42%',
							}}
						/>
						<CardSlider index={index} />
						<Button
							onClick={handleRight}
							title="right"
							style={{
								background: 'red',
								borderRadius: '100%',
								position: 'absolute',
								cursor: 'pointer',
								zIndex: 1,
								alignItems: 'center',
								top: '42%',
								right: 0,
							}}
						/>
					</div>
				</div>
			</div>

			<div className="rightWrapper">
				<BestSeller />
				<RecentView />
			</div>
		</div>
	);
};

export default DashboardOverview;
