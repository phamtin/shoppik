'use client';

import { PropsWithChildren, memo, useState } from 'react';

import { Avatar, FloatButton, List } from '@shoppik/ui/components/Core';
import { trpc } from '@/lib/trpc/trpc';
import StoreMainInfo from '../../components/StoreMainInfo/StoreMainInfo';
import StoreMain from '../../components/StoreMain/StoreMain';
import useStyle from './store-overview.style';
import GlobalError from '@/app/error/Error';

interface MarketProp extends PropsWithChildren {
	store: string;
}

const actions = [
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

const StoreOverviewScreen = ({ store }: MarketProp) => {
	const { styles } = useStyle({ store });
	const [openFLoatMenu, setOpenFloatMenu] = useState<boolean>(false);

	const toggleFloatMenu = () => {
		return setOpenFloatMenu((prev) => !prev);
	};

	const mutation = trpc.store.createStore.useMutation();

	if (mutation.isError) {
		return <GlobalError error={mutation.error?.data} />;
	}

	return (
		<div className={styles.wrapper}>
			<StoreMainInfo />
			<StoreMain id="1" />

			<FloatButton
				className="floatButton"
				type="primary"
				shape="square"
				onClick={toggleFloatMenu}
			/>

			{openFLoatMenu && (
				<List
					className="floatAction"
					itemLayout="horizontal"
					dataSource={actions}
					renderItem={(item, index) => (
						<List.Item>
							<List.Item.Meta
								avatar={
									<Avatar
										src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
									/>
								}
								title={<a href="https://ant.design">{item.title}</a>}
								description="Ant Design - UI library"
							/>
						</List.Item>
					)}
				/>
			)}
		</div>
	);
};

export default memo(StoreOverviewScreen);
