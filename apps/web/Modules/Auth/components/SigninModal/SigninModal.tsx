import { useState } from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';

import { Button, Modal, Typography } from '@shoppik/ui/components/Core';

import useStyle from './signin-modal';

interface SigninModalProps {
	session: Session | null;
}

const SigninModal = ({ session }: SigninModalProps) => {
	const { styles } = useStyle();

	const [open, setOpenModalOpen] = useState(false);

	const onHandleSigninGoogle = () => {
		signIn('google').then((res) => console.log(res));
	};

	const toggleOpen = () => setOpenModalOpen((prev) => !prev);

	return (
		<>
			<div>
				{session?.user?.email ? (
					<div style={{ marginTop: 27 }}>
						<Image
							alt="authenticated profile image"
							height={36}
							width={36}
							src={session.user.image as string}
						/>
					</div>
				) : (
					<Button type="link" onClick={toggleOpen}>
						Sign in
					</Button>
				)}
			</div>
			<Modal
				open={open}
				width={400}
				closeIcon={<div />}
				centered
				onCancel={toggleOpen}
				footer={[]}
				style={{ borderRadius: 20, overflow: 'hidden' }}
			>
				<div className={styles.wrapper}>
					<Image width={56} height={47} alt="logo" src="/images/logo-main.png" />
					<Typography.Title level={3}>Welcome back, Shoppiker</Typography.Title>
					<Typography.Text>
						Signin to join the community of designer, seller, and steal their fucking
						ideas.
					</Typography.Text>
					<Button
						style={{ width: 336 }}
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
