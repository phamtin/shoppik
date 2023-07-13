import { useState } from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';

import { Button, Dropdown, MenuProps, Modal, Space, Typography, message } from '@shoppik/ui/components/Core';

import useStyle from './signin-modal';
import { useRouter } from 'next/navigation';

interface SigninModalProps {
	session: Session | null;
}

const SigninModal = ({ session }: SigninModalProps) => {
	const { styles } = useStyle();
	const router = useRouter();

	const [open, setOpenModalOpen] = useState(false);

	const onHandleSigninGoogle = () => {
		signIn('google').then((res) => console.log(res));
	};

	const toggleOpen = () => setOpenModalOpen((prev) => !prev);

	const onClick: MenuProps['onClick'] = ({ key }) => {
		router.push(`/${key}`)
	};

	const items: MenuProps['items'] = [
		{
			label: 'Profile',
			key: 'profile',
		},
		{
			label: 'My Order',
			key: 'my-order',
		}
	];

	return (
		<>
			<div>
				{session?.user?.email ? (
					<div style={{ marginTop: 27 }}>
						<Dropdown menu={{ items, onClick }}>
							<a onClick={(e) => e.preventDefault()}>
								<Space>
									<Image
										alt="authenticated profile image"
										height={36}
										width={36}
										className="avaImg"
										style={{ borderRadius: 18, cursor: 'pointer' }}
										src={session.user.image as string}
									/>
								</Space>
							</a>
						</Dropdown>
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
