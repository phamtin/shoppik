import { useState, memo, PropsWithChildren } from 'react';

import Sidebar from '@/Components/Sidebar/Sidebar';
import NavBar from '@/Components/Navbar/Navbar';
import { Button, Layout } from 'ui/components/Core';

import { ArrowLeftSquare } from 'react-iconly';

const { Sider, Content } = Layout;

const siderStyle = {
	backgroundColor: '#0a0a0a',
	transition: '0s',
};
interface RootLayoutProps extends PropsWithChildren {}

const RootLayout = ({ children }: RootLayoutProps) => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => setCollapsed(!collapsed);

	return (
		<Layout style={{ height: '100vh' }}>
			<Button
				type="primary"
				style={{
					position: 'absolute',
					padding: '3px 5px',
					zIndex: 2,
					bottom: 12,
					left: 12,
				}}
				onClick={toggleCollapsed}
			>
				<ArrowLeftSquare />
			</Button>
			<Sider collapsedWidth={58} width={230} style={siderStyle} collapsed={collapsed}>
				<Sidebar collapsed={collapsed} />
			</Sider>
			<Layout style={{ height: '100%', overflow: 'auto', backgroundColor: '#fff' }}>
				<NavBar />
				<Content>{children}</Content>
			</Layout>
		</Layout>
	);
};

export default memo(RootLayout);
