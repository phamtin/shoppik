import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
	Button,
	Dropdown,
	Form,
	Input,
	MenuProps,
	Modal,
	Space,
	Typography,
	message,
} from '@shoppik/ui/components/Core';
import Flex from '@shoppik/ui/components/Flex';

import useStyle from './signin-modal';
import { MENU_KEYS } from '../../auth';
import { Buy, Logout, Password, User } from 'react-iconly';
import { trpc } from '@/lib/trpc/trpc';

const { Title, Text } = Typography;

interface SigninModalProps {
	session: Session | null;
}

interface RegisterForm {
	name: string;
	email: string;
	location: string;
	phone: string;
}

const SigninModal = ({ session }: SigninModalProps) => {
	const { styles } = useStyle();
	const router = useRouter();
	const [form] = Form.useForm<Partial<RegisterForm> | undefined>()
	const values = Form.useWatch([], form);

	const [open, setOpenModalOpen] = useState(false);
	const [registerModal, setRegisterModal] = useState(false);
	const [showRegisForm, setShowRegisForm] = useState(false);
	const [submittable, setSubmittable] = useState(false);

	console.log('formform', values);

	const [messageApi, contextHolder] = message.useMessage();
	const mutation = trpc.store.createStore.useMutation({
		onError: (err) => {
			messageApi.open({
				type: 'error',
				content: err.message,
			});
		},
		onSuccess: (data) => {
			messageApi.open({
				type: 'success',
				content: 'Profile updated successfully',
			});
		},
	});

	useEffect(() => {
		form.validateFields({ validateOnly: true }).then(
			() => {
				setSubmittable(true);
			},
			() => {
				setSubmittable(false);
			},
		);
	}, [values]);

	const onHandleSigninGoogle = () => {
		signIn('google');
	};

	const toggleOpen = () => setOpenModalOpen((prev) => !prev);

	const toggleRegisterModal = () => setRegisterModal((prev) => !prev);

	const onTurnOffRegisterModal = () => {
		setRegisterModal(false);
		setShowRegisForm(false);
	}

	const onSubmit = () => {
		console.log('valuessss', values);
		if (!values?.name || !values?.location) return;
		console.log('valuessss', values);

		mutation.mutate({
			name: values?.name,
			tradeName: 'Kuro',
			storeAddress: values?.location,
			description:
				'A store about acc games',
			avatar:
				'https://robohash.org/98751beeb2b3cb0117a50f800622c37b?set=set4&bgset=bg1&size=200x200',
			landingPageUrl: 'https://twitter.com',
			contact: {
				phone: values.phone || '',
				email: values.email || '',
				instagramLink: 'kuro.store',
				facebookLink: 'kuro1997',
				youtubeLink: 'kuro.channel',
			},
			tags: ['646fa3cd01d88dcbe54bc1bf', '646fa3cd01d18dcbe54bc0bf'],
		});

	}

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
				<Flex>
					<User size="small" />
					<Text style={{ marginLeft: 10 }}>Profile</Text>
				</Flex>
			),
			key: MENU_KEYS.PROFILE,
		},
		{
			label: (
				<Flex>
					<Buy size="small" />
					<Text style={{ marginLeft: 10 }}>My Orders</Text>
				</Flex>
			),
			key: MENU_KEYS.MY_ORDER,
		},
		{
			label: (
				<Flex>
					<Password size="small" />
					<Text style={{ marginLeft: 10 }}>Become a owner</Text>
				</Flex>
			),
			key: MENU_KEYS.REGISTER_OWNER,
		},
		{
			type: 'divider',
		},
		{
			label: (
				<Flex>
					<Logout size="small" />
					<Text style={{ marginLeft: 10, color: 'inherit' }}>Log out</Text>
				</Flex>
			),
			danger: true,
			key: MENU_KEYS.LOGOUT,
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
				open={open}
				width={400}
				closeIcon={false}
				centered
				onCancel={toggleOpen}
				footer={[]}
				style={{ borderRadius: 20, overflow: 'hidden' }}
			>
				<div className={styles.wrapper}>
					<Image width={56} height={48} alt="logo" src="/images/logo-main.png" />
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
				onCancel={onTurnOffRegisterModal}
				width={500}
				centered
				closeIcon={false}
				okText={'Register'}
				cancelText={''}
				footer={[]}
			>
				{showRegisForm ? (
					<div className={styles.formInfo}>
						<Title level={3}>Shoppik</Title>
						<Text className="description">Register to become an owner</Text>
						<Form form={form} onFinish={onSubmit} layout="vertical">
							<Form.Item name="name" label="Shop Name" rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item name="address" label="Location" rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item name="email" label="Email" rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<div className='buttons'>
								<Button
									size="large"
									type="default"
									htmlType="submit"
									style={{ flex: 1 }}
								>
									Save as draft
								</Button>
								<div style={{ width: 20 }} />
								<Button
									size="large"
									type="primary"
									htmlType="submit"
									style={{ flex: 1 }}
									loading={mutation.isLoading}
									onClick={onSubmit}
								>
									Submit
								</Button>
							</div>
						</Form>
					</div>
				) : (
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
						<Button type="primary" size="large" onClick={() => setShowRegisForm(true)}>
							Become an owner
						</Button>
					</div>
				)}
			</Modal>
		</>
	);
};

export default SigninModal;
