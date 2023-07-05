import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, Typography } from 'ui/components/Core';

import useStyle from './ProductCard.style';

const ProductCard = ({ name = 'Sun-Glass' }: { name?: string | number }) => {
	const { styles } = useStyle();

	return (
		<div className={styles.wrapper}>
			<Link href="/market/[id]" as="/market/Sun-Glass">
				<Card
					bordered={false}
					cover={
						<Image alt="example" src="/images/product.png" width={180} height={150} />
					}
				>
					<Typography.Title className="title">{name}</Typography.Title>
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
