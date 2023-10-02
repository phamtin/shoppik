'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import removeAuthCookie from '../action';
import AppError from '@/Utils/common/error';
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';
import { Maybe, TRPCError } from '@trpc/server';
import { DefaultErrorData } from '@trpc/server/dist/error/formatter';

interface ErrorStateProps {
	error:
		| {
				code: string;
		  }
		| null
		| undefined;
}

const GlobalError: React.FC<ErrorStateProps> = ({ error }: ErrorStateProps) => {
	console.log(error);
	const router = useRouter();
	const { update } = useSession();

	if (error?.code === 'UNAUTHORIZED') {
		update(null);
		removeAuthCookie();
		router.replace('/');
	}

	return <></>;
};

export default GlobalError;

export const handleToastTrpcError = (error: Maybe<DefaultErrorData>, cbToast?: any) => {
	if (cbToast && error) {
		cbToast.open({ type: 'error', content: AppError[error.code] });

		setTimeout(() => {
			if (error?.code === 'UNAUTHORIZED') {
				removeAuthCookie();
				window.location.href = '/';
			}
		}, 2500);
		return <></>;
	}

	if (error?.code === 'UNAUTHORIZED') {
		removeAuthCookie();
		window.location.href = '/';
	}
	return <></>;
};
