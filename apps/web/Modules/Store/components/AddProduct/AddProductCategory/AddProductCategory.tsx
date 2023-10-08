import { memo, useCallback, useMemo, useState } from 'react';

import {
	Alert,
	Divider,
	Form,
	FormInstance,
	Tag,
	Typography,
} from '@shoppik/ui/components/Core';
import { ShoppikCategoryResponse } from '@/Modules/Store/types/store.types';
import Flex from '@shoppik/ui/components/Flex';
import ShoppikCategoryTag from '../../ShoppikCategoryTag/ShoppikCategoryTag';
import ProductAddTitle from '../../ProductAddTitle/ProductAddTitle';
import useStyle from './add-product-category.style';

const { CheckableTag } = Tag;
const { Text } = Typography;

interface AddProductCategoryProps {
	form: FormInstance;
	shoppikCategory: ShoppikCategoryResponse[] | undefined;
}

const AddProductCategory = (props: AddProductCategoryProps) => {
	const { styles, theme } = useStyle();

	const [selectedProductTags, setSelectedProductTags] = useState<string[]>([]);
	const [selectedShoppikTags, setSelectedShopikTag] = useState<ShoppikCategoryResponse[]>(
		[],
	);

	const handleChange = useCallback(
		(tag: ShoppikCategoryResponse) => {
			if (selectedShoppikTags.length == 0) return setSelectedShopikTag([tag]);
			for (let i = 0; i < selectedShoppikTags.length; i++) {
				const selectedTag = selectedShoppikTags[i];
				if (selectedTag.id === tag.id) {
					return setSelectedShopikTag((prev) => prev.filter((t) => t.id !== tag.id));
				}
				continue;
			}
			setSelectedShopikTag((prev) => [...prev, tag]);
		},
		[selectedShoppikTags],
	);

	const memorizedTags = useMemo(
		() =>
			props.shoppikCategory
				?.filter((t) => !t.isSubCategory)
				.map((t) => (
					<ShoppikCategoryTag
						key={`${t.id}${t.name}`}
						tags={selectedShoppikTags}
						tag={t}
						onChange={(tag) => handleChange(tag)}
					/>
				)),
		[props.shoppikCategory, handleChange, selectedShoppikTags],
	);

	const handleChangeProductTag = (tag: string, checked: boolean) => {
		const nextSelectedTags = checked
			? [...selectedProductTags, tag]
			: selectedProductTags.filter((t) => t !== tag);
		props.form.setFieldValue('shoppikCategories', nextSelectedTags);
		setSelectedProductTags(nextSelectedTags);
	};

	return (
		<div className="infoWrapper">
			<ProductAddTitle title="Category" shapeColor="#ff7866d7" />
			<div className="info">
				<Form.Item
					name="shoppikCategories"
					className="inputItem"
					colon={false}
					label={
						<Text className="title">
							Shoppik <br /> categories
						</Text>
					}
				>
					{selectedShoppikTags.length > 5 && (
						<>
							<Alert
								type="warning"
								message="Select more than 5 categories will make Shoppik algorithm evaluate product inefficiently."
							/>
							<br />
						</>
					)}
					<div className={styles.categoryWrapper}>{memorizedTags}</div>
					{selectedShoppikTags.map((selectedTag) => (
						<div key={`${selectedTag.id}${selectedTag.name}`}>
							<Flex>
								<div style={{ minWidth: 100 }}>
									<Text>{`${selectedTag.name}:`}</Text>
								</div>
								<div style={{ flexWrap: 'wrap' }}>
									{props.shoppikCategory?.map((t) =>
										t.parentId === selectedTag.id ? (
											<CheckableTag
												key={`${t.id}${t.name}`}
												checked={selectedProductTags.includes(t.id)}
												onChange={(checked) => handleChangeProductTag(t.id, checked)}
											>
												{t.name}
											</CheckableTag>
										) : null,
									)}
								</div>
							</Flex>
							<Divider style={{ margin: theme.marginXS }} />
						</div>
					))}
				</Form.Item>
				<br />
				<Form.Item
					className="inputItem"
					colon={false}
					label={
						<Text className="title">
							Store <br /> categories
						</Text>
					}
				>
					Store categories go here...
				</Form.Item>
			</div>
		</div>
	);
};

export default memo(AddProductCategory);
