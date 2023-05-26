import { memo, ReactNode, useEffect, useState } from 'react';
import { Button, Dropdown, List, Segmented, Typography } from 'ui/components/Core';
import { Notification } from 'react-iconly';

import useStyle from './noti-button.style';
import NotiItem from './NotiItem';

const count = 8;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export interface DataType {
	gender?: string;
	name: {
		title?: string;
		first?: string;
		last?: string;
	};
	email?: string;
	picture: {
		large?: string;
		medium?: string;
		thumbnail?: string;
	};
	nat?: string;
	loading: boolean;
}

interface NotiDropdownProps {
	list: DataType[];
	initLoading: boolean;
	loadMore: ReactNode;
	style: any;
}

const NotiDropdown = memo(({ style, list, initLoading, loadMore }: NotiDropdownProps) => (
	<div className={style.notiDropdown}>
		<div className={style.header}>
			<Typography.Title level={5}>Notifications</Typography.Title>
			<div>
				<Typography.Text>
					You have <strong>430</strong> new messages,&nbsp;
				</Typography.Text>
				<Typography.Text className="markRead" underline>
					mark all read?
				</Typography.Text>
			</div>
		</div>
		<div>
			<Segmented block type="primary" options={['Timeline', 'Tasks', 'Reports']} />
		</div>
		<div className={style.content}>
			<div className="notiList">
				<List
					className="loadmoreList"
					loading={initLoading}
					itemLayout="horizontal"
					loadMore={loadMore}
					dataSource={list}
					renderItem={(item) => <NotiItem item={item} />}
				/>
			</div>
			<Button block>See all</Button>
		</div>
	</div>
));

function NotiButton() {
	const { styles, theme } = useStyle();

	const [initLoading, setInitLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<DataType[]>([]);
	const [list, setList] = useState<DataType[]>([]);

	useEffect(() => {
		fetch(fakeDataUrl)
			.then((res) => res.json())
			.then((res) => {
				setInitLoading(false);
				setData(res.results);
				setList(res.results);
			});
	}, []);

	const onLoadMore = () => {
		setLoading(true);
		setList(
			data.concat(
				[...new Array(count)].map(() => ({
					loading: true,
					name: {},
					picture: {},
				})),
			),
		);
		fetch(fakeDataUrl)
			.then((res) => res.json())
			.then((res) => {
				const newData = data.concat(res.results);
				setData(newData);
				setList(newData);
				setLoading(false);
				// Resetting window's offsetTop so as to display react-virtualized demo underfloor.
				// In real scene, you can using public method of react-virtualized:
				// https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
				window.dispatchEvent(new Event('resize'));
			});
	};

	const loadMore =
		!initLoading && !loading ? (
			<div
				style={{
					textAlign: 'center',
					marginTop: theme.padding,
					height: theme.marginLG,
				}}
			>
				<Button onClick={onLoadMore}>loading more</Button>
			</div>
		) : null;

	const renderNotiDropdown = () => (
		<NotiDropdown
			list={list}
			initLoading={initLoading}
			loadMore={loadMore}
			style={styles}
		/>
	);

	return (
		<div className={styles.wrapper}>
			<Dropdown trigger={['click']} dropdownRender={renderNotiDropdown}>
				<Button size="large" type="text" icon={<Notification />} />
			</Dropdown>
		</div>
	);
}

export default NotiButton;
