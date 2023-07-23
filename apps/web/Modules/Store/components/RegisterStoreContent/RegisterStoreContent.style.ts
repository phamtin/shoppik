import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
  becomeOwner: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',

    h3: {
      marginTop: token.marginXXS,
      marginBottom: token.marginXS,
    },
    '.description': {
      fontSize: 15,
      color: token.colorTextSecondary,
      marginBottom: token.marginXL,
    },
  },
}));

export default styles;
