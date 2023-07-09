'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import useStyle from './ProfileOverview.style';
import Image from 'next/image';
import { Button, Divider, Form, Input, Typography } from '@shoppik/ui/components/Core';
import Link from 'next/link';

const { Title, Text } = Typography;

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

const Profile = () => {
	const { data: session } = useSession();
	const { styles } = useStyle();
	const [selectedSide, setSelectedSide] = useState(LIST_INFO[0].key);

	const onChangeTab = (index: number) => () => {
		setSelectedSide(index);
	};

	return (
		<div className={styles.wrapper}>
			<div className="leftSide">
				{LIST_INFO.map((item, index) => (
					<a
						onClick={onChangeTab(index)}
						className={`leftSideSection ${selectedSide === index ? 'selected' : ''}`}
					>
						<Text>{item.title}</Text>
					</a>
				))}
			</div>
			<div className="rightSide">
				<div className="block">
					<Image
						alt="authenticated profile image"
						height={56}
						width={56}
						className="avaImg"
						src={session && session.user ? (session?.user.image as string) : ''}
					/>
					<Button type="default" className="deleteBtn">
						Delete
					</Button>
					<Button type="primary" className="uploadBtn">
						Upload
					</Button>
				</div>
				<Divider />
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					labelAlign="left"
					autoComplete="off"
				>
					<Form.Item
						label={<Typography.Title level={5}>User name</Typography.Title>}
						name="username"
						colon={false}
						style={{ maxWidth: 500 }}
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input required size="large" placeholder="Thai" />
					</Form.Item>
					<Form.Item
						label={<Typography.Title level={5}>User surname</Typography.Title>}
						name="password"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="Nguyen Xuan" />
					</Form.Item>
					<Form.Item
						label={<Typography.Title level={5}>Email</Typography.Title>}
						name="username"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="nguyenxuanthai7@gmail.com" />
					</Form.Item>
					<Form.Item
						label={<Typography.Title level={5}>Phone Number</Typography.Title>}
						name="username"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="0706232632" />
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Profile;
