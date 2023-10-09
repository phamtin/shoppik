//LG: 24, XL: 32, MD: 20, SM: 12, XS: 8, XXS: 4

import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
  wrapper: {
    padding: `0px ${token.paddingMD * 3}px`,
    paddingTop: `${token.paddingXL + token.paddingXS}px`,
    backgroundColor: '#F4F4F4',
    height: '100%',

    '.ant-typography': {
      marginBottom: token.marginLG
    },
    '.productsArea': {
      padding: token.paddingLG,
      backgroundColor: '#fff',
      borderRadius: token.borderRadiusSM
    }
  },
}));
