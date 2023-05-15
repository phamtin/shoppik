import DetailTitle from '@/Modules/Market/components/DetailTitle/DetailTitle';
import ProductSpotLight from '@/Modules/Market/components/ProductSpotlight/ProductSpotlight';
import RevelantProducts from '@/Modules/Market/components/RevelantProducts/RevelantProducts';

import useStyle from './MarketDetail.style';
import { Row, Col, Typography } from 'ui/components/Core';

const { Text } = Typography;

const MarketDetail = () => {
	const { styles } = useStyle();

	return (
		<div className={styles.wrapper}>
			<DetailTitle title="Market Detail" />

			<div className={styles.wrapperSection}>
				<div className="left">
					<ProductSpotLight />
					<RevelantProducts />
				</div>
				<div className="right">
					<Text>Content goes here...</Text>
				</div>
			</div>
		</div>
	);
};

export default MarketDetail;
