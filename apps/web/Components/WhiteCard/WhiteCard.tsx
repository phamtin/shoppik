import { useRouter } from 'next/router';
import { Button, Typography } from 'ui/components/Core';
import Image from 'next/image';
import useStyles from './white-card.style';

const { Title } = Typography;

interface WhiteCardProps {
	title: string;
}

function WhiteCard(props: WhiteCardProps) {
	const { title } = props;
	const { styles } = useStyles(props);
	const router = useRouter();

	const goBack = () => router.back();

	return (
		<div className={styles.wrapper}>
			<Button
				onClick={goBack}
				icon={<Image src="/images/ic-back.png" alt="back" height={11} width={6} />}
				className="iconBack"
			/>
			<Title level={5}>{`Market Detail - ${title}`}</Title>
		</div>
	);
}

export default WhiteCard;
