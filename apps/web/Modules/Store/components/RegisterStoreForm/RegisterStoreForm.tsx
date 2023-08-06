import React, { useState, useEffect } from 'react';
import { Delete } from 'react-iconly';
import { trpc } from '@/lib/trpc/trpc';
import {
	Button,
	Cascader,
	Form,
	Input,
	Typography,
	Upload,
	message,
} from '@shoppik/ui/components/Core';
import Flex from '@shoppik/ui/components/Flex';
import useHookGetLocation from '@/Hooks/useHookGetLocation/useHookGetLocation';
import { baseFieldValidation } from '@/Utils/validator/validator';
import { Option } from '@/lib/ant-design/type';
import { StoreAddress, StoreWithRelations } from '@shoppik/schema';
import useStyle from './RegisterStoreForm.style';
import useLoggedInUser from '@/Hooks/useLoggedInUser/useLoggedInUser';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export interface LocationOption extends Option {
	level: string;
}
interface RegisterStoreFormProps {
	toggleForm?: () => void;
}

const RegisterStoreForm = ({ toggleForm }: RegisterStoreFormProps) => {
	const { styles, theme } = useStyle();
	const [form] = Form.useForm<StoreWithRelations>();
	const [messageApi, contextHolder] = message.useMessage();
	const trpcUser = trpc.useContext().user;

	const router = useRouter();
	const loggedInUser = useLoggedInUser();

	const [target, setTarget] = useState<any>();
	const [selectedLocation, setSelectedLocation] = useState({ p: 0, d: 0, w: 0 });
	const [completeStoreAddress, setCompleteStoreAddress] = useState<StoreAddress>({
		province: '',
		district: '',
		ward: '',
		street: '',
		note: '',
	});

	const { province, district, ward } = useHookGetLocation({
		p: selectedLocation.p,
		d: selectedLocation.d,
	});

	const { mutate: mutateRegisStore, isLoading: isLoadingRegisStore } =
		trpc.store.createStore.useMutation({
			onSuccess() {
				toggleForm?.();
				router.push('/my-store/overview');
				messageApi.open({
					type: 'success',
					content: 'Register store successful',
				});
				trpcUser.getMyProfile.invalidate();
			},
			onError(err) {
				messageApi.open({ type: 'error', content: err.message });
			},
		});

	useEffect(() => {
		setTarget(
			province.map((p) => ({
				label: p.name,
				value: p.code,
				level: p.level,
				isLeaf: false,
			})),
		);
	}, [province]);

	useEffect(() => {
		if (!district?.length) return;
		for (let i = 0; i < target.length; i++) {
			const province = target[i];
			if (province.value === selectedLocation.p) {
				province.children = district.map((d) => ({
					label: d.name,
					value: d.code,
					level: d.level,
					isLeaf: false,
				}));
				setTarget([...target]);
				break;
			}
		}
	}, [district]);

	useEffect(() => {
		if (!ward?.length) return;
		for (let i = 0; i < target.length; i++) {
			const districts = target[i].children;
			if (!districts || districts.length === 0) continue;
			for (let j = 0; j < districts.length; j++) {
				const district = districts[j];
				if (district.value === selectedLocation.d) {
					district.children = ward.map((w) => ({
						label: w.name,
						value: w.code,
						level: w.level,
						isLeaf: true,
					}));
					setTarget([...target]);
					break;
				}
			}
		}
	}, [ward]);

	const onSubmit = (values: any) => {
		if (!values || !loggedInUser || values.type === 'click') return;
		const {
			name,
			email,
			phone,
			street,
			tradeName = '',
			description = '',
			youtubeLink = '',
			facebookLink = '',
			instagramLink = '',
			landingPageUrl = '',
		} = values;

		mutateRegisStore({
			name,
			tradeName,
			storeAddress: { ...completeStoreAddress, street },
			description,
			landingPageUrl,
			contact: { phone, email, youtubeLink, facebookLink, instagramLink },
			avatar: '',
			tags: { name: 'Twitter', slug: 'twitter' },
		});
	};

	const onSelectLocation = (value: (string | number)[], options: Option[]) => {
		if (options.length !== 3) return;
		const province = options[0].label as string;
		const district = options[1].label as string;
		const ward = options[2].label as string;
		setCompleteStoreAddress((prev) => ({ ...prev, province, district, ward }));
	};

	const loadData = (selectedOptions: LocationOption[]) => {
		const targetOption = selectedOptions[selectedOptions.length - 1];
		const value = targetOption.value ? +targetOption.value : 0;
		if (targetOption.level === 'province') {
			setSelectedLocation((prev) => ({ ...prev, p: value }));
		} else if (targetOption.level === 'district') {
			setSelectedLocation((prev) => ({ ...prev, d: value }));
		}
	};

	return (
		<>
			{contextHolder}
			<div className={styles.wrapper}>
				<Form
					form={form}
					initialValues={{ email: loggedInUser.email, phone: [''] }}
					layout="vertical"
					onFinish={onSubmit}
				>
					<Flex justifyContent="flex-start">
						<div>
							<Upload action="/upload.do" listType="picture-card">
								Upload
							</Upload>
						</div>
						<div className="header">
							<Title level={3}>Shoppik</Title>
							<Text className="description">Register to become an owner</Text>
						</div>
					</Flex>
					<Form.Item
						name="name"
						label="Shop Name"
						rules={[...baseFieldValidation('Shop name', true, null, 64)]}
					>
						<Input size="large" />
					</Form.Item>

					<Flex alignitems="flex-start" gap={theme.marginSM}>
						<Form.Item className="block" name="email" label="Email" hasFeedback>
							<Input size="large" disabled value={loggedInUser.email} />
						</Form.Item>
						<Flex direction="column">
							<Form.List name="phone">
								{(fields, { add, remove }, { errors }) => (
									<>
										{fields.map((field, index) => (
											<Form.Item
												label={index === 0 ? 'Phone Number' : ''}
												hasFeedback
												required={false}
												key={index}
											>
												<Form.Item
													{...field}
													noStyle
													className="block"
													hasFeedback
													rules={[...baseFieldValidation('Phone Number', true, 1, 16)]}
												>
													<Input
														size="large"
														addonBefore="+84"
														style={{
															width: fields.length > 1 ? '91%' : '100%',
														}}
													/>
												</Form.Item>
												{fields.length > 1 ? (
													<Button
														size="small"
														danger
														type="link"
														icon={<Delete size="small" style={{ marginTop: 9 }} />}
														onClick={() => remove(field.name)}
													/>
												) : null}
											</Form.Item>
										))}
										{fields.length <= 2 && (
											<Form.Item noStyle>
												<Button block type="dashed" onClick={() => add()}>
													Add number
												</Button>
												<Form.ErrorList errors={errors} />
											</Form.Item>
										)}
									</>
								)}
							</Form.List>
						</Flex>
					</Flex>

					<Form.Item
						name="storeAddress"
						label="Store Address"
						rules={[...baseFieldValidation('Store Address', true)]}
					>
						<Cascader
							size="large"
							changeOnSelect
							options={target}
							onChange={onSelectLocation}
							loadData={loadData}
						/>
					</Form.Item>
					<Form.Item
						name="street"
						label="Street"
						rules={[...baseFieldValidation('Street', true, 2, 256)]}
					>
						<Input size="large" />
					</Form.Item>
					<Form.Item
						name="description"
						label="Description"
						rules={[...baseFieldValidation('Description', false, 0, 4096)]}
					>
						<Input.TextArea
							rows={4}
							showCount
							maxLength={4000}
							placeholder="Fill in some description"
						/>
					</Form.Item>
					<br />
					<Flex>
						<Button
							size="large"
							type="primary"
							htmlType="submit"
							className="block"
							loading={isLoadingRegisStore}
							onClick={onSubmit}
						>
							Submit
						</Button>
					</Flex>
				</Form>
			</div>
		</>
	);
};

export default RegisterStoreForm;
