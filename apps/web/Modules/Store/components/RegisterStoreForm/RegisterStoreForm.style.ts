import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
  wrapper: {
    '.header': {
      marginBottom: token.marginMD,
    },
    h3: {
      marginBottom: 0
    },
    '.description': {
      fontSize: 15,
      marginBottom: token.marginXXL
    },
    '.ant-form-item': {
      marginBottom: token.marginMD
    },
    '.buttons': {
      display: 'flex',
      flexDirection: 'row',
      marginTop: token.marginXL
    },
    '.inputRow': {
      display: 'flex',
      flexDirection: 'row'
    },
    '.spacer': {
      width: token.marginMD
    },
    '.block': {
      flex: 1
    },
  }
}));

export default styles;
