import {Typography} from 'ui/components/Core';
import useStyles from './CardHeader.style';

interface CardHeaderProps {
	title: string;
	showRightTitle?: boolean;
	rightTitle?: any;
}

const CardHeader = ({title, rightTitle, showRightTitle}: CardHeaderProps) => {
	const {styles} = useStyles();

	const renderRightTitle = () => {
		if (showRightTitle) return <></>;

		if (rightTitle) return rightTitle;

		return <Typography.Paragraph className="cardViewAll">View All</Typography.Paragraph>;
	};

	return (
		<div className={styles.wrapper}>
			<Typography.Title className="cardTitle">{title}</Typography.Title>
			{renderRightTitle()}
		</div>
	);
};

export default CardHeader;
