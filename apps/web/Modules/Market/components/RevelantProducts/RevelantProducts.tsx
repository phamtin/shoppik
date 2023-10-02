import useStyles from './revelant-products.style';
import ProductCard from '../ProductCard/ProductCard';

interface RevelantProductsProps {
	title?: string;
}

const RevelantProducts = (props: RevelantProductsProps) => {
	const { styles } = useStyles(props);

	return (
		<div className={styles.wrapper}>
			{/* <ProductCard /> */}
			{/* <ProductCard /> */}
			{/* <ProductCard /> */}
			<ProductCard />
		</div>
	);
};

export default RevelantProducts;
