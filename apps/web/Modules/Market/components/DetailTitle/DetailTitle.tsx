import { useRouter } from 'next/navigation';
import { Button, Space, Typography } from '@shoppik/ui/components/Core';
import Image from 'next/image';
import useStyles from './detail-title.style';

const { Text } = Typography;

interface DetailTitleProps {
	title: string;
}

const DetailTitle = ({ title }: DetailTitleProps) => {
	const { styles } = useStyles();
	const router = useRouter();

	const goBack = () => router.back();

	return (
		<Space align="center" className={styles.wrapper}>
			<Button
				onClick={goBack}
				icon={<Image src="/images/ic-back.png" alt="back" height={10} width={6} />}
				className="iconBack"
			/>
			<Text>Market Details</Text>
		</Space>
	);
};

export default DetailTitle;
