import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, Typography } from '@shoppik/ui/components/Core';

import useStyle from './ProductCard.style';

const ProductCard = () => {
	const { styles } = useStyle();

	return (
		<div className={styles.wrapper}>
			<Link href="/market/sun-glass">
				<Card
					bordered={false}
					cover={
						<Image alt="example" src="/images/product.png" width={180} height={150} />
					}
				>
					<Typography.Text className="title">Sun-Glass</Typography.Text>
					<div className="cardInfo">
						<div className="metadata">
							<Typography.Text className="desc">Current bid</Typography.Text>
							<Typography.Title className="price">1.75</Typography.Title>
						</div>
						<Button type="primary">Place bid</Button>
					</div>
				</Card>
			</Link>
		</div>
	);
};

export default ProductCard;
