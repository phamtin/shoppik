'use client'

import React from 'react'
import useStyles from './add-product.style'
import {Button, Form, Input, Space, Typography, Upload, UploadProps, message} from '@shoppik/ui/components/Core';
import Flex from '@shoppik/ui/components/Flex';
import {baseFieldValidation} from '@/Utils/validator/validator';
import {PaperUpload, TickSquare} from 'react-iconly';

const {Dragger} = Upload;
const {Title, Text} = Typography

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const AddProduct = () => {
  const {styles, theme} = useStyles();
  const [form] = Form.useForm<any>();

  const onSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div className={styles.wrapper}>
      <Title className='header' level={1}>New product</Title>
      <div className='body'>
        <div className='leftSection'>
          <Form form={form} layout='vertical' onFinish={onSubmit}>
            <div className='mainInfo'>
              <Flex gap={theme.marginSM} mb={theme.marginXL}>
                <div className='shape' />
                <Title level={3}>Name & description</Title>
              </Flex>
              <Form.Item
                className='inputItem'
                name="title"
                label={<Title level={5}>Title</Title>}
                hasFeedback
                rules={[...baseFieldValidation('Title', true, null, 64)]}
              >
                <Input className='input' />
              </Form.Item>
              <Form.Item
                className='inputItem'
                name="description"
                label={<Title level={5}>Description</Title>}
                hasFeedback
                rules={[...baseFieldValidation('Description', true, null, 64)]}
              >
                <Input className='input' />
              </Form.Item>
            </div>
            <div className='imageInfo'>
              <Flex gap={theme.marginSM} mb={theme.marginXL}>
                <div className='shapeBlue' />
                <Title level={3}>Image & CTA</Title>
              </Flex>
              <div>
                <Title level={5}>Cover Image</Title>
                <Dragger {...props} className='imageUploadArea'>
                  <p className="ant-upload-drag-icon">
                    <PaperUpload />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                  </p>
                </Dragger>
              </div>
            </div>
            <div className='priceInfo'>
              <Flex gap={theme.marginSM} mb={theme.marginXL}>
                <div className='shapePurple' />
                <Title level={3}>Price</Title>
              </Flex>
              <Form.Item
                className='inputItem'
                name="title"
                label={<Title level={5}>Amount</Title>}
                hasFeedback
                rules={[...baseFieldValidation('Title', true, null, 64)]}
              >
                <Input className='input' prefix="$" />
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className='rightSection'>
          <Flex gap={theme.marginSM} mb={theme.marginXL}>
            <div className='shape' />
            <Title level={3}>Preview</Title>
          </Flex>
        </div>
      </div>
      <div className='submitArea'>
        <Flex justifyContent="space-between">
          <Flex gap={theme.marginSM}>
            <TickSquare />
            <Text>Last saved Oct 4, 2021 - 23:32</Text>
          </Flex>
          <Flex gap={theme.marginSM}>
            <Button size="large">Save Draft</Button>
            <Button size="large" type="primary">Publish now</Button>
          </Flex>
        </Flex>
      </div>
    </div>
  )
}

export default AddProduct