import React, { useState, useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
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
import { handleToastTrpcError } from '@/app/error/Error';

const { Title, Text } = Typography;

export interface LocationOption extends Option {
	level: string;
}
interface RegisterStoreFormProps {
	toggleForm?: () => void;
	store?: StoreWithRelations;
}

const RegisterStoreForm = ({ toggleForm, store }: RegisterStoreFormProps) => {
	const isUpdateStore = !!store?.id;
	const { styles, theme } = useStyle();
	const router = useRouter();
	const [form] = Form.useForm<any>();
	const [messageApi, contextHolder] = message.useMessage();
	const trpcUser = trpc.useContext().user;
	const trpcStore = trpc.useContext().store;

	const loggedInUser = useLoggedInUser();
	const storeAddressField = Form.useWatch('storeAddress', form);

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

	const mutationCreateStore = trpc.store.createStore.useMutation({
		onSuccess() {
			toggleForm?.();
			router.push('/my-store/overview');
			messageApi.open({
				type: 'success',
				content: 'Register store successful',
			});
			trpcUser.getMyProfile.invalidate();
			trpcStore.getMyStore.invalidate();
		},
		onError(err) {
			handleToastTrpcError(err.data, messageApi);
		},
	});

	const mutationUpdateStore = trpc.store.updateStoreProfile.useMutation({
		onSuccess() {
			trpcStore.getMyStore.invalidate();
			messageApi.open({
				type: 'success',
				content: 'Update store successfully!',
			});
			toggleForm?.();
		},
		onError(err) {
			handleToastTrpcError(err.data, messageApi);
		},
	});

	useEffect(() => {
		form.setFieldValue('email', loggedInUser.email);
		form.setFieldValue(['contact', 'phone'], ['']);
		if (!store) return;
		const { storeAddress } = store;
		form.setFieldsValue({
			...store,
			street: storeAddress.street,
			storeAddress: [storeAddress.province, storeAddress.district, storeAddress.ward],
		});
	}, [loggedInUser.email, form, store, store?.storeAddress]);

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
	}, [district, selectedLocation.p, target]);

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
	}, [ward, selectedLocation.d, target]);

	const onSubmit = (values: any) => {
		if (!values) return;
		const { name, tradeName = '', description = '', landingPageUrl = '' } = values;

		const createAddressPayload: StoreAddress = {
			province: completeStoreAddress.province,
			district: completeStoreAddress.district,
			ward: completeStoreAddress.ward,
			street: values.street,
			note: '',
		};
		const areaInfo =
			completeStoreAddress.district?.length > 0
				? [
						completeStoreAddress.province,
						completeStoreAddress.district,
						completeStoreAddress.ward,
				  ]
				: storeAddressField;

		const updateAddressPayload: StoreAddress = {
			province: areaInfo[0],
			district: areaInfo[1],
			ward: areaInfo[2],
			street: values.street,
			note: '',
		};
		const storeInfo = {
			name,
			tradeName,
			storeAddress: isUpdateStore ? updateAddressPayload : createAddressPayload,
			description,
			landingPageUrl,
			contact: { ...values.contact, email: loggedInUser.email },
			avatar: '',
			tags: { id: '64d66dc3f8dcc730bbaecaac', name: 'Twitter', slug: 'twitter' },
		};

		isUpdateStore
			? mutationUpdateStore.mutate(storeInfo)
			: mutationCreateStore.mutate(storeInfo);
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
				<Form layout="vertical" form={form} onFinish={onSubmit}>
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
					<Flex gap={theme.marginSM}>
						<Form.Item
							name="name"
							label="Shop Name"
							className="block"
							rules={[...baseFieldValidation('Shop name', true, null, 128)]}
						>
							<Input size="large" />
						</Form.Item>
						<Form.Item
							name="tradeName"
							label="Trade Name"
							className="block"
							rules={[...baseFieldValidation('Trade name', false, null, 128)]}
						>
							<Input size="large" />
						</Form.Item>
					</Flex>
					<Flex alignitems="flex-start" gap={theme.marginSM}>
						<Form.Item className="block" name="email" label="Email">
							<Input size="large" disabled />
						</Form.Item>
						<Form.Item className="block">
							<Form.List name={['contact', 'phone']}>
								{(fields, { add, remove }, { errors }) => (
									<>
										{fields.map((field, index) => (
											<Form.Item
												key={index}
												label={index === 0 ? 'Phone Number' : ''}
												hasFeedback
												required={false}
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
														style={{ width: fields.length > 1 ? '90%' : '100%' }}
													/>
												</Form.Item>
												{fields.length > 1 ? (
													<Button
														size="small"
														danger
														type="link"
														icon={
															<XCircleIcon color="#de2535" style={{ marginTop: 5 }} />
														}
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
						</Form.Item>
					</Flex>
					<Form.Item
						name="storeAddress"
						label="Store Address"
						className="block"
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
						className="block"
						rules={[...baseFieldValidation('Street', true, 2, 256)]}
					>
						<Input size="large" />
					</Form.Item>
					<Flex gap={theme.marginSM}>
						<Form.Item
							className="block"
							name="landingPageUrl"
							label="Website URL"
							rules={[...baseFieldValidation('Website URL', false, null, 64)]}
						>
							<Input size="large" addonBefore="https://" />
						</Form.Item>
						<Form.Item
							className="block"
							name={['contact', 'facebookLink']}
							label="Facebook Link"
							rules={[...baseFieldValidation('Facebook Link', false, null, 64)]}
						>
							<Input size="large" addonBefore="https://" />
						</Form.Item>
					</Flex>
					<Flex gap={theme.marginSM}>
						<Form.Item
							className="block"
							name={['contact', 'instagramLink']}
							label="Instagram Link"
							rules={[...baseFieldValidation('Instagram Link', false, null, 64)]}
						>
							<Input size="large" addonBefore="https://" />
						</Form.Item>
						<Form.Item
							className="block"
							name={['contact', 'youtubeLink']}
							label="Youtube Link"
							rules={[...baseFieldValidation('Youtube Link', false, null, 64)]}
						>
							<Input size="large" addonBefore="https://" />
						</Form.Item>
					</Flex>
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
							loading={mutationCreateStore.isLoading || mutationUpdateStore.isLoading}
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
