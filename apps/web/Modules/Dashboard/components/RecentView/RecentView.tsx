import { ChartBarIcon } from '@heroicons/react/24/outline';
import CardHeader from '../CardHeader/CardHeader';
import InfoItem from '@/Modules/Market/components/InfoItem/InfoItem';
import useStyles from './RecentView.style';

const RecentView = () => {
	const { styles } = useStyles();

	return (
		<div className={styles.wrapper}>
			<CardHeader title="Recent Viewed" rightTitle={<ChartBarIcon width={24} />} />
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
	);
};

export default RecentView;
