import { useState, memo, PropsWithChildren } from 'react';

import { Button, Layout } from 'ui/components/Core';
import { ArrowLeft } from 'react-iconly';
import Sidebar from '@/Components/Sidebar/Sidebar';
import NavBar from '@/Components/Navbar/Navbar';

const { Sider, Content } = Layout;

type RootLayoutProps = PropsWithChildren;

const RootLayout = ({ children }: RootLayoutProps) => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => setCollapsed(!collapsed);

	return (
		<Layout style={{ height: '100vh' }}>
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
				<Sidebar collapsed={collapsed} />
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
			<Layout style={{ height: '100%', overflow: 'auto', backgroundColor: '#FFF' }}>
				<NavBar />
				<Content>{children}</Content>
			</Layout>
		</Layout>
	);
};

export default memo(RootLayout);
