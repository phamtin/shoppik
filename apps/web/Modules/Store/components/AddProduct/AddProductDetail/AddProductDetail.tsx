import { memo } from 'react';

import DelayedComponent from '@/Components/DelayedComponent/DelayedComponent';
import {
	Input,
	Form,
	Typography,
	Space,
	Button,
	FormInstance,
	Divider,
} from '@shoppik/ui/components/Core';
import ProductAddTitle from '../../ProductAddTitle/ProductAddTitle';
import { XCircleIcon } from '@heroicons/react/24/outline';

import useStyle from './add-product-detail.style';
import DetailVariant from './Variant';

const { Text } = Typography;

interface AddProductDetailProps {
	form: FormInstance;
}

const AddProductDetail = (props: AddProductDetailProps) => {
	const { theme, styles } = useStyle();

	return (
		<div className="infoWrapper">
			<ProductAddTitle title="Product detail" shapeColor="#747bffeb" />
			<div className="info">
				<Form.Item
					name="keyFeatures"
					className="inputItem"
					colon={false}
					label={<Text className="title">Key features</Text>}
				>
					<Form.List name={'keyFeatures'}>
						{(fields, { add, remove }, { errors }) => (
							<>
								{fields.map((field, index) => (
									<Form.Item key={`${field.name}${field.key}`} required={false}>
										<Form.Item {...field} noStyle className="block">
											<Input
												size="large"
												placeholder={`Feature ${index + 1} here`}
												style={{ width: fields.length > 1 ? '92%' : '100%' }}
											/>
										</Form.Item>
										{fields.length > 1 ? (
											<DelayedComponent>
												<Button
													size="small"
													type="link"
													icon={<XCircleIcon width={20} color="#de2535" />}
													style={{ marginLeft: theme.marginXS }}
													onClick={() => remove(field.name)}
												/>
											</DelayedComponent>
										) : null}
									</Form.Item>
								))}
								{fields.length <= 4 && (
									<Form.Item noStyle>
										<Button block type="dashed" onClick={() => add()}>
											Add feature
										</Button>
										<Form.ErrorList errors={errors} />
									</Form.Item>
								)}
							</>
						)}
					</Form.List>
				</Form.Item>
				<br />
				<Form.Item
					className="inputItem"
					colon={false}
					label={<Text className="title">Details</Text>}
				>
					<Form.List name="detail">
						{(fields, { add, remove }, { errors }) => (
							<>
								{fields.map((field, index) => (
									<div key={`${field.name}${field.key}`}>
										<Space.Compact style={{ width: fields.length > 1 ? '92%' : '100%' }}>
											<Form.Item
												{...field}
												name={[field.name, 'k']}
												key={index}
												style={{ width: '30%' }}
											>
												<Input
													size="large"
													style={{ width: '100%' }}
													placeholder={`Detail ${index + 1}`}
												/>
											</Form.Item>
											<Form.Item
												{...field}
												name={[field.name, 'v']}
												key={index}
												style={{ width: '70%' }}
											>
												<Input
													size="large"
													style={{ width: '100%' }}
													placeholder={`Description of detail ${index + 1}`}
												/>
											</Form.Item>
										</Space.Compact>
										{fields.length > 1 ? (
											<DelayedComponent>
												<Button
													size="small"
													type="link"
													icon={<XCircleIcon width={20} color="#de2535" />}
													style={{ marginLeft: theme.marginXS }}
													onClick={() => remove(field.name)}
												/>
											</DelayedComponent>
										) : null}
									</div>
								))}
								{fields.length <= 4 && (
									<Form.Item noStyle>
										<Button block type="dashed" onClick={() => add()}>
											Add details
										</Button>
										<Form.ErrorList errors={errors} />
									</Form.Item>
								)}
							</>
						)}
					</Form.List>
				</Form.Item>
				<br />
				<Form.Item
					name="variants"
					label={<Text className="title">Variants</Text>}
					className={`inputItem ${styles.variants}`}
					colon={false}
				>
					<Form.List name={'variants'}>
						{(fields, { add, remove }, { errors }) => (
							<>
								{fields.map((field, index) => (
									<div key={`${field.name}${field.key}`}>
										<DetailVariant
											form={props.form}
											field={field}
											index={index}
											remove={remove}
										/>
										<Divider style={{ margin: theme.marginSM }} />
									</div>
								))}
								{fields.length <= 4 && (
									<Form.Item noStyle>
										<Button block type="dashed" onClick={() => add()}>
											Add variant
										</Button>
										<Form.ErrorList errors={errors} />
									</Form.Item>
								)}
							</>
						)}
					</Form.List>
				</Form.Item>
			</div>
		</div>
	);
};

export default memo(AddProductDetail);
