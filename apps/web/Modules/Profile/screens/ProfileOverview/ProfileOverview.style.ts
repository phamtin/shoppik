import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		padding: `0 ${token.marginLG}px`,

		'.leftSide': {
			flex: 1,
			maxWidth: 200,
			borderRight: `1px solid ${token.colorBorderSecondary}`,
			paddingTop: token.marginXXL,
			marginRight: token.marginXL,

			'.leftSideSection': {
				display: 'block',
				alignItems: 'center',
				marginBottom: token.margin,
				'&.selected': {
					paddingLeft: token.marginXS,
					marginLeft: -token.marginXS + 1,
					borderLeft: `3px solid ${token.colorPrimary}`,
					span: { color: token.colorTextBase },
				},
				span: {
					fontSize: 13,
					fontWeight: 500,
				},
			},
		},
		'.rightSide': {
			flex: 5,
			'h5.ant-typography': {
				marginBottom: 0,
				marginTop: token.marginXS,
			},
			'.formLabel': {
				fontSize: 15,
				marginTop: token.marginXS,
			},
			'.block': {
				marginTop: token.marginXL,
				marginLeft: 132,
				display: 'flex',
				alignItems: 'center',
				padding: `0 ${token.marginXL}px`,
				'.uploadBtn': {
					display: 'flex',
					alignItems: 'center',
					marginLeft: token.marginLG,
					marginRight: token.marginXS,
				},
				'.rightBlock': {
					width: 'max-content',
				},
			},
			'.ant-input-number.postalCode': {
				width: '100%',
			},
		},
	},
}));

export default styles;
