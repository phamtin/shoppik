import { createStyles } from "antd-style";

const styles = createStyles(({ token }) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    height: 60,
    padding: "0 16px",
    backgroundColor: token.colorBgBase,
    boxShadow: `1px 2px 8px ${token.colorBorder}`,
  },
}));

export default styles;
