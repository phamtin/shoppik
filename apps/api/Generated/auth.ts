import { SigninRequest, SigninResponse } from 'Router/auth.route';
import typia from 'typia';
const auth = {
    SigninRequest: (input: any): SigninRequest => {
        const __is = (input: any): input is SigninRequest => {
            const $io0 = (input: any): boolean => "string" === typeof input.email && "string" === typeof input.accessToken && ("GOOGLE" === input.provider || "TELEGRAM" === input.provider) && "string" === typeof input.fullname && "string" === typeof input.avatar && "number" === typeof input.expiresAt && "string" === typeof input.scope;
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is SigninRequest => {
                const $guard = (typia.createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.email || $guard(_exceptionable, {
                    path: _path + ".email",
                    expected: "string",
                    value: input.email
                })) && ("string" === typeof input.accessToken || $guard(_exceptionable, {
                    path: _path + ".accessToken",
                    expected: "string",
                    value: input.accessToken
                })) && ("GOOGLE" === input.provider || "TELEGRAM" === input.provider || $guard(_exceptionable, {
                    path: _path + ".provider",
                    expected: "(\"GOOGLE\" | \"TELEGRAM\")",
                    value: input.provider
                })) && ("string" === typeof input.fullname || $guard(_exceptionable, {
                    path: _path + ".fullname",
                    expected: "string",
                    value: input.fullname
                })) && ("string" === typeof input.avatar || $guard(_exceptionable, {
                    path: _path + ".avatar",
                    expected: "string",
                    value: input.avatar
                })) && ("number" === typeof input.expiresAt || $guard(_exceptionable, {
                    path: _path + ".expiresAt",
                    expected: "number",
                    value: input.expiresAt
                })) && ("string" === typeof input.scope || $guard(_exceptionable, {
                    path: _path + ".scope",
                    expected: "string",
                    value: input.scope
                }));
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "SigninRequest",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "SigninRequest",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    SigninResponse: (input: any): SigninResponse => {
        const __is = (input: any): input is SigninResponse => {
            const $io0 = (input: any): boolean => "string" === typeof input._id && "string" === typeof input.email && "string" === typeof input.fullname && "string" === typeof input.firstname && "string" === typeof input.lastname && "string" === typeof input.encryptedJwt && ("object" === typeof input.roleCustomer && null !== input.roleCustomer && $io1(input.roleCustomer)) && (null === input.roleOwner || "object" === typeof input.roleOwner && null !== input.roleOwner && $io2(input.roleOwner));
            const $io1 = (input: any): boolean => "number" === typeof input.trustscore && (undefined === input.updatedAt || input.updatedAt instanceof Date);
            const $io2 = (input: any): boolean => "string" === typeof input.storeId;
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is SigninResponse => {
                const $guard = (typia.createAssert as any).guard;
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
                })) && ("string" === typeof input.encryptedJwt || $guard(_exceptionable, {
                    path: _path + ".encryptedJwt",
                    expected: "string",
                    value: input.encryptedJwt
                })) && (("object" === typeof input.roleCustomer && null !== input.roleCustomer || $guard(_exceptionable, {
                    path: _path + ".roleCustomer",
                    expected: "Customer",
                    value: input.roleCustomer
                })) && $ao1(input.roleCustomer, _path + ".roleCustomer", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".roleCustomer",
                    expected: "Customer",
                    value: input.roleCustomer
                })) && (null === input.roleOwner || ("object" === typeof input.roleOwner && null !== input.roleOwner || $guard(_exceptionable, {
                    path: _path + ".roleOwner",
                    expected: "(Owner | null)",
                    value: input.roleOwner
                })) && $ao2(input.roleOwner, _path + ".roleOwner", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".roleOwner",
                    expected: "(Owner | null)",
                    value: input.roleOwner
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
                    expected: "SigninResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "SigninResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
};
export { auth };
