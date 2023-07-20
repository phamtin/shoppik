import React from 'react'
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
      <Button type="primary" size="large" onClick={onShowForm}>
        Become an owner
      </Button>
    </div>
  )
}

export default RegisterStoreContent