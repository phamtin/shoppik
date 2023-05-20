import { memo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Home, Bag, Chart, Message, Activity } from 'react-iconly';

import { MenuProps, Typography } from 'ui/components/Core';
import { Menu } from 'ui/components/Core';
import { getItem } from '@/Utils/common';

import useStyle from './sidebar.style';

const Dot = ({ color }: any) => (
	<span
		style={{
			display: 'inline-block',
			height: '7px',
			width: '7px',
			marginRight: '3px',
			marginBottom: '1px',
			background: `${color}`,
			borderRadius: '100%',
		}}
	></span>
);

const items: MenuProps['items'] = [
	getItem('Dashboard', 'shoppik', <Home set="bold" />),
	getItem('Market', 'market', <Chart set="bold" />),
	getItem('Activity', 'activity', <Activity set="bold" />),
	getItem('Messengers', 'messengers', <Message set="bold" />),
	getItem('My store', 'sub2', <Bag set="bold" />, [
		getItem('Overssview', 'overview', <Dot color="orangered" />),
		getItem('Partners', 'partners', <Dot color="orange" />),
		getItem('Statistic', 'statistic', <Dot color="#acff1e" />),
		getItem('Performance', 'performance', <Dot color="#367df8" />),
		getItem('SEO management', 'seo-management', <Dot color="#c136f8" />),
	]),
];

interface SidebarProp {
	collapsed: boolean;
}

const Sidebar: React.FC<SidebarProp> = ({ collapsed }) => {
	const { styles } = useStyle({ collapsed });
	const router = useRouter();

	const onGotoPage: MenuProps['onClick'] = (e) => {
		router.replace('/'.concat(e.key));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.logo}>
				<Image alt="logo main" width={36} height={32} src={'/images/logo-main.png'} />
				{!collapsed && <Typography.Title level={4}>Shoppik</Typography.Title>}
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
	);
};

export default memo(Sidebar);
