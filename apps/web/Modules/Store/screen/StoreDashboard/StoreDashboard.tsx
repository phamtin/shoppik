'use client';

import { PropsWithChildren, memo, useEffect, useState } from 'react';
import { Table, TableColumnsType, Tag, Typography } from '@shoppik/ui/components/Core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductAction from '../../components/ProductAction/ProductAction';
import { trpc } from '@/lib/trpc/trpc';

const { Text, Title } = Typography;

interface MarketProp extends PropsWithChildren {
  store: string;
}

interface ProductInfo {
  name: string;
  image: string;
  id: string;
}

type ProductStatus = 'Active' | 'Deactive';

interface DataType {
  key: React.Key;
  product: ProductInfo;
  status: ProductStatus;
  price: number;
  action?: any;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Product',
    dataIndex: 'product',
    render: (product: ProductInfo) => (
      <div style={{ display: "flex", alignItems: 'center' }}>
        <Image src={product.image} alt={product.image} width={80} height={80} style={{ marginRight: 20 }} />
        <Text style={{ margin: 0 }}>{product.name}</Text>
      </div>
    )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: ProductStatus) => (
      <Tag color={status === 'Deactive' ? '#FF6954' : "#83BE6E"} style={{ fontSize: 14 }}>{status}</Tag>
    )
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (price: number) => <Title level={4}>${price}</Title>
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: () => <ProductAction />
  }
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //   name: record.name,
  // }),
};

const StoreDashboardScreen = ({ store }: MarketProp) => {
  const { data: products } = trpc.product.getStoreProducts.useQuery({});
  console.log('products', products);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const mappedData = products.map((product) => ({
        ...product,
        key: product.id,
        product: {
          name: product.name,
          image: product.images[0],
          id: product.id
        },
        status: 'active',
        price: product.originPrice,
      }))
      setData(mappedData)
    }
  }, [products])

  const router = useRouter();

  const onDetail = (productId: string) => {
    router.push(`/market/${productId}`)
  }

  return (
    <Table
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      onRow={(record) => {
        return {
          onClick: () => onDetail(record.product.id)
        };
      }}
      columns={columns}
      dataSource={data}
    />
  );
};



export default memo(StoreDashboardScreen);
