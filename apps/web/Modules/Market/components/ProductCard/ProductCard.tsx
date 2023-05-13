import Image from 'next/image';
import {Button, Card, Typography} from 'ui/components/Core';
import useStyle from './ProductCard.style';
import Link from 'next/link';

const ProductCard = () => {
	const {styles} = useStyle();

	return (
		<div className={styles.wrapper}>
			<Link href='/market/[id]' as={'/market/Sun-Glass'}>
				<Card
					bordered={false}
					cover={
						<Image
							alt="example"
							src="/images/product.png"
							width={180}
							height={180}
							style={{borderRadius: 20}}
						/>
					}
				>
					<Typography.Title className="title">Sun-Glass</Typography.Title>
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
