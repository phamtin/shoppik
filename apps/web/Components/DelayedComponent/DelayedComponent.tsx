'use client';

import { useState, useEffect, PropsWithChildren } from 'react';

interface Prop extends PropsWithChildren {
	waitBeforeShow?: number;
}
const DelayedComponent = ({ children, waitBeforeShow = 300 }: Prop) => {
	const [isShown, setIsShown] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsShown(true);
		}, waitBeforeShow);
		return () => clearTimeout(timer);
	}, [waitBeforeShow]);

	return isShown ? children : null;
};

export default DelayedComponent;
