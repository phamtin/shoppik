import { createStyles } from "antd-style";

export default createStyles(({ token }) => ({
	wrapper: {
		marginLeft: 48,
		marginRight: 48,

		".title": {
			fontSize: "40px",
			marginBottom: 40,
		},

		".button": {
			display: "flex",
			borderWidth: 2,
			borderColor: "#141416",
			fontSize: 14,
			alignItems: "center",
			borderRadius: 12,
			padding: "24px 17px",

			".paragraph": {
				marginBottom: 0,
				marginLeft: 8,
				fontSize: 14,
			},
		},

		".productWrapper": {
			marginTop: 48,
			display: "flex",
			flexWrap: "wrap",
		},
	},
}));
