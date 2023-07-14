import { useState } from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';

import { Button, Dropdown, MenuProps, Modal, Space, Typography, message } from '@shoppik/ui/components/Core';

import useStyle from './signin-modal';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography

interface SigninModalProps {
	session: Session | null;
}

const MENU_KEYS = {
	PROFILE: 'profile',
	MY_ORDER: 'my-order',
	REGISTER_OWNER: 'owner'
}

const SigninModal = ({ session }: SigninModalProps) => {
	const { styles } = useStyle();
	const router = useRouter();

	const [open, setOpenModalOpen] = useState(false);
	const [registerModal, setRegisterModal] = useState(false);

	const onHandleSigninGoogle = () => {
		signIn('google').then((res) => console.log(res));
	};

	const toggleOpen = () => setOpenModalOpen((prev) => !prev);
	const toggleRegisterModal = () => setRegisterModal((prev) => !prev);

	const onClick: MenuProps['onClick'] = ({ key }) => {
		if (key === MENU_KEYS.REGISTER_OWNER) {
			toggleRegisterModal();
			return;
		}
		router.push(`/${key}`)
	};

	const items: MenuProps['items'] = [
		{
			label: 'Profile',
			key: MENU_KEYS.PROFILE,
		},
		{
			label: 'My Order',
			key: MENU_KEYS.MY_ORDER,
		},
		{
			label: 'Become an owner',
			key: MENU_KEYS.REGISTER_OWNER,
			danger: true
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
					<Title level={3}>Welcome back, Shoppiker</Title>
					<Text>
						Signin to join the community of designer, seller, and steal their fucking
						ideas.
					</Text>
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
			<Modal
				open={registerModal}
				onOk={toggleRegisterModal}
				onCancel={toggleRegisterModal}
				width={800}
				okText={"Register"}
				cancelText={""}
				footer={[]}
			>
				<div className={styles.wrapper}>
					<Image alt={"register"} src={"/images/register_owner.jpg"} width={264} height={264} style={{ alignSelf: 'center' }} />
					<Title>Welcome to Shoppik</Title>
					<Text>To become an owner on Shoppik, you need to provide some basic information</Text>
					<Button key="submit" type="primary" size="large">Register</Button>
				</div>
			</Modal>
		</>
	);
};

export default SigninModal;
