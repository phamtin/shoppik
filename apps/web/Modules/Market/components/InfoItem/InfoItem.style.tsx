import {createStyles} from 'antd-style';

export default createStyles(({token}) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        ".infoSection": {
            display: 'flex',

            ".info": {
                marginLeft: token.marginSM,

                ".action": {
                    fontSize: 16,
                    color: token.colorTextDisabled,
                    marginBottom: 0,
                },
                ".title": {
                    fontSize: 22,
                    marginBottom: 0,
                }
            },
        },

        "rightSection": {
            backgroundColor: 'red'
        },

        ".ant-typography": {
            marginBottom: 0
        }
    }
}));
