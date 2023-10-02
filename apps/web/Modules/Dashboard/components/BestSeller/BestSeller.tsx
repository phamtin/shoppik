import { ChartPieIcon } from '@heroicons/react/24/outline';
import InfoItem from '@/Modules/Market/components/InfoItem/InfoItem';
import CardHeader from '../CardHeader/CardHeader';
import useStyles from './BestSeller.style';

const BestSeller = () => {
	const { styles } = useStyles();

	return (
		<div className={styles.wrapper}>
			<CardHeader title="Dashboard Overview" rightTitle={<ChartPieIcon width={24} />} />
			<div className="bestSellerItems">
				<InfoItem
					image="/images/ava1.png"
					title="Giá đỡ LAPTOP, ĐIỆN THOẠI, MÁY TÍNH"
					content="Perperzon"
					mBottom={18}
					showButton
				/>
				<InfoItem
					image="/images/ava1.png"
					title="Giá đỡ LAPTOP, ĐIỆN THOẠI, MÁY TÍNH"
					content="Perperzon"
					mBottom={18}
					showButton
				/>
				<InfoItem
					image="/images/ava1.png"
					title="Giá đỡ LAPTOP, ĐIỆN THOẠI, MÁY TÍNH"
					content="Perperzon"
					mBottom={18}
					showButton
				/>
				<InfoItem
					image="/images/ava1.png"
					title="Giá đỡ LAPTOP, ĐIỆN THOẠI, MÁY TÍNH"
					content="Perperzon"
					mBottom={18}
					showButton
				/>
				<InfoItem
					image="/images/ava1.png"
					title="Giá đỡ LAPTOP, ĐIỆN THOẠI, MÁY TÍNH"
					content="Perperzon"
					mBottom={18}
					showButton
				/>
				<InfoItem
					image="/images/ava1.png"
					title="Giá đỡ LAPTOP, ĐIỆN THOẠI, MÁY TÍNH"
					content="Perperzon"
					showButton
				/>
			</div>
		</div>
	);
};

export default BestSeller;
