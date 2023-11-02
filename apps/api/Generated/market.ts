import { createAssert } from 'typia';
import { GetMarketRequest } from 'Router/market.route';
const market = {
    GetMarketRequest: (input: any): GetMarketRequest => {
        const __is = (input: any): input is GetMarketRequest => {
            return "object" === typeof input && null !== input && "string" === typeof (input as any).price;
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is GetMarketRequest => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => "string" === typeof input.price || $guard(_exceptionable, {
                    path: _path + ".price",
                    expected: "string",
                    value: input.price
                });
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "GetMarketRequest",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "GetMarketRequest",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
};
export { market };
