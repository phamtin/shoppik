import useStyles from './sub-detail.style';

interface SubDetailProps {
	title: string;
}

const SubDetail = ({}: SubDetailProps) => {
	const { styles } = useStyles();

	return <div className={styles.wrapper}></div>;
};

export default SubDetail;
