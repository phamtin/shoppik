'use client';

import React from 'react';
import useStyles from './add-product.style';
import {
	Button,
	Form,
	Input,
	Space,
	Typography,
	Upload,
	UploadProps,
	message,
} from '@shoppik/ui/components/Core';
import Flex from '@shoppik/ui/components/Flex';
import { baseFieldValidation } from '@/Utils/validator/validator';
import { PaperUpload, TickSquare } from 'react-iconly';
import { trpc } from '@/lib/trpc/trpc';
import ProductAddTitle from '../../components/ProductAddTitle/ProductAddTitle';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const props: UploadProps = {
	name: 'file',
	multiple: true,
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	onChange(info) {
		const { status } = info.file;
		if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e) {
		console.log('Dropped files', e.dataTransfer.files);
	},
};

const AddProduct = () => {
	const { styles, theme } = useStyles();
	const [form] = Form.useForm<any>();

	// const { data } = trpc.product.getShoppikCategory.useQuery();

	const mutationProduct = trpc.product.createProduct.useMutation();

	const onSubmit = (values: any) => {
		if (!values || values.type === 'click') return;
		console.log('valuesvalues', values);
	};

	return (
		<div className={styles.wrapper}>
			<Title className="header" level={1}>
				New product
			</Title>
			<div className="body">
				<div className="leftSection">
					<Form form={form} layout="vertical" onFinish={onSubmit}>
						<div className="infoWrapper">
							<ProductAddTitle title="Name & description" shapeColor="green" />
							<Form.Item
								className="inputItem"
								name="title"
								label={<Title level={5}>Title</Title>}
								hasFeedback
								rules={[...baseFieldValidation('Title', true, null, 64)]}
							>
								<Input className="input" />
							</Form.Item>
							<div className="spacer" />
							<Form.Item
								className="inputItem"
								name="description"
								label={<Title level={5}>Description</Title>}
								hasFeedback
								rules={[...baseFieldValidation('Description', true, null, 64)]}
							>
								<Input className="input" />
							</Form.Item>
						</div>
						<div className="infoWrapper">
							<ProductAddTitle title="Cover Image" shapeColor="blue" />
							<Dragger {...props}>
								<p className="ant-upload-drag-icon">
									<PaperUpload />
								</p>
								<p className="ant-upload-text">
									Click or drag file to this area to upload
								</p>
								<p className="ant-upload-hint">
									Support for a single or bulk upload. Strictly prohibited from uploading
									company data or other banned files.
								</p>
							</Dragger>
						</div>
						<div className="infoWrapper">
							<ProductAddTitle title="Price" shapeColor="purple" />
							<Form.Item
								className="inputItem"
								name="title"
								label={<Title level={5}>Amount</Title>}
								hasFeedback
								rules={[...baseFieldValidation('Title', true, null, 64)]}
							>
								<Input className="input" prefix="$" />
							</Form.Item>
						</div>
					</Form>
				</div>
				<div className="rightSection">
					<ProductAddTitle title="Preview" shapeColor="red" />
				</div>
			</div>
			<div className="submitArea">
				<Flex justifyContent="space-between">
					<Flex gap={theme.marginSM}>
						<TickSquare />
						<Text>Last saved Oct 4, 2021 - 23:32</Text>
					</Flex>
					<Flex gap={theme.marginSM}>
						<Button size="large">Save Draft</Button>
						<Button size="large" type="primary" onClick={onSubmit}>
							Publish now
						</Button>
					</Flex>
				</Flex>
			</div>
		</div>
	);
};

export default AddProduct;
