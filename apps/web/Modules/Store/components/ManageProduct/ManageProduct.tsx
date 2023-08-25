import { trpc } from '@/lib/trpc/trpc';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Badge, Table, TableColumnsType, Tag } from '@shoppik/ui/components/Core';
import Image from 'next/image';

interface DataType {
  images: string[];
  key: string;
  name: string;
  quantity: string;
  originPrice: string;
  description: string;
  keyFeatures: string[];
  state: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Image',
    dataIndex: 'images',
    key: 'images',
    render: (imageUrl) => <Image alt={imageUrl[0]} src={imageUrl[0]} fill />
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Price',
    dataIndex: 'originPrice',
    key: 'originPrice',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Key features',
    key: 'keyFeatures',
    dataIndex: 'keyFeatures',
    render: (_, { keyFeatures }) => (
      <>
        {keyFeatures.map((tag) => {
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
    title: 'Status',
    key: 'state',
    render: () => <Badge status="success" text="Active" />,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => <a> <EyeIcon /> </a>
  },
];

const ManageProduct = () => {
  const { data: productData } = trpc.product.getStoreProducts.useQuery({
    query: '',
    pagination: { page: 1, pageSize: 20, sort: 'asc', sortBy: 'name' }
  });

  return (
    <div>
      <Table columns={columns} dataSource={productData} />
    </div>
  )
}

export default ManageProduct