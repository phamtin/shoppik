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
					borderLeft: `3px solid ${token.colorPrimaryActive}`,
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

			'.block': {
				marginTop: token.marginXL,
				marginLeft: 134,
				display: 'flex',
				alignItems: 'center',
				padding: `0 ${token.marginXL}px`,

				'.avaImg': {
					borderRadius: 28,
					cursor: 'pointer',
					marginRight: token.marginMD,
				},
				'.deleteBtn': {
					marginRight: token.marginXS,
				},
				'.leftBlock': {
					width: 166,
				},
				'.rightBlock': {
					width: 'max-content',
				},
			},
		},
	},
}));

export default styles;
