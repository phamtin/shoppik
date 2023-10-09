import { Button, Input, Layout, Space } from '@shoppik/ui/components/Core';
import { useSession } from 'next-auth/react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
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
						style={{ backgroundColor: '#F4F4F4' }}
						prefix={<MagnifyingGlassIcon width={24} color={theme.colorTextDisabled} />}
					/>
					<Button
						size="large"
						icon={
							<FunnelIcon
								width={20}
								style={{ marginTop: 4 }}
								color={theme.colorTextSecondary}
							/>
						}
					/>
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
