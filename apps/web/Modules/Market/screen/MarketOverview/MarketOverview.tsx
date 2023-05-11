import { Button, Col, Row, Typography } from "ui/components/Core";
import useStyle from "./market-overview.style";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Activity, Chart, Home } from "react-iconly";

interface MarketProp {}

const MarketScreen = ({}: MarketProp) => {
	const { styles } = useStyle();

	return (
		<div className={styles.wrapper}>
			<Typography.Title className="title">Discover Products</Typography.Title>

			<Row gutter={28}>
				<FilterComponent text="Category" icon={<Chart />} />
				<FilterComponent text="Collection" icon={<Home />} />
				<FilterComponent text="Price" icon={<Activity />} />
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
			<Button className="button">
				{icon}
				<Typography.Paragraph className="paragraph">{text}</Typography.Paragraph>
			</Button>
		</Col>
	);
};

export default MarketScreen;
