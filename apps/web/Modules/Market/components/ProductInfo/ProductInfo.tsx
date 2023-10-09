import { GetProductDetailResponse } from 'Router/routers/product.route';
import React from 'react'
import useStyles from './product-info.style';
import { Typography } from '@shoppik/ui/components/Core';
import Flex from '@shoppik/ui/components/Flex';
import { CheckIcon } from '@heroicons/react/24/outline';

const { Title, Paragraph, Text } = Typography;

interface ProductInfoProps {
  product: GetProductDetailResponse;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { styles, theme } = useStyles();

  if (!product) return <></>

  return (
    <div className={styles.wrapper}>
      <Title level={4}>Mô tả sản phẩm</Title>
      <Paragraph>{product.description}</Paragraph>
      <Title level={4}>Tính năng nổi bật</Title>
      {product.keyFeatures.map(feature => (
        <Flex gap={theme.marginSM}>
          <CheckIcon width={theme.fontSizeXL} />
          <Text>{feature}</Text>
        </Flex>
      ))}
    </div>
  )
}

export default ProductInfo