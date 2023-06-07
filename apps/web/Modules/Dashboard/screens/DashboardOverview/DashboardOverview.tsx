import useStyles from './DashboardOverview.style';
import ProductCard from '@/Modules/Market/components/ProductCard/ProductCard';
import CardHeader from '../../components/CardHeader/CardHeader';
import Banner from '../../components/Banner/Banner';
import BestSeller from '../../components/BestSeller/BestSeller';
import RecentView from '../../components/RecentView/RecentView';

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
			</div>

			<div className="rightWrapper">
				<BestSeller />
				<RecentView />
			</div>
		</div>
	);
};

export default DashboardOverview;
