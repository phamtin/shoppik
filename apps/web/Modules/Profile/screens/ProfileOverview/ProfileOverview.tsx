'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import useStyle from './ProfileOverview.style';
import Image from 'next/image';
import { Button, Divider, Form, Input, Typography } from '@shoppik/ui/components/Core';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Text } = Typography;
type RangeValue = [Dayjs | null, Dayjs | null] | null;
const dateFormat = 'YYYY-MM-DD';

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
	const [isDisabled, setIsDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const onEdit = () => {
		setIsDisabled(false)
	}

	const onSave = () => {
		if (isDisabled) return;
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			setIsDisabled(true)
		}, 1000)
	}

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
						name="firstname"
						colon={false}
						style={{ maxWidth: 500 }}
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input required size="large" placeholder="Thai" disabled={isDisabled} />
					</Form.Item>
					<Divider />
					<Form.Item
						label={<Typography.Title level={5}>User surname</Typography.Title>}
						name="surname"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="Nguyen Xuan" disabled={isDisabled} />
					</Form.Item>
					<Divider />
					<Form.Item
						label={<Typography.Title level={5}>Email</Typography.Title>}
						name="email"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="nguyenxuanthai7@gmail.com" disabled={isDisabled} />
					</Form.Item>
					<Divider />
					<Form.Item
						label={<Typography.Title level={5}>Phone Number</Typography.Title>}
						name="phone"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="0706232632" disabled={isDisabled} />
					</Form.Item>
					<Divider />
					<Form.Item
						label={<Typography.Title level={5}>Birthday</Typography.Title>}
						name="birthday"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<DatePicker defaultValue={dayjs('2015-06-06', dateFormat)} disabled={isDisabled} />
					</Form.Item>
					<Divider />
					<Form.Item
						label={<Typography.Title level={5}>Location</Typography.Title>}
						name="phone"
						colon={false}
						style={{ maxWidth: 500 }}
					>
						<Input size="large" placeholder="Da Nang, Vietnam" disabled={isDisabled} />
					</Form.Item>
					<Divider />
					<div className="block">
						<Button type="default" className="editBtn" onClick={onEdit}>
							Edit
						</Button>
						<Button loading={loading} type="primary" className="saveBtn" onClick={onSave}>
							Save
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Profile;
