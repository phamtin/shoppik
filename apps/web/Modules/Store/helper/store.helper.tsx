import { Contact } from '@shoppik/types';
import { DescriptionsProps } from '@shoppik/ui/components/Core';

export const StoreStatistic: DescriptionsProps['items'] = [
	{
		key: '1',
		label: 'Products',
		children: '624',
	},
	{
		key: '2',
		label: 'Rating',
		children: '4.9 (3.2k reviews)',
	},
	{
		key: '3',
		label: 'Followers',
		children: '2k',
	},
	{
		key: '4',
		label: 'Response time',
		children: '92%',
	},
	{
		key: '5',
		label: 'Following',
		children: '1.2k',
	},
	{
		key: '6',
		label: 'Joined',
		children: '1 year',
	},
];

export const showStoreInformation = (
	contact: Contact,
	phone: JSX.Element[],
): DescriptionsProps['items'] => [
	{
		key: '0',
		label: 'Phone',
		children: phone,
	},
	{
		key: '1',
		label: 'Email',
		children: contact.email,
	},
	{
		key: '2',
		label: 'Instagram',
		children: contact.instagramLink,
	},
	{
		key: '3',
		label: 'Facebook',
		children: contact.facebookLink,
	},
	{
		key: '4',
		label: 'Youtube',
		children: contact.youtubeLink,
	},
];
