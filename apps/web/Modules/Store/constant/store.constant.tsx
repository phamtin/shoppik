import { TableColumnsType } from '@shoppik/ui/components/Core';

export const columnsTabOverview: TableColumnsType<any> = [
	{
		title: 'Name',
		dataIndex: 'name',
		filters: [
			{
				text: 'Joe',
				value: 'Joe',
			},
			{
				text: 'Category 1',
				value: 'Category 1',
			},
			{
				text: 'Category 2',
				value: 'Category 2',
			},
		],
		filterMode: 'tree',
		width: '30%',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: 'Address',
		dataIndex: 'address',
		filters: [
			{
				text: 'London',
				value: 'London',
			},
			{
				text: 'New York',
				value: 'New York',
			},
		],
		width: '40%',
	},
];

export const floatActions = [
	{
		title: 'Create new campaign',
	},
	{
		title: 'Create new Products',
	},
	{
		title: 'Make a Flash sale',
	},
	{
		title: 'Moneitize from Partners',
	},
];
