import { GetMyProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from 'Router/user.route';
import { createAssert } from 'typia';
const account = {
    GetMyProfileResponse: (input: any): GetMyProfileResponse => {
        const __is = (input: any): input is GetMyProfileResponse => {
            const $io0 = (input: any): boolean => "string" === typeof input._id && "string" === typeof input.email && "string" === typeof input.fullname && "string" === typeof input.firstname && "string" === typeof input.lastname && "string" === typeof input.phoneNumber && "string" === typeof input.birthday && "string" === typeof input.locale && "string" === typeof input.avatar && "string" === typeof input.postalCode && ("GOOGLE" === input.signinMethod || "TELEGRAM" === input.signinMethod) && "boolean" === typeof input.isConfirm && ("object" === typeof input.roleCustomer && null !== input.roleCustomer && $io1(input.roleCustomer)) && (undefined === input.roleOwner || "object" === typeof input.roleOwner && null !== input.roleOwner && $io2(input.roleOwner)) && (undefined === input.updatedAt || input.updatedAt instanceof Date) && input.createdAt instanceof Date;
            const $io1 = (input: any): boolean => "number" === typeof input.trustscore && (undefined === input.updatedAt || input.updatedAt instanceof Date);
            const $io2 = (input: any): boolean => "string" === typeof input.storeId;
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is GetMyProfileResponse => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "string",
                    value: input._id
                })) && ("string" === typeof input.email || $guard(_exceptionable, {
                    path: _path + ".email",
                    expected: "string",
                    value: input.email
                })) && ("string" === typeof input.fullname || $guard(_exceptionable, {
                    path: _path + ".fullname",
                    expected: "string",
                    value: input.fullname
                })) && ("string" === typeof input.firstname || $guard(_exceptionable, {
                    path: _path + ".firstname",
                    expected: "string",
                    value: input.firstname
                })) && ("string" === typeof input.lastname || $guard(_exceptionable, {
                    path: _path + ".lastname",
                    expected: "string",
                    value: input.lastname
                })) && ("string" === typeof input.phoneNumber || $guard(_exceptionable, {
                    path: _path + ".phoneNumber",
                    expected: "string",
                    value: input.phoneNumber
                })) && ("string" === typeof input.birthday || $guard(_exceptionable, {
                    path: _path + ".birthday",
                    expected: "string",
                    value: input.birthday
                })) && ("string" === typeof input.locale || $guard(_exceptionable, {
                    path: _path + ".locale",
                    expected: "string",
                    value: input.locale
                })) && ("string" === typeof input.avatar || $guard(_exceptionable, {
                    path: _path + ".avatar",
                    expected: "string",
                    value: input.avatar
                })) && ("string" === typeof input.postalCode || $guard(_exceptionable, {
                    path: _path + ".postalCode",
                    expected: "string",
                    value: input.postalCode
                })) && ("GOOGLE" === input.signinMethod || "TELEGRAM" === input.signinMethod || $guard(_exceptionable, {
                    path: _path + ".signinMethod",
                    expected: "(\"GOOGLE\" | \"TELEGRAM\")",
                    value: input.signinMethod
                })) && ("boolean" === typeof input.isConfirm || $guard(_exceptionable, {
                    path: _path + ".isConfirm",
                    expected: "boolean",
                    value: input.isConfirm
                })) && (("object" === typeof input.roleCustomer && null !== input.roleCustomer || $guard(_exceptionable, {
                    path: _path + ".roleCustomer",
                    expected: "Customer",
                    value: input.roleCustomer
                })) && $ao1(input.roleCustomer, _path + ".roleCustomer", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".roleCustomer",
                    expected: "Customer",
                    value: input.roleCustomer
                })) && (undefined === input.roleOwner || ("object" === typeof input.roleOwner && null !== input.roleOwner || $guard(_exceptionable, {
                    path: _path + ".roleOwner",
                    expected: "(Owner | undefined)",
                    value: input.roleOwner
                })) && $ao2(input.roleOwner, _path + ".roleOwner", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".roleOwner",
                    expected: "(Owner | undefined)",
                    value: input.roleOwner
                })) && (undefined === input.updatedAt || input.updatedAt instanceof Date || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(Date | undefined)",
                    value: input.updatedAt
                })) && (input.createdAt instanceof Date || $guard(_exceptionable, {
                    path: _path + ".createdAt",
                    expected: "Date",
                    value: input.createdAt
                }));
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.trustscore || $guard(_exceptionable, {
                    path: _path + ".trustscore",
                    expected: "number",
                    value: input.trustscore
                })) && (undefined === input.updatedAt || input.updatedAt instanceof Date || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(Date | undefined)",
                    value: input.updatedAt
                }));
                const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => "string" === typeof input.storeId || $guard(_exceptionable, {
                    path: _path + ".storeId",
                    expected: "string",
                    value: input.storeId
                });
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "GetMyProfileResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "GetMyProfileResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    UpdateUserProfileRequest: (input: any): UpdateUserProfileRequest => {
        const __is = (input: any): input is UpdateUserProfileRequest => {
            const $io0 = (input: any): boolean => (undefined === input.avatar || "string" === typeof input.avatar) && (undefined === input.fullname || "string" === typeof input.fullname) && (undefined === input.lastname || "string" === typeof input.lastname) && (undefined === input.firstname || "string" === typeof input.firstname) && (undefined === input.birthday || "string" === typeof input.birthday) && (undefined === input.phoneNumber || "string" === typeof input.phoneNumber) && (undefined === input.postalCode || "string" === typeof input.postalCode) && (undefined === input.roleOwner || "object" === typeof input.roleOwner && null !== input.roleOwner && $io1(input.roleOwner));
            const $io1 = (input: any): boolean => "string" === typeof input.storeId;
            return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is UpdateUserProfileRequest => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.avatar || "string" === typeof input.avatar || $guard(_exceptionable, {
                    path: _path + ".avatar",
                    expected: "(string | undefined)",
                    value: input.avatar
                })) && (undefined === input.fullname || "string" === typeof input.fullname || $guard(_exceptionable, {
                    path: _path + ".fullname",
                    expected: "(string | undefined)",
                    value: input.fullname
                })) && (undefined === input.lastname || "string" === typeof input.lastname || $guard(_exceptionable, {
                    path: _path + ".lastname",
                    expected: "(string | undefined)",
                    value: input.lastname
                })) && (undefined === input.firstname || "string" === typeof input.firstname || $guard(_exceptionable, {
                    path: _path + ".firstname",
                    expected: "(string | undefined)",
                    value: input.firstname
                })) && (undefined === input.birthday || "string" === typeof input.birthday || $guard(_exceptionable, {
                    path: _path + ".birthday",
                    expected: "(string | undefined)",
                    value: input.birthday
                })) && (undefined === input.phoneNumber || "string" === typeof input.phoneNumber || $guard(_exceptionable, {
                    path: _path + ".phoneNumber",
                    expected: "(string | undefined)",
                    value: input.phoneNumber
                })) && (undefined === input.postalCode || "string" === typeof input.postalCode || $guard(_exceptionable, {
                    path: _path + ".postalCode",
                    expected: "(string | undefined)",
                    value: input.postalCode
                })) && (undefined === input.roleOwner || ("object" === typeof input.roleOwner && null !== input.roleOwner || $guard(_exceptionable, {
                    path: _path + ".roleOwner",
                    expected: "(Owner | undefined)",
                    value: input.roleOwner
                })) && $ao1(input.roleOwner, _path + ".roleOwner", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".roleOwner",
                    expected: "(Owner | undefined)",
                    value: input.roleOwner
                }));
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => "string" === typeof input.storeId || $guard(_exceptionable, {
                    path: _path + ".storeId",
                    expected: "string",
                    value: input.storeId
                });
                return ("object" === typeof input && null !== input && false === Array.isArray(input) || $guard(true, {
                    path: _path + "",
                    expected: "Partial<__type>",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "Partial<__type>",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    UpdateUserProfileResponse: (input: any): UpdateUserProfileResponse => {
        const __is = (input: any): input is UpdateUserProfileResponse => {
            const $io0 = (input: any): boolean => "string" === typeof input._id && "string" === typeof input.email && "string" === typeof input.fullname && "string" === typeof input.firstname && "string" === typeof input.lastname && "string" === typeof input.phoneNumber && "string" === typeof input.birthday && "string" === typeof input.locale && "string" === typeof input.avatar && "string" === typeof input.postalCode && ("GOOGLE" === input.signinMethod || "TELEGRAM" === input.signinMethod) && "boolean" === typeof input.isConfirm && ("object" === typeof input.roleCustomer && null !== input.roleCustomer && $io1(input.roleCustomer)) && (undefined === input.roleOwner || "object" === typeof input.roleOwner && null !== input.roleOwner && $io2(input.roleOwner)) && (undefined === input.updatedAt || input.updatedAt instanceof Date) && input.createdAt instanceof Date;
            const $io1 = (input: any): boolean => "number" === typeof input.trustscore && (undefined === input.updatedAt || input.updatedAt instanceof Date);
            const $io2 = (input: any): boolean => "string" === typeof input.storeId;
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is UpdateUserProfileResponse => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "string",
                    value: input._id
                })) && ("string" === typeof input.email || $guard(_exceptionable, {
                    path: _path + ".email",
                    expected: "string",
                    value: input.email
                })) && ("string" === typeof input.fullname || $guard(_exceptionable, {
                    path: _path + ".fullname",
                    expected: "string",
                    value: input.fullname
                })) && ("string" === typeof input.firstname || $guard(_exceptionable, {
                    path: _path + ".firstname",
                    expected: "string",
                    value: input.firstname
                })) && ("string" === typeof input.lastname || $guard(_exceptionable, {
                    path: _path + ".lastname",
                    expected: "string",
                    value: input.lastname
                })) && ("string" === typeof input.phoneNumber || $guard(_exceptionable, {
                    path: _path + ".phoneNumber",
                    expected: "string",
                    value: input.phoneNumber
                })) && ("string" === typeof input.birthday || $guard(_exceptionable, {
                    path: _path + ".birthday",
                    expected: "string",
                    value: input.birthday
                })) && ("string" === typeof input.locale || $guard(_exceptionable, {
                    path: _path + ".locale",
                    expected: "string",
                    value: input.locale
                })) && ("string" === typeof input.avatar || $guard(_exceptionable, {
                    path: _path + ".avatar",
                    expected: "string",
                    value: input.avatar
                })) && ("string" === typeof input.postalCode || $guard(_exceptionable, {
                    path: _path + ".postalCode",
                    expected: "string",
                    value: input.postalCode
                })) && ("GOOGLE" === input.signinMethod || "TELEGRAM" === input.signinMethod || $guard(_exceptionable, {
                    path: _path + ".signinMethod",
                    expected: "(\"GOOGLE\" | \"TELEGRAM\")",
                    value: input.signinMethod
                })) && ("boolean" === typeof input.isConfirm || $guard(_exceptionable, {
                    path: _path + ".isConfirm",
                    expected: "boolean",
                    value: input.isConfirm
                })) && (("object" === typeof input.roleCustomer && null !== input.roleCustomer || $guard(_exceptionable, {
                    path: _path + ".roleCustomer",
                    expected: "Customer",
                    value: input.roleCustomer
                })) && $ao1(input.roleCustomer, _path + ".roleCustomer", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".roleCustomer",
                    expected: "Customer",
                    value: input.roleCustomer
                })) && (undefined === input.roleOwner || ("object" === typeof input.roleOwner && null !== input.roleOwner || $guard(_exceptionable, {
                    path: _path + ".roleOwner",
                    expected: "(Owner | undefined)",
                    value: input.roleOwner
                })) && $ao2(input.roleOwner, _path + ".roleOwner", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".roleOwner",
                    expected: "(Owner | undefined)",
                    value: input.roleOwner
                })) && (undefined === input.updatedAt || input.updatedAt instanceof Date || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(Date | undefined)",
                    value: input.updatedAt
                })) && (input.createdAt instanceof Date || $guard(_exceptionable, {
                    path: _path + ".createdAt",
                    expected: "Date",
                    value: input.createdAt
                }));
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.trustscore || $guard(_exceptionable, {
                    path: _path + ".trustscore",
                    expected: "number",
                    value: input.trustscore
                })) && (undefined === input.updatedAt || input.updatedAt instanceof Date || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(Date | undefined)",
                    value: input.updatedAt
                }));
                const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => "string" === typeof input.storeId || $guard(_exceptionable, {
                    path: _path + ".storeId",
                    expected: "string",
                    value: input.storeId
                });
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "UpdateUserProfileResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "UpdateUserProfileResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
};
export { account };
