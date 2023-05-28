import { Table, TableProps } from 'ui/components/Core';
import { columnsTabOverview } from '../../constant/store.constant';
import useStyle from './overview-tab.style';

const dataOverviewTab = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
];

const OverviewTab = () => {
	const { styles } = useStyle();

	const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	return (
		<div className={styles.wrapper}>
			<Table
				bordered
				columns={columnsTabOverview}
				dataSource={dataOverviewTab}
				onChange={onChange}
			/>
		</div>
	);
};

export default OverviewTab;
