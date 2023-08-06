import { StoreWithRelations } from '@shoppik/schema';
import { Button, Form, Input, Typography, message } from '@shoppik/ui/components/Core';
import Flex from '@shoppik/ui/components/Flex';
import React, { useEffect } from 'react';
import useStyles from './UpdateStoreForm.style';
import { trpc } from '@/lib/trpc/trpc';
import { baseFieldValidation } from '@/Utils/validator/validator';
import { Delete } from 'react-iconly';

interface UpdateStoreFormProps {
	onTurnOffUpdateModal: () => void;
}

const UpdateStoreForm = ({ onTurnOffUpdateModal }: UpdateStoreFormProps) => {
	const { theme, styles } = useStyles();
	const trpcStore = trpc.useContext().store;

	const [form] = Form.useForm<StoreWithRelations>();
	const [messageApi, contextHolder] = message.useMessage();

	const { data: dataGetMyStore } = trpc.store.getMyStore.useQuery();

	const { mutate: mutateUpdateStore, isLoading: isLoadingUpdateStore } =
		trpc.store.updateStoreProfile.useMutation({
			onSuccess() {
				messageApi.open({
					type: 'success',
					content: 'Register store successfully!',
				});
				onTurnOffUpdateModal();
				trpcStore.getMyStore.invalidate();
			},
			onError(err) {
				messageApi.open({ type: 'error', content: err.message });
			},
		});

	useEffect(() => {
		if (!dataGetMyStore) return;
		form.setFieldsValue(dataGetMyStore.data || {});
	}, [dataGetMyStore]);

	const onSubmit = (values: StoreWithRelations) => {
		const { name, tradeName = '', landingPageUrl = '', contact } = values;
		mutateUpdateStore({ name, tradeName, landingPageUrl, contact });
	};

	return (
		<>
			{contextHolder}
			<div className={styles.wrapper}>
				<Typography.Title level={3}>Update Infomation</Typography.Title>
				<Form form={form} layout="vertical" onFinish={onSubmit}>
					<Form.Item
						name="name"
						label="Name"
						rules={[...baseFieldValidation('Name', false, null, 128)]}
					>
						<Input size="large" />
					</Form.Item>
					<Form.Item
						name="tradeName"
						label="Trade Name"
						rules={[...baseFieldValidation('Website URL', false, null, 128)]}
					>
						<Input size="large" />
					</Form.Item>
					<Form.List name={['contact', 'phone']}>
						{(fields, { add, remove }, { errors }) => (
							<>
								{fields.map((field, index) => (
									<Form.Item
										label={index === 0 ? 'Phone Number' : ''}
										hasFeedback
										required={false}
										key={field.key}
									>
										<Form.Item
											{...field}
											noStyle
											className="block"
											hasFeedback
											rules={[...baseFieldValidation('Phone Number', true, 1, 16)]}
										>
											<Input
												size="large"
												addonBefore="+84"
												style={{
													width: fields.length > 1 ? '95%' : '100%',
												}}
											/>
										</Form.Item>
										{fields.length > 1 ? (
											<Button
												size="small"
												danger
												type="link"
												icon={
													<Delete
														set="broken"
														size="small"
														style={{ marginTop: theme.marginSM }}
													/>
												}
												onClick={() => remove(field.name)}
											/>
										) : null}
									</Form.Item>
								))}
								{fields.length <= 2 && (
									<Form.Item noStyle>
										<Button block type="dashed" onClick={() => add()}>
											Add number
										</Button>
										<Form.ErrorList errors={errors} />
									</Form.Item>
								)}
							</>
						)}
					</Form.List>
					<Flex gap={theme.marginSM}>
						<Form.Item
							className="block"
							name="landingPageUrl"
							label="Website URL"
							rules={[...baseFieldValidation('Website URL', false, null, 64)]}
						>
							<Input size="large" addonBefore="https://" />
						</Form.Item>
						<Form.Item
							className="block"
							name={['contact', 'facebookLink']}
							label="Facebook Link"
							rules={[...baseFieldValidation('Facebook Link', false, null, 64)]}
						>
							<Input size="large" addonBefore="https://" />
						</Form.Item>
					</Flex>
					<Flex gap={theme.marginSM}>
						<Form.Item
							className="block"
							name={['contact', 'instagramLink']}
							label="Instagram Link"
							rules={[...baseFieldValidation('Instagram Link', false, null, 64)]}
						>
							<Input size="large" addonBefore="https://" />
						</Form.Item>
						<Form.Item
							className="block"
							name={['contact', 'youtubeLink']}
							label="Youtube Link"
							rules={[...baseFieldValidation('Youtube Link', false, null, 64)]}
						>
							<Input size="large" addonBefore="https://" />
						</Form.Item>
					</Flex>
					<br />
					<Flex>
						<Button
							size="large"
							type="primary"
							htmlType="submit"
							className="block"
							loading={isLoadingUpdateStore}
						>
							Submit
						</Button>
					</Flex>
				</Form>
			</div>
		</>
	);
};

export default UpdateStoreForm;
