import { useState } from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
	Button,
	Dropdown,
	MenuProps,
	Modal,
	Space,
	Typography,
	message,
} from '@shoppik/ui/components/Core';

import useStyle from './signin-modal';
import { MENU_KEYS } from '../../auth';
import { Buy, Logout, Password, User } from 'react-iconly';

const { Title, Text } = Typography;

interface SigninModalProps {
	session: Session | null;
}

const SigninModal = ({ session }: SigninModalProps) => {
	const { styles } = useStyle();
	const router = useRouter();

	const [open, setOpenModalOpen] = useState(false);
	const [registerModal, setRegisterModal] = useState(false);

	const onHandleSigninGoogle = () => {
		signIn('google');
	};

	const toggleOpen = () => setOpenModalOpen((prev) => !prev);

	const toggleRegisterModal = () => setRegisterModal((prev) => !prev);

	const onClick: MenuProps['onClick'] = ({ key }) => {
		if (key === MENU_KEYS.REGISTER_OWNER) {
			toggleRegisterModal();
			return;
		}
		router.push(`/${key}`);
	};

	const items: MenuProps['items'] = [
		{
			label: (
				<Space>
					<User size="small" style={{ marginTop: 5 }} />
					<Text>&nbsp;Profile </Text>
				</Space>
			),
			key: MENU_KEYS.PROFILE,
		},
		{
			label: (
				<Space>
					<Buy size="small" style={{ marginTop: 5 }} />
					<Text>&nbsp;My Orders </Text>
				</Space>
			),
			key: MENU_KEYS.MY_ORDER,
		},
		{
			label: (
				<Space>
					<Password size="small" style={{ marginTop: 5 }} />
					<Text>&nbsp;Become a owner </Text>
				</Space>
			),
			key: MENU_KEYS.REGISTER_OWNER,
		},
		{
			type: 'divider',
		},
		{
			label: (
				<Space>
					<Logout size="small" style={{ marginTop: 5 }} />
					<Text style={{ color: 'inherit' }}>&nbsp;Log out</Text>
				</Space>
			),
			danger: true,
			key: MENU_KEYS.LOGOUT,
		},
	];

	return (
		<>
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
				width={500}
				centered
				closeIcon={<div />}
				okText={'Register'}
				cancelText={''}
				footer={[]}
			>
				<div className={styles.becomeOwner}>
					<Image
						alt={'register'}
						src={'/images/register_owner.jpg'}
						width={150}
						height={150}
					/>
					<Title level={3}>Welcome to Shoppik</Title>
					<Text className="description">
						To become an owner on Shoppik, you need to provide
						<br /> some basic information
					</Text>
					<Button type="primary" size="large">
						Become an owner
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default SigninModal;
