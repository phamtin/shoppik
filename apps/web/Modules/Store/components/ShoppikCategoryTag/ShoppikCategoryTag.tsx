import { memo, useMemo } from 'react';
import { Typography } from '@shoppik/ui/components/Core';
import useStyle from './shoppik-category.style';
import { ShoppikCategory } from '@shoppik/types';

const { Paragraph } = Typography;

interface ShoppikCategoryProps {
	tag: ShoppikCategory;
	tags: ShoppikCategory[];
	onChange: (tag: ShoppikCategory) => void;
}

const ShoppikCategory = ({ tags, tag, onChange }: ShoppikCategoryProps) => {
	const { styles } = useStyle();

	const onClick = () => {
		onChange(tag);
	};

	const selected = useMemo(
		() => tags.findIndex((t) => t._id === tag._id) != -1,
		[tags, tag._id],
	);

	return (
		<div className={`${styles.wrapper} ${selected && styles.selected}`} onClick={onClick}>
			<Paragraph>{tag.name}</Paragraph>
		</div>
	);
};

export default memo(ShoppikCategory);
