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
import { Upload } from 'react-iconly';
import { trpc } from '@/lib/trpc/trpc';
import { Account } from '@shoppik/schema';
import { DATE_FORMAT } from '@/Utils/dayjs/time';
import { baseFieldValidation } from '@/Utils/validator/validator';
import { VALID_EMAIL_REGEX } from '@/Helper/regex';
import GlobalError from '@/app/error/Error';

const { Text } = Typography;

interface ListInfoProps {
	key: number;
	title: string;
}

const LIST_INFO: ListInfoProps[] = [
	{
		key: 0,
		title: 'Personal Information',
	},
	{
		key: 1,
		title: 'My Order',
	},
	{
		key: 2,
		title: 'Notification',
	},
	{
		key: 3,
		title: 'Settings',
	},
];

const ProfileScreen = () => {
	const { styles } = useStyle();
	const utils = trpc.useContext();
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm<Partial<Account> | undefined>();

	const [selectedSide, setSelectedSide] = useState(LIST_INFO[0].key);

	const {
		data: dataGetMyProfile,
		isLoading: isLoadingGetMyProfile,
		error: errorGetMyProfile,
	} = trpc.user.getMyProfile.useQuery();

	const {
		mutate: mutateUpdateUserProfile,
		isSuccess: isSuccessUpdateUserProfile,
		isLoading: isLoadingUpdateUserProfile,
		error: errorUpdateUserProfile,
	} = trpc.user.updateUserProfile.useMutation({
		onSuccess() {
			utils.user.getMyProfile.invalidate();
		},
	});

	useEffect(() => {
		if (isSuccessUpdateUserProfile) {
			messageApi.open({
				type: 'success',
				content: 'Profile updated successfully',
			});
		} else if (errorUpdateUserProfile?.message) {
			messageApi.open({
				type: 'error',
				content: errorUpdateUserProfile.message,
			});
		}
	}, [isSuccessUpdateUserProfile, errorUpdateUserProfile]);

	useEffect(() => {
		if (!dataGetMyProfile) return;
		form.setFieldsValue({
			...dataGetMyProfile,
			birthday: dayjs(dataGetMyProfile.birthday) as any, // trick, fix later
		});
	}, [dataGetMyProfile]);

	if (errorGetMyProfile ?? errorUpdateUserProfile) {
		return (
			<GlobalError error={errorGetMyProfile?.data ?? errorUpdateUserProfile?.data} />
		);
	}

	const onSave = (values: any) => {
		if (!values || values.type === 'click') return;
		mutateUpdateUserProfile({
			firstname: values.firstname,
			lastname: values.lastname,
			fullname: values.fullname,
			avatar: values.avatar,
			birthday: dayjs(values.birthday).toISOString(),
			phoneNumber: values.phoneNumber,
			postalCode: values.postalCode?.toString(),
		});
	};

	const onChangeTab = (index: number) => () => {
		setSelectedSide(index);
	};

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
					<Form<Partial<Account> | undefined>
						name="profile"
						form={form}
						onFinish={onSave}
						labelAlign="left"
						autoComplete="off"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
					>
						<div className="block">
							<Avatar size={64} src={dataGetMyProfile?.avatar}>
								ava
							</Avatar>
							<UploadButton>
								<Button className="uploadBtn" icon={<Upload set="light" size="small" />}>
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
							label={<Typography.Text className="formLabel">First name</Typography.Text>}
							colon={false}
							style={{ maxWidth: 500 }}
							rules={[...baseFieldValidation('First name', true, 2, 64)]}
						>
							<Input required size="large" placeholder="First name" />
						</Form.Item>
						<Form.Item
							name="lastname"
							label={<Typography.Text className="formLabel">Last name</Typography.Text>}
							colon={false}
							style={{ maxWidth: 500 }}
							rules={[...baseFieldValidation('Last name', true, null, 64)]}
						>
							<Input required size="large" placeholder="Last name" />
						</Form.Item>
						<Form.Item
							name="fullname"
							label={<Typography.Text className="formLabel">Full name</Typography.Text>}
							colon={false}
							style={{ maxWidth: 500 }}
							rules={[...baseFieldValidation('Full name', true, 2, 64)]}
						>
							<Input size="large" placeholder="Full name" />
						</Form.Item>
						<Form.Item
							name="email"
							label={
								<Typography.Text className="formLabel">Email address</Typography.Text>
							}
							colon={false}
							rules={[...baseFieldValidation('Email', true, 2, 128, VALID_EMAIL_REGEX)]}
							style={{ maxWidth: 500 }}
						>
							<Input disabled size="large" placeholder="Email address" />
						</Form.Item>
						<Form.Item
							label={
								<Typography.Text className="formLabel">Phone Number</Typography.Text>
							}
							name="phoneNumber"
							colon={false}
							style={{ maxWidth: 500 }}
							rules={[...baseFieldValidation('Phone Number', false, 2, 16)]}
						>
							<Input size="large" placeholder="Phone Number" />
						</Form.Item>
						<Form.Item
							label={<Typography.Text className="formLabel">Birthday</Typography.Text>}
							name="birthday"
							colon={false}
							style={{ maxWidth: 500 }}
						>
							<DatePicker size="large" format={DATE_FORMAT.base} />
						</Form.Item>
						<Form.Item
							label={<Typography.Text className="formLabel">Postal code</Typography.Text>}
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
								loading={isLoadingGetMyProfile ?? isLoadingUpdateUserProfile}
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
