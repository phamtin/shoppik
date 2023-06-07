import { Chart } from 'react-iconly';
import CardHeader from '../CardHeader/CardHeader';
import InfoItem from '@/Modules/Market/components/InfoItem/InfoItem';
import useStyles from './BestSeller.style';

const BestSeller = () => {
	const { styles } = useStyles();

	return (
		<div className={styles.wrapper}>
			<CardHeader title="Dashboard Overview" rightTitle={<Chart primaryColor="red" />} />
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
