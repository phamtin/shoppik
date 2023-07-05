import MarketDetailScreen from '@/Modules/Market/screen/MarketDetail/MarketDetail';

interface PageProp {
	params: { id: string };
}

export default function Page({ params }: PageProp) {
	return <MarketDetailScreen id={params.id} />;
}
