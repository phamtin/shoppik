import { Typography } from "ui/components/Core";
import Image from "next/image";

export default () => (
  <div style={{ marginLeft: "-60px" }}>
    <Image alt="empty" width={120} height={100} src="/images/empty.png" />
    <br />
    <Typography.Text style={{ color: "#b1b1b1" }}>
      &nbsp;No data
    </Typography.Text>
  </div>
);
