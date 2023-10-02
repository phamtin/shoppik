import { useRouter } from 'next/navigation';
import { Button, Space, Typography } from '@shoppik/ui/components/Core';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import useStyles from './detail-title.style';

const { Text } = Typography;

interface DetailTitleProps {
	title: string;
}

const DetailTitle = ({}: DetailTitleProps) => {
	const { styles } = useStyles();
	const router = useRouter();

	const goBack = () => router.back();

	return (
		<Space align="center" className={styles.wrapper}>
			<Button onClick={goBack} icon={<ArrowLeftIcon width={20} />} className="iconBack" />
			<Text style={{ fontSize: 14 }}>Market Details</Text>
		</Space>
	);
};

export default DetailTitle;
