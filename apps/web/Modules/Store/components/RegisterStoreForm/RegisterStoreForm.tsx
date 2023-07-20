import { Store } from '@shoppik/schema';
import { Button, Form, Input, Typography, Upload, message } from '@shoppik/ui/components/Core';
import React, { useEffect } from 'react';

import { Location } from 'react-iconly';
import useStyle from './RegisterStoreForm.style';
import { trpc } from '@/lib/trpc/trpc';
import { baseFieldValidation } from '@/Utils/validator/validator';
import { VALID_EMAIL_REGEX } from '@/Helper/regex';

const { Title, Text } = Typography;

interface RegisterStoreFormProps {
  toggleForm: () => void;
}

const RegisterStoreForm = ({ toggleForm }: RegisterStoreFormProps) => {
  const { styles } = useStyle();
  const [form] = Form.useForm<Store>()
  const [messageApi, contextHolder] = message.useMessage();

  const {
    mutate: mutateRegisStore,
    isSuccess: isSuccessRegisStore,
    isLoading: isLoadingRegisStore,
    error: errorRegisStore,
  } = trpc.store.createStore.useMutation();

  useEffect(() => {
    if (isSuccessRegisStore) {
      messageApi.open({
        type: 'success',
        content: 'Register store successfully!',
      });
      toggleForm?.();
    } else if (errorRegisStore?.message) {
      messageApi.open({
        type: 'error',
        content: errorRegisStore.message,
      });
    }
  }, [isSuccessRegisStore, errorRegisStore]);

  const onSubmit = (values: any) => {
    if (!values || values.type === 'click') return;

    const { name, tradeName, storeAddress, description, landingPageUrl, email, phone } = values;
    mutateRegisStore({
      name,
      tradeName,
      storeAddress,
      description,
      avatar: 'https://res.cloudinary.com/dtizrfvjh/image/upload/v1668920121/qzrteppsiwxoyvbipnhg.jpg',
      landingPageUrl,
      contact: {
        phone,
        email,
        instagramLink: 'kuro.store',
        facebookLink: 'kuro1997',
        youtubeLink: 'kuro.channel',
      },
      tags: ['646fa3cd01d88dcbe54bc1bf', '646fa3cd01d18dcbe54bc0bf'],
    });
  }

  return (
    <>
      {contextHolder}
      <div className={styles.wrapper}>
        <div className='header'>
          <Title level={3}>Shoppik</Title>
          <Text className="description">Register to become an owner</Text>
        </div>
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item name="name" label="Shop Name" rules={[...baseFieldValidation('Shop name', true, null, 64)]}>
            <Input />
          </Form.Item>
          <div className='inputRow'>
            <Form.Item className='block' name="tradeName" label="Trade Name" rules={[...baseFieldValidation('Trade name', true, null, 64)]}>
              <Input />
            </Form.Item>
            <div className='spacer' />
            <Form.Item className='block' name="landingPageUrl" label="Website" rules={[...baseFieldValidation('Langing page link', true, null, 64)]}>
              <Input addonBefore="https://" />
            </Form.Item>
          </div>
          <div className='inputRow'>
            <Form.Item className='block' name="email" label="Email" rules={[...baseFieldValidation('Email', true, 2, 128, VALID_EMAIL_REGEX)]}>
              <Input />
            </Form.Item>
            <div className='spacer' />
            <Form.Item className='block' name="phone" label="Phone Number" rules={[...baseFieldValidation('Phone Number', false, 2, 16)]}>
              <Input addonBefore="+84" />
            </Form.Item>
          </div>
          <Form.Item name="storeAddress" label="Store Address" rules={[...baseFieldValidation('Store address', true, 2, 64)]}>
            <Input prefix={<Location />} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[...baseFieldValidation('Description', true, 2, 128)]}>
            <Input.TextArea rows={4} showCount maxLength={128} placeholder="Fill in some description" />
          </Form.Item>
          <Form.Item name="phone" label="Store Avatar">
            <Upload action="/upload.do" listType="picture-card">
              Upload
            </Upload>
          </Form.Item>
          <div className='buttons'>
            <Button
              size="large"
              type="default"
              htmlType="submit"
              className='block'
            >
              Save as draft
            </Button>
            <div className='spacer' />
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className='block'
              loading={isLoadingRegisStore}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default RegisterStoreForm