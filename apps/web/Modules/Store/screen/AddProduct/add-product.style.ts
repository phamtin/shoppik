//LG: 24, XL: 32, MD: 20, SM: 12, XS: 8, XXS: 4

import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
  wrapper: {
    backgroundColor: '#F4F4F4',
    paddingTop: token.paddingXL,

    '.header': {
      margin: `0px ${token.paddingXL}px`,
    },
    '.body': {
      display: 'flex',
      padding: `0px ${token.paddingXL}px`,
      marginBottom: token.marginLG,

      '.leftSection': {
        flex: '0 1 68%',
        marginRight: token.marginSM,

        '.infoWrapper': {
          marginTop: token.marginLG,
          padding: token.marginLG,
          backgroundColor: 'white',
          borderRadius: token.borderRadiusLG,

          '.ant-typography': {
            marginBottom: 0
          },

          '.inputItem': {
            marginBottom: 0,

            '.input': {
              height: 48
            },
          },

          '.spacer': {
            height: token.marginMD
          }
        },
      },
      '.rightSection': {
        flex: '1 0',
        backgroundColor: 'white',
        height: 500,
        borderRadius: token.borderRadiusLG,
        marginTop: token.marginLG,
        padding: token.marginLG,

        '.ant-typography': {
          marginBottom: 0
        },
      }
    },

    '.submitArea': {
      backgroundColor: 'white',
      padding: `${token.paddingLG}px ${token.paddingXL}px`
    }
  },
}));
