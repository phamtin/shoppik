import { memo } from 'react';

import { baseFieldValidation } from '@/Utils/validator/validator';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { Form, Input, Upload, Typography } from '@shoppik/ui/components/Core';

import ProductAddTitle from '../../ProductAddTitle/ProductAddTitle';

const { Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

interface AddProductNameProps {}

const AddProductName = (props: AddProductNameProps) => {
	return (
		<div className="infoWrapper">
			<ProductAddTitle title="Name & description" shapeColor="#74f17adf" />
			<div className="info">
				<Form.Item
					name="name"
					className="inputItem"
					colon={false}
					label={<Text className="title">Name</Text>}
					rules={[...baseFieldValidation('Name', true, null, 64)]}
				>
					<Input size="large" />
				</Form.Item>
				<div className="spacer" />
				<Form.Item
					name="description"
					colon={false}
					className="inputItem"
					label={<Text className="title">Description</Text>}
					rules={[...baseFieldValidation('Description', false, null, 2048)]}
				>
					<TextArea rows={3} />
				</Form.Item>
				<div className="spacer" />
				<Form.Item
					name="images"
					colon={false}
					className="inputItem"
					label={<Text className="title">Images</Text>}
				>
					<Dragger>
						<ArrowUpOnSquareIcon width={36} />
						<p className="ant-upload-text">Click or drag file to this area to upload</p>
						<p className="ant-upload-hint">
							Support for a single or bulk upload. Strictly image-format files.
						</p>
					</Dragger>
				</Form.Item>
			</div>
		</div>
	);
};

export default memo(AddProductName);
