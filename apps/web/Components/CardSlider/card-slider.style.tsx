import { createStyles } from 'antd-style';

export default createStyles(({ token }, { width }: any) => ({
	wrapper: {
		width: 111,
		overflowX: 'scroll',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
	elements: {
		display: 'flex',
	},
}));
