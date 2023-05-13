import {createStyles} from 'antd-style';

export default createStyles(({token}) => ({
  wrapper: {
    margin: '24px 42px 0 42px',

    ".titleWrapper": {
      display: 'flex',
      alignItems: 'center',
      marginBottom: token.marginXXL,

      ".iconBack": {
        backgroundColor: '#E6E8EC',
        width: 32,
        height: 32,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
      },

      ".title": {
        fontSize: '40px',
        marginBottom: 0,
        marginLeft: token.marginLG
      }
    },

    ".productWrapper": {
      padding: 32,
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      boxShadow: `8px 2px 30px ${token.colorFill}`,
      borderRadius: 18,
      marginBottom: token.marginXXL,

      ".productGap": {
        width: 120
      },

      ".productInfo": {
        ".productName": {
          fontSize: 44,
          marginBottom: token.marginXS
        },

        ".productDesc": {
          fontSize: 16,
          marginBottom: token.marginXL,
        },

        ".productItemInfo": {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: token.marginXL,

          ".productItemInfoGap": {
            width: 68
          }
        },

        ".productMore": {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: token.marginXL,

          ".productMoreItem": {
            display: 'flex',
            flexDirection: 'column',

            ".productMoreItemTitle": {
              fontSize: 16,
              color: token.colorTextDisabled
            },
            ".productMoreItemPrice": {
              fontSize: 28,
              margin: 0
            },
            ".productMoreItemTime": {
              fontSize: 16,
              marginTop: token.marginXS,
            }
          }
        },

        ".productButton": {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          ".productButtonText": {
            fontSize: 16,
            marginBottom: 0,
            color: token.colorWhite
          }
        }
      }
    },

    ".relatedProductWrapper": {
      display: 'flex'
    }
  },
}));
