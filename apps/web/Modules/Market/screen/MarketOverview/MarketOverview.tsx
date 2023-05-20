import { Button, Col, Row, Typography, notification } from 'ui/components/Core';
import useStyle from './market-overview.style';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Activity, Chart, Home } from 'react-iconly';
import { trpc } from '@/Utils/trpc/trpc';
import { useEffect } from 'react';

interface MarketProp {}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const MarketOverviewScreen = ({}: MarketProp) => {
	const { styles } = useStyle();
	const [api, contextHolder] = notification.useNotification();

	// const { data, error } = trpc.market.getMarket.useQuery({ price: 1200 });

	// const openNotificationWithIcon = (
	// 	type: NotificationType,
	// 	content: string | undefined,
	// ) => {
	// 	api[type]({
	// 		message: 'Notification Title',
	// 		description: content,
	// 	});
	// };

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

const FilterComponent = ({ text, icon }: { text: string; icon: any }) => {
	return (
		<Col>
			<Button size="large" className="buttonFilter" icon={icon}>
				<Typography.Paragraph className="paragraph">{text}</Typography.Paragraph>
			</Button>
		</Col>
	);
};

export default MarketOverviewScreen;
