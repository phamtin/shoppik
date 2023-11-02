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
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MapPinIcon,
} from '@heroicons/react/24/outline';
import useStyle from './store-main-info.style';
import { trpc } from '@/lib/trpc/trpc';
import RegisterStoreForm from '../CreateStoreModal/CreateStoreModal';
import { StoreStatistic, showStoreInformation } from '../../helper/store.helper';
import { StoreTags } from '../../constant/store.constant';
import { handleToastTrpcError } from '@/app/error/Error';

const StoreMainInfo = () => {
	const [updateModal, setUpdateModal] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const { styles, theme } = useStyle({ collapsed });

	const { data: store, isError, error } = trpc.store.getMyStore.useQuery();

	if (isError) {
		return handleToastTrpcError(error.data);
	}
	if (!store?.data) return <></>;

	const toggleUpdateModal = () => setUpdateModal((prev) => !prev);

	const toggleCollapse = () => setCollapsed((prev) => !prev);
	const webStore = store.data.landingPageUrl || 'https://kurogu.vercel.app/';
	const avatarStore =
		store.data.avatar ||
		'https://res.cloudinary.com/dtizrfvjh/image/upload/v1668920121/qzrteppsiwxoyvbipnhg.jpg';
	const address = store.data.storeAddress;
	const addressStore = `${address.street}, ${address.ward}, ${address.district}, ${address.province}`;
	const phoneStore = store.data.contact?.phone.map((p: any) => (
		<p key={p}>{`${p.replace('+84', '0')}`}</p>
	));
	const contact = store.data.contact;

	return (
		<>
			<div className={styles.wrapper}>
				<Button
					className="collapeBtn"
					shape="circle"
					icon={
						collapsed ? <ChevronRightIcon width={24} /> : <ChevronLeftIcon width={24} />
					}
					onClick={toggleCollapse}
				/>

				<div className={styles.wrapperThin}>
					<div className={styles.avatarArea}>
						<Space align="start">
							<Avatar src={avatarStore} shape="square" size={80} />
							<div className={styles.subcription}>
								<Typography.Title level={5}>{store.data.name}</Typography.Title>
								<Typography.Text className="subTitle1">
									{store.data.tradeName || 'Kuro'}
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
						<MapPinIcon width={24} />
						<Typography.Paragraph>{addressStore}</Typography.Paragraph>
					</div>
					<div className={styles.descriptionArea}>
						<Typography.Paragraph>{store.data.description}</Typography.Paragraph>
					</div>
					<div className={styles.tags}>
						{StoreTags.map((t) => (
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
						<Descriptions
							column={{ md: 2, lg: 2, xl: 2, xxl: 2 }}
							items={StoreStatistic}
						/>
					</div>
					<Divider style={{ marginBottom: theme.margin }} />
					<div className={styles.infoTableInfo}>
						<Descriptions
							bordered
							title={<small>Store Information</small>}
							column={{ md: 1, lg: 1, xl: 1, xxl: 1 }}
							items={showStoreInformation(contact, phoneStore)}
						/>
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
				<RegisterStoreForm
					toggleForm={toggleUpdateModal}
					store={{
						...store.data,
						createdAt: store.data.createdAt as Date,
						updatedAt: store.data.updatedAt as Date,
						deletedAt: store.data.deletedAt as Date,
					}}
				/>
			</Modal>
		</>
	);
};

export default StoreMainInfo;
