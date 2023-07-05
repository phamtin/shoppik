import { Button, Typography } from '@shoppik/ui/components/Core';
import Image from 'next/image';
import useStyles from './InfoItem.style';

const { Text, Title } = Typography;

interface InfoItemProps {
	image: string;
	title: string;
	content: string;
	mBottom?: number;
	showButton?: boolean;
	renderRight?: boolean;
}

const InfoItem = ({
	image,
	title,
	content,
	mBottom = 0,
	showButton = false,
	renderRight = false,
}: InfoItemProps) => {
	const { styles } = useStyles();

	const renderRightChild = () => {
		if (renderRight)
			return (
				<div className="rightSection">
					<Title level={5}>8,456</Title>
					<Text style={{ color: '#10C352' }}>&nbsp;+23,00%</Text>
				</div>
			);

		if (showButton) return <Button>Follow</Button>;

		return null;
	};

	return (
		<div className={styles.wrapper} style={{ marginBottom: mBottom }}>
			<div className="infoSection">
				<div>
					<Image alt={image} src={image} width={50} height={50} />
				</div>
				<div className="info">
					<Typography.Paragraph className="action">{title}</Typography.Paragraph>
					<Typography.Paragraph className="title">{content}</Typography.Paragraph>
					<div className="rightChild">{renderRightChild()}</div>
				</div>
			</div>
			<div className="rightChildOutside">{renderRightChild()}</div>
		</div>
	);
};

export default InfoItem;
