import { useState, memo, PropsWithChildren } from "react";

import Sidebar from "@/Components/Sidebar/Sidebar";
import NavBar from "@/Components/Navbar/Navbar";
import { Button, Layout } from "ui/components/Core";

import { ArrowLeftSquare } from "react-iconly";

const { Sider, Content } = Layout;

const siderStyle = {
	backgroundColor: "#121212",
};
interface RootLayoutProps extends PropsWithChildren {}

const RootLayout = ({ children }: RootLayoutProps) => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => setCollapsed(!collapsed);

	return (
		<Layout style={{ height: "100vh" }}>
			<Button
				type="primary"
				style={{ position: "absolute", zIndex: 22, bottom: 12, left: 12 }}
				onClick={toggleCollapsed}
			>
				<ArrowLeftSquare />
			</Button>
			<Sider width={226} style={siderStyle} collapsed={collapsed}>
				<Sidebar />
			</Sider>
			<Layout style={{ height: "100%", overflow: "auto" }}>
				<NavBar />
				<Content>{children}</Content>
			</Layout>
		</Layout>
	);
};

export default memo(RootLayout);
