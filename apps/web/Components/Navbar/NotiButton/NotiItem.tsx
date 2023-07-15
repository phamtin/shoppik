import { memo } from 'react';
import { Avatar, List, Skeleton } from '@shoppik/ui/components/Core';
import { DataType } from '../navbar.type';

interface NotiItemProps {
	item: DataType;
}

function NotiItem({ item }: NotiItemProps) {
	return (
		<List.Item>
			<Skeleton avatar title={false} loading={item.loading} active>
				<List.Item.Meta
					avatar={<Avatar src={item.picture.large} />}
					title={item.name?.last}
					description="Ant Design, a design language for background apps, is refined by Ant UED Team"
				/>
			</Skeleton>
		</List.Item>
	);
}

export default memo(NotiItem);
