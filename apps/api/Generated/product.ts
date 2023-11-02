import { CreateProductRequest, CreateProductResponse, GetProductDetailRequest, GetProductDetailResponse, GetShoppikCategoryResponse, GetStoreProductsRequest, GetStoreProductsResponse, } from 'Router/product.route';
import { createAssert } from 'typia';
const product = {
    CreateProductRequest: (input: any): CreateProductRequest => {
        const __is = (input: any): input is CreateProductRequest => {
            const $io0 = (input: any): boolean => "string" === typeof input.name && (undefined === input.description || "string" === typeof input.description) && (Array.isArray(input.images) && input.images.every((elem: any) => "string" === typeof elem)) && (Array.isArray(input.keyFeatures) && input.keyFeatures.every((elem: any) => "string" === typeof elem)) && (Array.isArray(input.detail) && input.detail.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem))) && (Array.isArray(input.variants) && input.variants.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem))) && (Array.isArray(input.shoppikCategories) && input.shoppikCategories.every((elem: any) => "string" === typeof elem)) && (Array.isArray(input.storeCategories) && input.storeCategories.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem))) && "number" === typeof input.originPrice && "number" === typeof input.quantity && "boolean" === typeof input.isDraft;
            const $io1 = (input: any): boolean => "string" === typeof input.k && "string" === typeof input.v;
            const $io2 = (input: any): boolean => "string" === typeof input._id && "string" === typeof input.name && "string" === typeof input.slug;
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is CreateProductRequest => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                })) && (undefined === input.description || "string" === typeof input.description || $guard(_exceptionable, {
                    path: _path + ".description",
                    expected: "(string | undefined)",
                    value: input.description
                })) && ((Array.isArray(input.images) || $guard(_exceptionable, {
                    path: _path + ".images",
                    expected: "Array<string>",
                    value: input.images
                })) && input.images.every((elem: any, _index1: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".images[" + _index1 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".images",
                    expected: "Array<string>",
                    value: input.images
                })) && ((Array.isArray(input.keyFeatures) || $guard(_exceptionable, {
                    path: _path + ".keyFeatures",
                    expected: "Array<string>",
                    value: input.keyFeatures
                })) && input.keyFeatures.every((elem: any, _index2: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".keyFeatures[" + _index2 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".keyFeatures",
                    expected: "Array<string>",
                    value: input.keyFeatures
                })) && ((Array.isArray(input.detail) || $guard(_exceptionable, {
                    path: _path + ".detail",
                    expected: "Array<AttributePattern>",
                    value: input.detail
                })) && input.detail.every((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".detail[" + _index3 + "]",
                    expected: "AttributePattern",
                    value: elem
                })) && $ao1(elem, _path + ".detail[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".detail[" + _index3 + "]",
                    expected: "AttributePattern",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".detail",
                    expected: "Array<AttributePattern>",
                    value: input.detail
                })) && ((Array.isArray(input.variants) || $guard(_exceptionable, {
                    path: _path + ".variants",
                    expected: "Array<AttributePattern>",
                    value: input.variants
                })) && input.variants.every((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".variants[" + _index4 + "]",
                    expected: "AttributePattern",
                    value: elem
                })) && $ao1(elem, _path + ".variants[" + _index4 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".variants[" + _index4 + "]",
                    expected: "AttributePattern",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".variants",
                    expected: "Array<AttributePattern>",
                    value: input.variants
                })) && ((Array.isArray(input.shoppikCategories) || $guard(_exceptionable, {
                    path: _path + ".shoppikCategories",
                    expected: "Array<string>",
                    value: input.shoppikCategories
                })) && input.shoppikCategories.every((elem: any, _index5: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".shoppikCategories[" + _index5 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".shoppikCategories",
                    expected: "Array<string>",
                    value: input.shoppikCategories
                })) && ((Array.isArray(input.storeCategories) || $guard(_exceptionable, {
                    path: _path + ".storeCategories",
                    expected: "Array<__type>",
                    value: input.storeCategories
                })) && input.storeCategories.every((elem: any, _index6: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".storeCategories[" + _index6 + "]",
                    expected: "__type",
                    value: elem
                })) && $ao2(elem, _path + ".storeCategories[" + _index6 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".storeCategories[" + _index6 + "]",
                    expected: "__type",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".storeCategories",
                    expected: "Array<__type>",
                    value: input.storeCategories
                })) && ("number" === typeof input.originPrice || $guard(_exceptionable, {
                    path: _path + ".originPrice",
                    expected: "number",
                    value: input.originPrice
                })) && ("number" === typeof input.quantity || $guard(_exceptionable, {
                    path: _path + ".quantity",
                    expected: "number",
                    value: input.quantity
                })) && ("boolean" === typeof input.isDraft || $guard(_exceptionable, {
                    path: _path + ".isDraft",
                    expected: "boolean",
                    value: input.isDraft
                }));
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.k || $guard(_exceptionable, {
                    path: _path + ".k",
                    expected: "string",
                    value: input.k
                })) && ("string" === typeof input.v || $guard(_exceptionable, {
                    path: _path + ".v",
                    expected: "string",
                    value: input.v
                }));
                const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "string",
                    value: input._id
                })) && ("string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                })) && ("string" === typeof input.slug || $guard(_exceptionable, {
                    path: _path + ".slug",
                    expected: "string",
                    value: input.slug
                }));
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "CreateProductRequest",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "CreateProductRequest",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    CreateProductResponse: (input: any): CreateProductResponse => {
        const __is = (input: any): input is CreateProductResponse => {
            const $io0 = (input: any): boolean => "object" === typeof input.data && null !== input.data && $io1(input.data);
            const $io1 = (input: any): boolean => (undefined === input._id || "string" === typeof input._id) && "string" === typeof input.storeId && "string" === typeof input.name && "string" === typeof input.slug && (undefined === input.description || "string" === typeof input.description) && (Array.isArray(input.keyFeatures) && input.keyFeatures.every((elem: any) => "string" === typeof elem)) && (Array.isArray(input.images) && input.images.every((elem: any) => "string" === typeof elem)) && "number" === typeof input.originPrice && "number" === typeof input.quantity && ("object" === typeof input.rating && null !== input.rating && ("number" === typeof (input.rating as any).score && "number" === typeof (input.rating as any).reviews && "number" === typeof (input.rating as any).sold)) && (Array.isArray(input.storeCategories) && input.storeCategories.every((elem: any) => "object" === typeof elem && null !== elem && $io3(elem))) && (Array.isArray(input.shoppikCategories) && input.shoppikCategories.every((elem: any) => "string" === typeof elem)) && (Array.isArray(input.variants) && input.variants.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && (Array.isArray(input.detail) && input.detail.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && ("object" === typeof input.lastSavedAt && null !== input.lastSavedAt && true) && "boolean" === typeof input.isDraft && (undefined === input.isDeleted || "boolean" === typeof input.isDeleted) && ("object" === typeof input.createdAt && null !== input.createdAt && true) && (undefined === input.deletedAt || "object" === typeof input.deletedAt && null !== input.deletedAt && false === Array.isArray(input.deletedAt) && $io5(input.deletedAt)) && (undefined === input.updatedAt || "object" === typeof input.updatedAt && null !== input.updatedAt && false === Array.isArray(input.updatedAt) && $io5(input.updatedAt));
            const $io3 = (input: any): boolean => "string" === typeof input._id && "string" === typeof input.name && "string" === typeof input.slug;
            const $io4 = (input: any): boolean => "string" === typeof input.k && "string" === typeof input.v;
            const $io5 = (input: any): boolean => true;
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is CreateProductResponse => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("object" === typeof input.data && null !== input.data || $guard(_exceptionable, {
                    path: _path + ".data",
                    expected: "__type",
                    value: input.data
                })) && $ao1(input.data, _path + ".data", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".data",
                    expected: "__type",
                    value: input.data
                });
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input._id || "string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "(string | undefined)",
                    value: input._id
                })) && ("string" === typeof input.storeId || $guard(_exceptionable, {
                    path: _path + ".storeId",
                    expected: "string",
                    value: input.storeId
                })) && ("string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                })) && ("string" === typeof input.slug || $guard(_exceptionable, {
                    path: _path + ".slug",
                    expected: "string",
                    value: input.slug
                })) && (undefined === input.description || "string" === typeof input.description || $guard(_exceptionable, {
                    path: _path + ".description",
                    expected: "(string | undefined)",
                    value: input.description
                })) && ((Array.isArray(input.keyFeatures) || $guard(_exceptionable, {
                    path: _path + ".keyFeatures",
                    expected: "Array<string>",
                    value: input.keyFeatures
                })) && input.keyFeatures.every((elem: any, _index1: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".keyFeatures[" + _index1 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".keyFeatures",
                    expected: "Array<string>",
                    value: input.keyFeatures
                })) && ((Array.isArray(input.images) || $guard(_exceptionable, {
                    path: _path + ".images",
                    expected: "Array<string>",
                    value: input.images
                })) && input.images.every((elem: any, _index2: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".images[" + _index2 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".images",
                    expected: "Array<string>",
                    value: input.images
                })) && ("number" === typeof input.originPrice || $guard(_exceptionable, {
                    path: _path + ".originPrice",
                    expected: "number",
                    value: input.originPrice
                })) && ("number" === typeof input.quantity || $guard(_exceptionable, {
                    path: _path + ".quantity",
                    expected: "number",
                    value: input.quantity
                })) && (("object" === typeof input.rating && null !== input.rating || $guard(_exceptionable, {
                    path: _path + ".rating",
                    expected: "__type.o1",
                    value: input.rating
                })) && $ao2(input.rating, _path + ".rating", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".rating",
                    expected: "__type.o1",
                    value: input.rating
                })) && ((Array.isArray(input.storeCategories) || $guard(_exceptionable, {
                    path: _path + ".storeCategories",
                    expected: "Array<__type>",
                    value: input.storeCategories
                })) && input.storeCategories.every((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".storeCategories[" + _index3 + "]",
                    expected: "__type.o2",
                    value: elem
                })) && $ao3(elem, _path + ".storeCategories[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".storeCategories[" + _index3 + "]",
                    expected: "__type.o2",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".storeCategories",
                    expected: "Array<__type>",
                    value: input.storeCategories
                })) && ((Array.isArray(input.shoppikCategories) || $guard(_exceptionable, {
                    path: _path + ".shoppikCategories",
                    expected: "Array<string>",
                    value: input.shoppikCategories
                })) && input.shoppikCategories.every((elem: any, _index4: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".shoppikCategories[" + _index4 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".shoppikCategories",
                    expected: "Array<string>",
                    value: input.shoppikCategories
                })) && ((Array.isArray(input.variants) || $guard(_exceptionable, {
                    path: _path + ".variants",
                    expected: "Array<__type>.o1",
                    value: input.variants
                })) && input.variants.every((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".variants[" + _index5 + "]",
                    expected: "__type.o3",
                    value: elem
                })) && $ao4(elem, _path + ".variants[" + _index5 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".variants[" + _index5 + "]",
                    expected: "__type.o3",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".variants",
                    expected: "Array<__type>.o1",
                    value: input.variants
                })) && ((Array.isArray(input.detail) || $guard(_exceptionable, {
                    path: _path + ".detail",
                    expected: "Array<__type>.o1",
                    value: input.detail
                })) && input.detail.every((elem: any, _index6: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".detail[" + _index6 + "]",
                    expected: "__type.o3",
                    value: elem
                })) && $ao4(elem, _path + ".detail[" + _index6 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".detail[" + _index6 + "]",
                    expected: "__type.o3",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".detail",
                    expected: "Array<__type>.o1",
                    value: input.detail
                })) && (("object" === typeof input.lastSavedAt && null !== input.lastSavedAt && false === Array.isArray(input.lastSavedAt) || $guard(_exceptionable, {
                    path: _path + ".lastSavedAt",
                    expected: "__type.o4",
                    value: input.lastSavedAt
                })) && $ao5(input.lastSavedAt, _path + ".lastSavedAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".lastSavedAt",
                    expected: "__type.o4",
                    value: input.lastSavedAt
                })) && ("boolean" === typeof input.isDraft || $guard(_exceptionable, {
                    path: _path + ".isDraft",
                    expected: "boolean",
                    value: input.isDraft
                })) && (undefined === input.isDeleted || "boolean" === typeof input.isDeleted || $guard(_exceptionable, {
                    path: _path + ".isDeleted",
                    expected: "(boolean | undefined)",
                    value: input.isDeleted
                })) && (("object" === typeof input.createdAt && null !== input.createdAt && false === Array.isArray(input.createdAt) || $guard(_exceptionable, {
                    path: _path + ".createdAt",
                    expected: "__type.o4",
                    value: input.createdAt
                })) && $ao5(input.createdAt, _path + ".createdAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".createdAt",
                    expected: "__type.o4",
                    value: input.createdAt
                })) && (undefined === input.deletedAt || ("object" === typeof input.deletedAt && null !== input.deletedAt && false === Array.isArray(input.deletedAt) || $guard(_exceptionable, {
                    path: _path + ".deletedAt",
                    expected: "(__type.o4 | undefined)",
                    value: input.deletedAt
                })) && $ao5(input.deletedAt, _path + ".deletedAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".deletedAt",
                    expected: "(__type.o4 | undefined)",
                    value: input.deletedAt
                })) && (undefined === input.updatedAt || ("object" === typeof input.updatedAt && null !== input.updatedAt && false === Array.isArray(input.updatedAt) || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(__type.o4 | undefined)",
                    value: input.updatedAt
                })) && $ao5(input.updatedAt, _path + ".updatedAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(__type.o4 | undefined)",
                    value: input.updatedAt
                }));
                const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.score || $guard(_exceptionable, {
                    path: _path + ".score",
                    expected: "number",
                    value: input.score
                })) && ("number" === typeof input.reviews || $guard(_exceptionable, {
                    path: _path + ".reviews",
                    expected: "number",
                    value: input.reviews
                })) && ("number" === typeof input.sold || $guard(_exceptionable, {
                    path: _path + ".sold",
                    expected: "number",
                    value: input.sold
                }));
                const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "string",
                    value: input._id
                })) && ("string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                })) && ("string" === typeof input.slug || $guard(_exceptionable, {
                    path: _path + ".slug",
                    expected: "string",
                    value: input.slug
                }));
                const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.k || $guard(_exceptionable, {
                    path: _path + ".k",
                    expected: "string",
                    value: input.k
                })) && ("string" === typeof input.v || $guard(_exceptionable, {
                    path: _path + ".v",
                    expected: "string",
                    value: input.v
                }));
                const $ao5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => true;
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "CreateProductResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "CreateProductResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    GetShoppikCategoryResponse: (input: any): GetShoppikCategoryResponse => {
        const __is = (input: any): input is GetShoppikCategoryResponse => {
            const $io0 = (input: any): boolean => Array.isArray(input.data) && input.data.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem));
            const $io1 = (input: any): boolean => (undefined === input._id || "string" === typeof input._id) && "string" === typeof input.name && "boolean" === typeof input.isSubCategory && (null === input.parentId || "string" === typeof input.parentId);
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is GetShoppikCategoryResponse => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (Array.isArray(input.data) || $guard(_exceptionable, {
                    path: _path + ".data",
                    expected: "Array<__type>",
                    value: input.data
                })) && input.data.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".data[" + _index1 + "]",
                    expected: "__type",
                    value: elem
                })) && $ao1(elem, _path + ".data[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".data[" + _index1 + "]",
                    expected: "__type",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".data",
                    expected: "Array<__type>",
                    value: input.data
                });
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input._id || "string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "(string | undefined)",
                    value: input._id
                })) && ("string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                })) && ("boolean" === typeof input.isSubCategory || $guard(_exceptionable, {
                    path: _path + ".isSubCategory",
                    expected: "boolean",
                    value: input.isSubCategory
                })) && (null === input.parentId || "string" === typeof input.parentId || $guard(_exceptionable, {
                    path: _path + ".parentId",
                    expected: "(null | string)",
                    value: input.parentId
                }));
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "GetShoppikCategoryResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "GetShoppikCategoryResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    GetStoreProductsResponse: (input: any): GetStoreProductsResponse => {
        const __is = (input: any): input is GetStoreProductsResponse => {
            const $io0 = (input: any): boolean => Array.isArray(input.products) && input.products.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem)) && (undefined === input.total || "number" === typeof input.total);
            const $io1 = (input: any): boolean => (undefined === input._id || "string" === typeof input._id) && "string" === typeof input.name && "string" === typeof input.slug && (Array.isArray(input.images) && input.images.every((elem: any) => "string" === typeof elem)) && "number" === typeof input.quantity;
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is GetStoreProductsResponse => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ((Array.isArray(input.products) || $guard(_exceptionable, {
                    path: _path + ".products",
                    expected: "Array<Pick<__type, \"_id\" | \"name\" | \"slug\" | \"images\" | \"quantity\">>",
                    value: input.products
                })) && input.products.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".products[" + _index1 + "]",
                    expected: "Pick<__type, \"_id\" | \"name\" | \"slug\" | \"images\" | \"quantity\">",
                    value: elem
                })) && $ao1(elem, _path + ".products[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".products[" + _index1 + "]",
                    expected: "Pick<__type, \"_id\" | \"name\" | \"slug\" | \"images\" | \"quantity\">",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".products",
                    expected: "Array<Pick<__type, \"_id\" | \"name\" | \"slug\" | \"images\" | \"quantity\">>",
                    value: input.products
                })) && (undefined === input.total || "number" === typeof input.total || $guard(_exceptionable, {
                    path: _path + ".total",
                    expected: "(number | undefined)",
                    value: input.total
                }));
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input._id || "string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "(string | undefined)",
                    value: input._id
                })) && ("string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                })) && ("string" === typeof input.slug || $guard(_exceptionable, {
                    path: _path + ".slug",
                    expected: "string",
                    value: input.slug
                })) && ((Array.isArray(input.images) || $guard(_exceptionable, {
                    path: _path + ".images",
                    expected: "Array<string>",
                    value: input.images
                })) && input.images.every((elem: any, _index2: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".images[" + _index2 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".images",
                    expected: "Array<string>",
                    value: input.images
                })) && ("number" === typeof input.quantity || $guard(_exceptionable, {
                    path: _path + ".quantity",
                    expected: "number",
                    value: input.quantity
                }));
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "GetStoreProductsResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "GetStoreProductsResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    GetStoreProductsRequest: (input: any): GetStoreProductsRequest => {
        const __is = (input: any): input is GetStoreProductsRequest => {
            const $io0 = (input: any): boolean => (undefined === input.query || "string" === typeof input.query) && (undefined === input.pagination || "object" === typeof input.pagination && null !== input.pagination && $io1(input.pagination));
            const $io1 = (input: any): boolean => ("ASC" === input.order || "DESC" === input.order) && "number" === typeof input.page && "number" === typeof input.pageSize && "string" === typeof input.sortBy;
            return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is GetStoreProductsRequest => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.query || "string" === typeof input.query || $guard(_exceptionable, {
                    path: _path + ".query",
                    expected: "(string | undefined)",
                    value: input.query
                })) && (undefined === input.pagination || ("object" === typeof input.pagination && null !== input.pagination || $guard(_exceptionable, {
                    path: _path + ".pagination",
                    expected: "(Pagination | undefined)",
                    value: input.pagination
                })) && $ao1(input.pagination, _path + ".pagination", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".pagination",
                    expected: "(Pagination | undefined)",
                    value: input.pagination
                }));
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("ASC" === input.order || "DESC" === input.order || $guard(_exceptionable, {
                    path: _path + ".order",
                    expected: "(\"ASC\" | \"DESC\")",
                    value: input.order
                })) && ("number" === typeof input.page || $guard(_exceptionable, {
                    path: _path + ".page",
                    expected: "number",
                    value: input.page
                })) && ("number" === typeof input.pageSize || $guard(_exceptionable, {
                    path: _path + ".pageSize",
                    expected: "number",
                    value: input.pageSize
                })) && ("string" === typeof input.sortBy || $guard(_exceptionable, {
                    path: _path + ".sortBy",
                    expected: "string",
                    value: input.sortBy
                }));
                return ("object" === typeof input && null !== input && false === Array.isArray(input) || $guard(true, {
                    path: _path + "",
                    expected: "GetStoreProductsRequest",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "GetStoreProductsRequest",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    GetProductDetailRequest: (input: any): GetProductDetailRequest => {
        const __is = (input: any): input is GetProductDetailRequest => {
            return "object" === typeof input && null !== input && "string" === typeof (input as any)._id;
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is GetProductDetailRequest => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => "string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "string",
                    value: input._id
                });
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "GetProductDetailRequest",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "GetProductDetailRequest",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    GetProductDetailResponse: (input: any): GetProductDetailResponse => {
        const __is = (input: any): input is GetProductDetailResponse => {
            const $io0 = (input: any): boolean => null === input.product || "object" === typeof input.product && null !== input.product && $io1(input.product);
            const $io1 = (input: any): boolean => (undefined === input._id || "string" === typeof input._id) && "string" === typeof input.storeId && "string" === typeof input.name && "string" === typeof input.slug && (undefined === input.description || "string" === typeof input.description) && (Array.isArray(input.keyFeatures) && input.keyFeatures.every((elem: any) => "string" === typeof elem)) && (Array.isArray(input.images) && input.images.every((elem: any) => "string" === typeof elem)) && "number" === typeof input.originPrice && "number" === typeof input.quantity && ("object" === typeof input.rating && null !== input.rating && ("number" === typeof (input.rating as any).score && "number" === typeof (input.rating as any).reviews && "number" === typeof (input.rating as any).sold)) && (Array.isArray(input.storeCategories) && input.storeCategories.every((elem: any) => "object" === typeof elem && null !== elem && $io3(elem))) && (Array.isArray(input.shoppikCategories) && input.shoppikCategories.every((elem: any) => "string" === typeof elem)) && (Array.isArray(input.variants) && input.variants.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && (Array.isArray(input.detail) && input.detail.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && ("object" === typeof input.lastSavedAt && null !== input.lastSavedAt && true) && "boolean" === typeof input.isDraft && (undefined === input.isDeleted || "boolean" === typeof input.isDeleted) && ("object" === typeof input.createdAt && null !== input.createdAt && true) && (undefined === input.deletedAt || "object" === typeof input.deletedAt && null !== input.deletedAt && false === Array.isArray(input.deletedAt) && $io5(input.deletedAt)) && (undefined === input.updatedAt || "object" === typeof input.updatedAt && null !== input.updatedAt && false === Array.isArray(input.updatedAt) && $io5(input.updatedAt));
            const $io3 = (input: any): boolean => "string" === typeof input._id && "string" === typeof input.name && "string" === typeof input.slug;
            const $io4 = (input: any): boolean => "string" === typeof input.k && "string" === typeof input.v;
            const $io5 = (input: any): boolean => true;
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is GetProductDetailResponse => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => null === input.product || ("object" === typeof input.product && null !== input.product || $guard(_exceptionable, {
                    path: _path + ".product",
                    expected: "(__type | null)",
                    value: input.product
                })) && $ao1(input.product, _path + ".product", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".product",
                    expected: "(__type | null)",
                    value: input.product
                });
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input._id || "string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "(string | undefined)",
                    value: input._id
                })) && ("string" === typeof input.storeId || $guard(_exceptionable, {
                    path: _path + ".storeId",
                    expected: "string",
                    value: input.storeId
                })) && ("string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                })) && ("string" === typeof input.slug || $guard(_exceptionable, {
                    path: _path + ".slug",
                    expected: "string",
                    value: input.slug
                })) && (undefined === input.description || "string" === typeof input.description || $guard(_exceptionable, {
                    path: _path + ".description",
                    expected: "(string | undefined)",
                    value: input.description
                })) && ((Array.isArray(input.keyFeatures) || $guard(_exceptionable, {
                    path: _path + ".keyFeatures",
                    expected: "Array<string>",
                    value: input.keyFeatures
                })) && input.keyFeatures.every((elem: any, _index1: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".keyFeatures[" + _index1 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".keyFeatures",
                    expected: "Array<string>",
                    value: input.keyFeatures
                })) && ((Array.isArray(input.images) || $guard(_exceptionable, {
                    path: _path + ".images",
                    expected: "Array<string>",
                    value: input.images
                })) && input.images.every((elem: any, _index2: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".images[" + _index2 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".images",
                    expected: "Array<string>",
                    value: input.images
                })) && ("number" === typeof input.originPrice || $guard(_exceptionable, {
                    path: _path + ".originPrice",
                    expected: "number",
                    value: input.originPrice
                })) && ("number" === typeof input.quantity || $guard(_exceptionable, {
                    path: _path + ".quantity",
                    expected: "number",
                    value: input.quantity
                })) && (("object" === typeof input.rating && null !== input.rating || $guard(_exceptionable, {
                    path: _path + ".rating",
                    expected: "__type.o1",
                    value: input.rating
                })) && $ao2(input.rating, _path + ".rating", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".rating",
                    expected: "__type.o1",
                    value: input.rating
                })) && ((Array.isArray(input.storeCategories) || $guard(_exceptionable, {
                    path: _path + ".storeCategories",
                    expected: "Array<__type>",
                    value: input.storeCategories
                })) && input.storeCategories.every((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".storeCategories[" + _index3 + "]",
                    expected: "__type.o2",
                    value: elem
                })) && $ao3(elem, _path + ".storeCategories[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".storeCategories[" + _index3 + "]",
                    expected: "__type.o2",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".storeCategories",
                    expected: "Array<__type>",
                    value: input.storeCategories
                })) && ((Array.isArray(input.shoppikCategories) || $guard(_exceptionable, {
                    path: _path + ".shoppikCategories",
                    expected: "Array<string>",
                    value: input.shoppikCategories
                })) && input.shoppikCategories.every((elem: any, _index4: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".shoppikCategories[" + _index4 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".shoppikCategories",
                    expected: "Array<string>",
                    value: input.shoppikCategories
                })) && ((Array.isArray(input.variants) || $guard(_exceptionable, {
                    path: _path + ".variants",
                    expected: "Array<__type>.o1",
                    value: input.variants
                })) && input.variants.every((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".variants[" + _index5 + "]",
                    expected: "__type.o3",
                    value: elem
                })) && $ao4(elem, _path + ".variants[" + _index5 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".variants[" + _index5 + "]",
                    expected: "__type.o3",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".variants",
                    expected: "Array<__type>.o1",
                    value: input.variants
                })) && ((Array.isArray(input.detail) || $guard(_exceptionable, {
                    path: _path + ".detail",
                    expected: "Array<__type>.o1",
                    value: input.detail
                })) && input.detail.every((elem: any, _index6: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".detail[" + _index6 + "]",
                    expected: "__type.o3",
                    value: elem
                })) && $ao4(elem, _path + ".detail[" + _index6 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".detail[" + _index6 + "]",
                    expected: "__type.o3",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".detail",
                    expected: "Array<__type>.o1",
                    value: input.detail
                })) && (("object" === typeof input.lastSavedAt && null !== input.lastSavedAt && false === Array.isArray(input.lastSavedAt) || $guard(_exceptionable, {
                    path: _path + ".lastSavedAt",
                    expected: "__type.o4",
                    value: input.lastSavedAt
                })) && $ao5(input.lastSavedAt, _path + ".lastSavedAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".lastSavedAt",
                    expected: "__type.o4",
                    value: input.lastSavedAt
                })) && ("boolean" === typeof input.isDraft || $guard(_exceptionable, {
                    path: _path + ".isDraft",
                    expected: "boolean",
                    value: input.isDraft
                })) && (undefined === input.isDeleted || "boolean" === typeof input.isDeleted || $guard(_exceptionable, {
                    path: _path + ".isDeleted",
                    expected: "(boolean | undefined)",
                    value: input.isDeleted
                })) && (("object" === typeof input.createdAt && null !== input.createdAt && false === Array.isArray(input.createdAt) || $guard(_exceptionable, {
                    path: _path + ".createdAt",
                    expected: "__type.o4",
                    value: input.createdAt
                })) && $ao5(input.createdAt, _path + ".createdAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".createdAt",
                    expected: "__type.o4",
                    value: input.createdAt
                })) && (undefined === input.deletedAt || ("object" === typeof input.deletedAt && null !== input.deletedAt && false === Array.isArray(input.deletedAt) || $guard(_exceptionable, {
                    path: _path + ".deletedAt",
                    expected: "(__type.o4 | undefined)",
                    value: input.deletedAt
                })) && $ao5(input.deletedAt, _path + ".deletedAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".deletedAt",
                    expected: "(__type.o4 | undefined)",
                    value: input.deletedAt
                })) && (undefined === input.updatedAt || ("object" === typeof input.updatedAt && null !== input.updatedAt && false === Array.isArray(input.updatedAt) || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(__type.o4 | undefined)",
                    value: input.updatedAt
                })) && $ao5(input.updatedAt, _path + ".updatedAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(__type.o4 | undefined)",
                    value: input.updatedAt
                }));
                const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.score || $guard(_exceptionable, {
                    path: _path + ".score",
                    expected: "number",
                    value: input.score
                })) && ("number" === typeof input.reviews || $guard(_exceptionable, {
                    path: _path + ".reviews",
                    expected: "number",
                    value: input.reviews
                })) && ("number" === typeof input.sold || $guard(_exceptionable, {
                    path: _path + ".sold",
                    expected: "number",
                    value: input.sold
                }));
                const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "string",
                    value: input._id
                })) && ("string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                })) && ("string" === typeof input.slug || $guard(_exceptionable, {
                    path: _path + ".slug",
                    expected: "string",
                    value: input.slug
                }));
                const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.k || $guard(_exceptionable, {
                    path: _path + ".k",
                    expected: "string",
                    value: input.k
                })) && ("string" === typeof input.v || $guard(_exceptionable, {
                    path: _path + ".v",
                    expected: "string",
                    value: input.v
                }));
                const $ao5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => true;
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "GetProductDetailResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "GetProductDetailResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
};
export { product };
