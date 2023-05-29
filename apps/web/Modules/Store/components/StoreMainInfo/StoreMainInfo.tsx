import { useState } from 'react';

import {
	Button,
	Descriptions,
	Divider,
	Space,
	Tag,
	Typography,
	Tooltip,
} from 'ui/components/Core';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'react-iconly';
import useStyle from './store-main-info.style';

interface StoreMainInfoProps {
	information: string;
}

const StoreMainInfo = ({ information }: StoreMainInfoProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const { styles, theme } = useStyle({ collapsed });

	const tags = ['iOs', 'Iphone', 'IMac', 'Apple Watch', 'Apple TV'];

	const toggleCollapse = () => setCollapsed((prev) => !prev);

	return (
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
						<Image
							className="storeAva"
							alt="example"
							src="/images/product-detail.png"
							width="80"
							height="80"
						/>
						<div className={styles.subcription}>
							<Typography.Title level={5}>{information}</Typography.Title>
							<Typography.Text className="subTitle1">
								Social Network Platform
							</Typography.Text>
							<br />
							<Typography.Link className="link">www.twitter.com</Typography.Link>
							<Typography.Paragraph className="folowers">
								742 <span style={{ color: '#9f9f9f' }}>followers</span>
							</Typography.Paragraph>
						</div>
					</Space>
				</div>
				<div className={styles.descriptionArea}>
					<Typography.Paragraph>
						Twitter is an American microblogging and social network service, Live you
						fukcking life with the hype of people.
					</Typography.Paragraph>
				</div>
				<div className={styles.tags}>
					{tags.map((t) => (
						<Tag key={t}>{t}</Tag>
					))}
				</div>
				<div className={styles.acitons}>
					<Button block type="primary">
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
					<Descriptions bordered title={<small>Contact Infor</small>} column={{ sm: 1 }}>
						<Descriptions.Item label="Phone">+84 576 352 0041</Descriptions.Item>
						<Descriptions.Item label="Instagram">twitter.store</Descriptions.Item>
						<Descriptions.Item label="Facebook">tin.pham22</Descriptions.Item>
						<Descriptions.Item label="Youtube">store@channel</Descriptions.Item>
					</Descriptions>
				</div>
			</div>
		</div>
	);
};

export default StoreMainInfo;
