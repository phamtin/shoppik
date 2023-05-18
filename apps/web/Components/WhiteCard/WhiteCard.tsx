import { useRouter } from 'next/router';
import { Button, Space, Typography } from 'ui/components/Core';
import useStyles from './white-card.style';
import Image from 'next/image';

const { Title } = Typography;

interface WhiteCardProps {
	title: string;
}

const WhiteCard = (props: WhiteCardProps) => {
	const {} = props;
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
			<Title level={5}>Market Detail</Title>
		</div>
	);
};

export default WhiteCard;
