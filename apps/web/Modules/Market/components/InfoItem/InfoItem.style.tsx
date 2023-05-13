import {createStyles} from 'antd-style';

export default createStyles(({token}) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

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
        }
    }
}));
