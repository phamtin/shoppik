import { createStyles } from "antd-style";

const styles = createStyles(({ token }) => ({
	container: {
		width: "100%",
		backgroundColor: token.colorText,
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",

		h1: {
			marginBottom: token.marginXS,
			color: token.colorPrimary,
		},
	},
	gretting: {
		color: token.colorBgLayout,
		marginBottom: token.marginXL,
	},
	btnGroup: {
		width: "320px",
		button: {
			border: 0,
			color: token["blue-6"],
			"&:first-child": {
				color: token["red-6"],
				marginBottom: token.marginSM,
				"&:hover": {
					color: token["red-6"],
					backgroundColor: token["red-1"],
				},
			},
			"&:hover": {
				border: 0,
				backgroundColor: token["blue-1"],
			},
		},
	},
}));

export default styles;
