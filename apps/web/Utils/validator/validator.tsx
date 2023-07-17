export const baseFieldValidation = (
	fieldName: string,
	required: boolean | null,
	min?: number | null,
	max?: number | null,
	pattern?: RegExp,
) => {
	let valid: Record<string, any>[] = [];

	if (!!required) {
		valid.push({
			required: true,
			message: `"${fieldName}" is required field`,
		});
	}

	if (typeof min === 'number' && min > 0) {
		valid.push({
			min: min,
			message: `"${fieldName}" is too short`,
		});
	}

	if (typeof max === 'number' && max > 0) {
		valid.push({
			max: max,
			message: `"${fieldName}" is too long`,
		});
	}

	if (pattern) {
		valid.push({
			pattern: pattern,
			message: `Please provide valid format`,
		});
	}

	return valid;
};
