'use client';

import { Typography } from '@shoppik/ui/components/Core';
import DetailTitle from '@/Modules/Market/components/DetailTitle/DetailTitle';
import ProductSpotLight from '@/Modules/Market/components/ProductSpotlight/ProductSpotlight';
import RevelantProducts from '@/Modules/Market/components/RevelantProducts/RevelantProducts';

import useStyle from './MarketDetail.style';
import { trpc } from '@/lib/trpc/trpc';
import ProductInfo from '../../components/ProductInfo/ProductInfo';

const { Text } = Typography;

interface MarketDetail {
	id: string;
}

const MarketDetail = (props: MarketDetail) => {
	const { id } = props;

	const { data } = trpc.product.getProductDetail.useQuery({ productId: id })

	const { styles } = useStyle();

	return (
		<div className={styles.wrapper}>
			<DetailTitle title="Market Detail" />

			<div className={styles.wrapperSection}>
				<div className="left">
					<ProductSpotLight product={data} />
					<ProductInfo product={data} />
					{/* <RevelantProducts /> */}
				</div>
				<div className="right">
					<Text>Content goes here...</Text>
				</div>
			</div>
		</div>
	);
};

export default MarketDetail;
