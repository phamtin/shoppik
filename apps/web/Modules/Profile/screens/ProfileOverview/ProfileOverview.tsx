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
	InputNumber,
} from '@shoppik/ui/components/Core';
import dayjs from 'dayjs';
import { Upload } from 'react-iconly';
import { trpc } from '@/lib/trpc/trpc';
import { Account } from '@shoppik/schema';
import GlobalError from '@/app/error';
import { DATE_FORMAT } from '@/Utils/dayjs/time';

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
	const [form] = Form.useForm<Partial<Account> | undefined>();

	const [selectedSide, setSelectedSide] = useState(LIST_INFO[0].key);

	const { data, isLoading, error } = trpc.user.getMyProfile.useQuery();
	const mutation = trpc.user.updateUserProfile.useMutation();

	useEffect(() => {
		form.setFieldsValue({
			...data,
			birthday: (data ? dayjs(data.birthday) : dayjs()) as any, // trick, fix later
		});
	}, [form, data]);

	if (error) {
		return <GlobalError error={error} />;
	}

	const onSave = (values: Partial<Account> | undefined) => {
		if (!values) return;

		mutation.mutate({
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
						<Avatar size={64} src={data?.avatar}>
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
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input required size="large" placeholder="First name" />
					</Form.Item>
					<Form.Item
						name="lastname"
						label={<Typography.Text className="formLabel">Last name</Typography.Text>}
						colon={false}
						style={{ maxWidth: 500 }}
						rules={[{ required: true, message: 'Please input your lastname!' }]}
					>
						<Input required size="large" placeholder="Last name" />
					</Form.Item>
					<Form.Item
						name="fullname"
						required
						label={<Typography.Text className="formLabel">Full name</Typography.Text>}
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="Full name" />
					</Form.Item>
					<Form.Item
						name="email"
						required
						label={<Typography.Text className="formLabel">Email address</Typography.Text>}
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="Email address" />
					</Form.Item>
					<Form.Item
						label={<Typography.Text className="formLabel">Phone Number</Typography.Text>}
						name="phoneNumber"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="Phone Number" />
					</Form.Item>
					<Form.Item
						label={<Typography.Text className="formLabel">Birthday</Typography.Text>}
						name="birthday"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<DatePicker
							size="large"
							format={DATE_FORMAT.base}
							// defaultValue={dayjs('06-06-2015', DATE_FORMAT.base)}
						/>
					</Form.Item>
					<Form.Item
						label={<Typography.Text className="formLabel">Postal code</Typography.Text>}
						name="postalCode"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<InputNumber
							className="postalCode"
							controls={false}
							size="large"
							width="100px"
						/>
					</Form.Item>
					<Form.Item label=" " colon={false} style={{ maxWidth: 500 }}>
						<Button
							size="large"
							htmlType="submit"
							style={{ width: 200 }}
							type="primary"
							loading={isLoading}
							onClick={onSave}
						>
							Save
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default ProfileScreen;
