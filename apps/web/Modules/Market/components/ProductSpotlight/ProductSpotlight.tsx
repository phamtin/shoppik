import Image from 'next/image';
import { Chart } from 'react-iconly';
import { Button, Col, Row, Typography } from '@shoppik/ui/components/Core';
import InfoItem from '@/Modules/Market/components/InfoItem/InfoItem';
import useStyles from './product-spotlight.style';

const { Title, Paragraph, Text } = Typography;

interface ProductSpotLightProps {
	title: string;
}

const ProductSpotLight = (props: ProductSpotLightProps) => {
	const { title } = props;
	const { styles } = useStyles(props);

	return (
		<div className={styles.wrapper}>
			<Row>
				<Col xs={24} lg={12}>
					<div style={{ minHeight: 340 }}>
						<Image
							alt="example"
							src="/images/product-detail.png"
							layout="fill"
							objectFit="cover"
						/>
					</div>
				</Col>

				<Col xs={24} lg={12}>
					<div className="productInfo">
						<Title level={3} className="productName">
							{title}
						</Title>
						<Paragraph className="productDesc">
							A collection of 10,000 utility-enabled PFPs that feature a richly diverse
							and unique pool of rarity-powered traits. A collection of 10,000
							utility-enabled PFPs that feature a richly diverse and unique pool of
							rarity-powered traits.
						</Paragraph>
						<div className="productItemInfo">
							<InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" />
							<InfoItem image="/images/ava2.png" title="Owned By" content="Videz" />
						</div>
						<div className="productMore">
							<div className="productMoreItem">
								<Text className="productMoreItemTitle">Current Bid</Text>
								<Text className="productMoreItemPrice">1.75</Text>
							</div>
							<div className="productMoreItem">
								<Text className="productMoreItemTitle">End In</Text>
								<Text className="productMoreItemTime">Oct 17, 2022 at 05:08</Text>
							</div>
						</div>
						<div style={{ marginTop: 'auto' }}>
							<Button
								block
								type="primary"
								size="large"
								className="productButton"
								icon={<Chart />}
							>
								Place Bid
							</Button>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default ProductSpotLight;
