import { Button, Input, Layout, Space } from '@shoppik/ui/components/Core';
import { Filter, Search } from 'react-iconly';
import { useSession } from 'next-auth/react';
import SigninModal from '@/Modules/Auth/components/SigninModal/SigninModal';
import useStyle from './navbar.style';
import NotiButton from './NotiButton/NotiButton';
import { usePathname } from 'next/dist/client/components/navigation';
import Link from 'next/link';

const { Header } = Layout;

function NavBar() {
	const { data: session } = useSession();
	const { styles, theme } = useStyle();
	const pathName = usePathname();

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
				{pathName?.includes('/my-store/') && (
					<Link href="/my-store/product-add">
						<Button type="primary" size="large">
							Create
						</Button>
					</Link>
				)}
				<NotiButton />
				<SigninModal session={session} />
			</Space>
		</Header>
	);
}

export default NavBar;
