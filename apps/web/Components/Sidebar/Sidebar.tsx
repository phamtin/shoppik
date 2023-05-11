import { memo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Home, Bag, Chart, Message, Activity } from 'react-iconly';

import type { MenuProps } from 'ui/components/Core';
import { Menu } from 'ui/components/Core';
import { getItem } from '@/Utils/common';

import useStyle from './sidebar.style';

const Dot = ({ color }: any) => (
	<span
		style={{
			display: 'block',
			height: '7px',
			width: '7px',
			marginRight: '7px',
			background: `${color}`,
			borderRadius: '100px',
		}}
	></span>
);

const items: MenuProps['items'] = [
	getItem('Dashboard', 'shoppik', <Home />),
	getItem('Market', 'market', <Chart />),
	getItem('Activity', 'activity', <Activity />),
	getItem('Messengers', 'messengers', <Message />),
	getItem('My store', 'sub2', <Bag />, [
		getItem('Overview', 'overview', <Dot color="orangered" />),
		getItem('Partners', 'partners', <Dot color="orange" />),
		getItem('Statistic', 'statistic', <Dot color="#acff1e" />),
		getItem('Performance', 'performance', <Dot color="#367df8" />),
		getItem('SEO management', 'seo-management', <Dot color="#c136f8" />),
	]),
];

const Sidebar: React.FC = () => {
	const { styles } = useStyle();
	const router = useRouter();

	const onGotoPage: MenuProps['onClick'] = (e) => {
		router.replace('/'.concat(e.key));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.logo}>
				<Image alt="logo main" width={48} height={44} src={'/images/logo-main.png'} />
			</div>
			<br />
			<br />
			<Menu
				items={items}
				style={{ width: '100%', backgroundColor: '#121212' }}
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				onClick={onGotoPage}
			/>
		</div>
	);
};

export default memo(Sidebar);
