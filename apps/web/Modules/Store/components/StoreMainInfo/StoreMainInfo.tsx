'use client';

import { useState } from 'react';

import {
	Button,
	Descriptions,
	Divider,
	Space,
	Tag,
	Typography,
	Tooltip,
	Avatar,
	Modal,
} from '@shoppik/ui/components/Core';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Location } from 'react-iconly';
import useStyle from './store-main-info.style';
import { trpc } from '@/lib/trpc/trpc';
import useLoggedInUser from '@/Hooks/useLoggedInUser/useLoggedInUser';
import UpdateStoreForm from '../UpdateStoreForm/UpdateStoreForm';

const StoreMainInfo = () => {
	const user = useLoggedInUser();

	const { data: store } = trpc.store.getMyStore.useQuery();

	const [collapsed, setCollapsed] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);
	const { styles, theme } = useStyle({ collapsed });

	const toggleUpdateModal = () => setUpdateModal((prev) => !prev);

	const tags = ['iOs', 'Iphone', 'IMac', 'Apple Watch', 'Apple TV'];

	const toggleCollapse = () => setCollapsed((prev) => !prev);
	const webStore = store?.data?.landingPageUrl || 'https://kurogu.vercel.app/';
	const avatarStore =
		store?.data?.avatar ||
		'https://res.cloudinary.com/dtizrfvjh/image/upload/v1668920121/qzrteppsiwxoyvbipnhg.jpg';
	const address: any = store?.data?.storeAddress || {};
	const addressStore = `${address?.street}, ${address?.ward}, ${address?.district}, ${address?.province}`;
	const phoneStore = store?.data?.contact?.phone?.replace('+84', '0');

	if (!store?.data) return <></>;

	return (
		<>
			<div className={styles.wrapper}>
				<Button
					className="collapeBtn"
					shape="circle"
					icon={collapsed ? <ChevronRight set="light" /> : <ChevronLeft set="light" />}
					onClick={toggleCollapse}
				/>

				<div className={styles.wrapperThin}>
					<div className={styles.avatarArea}>
						<Space align="start">
							<Avatar src={avatarStore} shape="square" size={80} />
							<div className={styles.subcription}>
								<Typography.Title level={5}>{store?.data?.name}</Typography.Title>
								<Typography.Text className="subTitle1">
									{store?.data?.tradeName || 'Kuro'}
								</Typography.Text>
								<br />
								<Typography.Link className="link" target="_blank" href={webStore}>
									{webStore}
								</Typography.Link>
								<Typography.Paragraph className="folowers">
									742 <span style={{ color: '#9f9f9f' }}>followers</span>
								</Typography.Paragraph>
							</div>
						</Space>
					</div>
					<div className={styles.addressArea}>
						<Location size="medium" />
						<Typography.Paragraph>{addressStore}</Typography.Paragraph>
					</div>
					<div className={styles.descriptionArea}>
						<Typography.Paragraph>{store?.data?.description}</Typography.Paragraph>
					</div>
					<div className={styles.tags}>
						{tags.map((t) => (
							<Tag key={t}>{t}</Tag>
						))}
					</div>
					<div className={styles.acitons}>
						<Button block type="primary" onClick={toggleUpdateModal}>
							Update Store
						</Button>
						<Tooltip title="Make a Skype call to shop">
							<Button className="more">📞</Button>
						</Tooltip>
					</div>
					<Divider style={{ marginBottom: theme.marginSM }} />
					<div className={styles.infoTable}>
						<Descriptions column={{ sm: 2, xs: 1 }}>
							<Descriptions.Item label="Products">624</Descriptions.Item>
							<Descriptions.Item label="Rating">4.9 (30.2k reviews)</Descriptions.Item>
							<Descriptions.Item label="Followers">22k</Descriptions.Item>
							<Descriptions.Item label="Response time">92% </Descriptions.Item>
							<Descriptions.Item label="Following">1.5k</Descriptions.Item>
							<Descriptions.Item label="Joined">1 year</Descriptions.Item>
						</Descriptions>
					</div>
					<Divider style={{ margin: theme.margin }} />
					<div className={styles.infoTableInfo}>
						<Descriptions
							bordered
							title={<small>Contact Infor</small>}
							column={{ sm: 1 }}
						>
							<Descriptions.Item label="Phone">
								{phoneStore || 'No info'}
							</Descriptions.Item>
							<Descriptions.Item label="Email">
								{store?.data?.contact?.email || 'No info'}
							</Descriptions.Item>
							<Descriptions.Item label="Instagram">
								{store?.data?.contact?.instagramLink || 'No info'}
							</Descriptions.Item>
							<Descriptions.Item label="Facebook">
								{store?.data?.contact?.facebookLink || 'No info'}
							</Descriptions.Item>
							<Descriptions.Item label="Youtube">
								{store?.data?.contact?.youtubeLink || 'No info'}
							</Descriptions.Item>
						</Descriptions>
					</div>
				</div>
			</div>
			<Modal
				transitionName=""
				open={updateModal}
				width={560}
				closeIcon={false}
				centered
				onCancel={toggleUpdateModal}
				footer={[]}
				style={{ borderRadius: 20, overflow: 'hidden' }}
			>
				<UpdateStoreForm onTurnOffUpdateModal={toggleUpdateModal} store={store} />
			</Modal>
		</>
	);
};

export default StoreMainInfo;
