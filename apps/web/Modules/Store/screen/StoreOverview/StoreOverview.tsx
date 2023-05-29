import { PropsWithChildren } from 'react';

import StoreMainInfo from '../../components/StoreMainInfo/StoreMainInfo';
import StoreMain from '../../components/StoreMain/StoreMain';
import useStyle from './store-overview.style';

interface MarketProp extends PropsWithChildren {
	store: string;
}

const MarketOverviewScreen = ({ store }: MarketProp) => {
	const { styles } = useStyle({ store });

	return (
		<div className={styles.wrapper}>
			<StoreMainInfo information="Twitter Store" />
			<StoreMain id="1" />
		</div>
	);
};

export default MarketOverviewScreen;
