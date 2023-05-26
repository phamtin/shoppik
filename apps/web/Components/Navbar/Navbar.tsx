import {
	Button,
	Dropdown,
	Input,
	Layout,
	MenuProps,
	Space,
	Typography,
} from 'ui/components/Core';
import { Filter, Search } from 'react-iconly';
import useStyle from './navbar.style';
import { getItem } from '@/Utils/common';
import NotiButton from './NotiButton/NotiButton';

const { Header } = Layout;
const { Text } = Typography;

function NavBar() {
	const { styles, theme } = useStyle();

	const items: MenuProps['items'] = [
		getItem(<Text>Charts</Text>, 'sub3'),
		getItem(<Text>Actions</Text>, 'sub4'),

		getItem(
			'Group',
			'grp',
			null,
			[getItem('Option 13', '13'), getItem('Option 14', '14')],
			'group',
		),
		getItem(<Text>Log out</Text>, 'sub5'),
	];

	return (
		<Header className={styles.wrapper}>
			<div className="left">
				<div className="inputSearch">
					<Input
						size="large"
						placeholder="search.."
						bordered={false}
						prefix={
							<Search
								set="light"
								style={{ width: theme.sizeMD }}
								primaryColor={theme.colorTextDisabled}
							/>
						}
					/>
					<Button size="large" icon={<Filter />} />
				</div>
			</div>
			<Space size="small">
				<NotiButton />
				<div>
					<Dropdown menu={{ items }} overlayStyle={{ width: 200 }}>
						<Button onClick={(e) => e.preventDefault()}>Profile</Button>
					</Dropdown>
				</div>
			</Space>
		</Header>
	);
}

export default NavBar;
