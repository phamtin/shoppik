import {Button, Col, Row, Typography} from 'ui/components/Core';
import useStyles from './Banner.style';

const {Title, Paragraph} = Typography;

const Banner = () => {
	const {styles} = useStyles();

	return (
		<div className={styles.bannerWrapper}>
			<div>
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
	);
};

export default Banner;
