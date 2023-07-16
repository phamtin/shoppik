'use client';

import { PropsWithChildren, useEffect, memo, useState } from 'react';

import { Avatar, FloatButton, List } from '@shoppik/ui/components/Core';
import { trpc } from '@/lib/trpc/trpc';
import StoreMainInfo from '../../components/StoreMainInfo/StoreMainInfo';
import StoreMain from '../../components/StoreMain/StoreMain';
import useStyle from './store-overview.style';

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

	useEffect(() => {
		mutation.mutate({
			name: 'Twitter Store',
			tradeName: 'Social Network Platform',
			storeAddress: '',
			description:
				'Twitter is an American microblogging and social network service, Live you fukcking life with the hype of people.',
			avatar:
				'https://robohash.org/98751beeb2b3cb0117a50f800622c37b?set=set4&bgset=bg1&size=200x200',
			landingPageUrl: 'https://twitter.com',
			contact: {
				phone: '+84 763 520 041',
				email: '',
				instagramLink: 'twitter.store',
				facebookLink: 'tin.pham.22',
				youtubeLink: 'adorable.channel',
			},
			tags: ['646fa3cd01d88dcbe54bc1bf', '646fa3cd01d18dcbe54bc0bf'],
		});
	}, []);

	if (mutation.isError) {
		console.log(mutation.error);
		throw new Error(mutation.error.data?.code);
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
