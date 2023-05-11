import { Card, Typography } from "ui/components/Core";
import useStyle from "./ProductCard.style";

const ProductCard = () => {
	const { styles } = useStyle();

	return (
		<div className={styles.wrapper}>
			<Card
				bordered={false}
				cover={
					<img
						alt="example"
						src="/images/product.png"
						style={{ borderRadius: 12, marginBottom: 0, width: 176, height: 176 }}
					/>
				}
			>
				<Typography.Title className="title">Sun-Glass</Typography.Title>
				<Typography.Text className="desc">Current bid</Typography.Text>
				<Typography.Title className="price">1.75</Typography.Title>
			</Card>
		</div>
	);
};

export default ProductCard;
