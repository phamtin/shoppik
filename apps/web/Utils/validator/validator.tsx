// import { RegisterOptions } from 'react-hook-form';

export const baseFieldValidation = (
	fieldName = "Input",
	required: boolean,
	minLength?: number | null,
	maxLength?: number | null,
	pattern?: RegExp | null,
	min?: number | null,
	max?: number | null
) => {
	let valid: any = {};

	if (!!required) {
		valid.required = {
			value: true,
			message: `"${fieldName}" is required field`,
		};
	}

	if (typeof min === "number" && min > 0) {
		valid.min = {
			value: min,
			message: `"${fieldName}" is too short`,
		};
	}

	if (typeof max === "number" && max > 0) {
		valid.max = {
			value: max,
			message: `"${fieldName}" is too long`,
		};
	}

	if (typeof minLength === "number" && minLength > 0) {
		valid.minLength = {
			value: minLength,
			message: `"${fieldName}" is too short`,
		};
	}

	if (typeof maxLength === "number" && maxLength > 0) {
		valid.maxLength = {
			value: maxLength,
			message: `"${fieldName}" is too long`,
		};
	}

	if (pattern) {
		valid.pattern = {
			value: pattern,
			message: `Please provide valid format`,
		};
	}

	return valid;
};
