import { Button, Typography } from "@/../../packages/ui/components/Core";
import Image from "next/image";
import Link from "next/link";

const Custom404 = () => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			height: "92%",
			marginLeft: "-100px",
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		<Image alt="404" width={320} height={240.138} src={"/images/404.png"} />
		<br />
		<Typography.Text style={{ fontSize: 28 }}>404</Typography.Text>
		<Typography.Text type="secondary">Ops, You come the wrong way</Typography.Text>
		<br />
		<Button type="primary">
			<Link href="/shoppik">
				<span>Back home</span>
			</Link>
		</Button>
	</div>
);

export default Custom404;
