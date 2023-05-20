import { useRouter } from 'next/router';
import { Button, Space, Typography } from 'ui/components/Core';
import useStyles from './detail-title.style';
import Image from 'next/image';

const { Title } = Typography;

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
			<Title level={5}>Market Detail</Title>
		</Space>
	);
};

export default DetailTitle;
