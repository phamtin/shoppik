import { useState, memo, PropsWithChildren } from "react";

import Sidebar from "@/Components/Sidebar/Sidebar";
import NavBar from "@/Components/Navbar/Navbar";
import { Button, Layout } from "ui/components/Core";

import c from "./RootLayout.module.scss";
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
    <Layout className={c.wrapper}>
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
      <Layout>
        <NavBar />
        <Content className={c.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default memo(RootLayout);
