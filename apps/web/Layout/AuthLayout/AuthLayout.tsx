import { ReactNode, memo } from "react";

type AuthLayoutProps = {
	children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<div className="container">
			<div>{children}</div>
		</div>
	);
};

export default memo(AuthLayout);
