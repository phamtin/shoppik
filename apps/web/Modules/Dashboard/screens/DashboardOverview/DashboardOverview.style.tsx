import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		margin: `${token.marginLG}px ${token.marginLG}px 0 ${token.marginLG}px`,
		display: 'flex',
		// '@media screen and (max-width: 991px)': {
		// 	flexDirection: 'column',
		// },

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
