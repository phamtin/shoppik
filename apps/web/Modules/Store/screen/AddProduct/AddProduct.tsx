'use client';

import React from 'react';
import { trpc } from '@/lib/trpc/trpc';
import Flex from '@shoppik/ui/components/Flex';
import { ProductWithRelations } from '@shoppik/schema';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { transformToAttributePattern } from '@/Helper/transform';
import { Button, Form, Typography, message } from '@shoppik/ui/components/Core';

import ProductAddTitle from '../../components/ProductAddTitle/ProductAddTitle';
import AddProductForm from '../../components/AddProduct/AddProductForm';
import useStyles from './add-product.style';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

const AddProduct = () => {
	const { styles, theme } = useStyles();
	const [form] = Form.useForm<any>();
	const [messageApi, contextHolder] = message.useMessage();
	const router = useRouter();

	const mutationCreateProduct = trpc.product.createProduct.useMutation({
		onSuccess() {
			messageApi.open({
				type: 'success',
				content: 'Product created successfully',
			});
			router.push('/my-store/overview')
		},
		onError(e) {
			messageApi.open({ type: 'error', content: e.message });
		},
	});

	const onSubmit = (values: Partial<ProductWithRelations>) => {
		if (!values) return;

		mutationCreateProduct.mutate({
			name: values.name ?? '',
			description: values.description,
			images: values.images ?? [],
			keyFeatures: values.keyFeatures ?? [],
			variants: transformToAttributePattern(values.variants),
			detail: transformToAttributePattern(values.detail),
			shoppikCategories: values.shoppikCategories ?? [],
			storeCategories: [
				{ id: '64c549d101aaa5c06958e6ec', name: 'category1', slug: 'category1' }, //	not yet implemented
			],
			quantity: values.quantity ?? 1,
			originPrice: values.originPrice ?? 1,
			isDraft: values.isDraft ?? false,
		});
	};

	return (
		<>
			{contextHolder}
			<div className={styles.wrapper}>
				<Title className="header" level={4}>
					Create new product
					<br />
					<Text className="sub">
						Add new product in store, or you can add to a campaign, promotion later.
					</Text>
				</Title>

				<div className="body">
					<AddProductForm form={form} onSubmit={onSubmit} />

					<div className="rightSection">
						<ProductAddTitle title="Overview" shapeColor="#ff5555" />
					</div>
				</div>

				<div className="submitArea">
					<Flex justifyContent="space-between">
						<Flex gap={theme.marginXS}>
							<CheckCircleIcon width={24} />
							<Text>Last saved Oct 4, 2021 - 23:32</Text>
						</Flex>
						<Flex gap={theme.marginSM}>
							<Button size="large">Save as draft</Button>
							<Button
								size="large"
								type="primary"
								htmlType="submit"
								form="form-add-product"
								loading={mutationCreateProduct.isLoading}
							>
								Publish now
							</Button>
						</Flex>
					</Flex>
				</div>
			</div>
		</>
	);
};

export default AddProduct;
