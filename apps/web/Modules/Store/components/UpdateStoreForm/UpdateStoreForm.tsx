'use client'

import { Store } from '@shoppik/schema'
import { Button, Form, Input, Typography, message } from '@shoppik/ui/components/Core'
import Flex from '@shoppik/ui/components/Flex'
import React, { useEffect } from 'react';
import useStyles from './UpdateStoreForm.style'
import { trpc } from '@/lib/trpc/trpc';
import { baseFieldValidation } from '@/Utils/validator/validator';

interface UpdateStoreFormProps {
  onTurnOffUpdateModal: () => void;
}

const UpdateStoreForm = ({ onTurnOffUpdateModal }: UpdateStoreFormProps) => {
  const { theme, styles } = useStyles();
  const utils = trpc.useContext();

  const [form] = Form.useForm<Store>();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    mutate: mutateUpdateStore,
    isSuccess: isSuccessUpdateStore,
    isLoading: isLoadingUpdateStore,
    error: errorUpdateStore,
  } = trpc.store.updateStoreProfile.useMutation();

  const { data: dataGetMyStore } = trpc.store.getMyStore.useQuery();

  useEffect(() => {
    if (!dataGetMyStore) return;
    form.setFieldsValue(dataGetMyStore.data || {});
  }, [dataGetMyStore]);

  const onSubmit = (values: any) => {
    if (!values || values.type === 'click') return;

    const {
      tradeName = '',
      youtubeLink = '',
      facebookLink = '',
      instagramLink = '',
      landingPageUrl = '',
    } = values;

    mutateUpdateStore({
      tradeName,
      landingPageUrl,
      contact: {
        youtubeLink,
        facebookLink,
        instagramLink,
      }
    });
  }

  useEffect(() => {
    if (isSuccessUpdateStore) {
      messageApi.open({
        type: 'success',
        content: 'Register store successfully!',
      });
      onTurnOffUpdateModal();
      utils.store.getMyStore.invalidate();
    } else if (errorUpdateStore?.message) {
      messageApi.open({
        type: 'error',
        content: errorUpdateStore.message,
      });
    }
  }, [isSuccessUpdateStore, errorUpdateStore]);

  return (
    <>
      {contextHolder}
      <div className={styles.wrapper}>
        <Typography.Title level={3}>Update Infomation</Typography.Title>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="tradeName"
            label="Trade Name"
          >
            <Input />
          </Form.Item>
          <Flex gap={theme.marginSM}>
            <Form.Item
              className="block"
              name="landingPageUrl"
              label="Website URL"
              rules={[...baseFieldValidation('Website URL', false, null, 64)]}
            >
              <Input addonBefore="https://" />
            </Form.Item>
            <Form.Item
              className="block"
              name="contact.facebookLink"
              label="Facebook Link"
              rules={[...baseFieldValidation('Facebook Link', false, null, 64)]}
            >
              <Input addonBefore="https://" />
            </Form.Item>
          </Flex>
          <Flex gap={theme.marginSM}>
            <Form.Item
              className="block"
              name="contact.instagramLink"
              label="Instagram Link"
              rules={[...baseFieldValidation('Instagram Link', false, null, 64)]}
            >
              <Input addonBefore="https://" />
            </Form.Item>
            <Form.Item
              className="block"
              name="contact.youtubeLink"
              label="Youtube Link"
              rules={[...baseFieldValidation('Youtube Link', false, null, 64)]}
            >
              <Input addonBefore="https://" />
            </Form.Item>
          </Flex>
          <Flex>
            <Button
              type="primary"
              htmlType="submit"
              className="block"
              loading={isLoadingUpdateStore}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Flex>
        </Form>
      </div>
    </>
  )
}

export default UpdateStoreForm