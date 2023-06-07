import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		width: '97%',
		maxWidth: 1920,
		margin: '16px auto 0 auto',
		display: 'flex',

		'.leftWrapper': {
			flex: '0 1 68%',
			marginRight: 27,
			'@media screen and (max-width: 1550px)': {},

			'.trendingWrapper': {
				'.trendingCards': {
					display: 'flex',
					flexWrap: 'wrap',
				},
			},
		},
		'.rightWrapper': {
			flex: '1 0',
		},
	},
}));
