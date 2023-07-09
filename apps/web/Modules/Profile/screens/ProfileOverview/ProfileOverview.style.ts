import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
  wrapper: {
    display: 'flex',
    padding: `0 ${token.marginLG}px`,

    '.leftSide': {
      flex: 1,
      borderRight: `1px solid ${token.colorBorderSecondary}`,
      paddingTop: token.marginXXL,
      marginRight: token.marginXL,

      '.leftSideSection': {
        display: 'flex',
        alignItems: 'center',

        '.ant-divider': {
          margin: 0,
          marginRight: token.marginSM,
          padidng: 0
        }
      },
      '.leftSideTitle': {
      }
    },
    '.rightSide': {
      flex: 5,
      'h5.ant-typography': {
        marginBottom: 0,
        marginTop: token.marginXXS
      },

      '.block': {
        marginTop: token.marginXXL,
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${token.marginXL}px`,


        '.avaImg': {
          borderRadius: 28,
          cursor: 'pointer',
          marginRight: token.marginMD
        },
        '.deleteBtn': {
          marginRight: token.marginSM
        },
        '.leftBlock': {
          flex: '0 0 30%'
        },
        '.rightBlock': {
          width: 'max-content'
        }
      }
    }
  },
}));

export default styles;
