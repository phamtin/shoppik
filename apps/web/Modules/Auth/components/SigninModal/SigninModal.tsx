import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

import { Button, Modal, Typography } from 'ui/components/Core';

import { Session } from 'next-auth';
import useStyle from './signin-modal';

interface SigninModalProps {
	session: Session | null;
}

const SigninModal = ({ session }: SigninModalProps) => {
	const { styles } = useStyle();

	const [open, setOpenModalOpen] = useState(false);

	const onHandleSigninGoogle = () => {
		signIn('google').then((r) => {
			console.log('Signin google res', r);
		});
	};

	const toggleOpen = () => setOpenModalOpen((prev) => !prev);

	return (
		<>
			<div>
				<Button type="link" onClick={toggleOpen}>
					{session?.user?.email ? 'Profile' : 'Sign in'}
				</Button>
			</div>
			<Modal open={open} width={480} centered onCancel={toggleOpen} footer={[]}>
				<div className={styles.wrapper}>
					<Image width={72} height={60} alt="logo" src="/images/logo-main.png" />
					<Typography.Title level={4}>Welcome back, Shoppiker</Typography.Title>
					<Typography.Text>
						Signin to join the community of designer, seller,..
					</Typography.Text>
					<Button
						style={{ width: 410 }}
						danger
						size="large"
						onClick={onHandleSigninGoogle}
					>
						Signin with Google
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default SigninModal;
