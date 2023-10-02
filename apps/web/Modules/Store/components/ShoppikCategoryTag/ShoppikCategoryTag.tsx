import { memo, useMemo } from 'react';
import { Typography } from '@shoppik/ui/components/Core';
import useStyle from './shoppik-category.style';
import { ShoppikCategoryResponse } from '../../types/store.types';

const { Paragraph } = Typography;

interface ShoppikCategoryProps {
	tag: ShoppikCategoryResponse;
	tags: ShoppikCategoryResponse[];
	onChange: (tag: ShoppikCategoryResponse) => void;
}

const ShoppikCategory = ({ tags, tag, onChange }: ShoppikCategoryProps) => {
	const { styles } = useStyle();

	const onClick = () => {
		onChange(tag);
	};

	const selected = useMemo(
		() => tags.findIndex((t) => t.id === tag.id) != -1,
		[tags, tag.id],
	);

	return (
		<div className={`${styles.wrapper} ${selected && styles.selected}`} onClick={onClick}>
			<Paragraph>{tag.name}</Paragraph>
		</div>
	);
};

export default memo(ShoppikCategory);
