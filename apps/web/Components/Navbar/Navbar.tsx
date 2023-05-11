import { Dropdown, Layout, MenuProps, Typography } from "ui/components/Core";
import useStyle from "./navbar.style";
import { getItem } from "@/Utils/common";
import NotiButton from "./NotiButton/NotiButton";
import { trpc } from "@/Utils/trpc/trpc";

const { Header } = Layout;
const { Text } = Typography;

const NavBar = () => {
	const { styles } = useStyle();

	const items: MenuProps["items"] = [
		getItem(<Text>Charts</Text>, "sub3"),
		getItem(<Text>Actions</Text>, "sub4"),
		getItem(
			"Group",
			"grp",
			null,
			[getItem("Option 13", "13"), getItem("Option 14", "14")],
			"group"
		),
		getItem(<Text>Log out</Text>, "sub5"),
	];

	return (
		<Header className={styles.wrapper}>
			<NotiButton />
			<div>
				<Dropdown menu={{ items }} overlayStyle={{ width: 200 }}>
					<a onClick={(e) => e.preventDefault()}>
						<Typography>Profile</Typography>
					</a>
				</Dropdown>
			</div>
		</Header>
	);
};

export default NavBar;
