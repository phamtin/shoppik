import { StarIcon } from '@heroicons/react/24/solid';
import { Button, Col, Divider, Row, Typography } from '@shoppik/ui/components/Core';
import Flex from '@shoppik/ui/components/Flex';
import { GetProductDetailResponse } from 'Router/routers/product.route';
import Image from 'next/image';
import { useState } from 'react';
import useStyles from './product-spotlight.style';

const { Title, Text } = Typography;

interface ProductSpotLightProps {
	product: GetProductDetailResponse;
}

const ProductSpotLight = (props: ProductSpotLightProps) => {
	const { product } = props;
	const { styles, theme } = useStyles(props);

	const [count, setCount] = useState(1);

	const onAdd = () => {
		if (count === product?.quantity) {
			return;
		}
		setCount(count + 1)
	}

	const onRemove = () => {
		if (count === 0) {
			return;
		}
		setCount(count - 1)
	}

	if (!product) return <></>

	return (
		<div className={styles.wrapper}>
			<Row>
				<Col xs={24} lg={10}>
					<div style={{ minHeight: 340 }}>
						<Image
							alt="example"
							src={product.images[0]}
							layout="fill"
							objectFit="cover"
						/>
					</div>
				</Col>

				<Col xs={24} lg={12}>
					<div className="productInfo">
						<Title level={3} className="productName">
							{product.name}
						</Title>
						<Flex>
							<Flex gap={theme.marginXS}>
								<Title level={4}>4.9</Title>
								<Flex>
									<StarIcon width={12} color="#D0011C" />
									<StarIcon width={12} color="#D0011C" />
									<StarIcon width={12} color="#D0011C" />
									<StarIcon width={12} color="#D0011C" />
									<StarIcon width={12} color="#D0011C" />
								</Flex>
							</Flex>
							<Divider type="vertical" />
							<Flex gap={theme.marginXS}>
								<Title level={4}>47</Title>
								<Text>đánh giá</Text>
							</Flex>
							<Divider type="vertical" />
							<Flex gap={theme.marginXS}>
								<Title level={4}>199</Title>
								<Text>đã bán</Text>
							</Flex>
						</Flex>
						<Title>${product.originPrice}</Title>
						{product.variants.filter(variant => variant['v'].length > 0).map((variant) => {
							const parseData = variant['v'].replace(/'/g, "\"");
							const result = JSON.parse(parseData);

							return (
								<Flex gap={theme.marginSM} mb={theme.marginSM}>
									<Title level={5}>{variant['k']}</Title>
									<Flex gap={theme.marginXS}>
										{result.map((item: string) => <Button>{item}</Button>)}
									</Flex>
								</Flex>
							)
						})}
						<Flex gap={theme.marginSM} mb={theme.marginSM}>
							<Title level={5}>Số lượng: </Title>
							<Flex gap={theme.marginXS}>
								<Button onClick={onRemove} disabled={count === 0}>-</Button>
								<Button>{count}</Button>
								<Button onClick={onAdd} disabled={count === product?.quantity}>+</Button>
							</Flex>
							<Text>{product.quantity} sản phẩm sẵn có</Text>
						</Flex>
						<Flex gap={theme.marginSM}>
							<Button type="default">Thêm vào giỏ hàng</Button>
							<Button type="primary">Mua ngay</Button>
						</Flex>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default ProductSpotLight;
