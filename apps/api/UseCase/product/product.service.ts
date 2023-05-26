import { ObjectId } from 'mongodb';
import makeProductRepo from '../../Repository/product.repo';
import systemLog from 'Pkgs/systemLog';

export default function makeProductService() {
	const productRepo = makeProductRepo();

	async function getProducts(price: number) {
		systemLog.info('getProducts - START');
		const products = await productRepo.find({
			price: { $gte: price },
		});

		if (!products.length) {
			const newProduct = await productRepo.create({
				name: 'The first product',
				price: 1200,
				storeId: new ObjectId(),
			});
		}

		systemLog.info('getProducts - SUCCESS');
		return products;
	}

	return Object.freeze({ getProducts });
}
