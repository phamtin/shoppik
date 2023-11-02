'use client';

import React, { useEffect, useState } from 'react';
import useStyle from './ProfileOverview.style';
import {
	DatePicker,
	Button,
	Divider,
	Form,
	Input,
	Typography,
	Upload as UploadButton,
	Avatar,
	message,
} from '@shoppik/ui/components/Core';
import dayjs from 'dayjs';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { trpc } from '@/lib/trpc/trpc';
import { AccountSchema } from '@shoppik/types';
import { DATE_FORMAT } from '@/Utils/dayjs/time';
import { baseFieldValidation } from '@/Utils/validator/validator';
import { VALID_EMAIL_REGEX } from '@/Helper/regex';
import { handleToastTrpcError } from '@/app/error/Error';
import { LIST_INFO } from '../../types/Profile.type';

const { Text } = Typography;

const ProfileScreen = () => {
	const { styles } = useStyle();
	const utils = trpc.useContext();
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm<Partial<AccountSchema> | undefined>();

	const [selectedSide, setSelectedSide] = useState(LIST_INFO[0].key);

	const GetMyProfile = trpc.user.getMyProfile.useQuery(undefined);

	// const product = trpc.product.getProductDetail.useQuery({
	// 	_id: '652d66cbb4b5c3ae901916c6',
	// });
	// // console.log(product.data);

	const UpdateUserProfile = trpc.user.updateUserProfile.useMutation({
		onSuccess() {
			utils.user.getMyProfile.invalidate();
			messageApi.open({
				type: 'success',
				content: 'Profile updated successfully',
			});
		},
		onError(err) {
			handleToastTrpcError(err.data, messageApi);
		},
	});

	useEffect(() => {
		if (!GetMyProfile.data) return;
		form.setFieldsValue({
			...GetMyProfile.data,
			birthday: dayjs(GetMyProfile.data.birthday) as any, // trick, fix later
		});
	}, [form, GetMyProfile.data]);

	const onSave = (values: any) => {
		if (!values || values.type === 'click') return;
		UpdateUserProfile.mutate({
			firstname: values.firstname,
			lastname: values.lastname,
			fullname: values.fullname,
			avatar: values.avatar,
			birthday: dayjs(values.birthday).toISOString(),
			phoneNumber: values.phoneNumber,
			postalCode: values.postalCode?.toString(),
		});
	};

	const onChangeTab = (index: number) => () => setSelectedSide(index);

	return (
		<>
			{contextHolder}
			<div className={styles.wrapper}>
				<div className="leftSide">
					{LIST_INFO.map((item, index) => (
						<a
							key={item.key}
							onClick={onChangeTab(index)}
							className={`leftSideSection ${selectedSide === index ? 'selected' : ''}`}
						>
							<Text>{item.title}</Text>
						</a>
					))}
				</div>
				<div className="rightSide">
					<Form<Partial<AccountSchema> | undefined>
						name="profile"
						form={form}
						onFinish={onSave}
						labelAlign="left"
						autoComplete="off"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
					>
						<div className="block">
							<Avatar size={64} src={GetMyProfile.data?.avatar}>
								ava
							</Avatar>
							<UploadButton>
								<Button className="uploadBtn" icon={<ArrowUpTrayIcon width={16} />}>
									Upload
								</Button>
							</UploadButton>
							<Button size="small" type="link" danger>
								Remove
							</Button>
						</div>
						<Divider />
						<Form.Item
							name="firstname"
							label={<Text className="formLabel">First name</Text>}
							colon={false}
							style={{ maxWidth: 500 }}
							rules={[...baseFieldValidation('First name', true, 2, 64)]}
						>
							<Input required size="large" placeholder="First name" />
						</Form.Item>
						<Form.Item
							name="lastname"
							label={<Text className="formLabel">Last name</Text>}
							colon={false}
							style={{ maxWidth: 500 }}
							rules={[...baseFieldValidation('Last name', true, null, 64)]}
						>
							<Input required size="large" placeholder="Last name" />
						</Form.Item>
						<Form.Item
							name="fullname"
							label={<Text className="formLabel">Full name</Text>}
							colon={false}
							style={{ maxWidth: 500 }}
							rules={[...baseFieldValidation('Full name', true, 2, 64)]}
						>
							<Input size="large" placeholder="Full name" />
						</Form.Item>
						<Form.Item
							name="email"
							label={<Text className="formLabel">Email address</Text>}
							colon={false}
							rules={[...baseFieldValidation('Email', true, 2, 128, VALID_EMAIL_REGEX)]}
							style={{ maxWidth: 500 }}
						>
							<Input disabled size="large" placeholder="Email address" />
						</Form.Item>
						<Form.Item
							label={<Text className="formLabel">Phone Number</Text>}
							name="phoneNumber"
							colon={false}
							style={{ maxWidth: 500 }}
							rules={[...baseFieldValidation('Phone Number', false, 2, 16)]}
						>
							<Input size="large" placeholder="Phone Number" />
						</Form.Item>
						<Form.Item
							label={<Text className="formLabel">Birthday</Text>}
							name="birthday"
							colon={false}
							style={{ maxWidth: 500 }}
						>
							<DatePicker size="large" format={DATE_FORMAT.base} />
						</Form.Item>
						<Form.Item
							label={<Text className="formLabel">Postal code</Text>}
							name="postalCode"
							colon={false}
							style={{ maxWidth: 500 }}
							rules={[...baseFieldValidation('Postal Code', false, 2, 16)]}
						>
							<Input className="postalCode" size="large" width="100px" />
						</Form.Item>
						<Form.Item label=" " colon={false} style={{ maxWidth: 500 }}>
							<Button
								size="large"
								type="primary"
								htmlType="submit"
								style={{ width: 200 }}
								loading={GetMyProfile.isLoading || UpdateUserProfile.isLoading}
								onClick={onSave}
							>
								Save
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
};

export default ProfileScreen;
