import { Typography } from '@shoppik/ui/components/Core';
import Flex from '@shoppik/ui/components/Flex';
import useStyles from './ProductAddTitle.style';

const { Title, Text } = Typography;

interface ProductAddTitleProps {
	title: string;
	shapeColor: string;
}

const ProductAddTitle = ({ title, shapeColor }: ProductAddTitleProps) => {
	const { theme } = useStyles();

	return (
		<Flex gap={theme.marginSM} mb={theme.margin}>
			<div
				style={{
					height: 32,
					width: 12,
					backgroundColor: shapeColor,
					borderRadius: 3,
				}}
			/>
			<Text strong style={{ fontSize: 16 }}>
				{title}
			</Text>
		</Flex>
	);
};

export default ProductAddTitle;
