import { Typography } from '@shoppik/ui/components/Core'
import Flex from '@shoppik/ui/components/Flex'
import React from 'react'
import useStyles from './ProductAddTitle.style'

const { Title } = Typography;

interface ProductAddTitleProps {
  title: string;
  shapeColor: string;
}

const ProductAddTitle = ({ title, shapeColor }: ProductAddTitleProps) => {
  const { styles, theme } = useStyles()

  return (
    <Flex gap={theme.marginSM} mb={theme.marginXL}>
      <div style={{
        height: 32,
        width: 16,
        backgroundColor: shapeColor,
        borderRadius: theme.borderRadiusXS
      }} />
      <Title level={3} style={{ marginBottom: 0 }}>{title}</Title>
    </Flex>
  )
}

export default ProductAddTitle