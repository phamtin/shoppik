import { useState } from 'react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
	BriefcaseIcon,
	UserIcon,
	ShoppingCartIcon,
	ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import {
	Button,
	Dropdown,
	MenuProps,
	Modal,
	Space,
	Typography,
} from '@shoppik/ui/components/Core';

import RegisterStoreContent from '@/Modules/Store/components/RegisterStoreContent/RegisterStoreContent';
import RegisterStoreForm from '@/Modules/Store/components/RegisterStoreForm/RegisterStoreForm';
import { MENU_KEYS } from '../../auth';
import useStyle from './signin-modal';

const { Title, Text } = Typography;

interface SigninModalProps {
	session: Session | null;
}

const SigninModal = ({ session }: SigninModalProps) => {
	const { styles } = useStyle();
	const router = useRouter();

	const [open, setOpenModalOpen] = useState(false);
	const [registerModal, setRegisterModal] = useState(false);
	const [showRegisForm, setShowRegisForm] = useState(false);

	const onHandleSigninGoogle = () => {
		signIn('google');
	};

	const toggleOpen = () => setOpenModalOpen((prev) => !prev);

	const toggleRegisterModal = () => setRegisterModal((prev) => !prev);
	const toggleShowRegisForm = () => setShowRegisForm((prev) => !prev);

	const onTurnOffRegisterModal = () => {
		setRegisterModal(false);
		setShowRegisForm(false);
	};

	const onClick: MenuProps['onClick'] = ({ key }) => {
		if (key === MENU_KEYS.REGISTER_OWNER) {
			toggleRegisterModal();
			return;
		}
		router.push(`/${key}`);
	};

	const items: MenuProps['items'] = [
		{
			key: MENU_KEYS.PROFILE,
			label: <Text>Profile</Text>,
			icon: <UserIcon width={20} />,
		},
		{
			key: MENU_KEYS.MY_ORDER,
			label: <Text>Shopping cart</Text>,
			icon: <ShoppingCartIcon width={20} />,
		},
		{
			key: MENU_KEYS.REGISTER_OWNER,
			label: <Text>Become a owner</Text>,
			icon: <BriefcaseIcon width={20} />,
		},
		{
			type: 'divider',
		},
		{
			key: MENU_KEYS.LOGOUT,
			label: <Text style={{ color: 'orangered' }}>Log out</Text>,
			icon: <ArrowUturnLeftIcon color="orangered" width={20} />,
		},
	];

	return (
		<>
			{session?.user?.email ? (
				<div style={{ marginTop: 27 }}>
					<Dropdown menu={{ items, onClick }} trigger={['click']}>
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
				transitionName=""
				open={open}
				width={386}
				closeIcon={false}
				centered
				onCancel={toggleOpen}
				footer={[]}
				style={{ borderRadius: 20, overflow: 'hidden' }}
			>
				<div className={styles.wrapper}>
					<Image width={56} height={48} alt="logo" src="/images/logo-main.png" />
					<Title level={4}>Welcome back, Shoppiker</Title>
					<Text>
						Signin to join the community of designer, seller... and steal their fucking
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
				transitionName=""
				maskClosable
				open={registerModal}
				onOk={toggleRegisterModal}
				onCancel={onTurnOffRegisterModal}
				width={showRegisForm ? 600 : 700}
				centered
				closeIcon={false}
				okText={'Register'}
				cancelText={''}
				footer={[]}
			>
				{showRegisForm ? (
					<RegisterStoreForm toggleForm={onTurnOffRegisterModal} />
				) : (
					<RegisterStoreContent onShowForm={toggleShowRegisForm} />
				)}
			</Modal>
		</>
	);
};

export default SigninModal;
