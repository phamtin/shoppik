import useStyles from './DashboardOverview.style';
import ProductCard from '@/Modules/Market/components/ProductCard/ProductCard';
import { Chart } from 'react-iconly';
import InfoItem from '@/Modules/Market/components/InfoItem/InfoItem';
import CardHeader from '../../components/CardHeader/CardHeader';
import Banner from '../../components/Banner/Banner';

const DashboardOverview = () => {
	const { styles } = useStyles();

	return (
		<div className={styles.wrapper}>
			<div className="leftWrapper">
				<Banner />

				<div className="trendingWrapper">
					<CardHeader title="Trending" />
					<div className="trendingCards">
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</div>
				</div>

				<div className="topCollectionWrapper">
					<CardHeader title="Top Collection" />
				</div>
			</div>

			<div className="rightWrapper">
				<div className="bestSellerWrapper">
					<CardHeader
						title="Dashboard Overview"
						rightTitle={<Chart primaryColor="red" />}
					/>
					<div className="bestSellerItems">
						<InfoItem
							image="/images/ava1.png"
							title="Created By"
							content="Perperzon"
							mBottom={18}
							showButton
						/>
						<InfoItem
							image="/images/ava1.png"
							title="Created By"
							content="Perperzon"
							mBottom={18}
							showButton
						/>
						<InfoItem
							image="/images/ava1.png"
							title="Created By"
							content="Perperzon"
							mBottom={18}
							showButton
						/>
						<InfoItem
							image="/images/ava1.png"
							title="Created By"
							content="Perperzon"
							mBottom={18}
							showButton
						/>
						<InfoItem
							image="/images/ava1.png"
							title="Created By"
							content="Perperzon"
							mBottom={18}
							showButton
						/>
						<InfoItem
							image="/images/ava1.png"
							title="Created By"
							content="Perperzon"
							showButton
						/>
					</div>
				</div>

				<div className="recentViewWrapper">
					<CardHeader title="Recent Viewed" rightTitle={<Chart primaryColor="red" />} />
					<div className="bestSellerItems">
						<InfoItem
							image="/images/ava1.png"
							title="Created By"
							content="Perperzon"
							mBottom={18}
							renderRight
						/>
						<InfoItem
							image="/images/ava1.png"
							title="Created By"
							content="Perperzon"
							renderRight
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardOverview;
