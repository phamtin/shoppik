import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: token.marginLG,
    backgroundColor: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.15) 2px 4px 28px 0px',
    borderRadius: token.borderRadiusLG * 2 - 4,
    padding: token.paddingMD,

    '.ant-typography': {
      marginBottom: 0
    }
  },
}));
