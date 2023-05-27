import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		width: '96%',
		maxWidth: 1920,
		margin: '16px auto 0 auto',
	},
	wrapperSection: {
		display: 'flex',
		'.left': {
			flex: '0 1 68%',
			'@media screen and (max-width: 991.8px)': {
				flex: '0 1 44% !important',
			},
		},
		'.right': {
			flex: '1 0',
			height: 900,
			background: token.colorBgBase,
			marginLeft: token.marginLG,
			padding: token.padding,
			borderRadius: token.borderRadiusLG * 2,
			boxShadow: ' rgba(0, 0, 0, 0.15) 2px 4px 15px 0px',
		},
	},
}));
