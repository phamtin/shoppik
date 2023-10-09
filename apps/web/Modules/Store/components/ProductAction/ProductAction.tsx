import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Dropdown, MenuProps, Typography } from "@shoppik/ui/components/Core";
import { useRouter } from "next/navigation";

const PRODUCT_ACTION_KEYS = {
  EDIT: 'edit',
  DELETE: 'delete',
};

const { Text } = Typography;

const ProductAction = () => {
  const router = useRouter();

  const items: MenuProps['items'] = [
    {
      label: (
        <Text>Edit</Text>
      ),
      key: PRODUCT_ACTION_KEYS.EDIT,
    },
    {
      label: (
        <Text>Delete</Text>
      ),
      key: PRODUCT_ACTION_KEYS.DELETE,
    }
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === PRODUCT_ACTION_KEYS.EDIT) {
      router.push('/my-store/product-add')
    }
    return;
  };

  return (
    <>
      <Dropdown menu={{ items, onClick }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <EllipsisHorizontalIcon width={24} />
        </a>
      </Dropdown>
    </>
  )
}

export default ProductAction;