'use client';

import { useEffect, useRef, useState } from 'react';
import { Typography } from '@shoppik/ui/components/Core';
import CardSlider from '@/Components/CardSlider/CardSlider';
import Banner from '@/Modules/Dashboard/components/Banner/Banner';
import BestSeller from '@/Modules/Dashboard/components/BestSeller/BestSeller';
import RecentView from '@/Modules/Dashboard/components/RecentView/RecentView';

import useStyles from './DashboardOverview.style';
import ProductCard from '@/Modules/Market/components/ProductCard/ProductCard';

const cc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DashboardOverview = () => {
	const { styles } = useStyles();
	const trendingRef = useRef<any>(null);
	const timer = useRef<any>(null);

	const [width, setWidth] = useState(0);

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

	return (
		<div className={styles.wrapper}>
			<div className="leftWrapper">
				<Banner />
				<div className="trendingWrapper">
					<Typography.Title level={3} title="Trending" />

					<CardSlider
						width={890}
						elements={cc.map((i) => (
							<ProductCard key={i} name={i} />
						))}
					/>
				</div>
			</div>
			{width}
			<div className="rightWrapper">
				<BestSeller />
				<RecentView />
			</div>
		</div>
	);
};

export default DashboardOverview;
