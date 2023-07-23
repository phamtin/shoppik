import { useEffect, useState } from 'react';

type CityLocation = Record<string, any>[];

interface Props {
	p: number;
	d: number;
}
const BASE_URL = 'https://provinces.open-api.vn/api';

const useHookGetLocation = (props: Props) => {
	const { p, d } = props;

	const [province, setProvinces] = useState<CityLocation>([]);
	const [district, setDistricts] = useState<CityLocation>([]);
	const [ward, setWards] = useState<CityLocation>([]);

	useEffect(() => {
		getProvince(`${BASE_URL}/p`);
	}, []);

	useEffect(() => {
		if (Boolean(p)) {
			getDistrict(`${BASE_URL}/p/${p}?depth=2`);
		}
	}, [p]);

	useEffect(() => {
		if (Boolean(d)) {
			getWard(`${BASE_URL}/d/${d}?depth=2`);
		}
	}, [d]);

	const fetchData = async (type: 'p' | 'd' | 'w', url: string, cb: Function) => {
		const res = await fetch(url, { method: 'GET' });
		res.json().then((res) => {
			if (type === 'p') {
				let orderedCities = [];
				for (let i = 0; i < res.length; i++) {
					const element = res[i];
					//	Hanoi - Danang - HCMC
					if (element.code === 1 || element.code === 48 || element.code === 79) {
						orderedCities.unshift(element);
					} else {
						orderedCities.push(element);
					}
				}
				cb(orderedCities.map((el: any) => ({ ...el, level: 'province' })));
			} else if (type === 'd') {
				cb((res?.districts || []).map((el: any) => ({ ...el, level: 'district' })));
			} else if (type === 'w') {
				cb((res?.wards || []).map((el: any) => ({ ...el, level: 'ward' })));
			}
		});
	};

	const getProvince = async (url: string) =>
		fetchData('p', url, (r: any) => {
			setProvinces(r);
		});

	const getDistrict = async (url: string) =>
		fetchData('d', url, (r: any) => {
			setDistricts(r);
		});

	const getWard = async (url: string) =>
		fetchData('w', url, (r: any) => {
			setWards(r);
		});

	return { province, district, ward };
};

export default useHookGetLocation;
