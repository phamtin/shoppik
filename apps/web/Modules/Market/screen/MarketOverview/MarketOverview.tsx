'use client';

import { PropsWithChildren } from 'react';
import { Button, Col, Row, Typography } from '@shoppik/ui/components/Core';
import { Activity, Chart, Home } from 'react-iconly';
import { trpc } from '@/lib/trpc/trpc';
import useStyle from './market-overview.style';
import ProductCard from '../../components/ProductCard/ProductCard';

interface MarketProp extends PropsWithChildren {
	products: any[];
}

const FilterComponent = ({ text, icon }: { text: string; icon: any }) => {
	return (
		<Col>
			<Button size="large" className="buttonFilter" icon={icon}>
				<Typography.Paragraph className="paragraph">{text}</Typography.Paragraph>
			</Button>
		</Col>
	);
};

const MarketOverviewScreen = ({ products }: MarketProp) => {
	const { styles } = useStyle();

	const { data, error } = trpc.market.getmarket.useQuery();

	// if (!data) return <> </>;

	if (data) {
		console.log(data);
	}

	return (
		<div className={styles.wrapper}>
			<Typography.Title level={2} className="title">
				Discover Products
			</Typography.Title>

			<Row gutter={22}>
				<FilterComponent text="Category" icon={<Chart style={{ width: 20 }} />} />
				<FilterComponent text="Collection" icon={<Home style={{ width: 20 }} />} />
				<FilterComponent text="Price" icon={<Activity style={{ width: 20 }} />} />
			</Row>

			<div className="productWrapper">
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		</div>
	);
};

export default MarketOverviewScreen;
