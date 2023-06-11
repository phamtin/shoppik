'use client';

import { ArrowLeft, Home, Bag, Chart, Message, Activity } from 'react-iconly';

import { Button, Layout, Menu, MenuProps, Typography } from 'ui/components/Core';

import { memo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getItem } from '@/Utils/common';

import useStyle from './sidebar.style';

const { Sider } = Layout;

function Dot({ color }: { color: string }) {
	return (
		<span
			style={{
				display: 'inline-block',
				height: '6px',
				width: '6px',
				marginRight: '8px',
				marginBottom: '1px',
				background: `${color}`,
				borderRadius: '100%',
			}}
		/>
	);
}

const myStoreUrl = {
	overview: 'overview',
	partners: 'partners',
	statistic: 'statistic',
	performance: 'performance',
	seo: 'seo',
};

const items: MenuProps['items'] = [
	getItem('Dashboard', 'dashboard', <Home />),
	getItem('Market', 'market', <Chart />),
	getItem('Activity', 'activity', <Activity />),
	getItem('Messengers', 'messengers', <Message />),
	getItem('My store', 'sub2', <Bag />, [
		getItem('Overview', myStoreUrl.overview, <Dot color="orangered" />),
		getItem('Partners', myStoreUrl.partners, <Dot color="orange" />),
		getItem('Statistic', myStoreUrl.statistic, <Dot color="#acff1e" />),
		getItem('Performance', myStoreUrl.performance, <Dot color="#367df8" />),
		getItem('SEO management', myStoreUrl.seo, <Dot color="#c136f8" />),
	]),
];

interface SidebarProp {
	collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProp> = () => {
	const router = useRouter();
	const [collapsed, setCollapsed] = useState(false);
	const { styles } = useStyle({ collapsed });

	const onGotoPage: MenuProps['onClick'] = (e) => {
		if (e.key in myStoreUrl) {
			return router.replace('/my-store/'.concat(e.key));
		}
		return router.replace('/'.concat(e.key));
	};

	const toggleCollapsed = () => setCollapsed(!collapsed);

	return (
		<Sider
			collapsedWidth={58}
			width={230}
			style={{
				position: 'relative',
				backgroundColor: '#0a0a0a',
				overflowX: 'hidden',
				transition: '0s',
			}}
			collapsed={collapsed}
		>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<Image alt="logo main" width={36} height={32} src="/images/logo-main.png" />
					{!collapsed && <Typography.Title level={4}>&nbsp;Shoppik</Typography.Title>}
				</div>
				<br />
				<Menu
					items={items}
					style={{ width: '100%', backgroundColor: '#0a0a0a' }}
					defaultSelectedKeys={['1']}
					defaultOpenKeys={['sub1']}
					mode="inline"
					onClick={onGotoPage}
				/>
			</div>
			<Button
				size="large"
				style={{
					position: 'absolute',
					bottom: '7px',
					left: '8px',
					padding: '8px 9px',
					border: 'none',
					backgroundColor: '#0a0a0a',
				}}
				icon={<ArrowLeft set="light" primaryColor="#FFF" />}
				onClick={toggleCollapsed}
			/>
		</Sider>
	);
};

export default memo(Sidebar);
