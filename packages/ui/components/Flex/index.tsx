import { FC, PropsWithChildren, CSSProperties } from "react";

type Props =
  | "center"
  | "flex-end"
  | "flex-start"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "space-revert"
  | "stretch"
  | "end"
  | "start"
  | "left"
  | "right"
  | "unset";

export interface FlexProps extends PropsWithChildren {
  justifyContent?: Props;
  alignitems?: Props;
  textAlignCenter?: Props;
  direction?: "unset" | "revert" | "column";
  m?: "string";
  p?: "string";
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  gap?: number;
}

const Flex: FC<FlexProps> = (props) => {
  const {
    children,
    justifyContent,
    alignitems,
    direction,
    m,
    p,
    mt,
    mr,
    mb,
    ml,
    pt,
    pr,
    pb,
    pl,
    gap,
  } = props;

  const flexStyle: CSSProperties = {
    display: "flex",
    justifyContent: justifyContent,
    alignItems: alignitems ?? "center",
    flexDirection: direction,
  };

  if (m) {
    flexStyle.margin = m;
  }
  if (p) {
    flexStyle.padding = p;
  }
  if (mt) {
    flexStyle.marginTop = mt + "px";
  }
  if (ml) {
    flexStyle.marginLeft = ml + "px";
  }
  if (mr) {
    flexStyle.marginRight = mr + "px";
  }
  if (mb) {
    flexStyle.marginBottom = mb + "px";
  }
  if (pt) {
    flexStyle.paddingTop = pt + "px";
  }
  if (pl) {
    flexStyle.paddingLeft = pl + "px";
  }
  if (pr) {
    flexStyle.paddingRight = pr + "px";
  }
  if (pb) {
    flexStyle.paddingBottom = pb + "px";
  }
  if (gap) {
    flexStyle.gap = gap + "px";
  }

  return <div style={flexStyle}>{children}</div>;
};

Flex.displayName = "Flex";

export default Flex;
