'use client';

import {
	Button,
	Popconfirm,
	Space,
	Table,
	TableColumnsType,
	Tag,
} from 'ui/components/Core';

const HomePage = () => {
	interface DataType {
		key: string;
		name: string;
		age: number;
		address: string;
		tags: string[];
	}

	const columns: TableColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => <a href="/">{text}</a>,
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			render: (_, { tags }) => (
				<>
					{tags.map((tag) => {
						let color = tag.length > 5 ? 'geekblue' : 'green';
						if (tag === 'loser') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<a href="/">Invite {record.name}</a>
					<a href="/">Delete</a>
				</Space>
			),
		},
	];

	const data: DataType[] = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			tags: ['nice', 'developer'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			tags: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
	];

	return (
		<div>
			<Popconfirm
				title="Delete the task"
				description="Are you sure to delete this task?"
				onConfirm={() => false}
				onCancel={() => false}
				okText="Yes"
				cancelText="No"
			>
				<Button danger type="text">
					Remove
				</Button>
			</Popconfirm>
			<div style={{ margin: 20 }}>
				<Table columns={columns} dataSource={data} />
			</div>
		</div>
	);
};

export default HomePage;
