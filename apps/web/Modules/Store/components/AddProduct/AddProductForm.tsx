import { Form, FormInstance } from '@shoppik/ui/components/Core';
import AddProductName from './AddProductName/AddProductName';
import AddProductDetail from './AddProductDetail/AddProductDetail';
import AddProductCategory from './AddProductCategory/AddProductCategory';
import AddProductPrice from './AddProductPrice/AddProductPrice';
import { trpc } from '@/lib/trpc/trpc';

interface AddProductProps {
	form: FormInstance;
	onSubmit: (values: any) => void;
}

const AddProducts = (props: AddProductProps) => {
	const { form, onSubmit } = props;

	const queryGetShoppikCategory = trpc.product.getShoppikCategory.useQuery();

	const initialValues = {
		name: '',
		description: '',
		images: [''],

		keyFeatures: [''],
		detail: [{ k: '', v: '', u: '' }],
		variants: [{ k: '', v: '', u: '' }],

		shoppikCategories: [''],
		storeCategories: [{ name: '', slug: '' }],
		originPrice: 0,
		quantity: 1,
		isDraft: false,
	};

	return (
		<div className="leftSection">
			<Form
				id="form-add-product"
				{...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
				form={form}
				initialValues={initialValues}
				layout="horizontal"
				onFinish={onSubmit}
			>
				<AddProductName />

				<AddProductDetail form={form} />

				<AddProductCategory form={form} shoppikCategory={queryGetShoppikCategory.data} />

				<AddProductPrice />
			</Form>
		</div>
	);
};

export default AddProducts;
