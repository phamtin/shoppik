import { useState } from 'react';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

export type OS = 'macos' | 'ios' | 'windows' | 'android' | 'linux' | 'ghost';

function getOS(): OS {
	if (typeof window === 'undefined') {
		return 'ghost';
	}
	const { userAgent } = window.navigator;

	const macosPlatforms = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;
	const windowsPlatforms = /(Win32)|(Win64)|(Windows)|(WinCE)/i;
	const iosPlatforms = /(iPhone)|(iPad)|(iPod)/i;

	if (macosPlatforms.test(userAgent)) {
		return 'macos';
	}
	if (iosPlatforms.test(userAgent)) {
		return 'ios';
	}
	if (windowsPlatforms.test(userAgent)) {
		return 'windows';
	}
	if (/Android/i.test(userAgent)) {
		return 'android';
	}
	if (/Linux/i.test(userAgent)) {
		return 'linux';
	}

	return 'ghost';
}

interface UseOsOptions {
	getValueInEffect: boolean;
}

export function useOs(options: UseOsOptions = { getValueInEffect: true }): OS {
	const [value, setValue] = useState<OS>(options.getValueInEffect ? 'ghost' : getOS());

	useIsomorphicEffect(() => {
		if (options.getValueInEffect) {
			setValue(getOS);
		}
	}, []);

	return value;
}
