import { memo, useEffect, useRef, useState, ChangeEvent, CSSProperties } from 'react';
import { PlusIcon, XCircleIcon } from '@heroicons/react/24/outline';

import DelayedComponent from '@/Components/DelayedComponent/DelayedComponent';
import {
	Button,
	Form,
	FormInstance,
	FormListFieldData,
	Input,
	InputRef,
	Space,
	Tag,
	Tooltip,
	Flex,
} from '@shoppik/ui/components/Core';

interface Props {
	form: FormInstance;
	field: FormListFieldData;
	index: number;
	remove: (index: number | number[]) => void;
}

const DetailVariant = ({ form, field, index, remove }: Props) => {
	const { key, ...restProps } = field;

	const inputRef = useRef<InputRef>(null);
	const editInputRef = useRef<InputRef>(null);

	const [tags, setTags] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [inputVisible, setInputVisible] = useState(false);
	const [editInputValue, setEditInputValue] = useState('');
	const [editInputIndex, setEditInputIndex] = useState(-1);

	useEffect(() => {
		if (inputVisible) {
			inputRef.current?.focus();
		}
	}, [inputVisible]);

	useEffect(() => {
		editInputRef.current?.focus();
	}, [editInputValue]);

	const setTagFieldValue = (values: string[]) => {
		setTags(values);
		//	Too complicated to normally set value in JSX Form.Item, So have to use function to set
		form.setFieldValue(['variants', field.name, 'v'], values);
	};

	const handleClose = (removedTag: string) => {
		const newTags = tags.filter((tag) => tag !== removedTag);
		setTagFieldValue(newTags);
	};

	const showInput = () => setInputVisible(true);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputConfirm = () => {
		if (inputValue && tags.indexOf(inputValue) === -1) {
			setTagFieldValue([...tags, inputValue]);
		}
		setInputVisible(false);
		setInputValue('');
	};

	const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEditInputValue(e.target.value);
	};

	const handleEditInputConfirm = () => {
		const newTags = [...tags];
		newTags[editInputIndex] = editInputValue;
		setTagFieldValue(newTags);
		setEditInputIndex(-1);
		setEditInputValue('');
	};

	const tagInputStyle: CSSProperties = {
		width: 64,
		height: 22,
		verticalAlign: 'top',
	};

	const tagPlusStyle: CSSProperties = {
		height: 20,
		fontSize: 14,
		borderStyle: 'dashed',
	};

	return (
		<Flex key={index} align="flex-start">
			<Form.Item name={[field.name, 'k']}>
				<Input className="textInput" placeholder={`Variant ${index + 1}`} />
			</Form.Item>
			<Space size={[0, 8]} wrap>
				{tags.map((tag, index) => {
					if (editInputIndex === index) {
						return (
							<Input
								ref={editInputRef}
								key={tag}
								style={tagInputStyle}
								value={editInputValue}
								onChange={handleEditInputChange}
								onBlur={handleEditInputConfirm}
								onPressEnter={handleEditInputConfirm}
							/>
						);
					}
					const isLongTag = tag.length > 20;
					const tagElem = (
						<Tag
							key={tag}
							color="volcano"
							closable={index !== 0}
							style={{ userSelect: 'none', height: 20, fontSize: 14 }}
							onClose={() => handleClose(tag)}
						>
							<span
								onDoubleClick={(e) => {
									if (index !== 0) {
										setEditInputIndex(index);
										setEditInputValue(tag);
										e.preventDefault();
									}
								}}
							>
								{isLongTag ? `${tag.slice(0, 20)}..` : tag}
							</span>
						</Tag>
					);
					return isLongTag ? (
						<Tooltip title={tag} key={tag}>
							{tagElem}
						</Tooltip>
					) : (
						tagElem
					);
				})}
				{inputVisible ? (
					<Input
						ref={inputRef}
						type="text"
						style={tagInputStyle}
						value={inputValue}
						onChange={handleInputChange}
						onBlur={handleInputConfirm}
						onPressEnter={handleInputConfirm}
					/>
				) : (
					<Tag style={tagPlusStyle} onClick={showInput}>
						<Flex align="center">
							<PlusIcon width={14} />
							New Tag
						</Flex>
					</Tag>
				)}
			</Space>
			{index >= 1 && (
				<DelayedComponent>
					<Button
						size="small"
						type="link"
						icon={<XCircleIcon width={20} color="#de2535" />}
						style={{ marginLeft: 10 }}
						onClick={() => remove(field.name)}
					/>
				</DelayedComponent>
			)}
		</Flex>
	);
};

export default memo(DetailVariant);
