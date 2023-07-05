import { createStyles } from 'antd-style';

export default createStyles(() => ({
	wrapper: {
		width: '100%',
		display: 'grid',
		position: 'relative',
		overflowX: 'scroll',

		'.slider': {
			display: 'flex',
			width: 0,
		},
	},
}));
