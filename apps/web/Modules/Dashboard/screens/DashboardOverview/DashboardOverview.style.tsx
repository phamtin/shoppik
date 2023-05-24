import {createStyles} from 'antd-style';

export default createStyles(({token}) => ({
	wrapper: {
		margin: '24px 42px 0 42px',
		display: 'flex',

		'.leftWrapper': {
			flex: 3,
			marginRight: 27,

			'.trendingWrapper': {
				'.trendingCards': {
					display: 'flex',
				},
			},

			'.topCollectionWrapper': {},
		},
		'.rightWrapper': {
			flex: 2,

			'.bestSellerWrapper': {
				padding: '30px 24px',
				backgroundColor: token.colorBgBase,
				boxShadow: `1px 2px 8px ${token.colorBorder}`,
				borderRadius: 12,
				marginBottom: 32,
			},

			'.recentViewWrapper': {
				padding: '30px 24px',
				backgroundColor: token.colorBgBase,
				boxShadow: `1px 2px 8px ${token.colorBorder}`,
				borderRadius: 12,
			},
		},
	},
}));
