import { Typography } from 'ui/components/Core';

import DetailTitle from '@/Modules/Market/components/DetailTitle/DetailTitle';
import ProductSpotLight from '@/Modules/Market/components/ProductSpotlight/ProductSpotlight';
import RevelantProducts from '@/Modules/Market/components/RevelantProducts/RevelantProducts';

import useStyle from './MarketDetail.style';

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
