'use client'

import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import useStyle from './ProfileOverview.style';
import Image from 'next/image';
import { Button, Divider, Form, Input, Typography } from '@shoppik/ui/components/Core';
import Link from 'next/link';

const { Title, Text } = Typography

interface ListInfoProps {
  key: number;
  title: string;
}

const LIST_INFO: ListInfoProps[] = [
  {
    key: 0,
    title: 'Personal Information'
  },
  {
    key: 1,
    title: 'My Order'
  },
  {
    key: 2,
    title: 'Notification'
  },
  {
    key: 3,
    title: 'Settings'
  },
]

const Profile = () => {
  const { data: session } = useSession();
  const { styles } = useStyle()
  const [selectedSide, setSelectedSide] = useState(LIST_INFO[0].key)

  const onChangeTab = (index: number) => () => {
    setSelectedSide(index)
  }

  return (
    <div className={styles.wrapper}>
      <div className="leftSide">
        {LIST_INFO.map(((item, index) => {
          return (
            <a onClick={onChangeTab(index)} className='leftSideSection'>
              {selectedSide === index && <Divider type="vertical" className="leftSideDivider" />}
              <Title level={4} className="leftSideTitle">{item.title}</Title>
            </a>
          )
        }))}
      </div>
      <div className="rightSide">
        <div className="block">
          <div className="leftBlock">
            <Title />
          </div>
          <Image
            alt="authenticated profile image"
            height={56}
            width={56}
            className="avaImg"
            src={session && session.user ? session?.user.image as string : ''}
          />
          <Button type="primary" size="large" className="deleteBtn">Delete</Button>
          <Button type="default" size="large" className="uploadBtn">Upload</Button>
        </div>
        <Divider />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          labelAlign="left"
          autoComplete="off"
        >
          <Form.Item
            label={<Typography.Title level={5}>User name</Typography.Title>}
            name="username"
            colon={false}
            style={{ maxWidth: 600 }} rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input required size='large' placeholder="Thai" />
          </Form.Item>
          <Divider />
          <Form.Item
            label={<Typography.Title level={5}>User surname</Typography.Title>}
            name="password"
            colon={false}
            style={{ maxWidth: 600 }}>
            <Input size='large' placeholder="Nguyen Xuan" />
          </Form.Item>
          <Divider />
          <Form.Item
            label={<Typography.Title level={5}>Email</Typography.Title>}
            name="username"
            colon={false}
            style={{ maxWidth: 600 }}
          >
            <Input size='large' placeholder="nguyenxuanthai7@gmail.com" />
          </Form.Item>
          <Divider />
          <Form.Item
            label={<Typography.Title level={5}>Phone Number</Typography.Title>}
            name="username"
            colon={false}
            style={{ maxWidth: 600 }}
          >
            <Input size='large' placeholder="0706232632" />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Profile