import { Button, Col, Row, Typography } from 'ui/components/Core';
import Image from 'next/image';
import useStyles from './Banner.style';

const { Title, Paragraph } = Typography;

const Banner = () => {
	const { styles } = useStyles();

	return (
		<div className={styles.bannerWrapper}>
			<Image
				src="/images/data/banner_bg.jpg"
				alt="banner_bg"
				height={194}
				width="100%"
				className="bannerBG"
			/>
			<div className="info">
				<div className="infoText">
					<Title className="title">Create and Sell NFTs</Title>
					<Paragraph className="desc">World&apos;s Largest NFT Place</Paragraph>
				</div>
				<Row gutter={20}>
					<Col>
						<Button className="button">Explore More</Button>
					</Col>
					<Col>
						<Button className="button">Sell Artwork</Button>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Banner;
