import { Button, Input, Layout, Space } from 'ui/components/Core';
import { Filter, Search } from 'react-iconly';
import { useSession } from 'next-auth/react';
import SigninModal from '@/Modules/Auth/components/SigninModal/SigninModal';
import useStyle from './navbar.style';
import NotiButton from './NotiButton/NotiButton';

const { Header } = Layout;

function NavBar() {
	const { data: session } = useSession();
	const { styles, theme } = useStyle();

	console.log('NavBar:', session);

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

				<SigninModal session={session} />
			</Space>
		</Header>
	);
}

export default NavBar;
