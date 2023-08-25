import { Tabs, TabsProps } from '@shoppik/ui/components/Core';
import useStyle from './store-main.style';
import OverviewTab from '../OverviewTab/OverviewTab';
import ManageProduct from '../ManageProduct/ManageProduct';

const storeMainNavigation: TabsProps['items'] = [
	{
		key: '1',
		label: `Overview`,
		children: <OverviewTab />,
	},
	{
		key: '2',
		label: `All products`,
		children: <ManageProduct />,
	},
	{
		key: '3',
		label: `Campaigns`,
		children: `Content of Tab Pane Campaigns`,
	},
	{
		key: '4',
		label: `Pricing`,
		children: `Content of Tab Pane Pricing`,
	},
];

export interface StoreMainProps {
	id: string;
}

const StoreMain = ({ id }: StoreMainProps) => {
	const { styles } = useStyle({ id });

	const onChange = (key: string) => {
		return key;
	};

	return (
		<div className={styles.wrapper}>
			<Tabs defaultActiveKey="1" items={storeMainNavigation} onChange={onChange} />
		</div>
	);
};

export default StoreMain;
