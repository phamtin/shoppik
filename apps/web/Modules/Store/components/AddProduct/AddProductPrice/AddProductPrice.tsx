import { memo } from 'react';

import { Form, Input, InputNumber, Typography } from '@shoppik/ui/components/Core';

import useStyle from './add-product-price.style';
import ProductAddTitle from '../../ProductAddTitle/ProductAddTitle';

const { Text } = Typography;

interface AddProductPriceProps {}

const AddProductPrice = (props: AddProductPriceProps) => {
	const styles = useStyle();

	return (
		<div className="infoWrapper">
			<ProductAddTitle title="Price" shapeColor="#bd86ffd6" />
			<div className="info">
				<Form.Item
					name="quantity"
					className="inputItem"
					colon={false}
					label={<Text className="title">Quantity</Text>}
				>
					<InputNumber style={{ width: 200 }} min={1} max={999999999} size="large" />
				</Form.Item>
				<br />
				<Form.Item
					name="originPrice"
					className="inputItem"
					label={<Text className="title">Origin price</Text>}
					colon={false}
				>
					<InputNumber
						style={{ width: 200 }}
						min={1}
						max={999999999}
						step="0.1"
						size="large"
						prefix="$"
					/>
				</Form.Item>
				<div className="spacer" />
			</div>
		</div>
	);
};

export default memo(AddProductPrice);
