import {createStyles} from 'antd-style';

export default createStyles(({token}) => ({
    wrapper: {
        margin: '24px 42px 0 42px',
        display: 'flex',

        ".leftWrapper": {
            flex: 3,
            marginRight: 27,

            ".bannerWrapper": {
                backgroundColor: 'rgba(0,0,0,0.8)',
                height: 194,
                width: '100%',
                borderRadius: 24,
                padding: '30px 28px',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 48,

                ".title": {
                    fontSize: 30,
                    color: token.colorWhite,
                    marginBottom: 8
                },
                ".desc": {
                    fontSize: 14,
                    color: '#D4D4D4',
                    marginBottom: 0
                },
                ".button": {
                    marginBottom: 0
                }
            },

            ".trendingWrapper": {
                ".trendingTitleSection": {
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'space-between',

                    ".tredingText": {
                        fontSize: 24
                    },

                    ".viewAll": {
                        fontSize: 16,
                        color: token.colorTextDisabled
                    }
                },

                ".trendingCards": {
                    display: 'flex'
                }
            },

            ".topCollectionWrapper": {
                ".topCollectionTitleSection": {
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'space-between',

                    ".collectionText": {
                        fontSize: 24
                    },
                    ".viewAll": {
                        fontSize: 16,
                        color: token.colorTextDisabled
                    }
                }
            }
        },
        ".rightWrapper": {
            flex: 2,

            ".bestSellerWrapper": {
                padding: '30px 24px',
                backgroundColor: token.colorBgBase,
                boxShadow: `1px 2px 8px ${token.colorBorder}`,
                borderRadius: 12,
                marginBottom: 32,

                ".sellerTitleArea": {
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 28
                },

                ".sellerText": {
                    fontSize: 22,
                }
            },

            ".recentViewWrapper": {
                padding: '30px 24px',
                backgroundColor: token.colorBgBase,
                boxShadow: `1px 2px 8px ${token.colorBorder}`,
                borderRadius: 12,

                ".recentViewArea": {
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 28
                },

                ".recentViewText": {
                    fontSize: 22,
                }
            }
        },
    },
}));
