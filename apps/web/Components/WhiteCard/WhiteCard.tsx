import { useRouter } from 'next/navigation';
import { Button, Typography } from '@shoppik/ui/components/Core';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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
			<Button onClick={goBack} icon={<ArrowLeftIcon width={24} />} className="iconBack" />
			<Title level={5}>{`Market Detail - ${title}`}</Title>
		</div>
	);
}

export default WhiteCard;
