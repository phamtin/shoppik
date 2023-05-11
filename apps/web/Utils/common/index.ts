import { MenuProps, Typography } from "ui/components/Core";

type MenuItem = Required<MenuProps>["items"][number];
const { Text } = Typography;

export function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}
