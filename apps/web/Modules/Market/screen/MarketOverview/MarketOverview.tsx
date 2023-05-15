import { Button, Col, Row, Typography } from 'ui/components/Core';
import useStyle from './market-overview.style';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Activity, Chart, Home } from 'react-iconly';

interface MarketProp {}

const MarketOverviewScreen = ({}: MarketProp) => {
	const { styles } = useStyle();

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
			<Button size="large" className="button" icon={icon}>
				<Typography.Paragraph className="paragraph">{text}</Typography.Paragraph>
			</Button>
		</Col>
	);
};

export default MarketOverviewScreen;
