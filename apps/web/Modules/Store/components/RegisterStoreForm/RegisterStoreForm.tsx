import React, { useState, useEffect } from 'react';
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
import { VALID_EMAIL_REGEX } from '@/Helper/regex';
import { Option } from '@/lib/ant-design/type';
import { Store, StoreAddress } from '@shoppik/schema';
import useStyle from './RegisterStoreForm.style';

const { Title, Text } = Typography;

interface LocationOption extends Option {
	level: string;
}
interface RegisterStoreFormProps {
	toggleForm: () => void;
}

const RegisterStoreForm = ({ toggleForm }: RegisterStoreFormProps) => {
	const { styles, theme } = useStyle();
	const [form] = Form.useForm<Store>();
	const [messageApi, contextHolder] = message.useMessage();

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

	const {
		mutate: mutateRegisStore,
		isSuccess: isSuccessRegisStore,
		isLoading: isLoadingRegisStore,
		error: errorRegisStore,
	} = trpc.store.createStore.useMutation();

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

	useEffect(() => {
		if (isSuccessRegisStore) {
			messageApi.open({
				type: 'success',
				content: 'Register store successfully!',
			});
			toggleForm();
		} else if (errorRegisStore?.message) {
			messageApi.open({
				type: 'error',
				content: errorRegisStore.message,
			});
		}
	}, [isSuccessRegisStore, errorRegisStore]);

	const onSubmit = (values: any) => {
		if (!values || values.type === 'click') return;

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
				<Form form={form} layout="vertical" onFinish={onSubmit}>
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
						<Input />
					</Form.Item>
					<Flex gap={theme.marginSM}>
						<Form.Item
							className="block"
							name="email"
							label="Email"
							hasFeedback
							rules={[...baseFieldValidation('Email', true, 2, 128, VALID_EMAIL_REGEX)]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className="block"
							name="phone"
							label="Phone Number"
							hasFeedback
							rules={[...baseFieldValidation('Phone Number', true, 2, 16)]}
						>
							<Input addonBefore="+84" />
						</Form.Item>
					</Flex>
					<Form.Item
						name="storeAddress"
						label="Store Address"
						rules={[...baseFieldValidation('Store Address', true)]}
					>
						<Cascader
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
						<Input />
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
