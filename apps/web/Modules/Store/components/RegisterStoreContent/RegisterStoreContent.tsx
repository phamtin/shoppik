import React from 'react';
import useStyles from './RegisterStoreContent.style';
import Image from 'next/image';
import { Button, Typography } from '@shoppik/ui/components/Core';

const { Title, Text } = Typography;

interface RegisterStoreContentProps {
	onShowForm: () => void;
}

const RegisterStoreContent = ({ onShowForm }: RegisterStoreContentProps) => {
	const { styles } = useStyles();

	return (
		<div className={styles.becomeOwner}>
			<div className={styles.leftBlock}>
				<div>
					<Image alt="logo main" width={44} height={38} src="/images/logo-main.png" />
				</div>
				<div className="content">
					<Title level={4}>Welcome </Title>
					<Title level={2}>
						to <span>Shoppik</span>
					</Title>
					<Text className="description">
						To become an owner on Shoppik, you need to provide some basic information
					</Text>
					<br />
					<br />
					<Button type="primary" onClick={onShowForm}>
						Become an owner
					</Button>
				</div>
				<Text className="copyright">Shoppik copyright@2024</Text>
			</div>
			<div className={styles.rightBlock}>
				<div className="imageWrapper">
					<Image
						alt={'register'}
						src={'/images/become-owner.jpeg'}
						width={336}
						height={477}
					/>
				</div>
			</div>
		</div>
	);
};

export default RegisterStoreContent;
