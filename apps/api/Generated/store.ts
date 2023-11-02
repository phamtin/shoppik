import { createAssert } from 'typia';
import { CreateStoreResponse, CreateStoreRequest, GetMyStoreResponse, UpdateStoreRequest, UpdateStoreResponse } from 'Router/store.route';
const store = {
    CreateStoreResponse: (input: any): CreateStoreResponse => {
        const __is = (input: any): input is CreateStoreResponse => {
            return "object" === typeof input && null !== input && "string" === typeof (input as any).insertedId;
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is CreateStoreResponse => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => "string" === typeof input.insertedId || $guard(_exceptionable, {
                    path: _path + ".insertedId",
                    expected: "string",
                    value: input.insertedId
                });
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "CreateStoreResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "CreateStoreResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    CreateStoreRequest: (input: any): CreateStoreRequest => {
        const __is = (input: any): input is CreateStoreRequest => {
            const $io0 = (input: any): boolean => "string" === typeof input.name && "string" === typeof input.avatar && "string" === typeof input.tradeName && "string" === typeof input.description && "string" === typeof input.landingPageUrl && (Array.isArray(input.tags) && input.tags.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem))) && ("object" === typeof input.contact && null !== input.contact && $io2(input.contact)) && ("object" === typeof input.storeAddress && null !== input.storeAddress && ("string" === typeof (input.storeAddress as any).province && "string" === typeof (input.storeAddress as any).district && "string" === typeof (input.storeAddress as any).ward && "string" === typeof (input.storeAddress as any).street && "string" === typeof (input.storeAddress as any).note));
            const $io1 = (input: any): boolean => "string" === typeof input._id && "string" === typeof input.name && "string" === typeof input.slug;
            const $io2 = (input: any): boolean => "string" === typeof input.email && (Array.isArray(input.phone) && input.phone.every((elem: any) => "string" === typeof elem)) && (undefined === input.youtubeLink || "string" === typeof input.youtubeLink) && (undefined === input.facebookLink || "string" === typeof input.facebookLink) && (undefined === input.instagramLink || "string" === typeof input.instagramLink);
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is CreateStoreRequest => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                })) && ("string" === typeof input.avatar || $guard(_exceptionable, {
                    path: _path + ".avatar",
                    expected: "string",
                    value: input.avatar
                })) && ("string" === typeof input.tradeName || $guard(_exceptionable, {
                    path: _path + ".tradeName",
                    expected: "string",
                    value: input.tradeName
                })) && ("string" === typeof input.description || $guard(_exceptionable, {
                    path: _path + ".description",
                    expected: "string",
                    value: input.description
                })) && ("string" === typeof input.landingPageUrl || $guard(_exceptionable, {
                    path: _path + ".landingPageUrl",
                    expected: "string",
                    value: input.landingPageUrl
                })) && ((Array.isArray(input.tags) || $guard(_exceptionable, {
                    path: _path + ".tags",
                    expected: "Array<__type>",
                    value: input.tags
                })) && input.tags.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".tags[" + _index1 + "]",
                    expected: "__type",
                    value: elem
                })) && $ao1(elem, _path + ".tags[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".tags[" + _index1 + "]",
                    expected: "__type",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".tags",
                    expected: "Array<__type>",
                    value: input.tags
                })) && (("object" === typeof input.contact && null !== input.contact || $guard(_exceptionable, {
                    path: _path + ".contact",
                    expected: "Contact",
                    value: input.contact
                })) && $ao2(input.contact, _path + ".contact", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".contact",
                    expected: "Contact",
                    value: input.contact
                })) && (("object" === typeof input.storeAddress && null !== input.storeAddress || $guard(_exceptionable, {
                    path: _path + ".storeAddress",
                    expected: "StoreAddress",
                    value: input.storeAddress
                })) && $ao3(input.storeAddress, _path + ".storeAddress", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".storeAddress",
                    expected: "StoreAddress",
                    value: input.storeAddress
                }));
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input._id || $guard(_exceptionable, {
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
                const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.email || $guard(_exceptionable, {
                    path: _path + ".email",
                    expected: "string",
                    value: input.email
                })) && ((Array.isArray(input.phone) || $guard(_exceptionable, {
                    path: _path + ".phone",
                    expected: "Array<string>",
                    value: input.phone
                })) && input.phone.every((elem: any, _index2: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".phone[" + _index2 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".phone",
                    expected: "Array<string>",
                    value: input.phone
                })) && (undefined === input.youtubeLink || "string" === typeof input.youtubeLink || $guard(_exceptionable, {
                    path: _path + ".youtubeLink",
                    expected: "(string | undefined)",
                    value: input.youtubeLink
                })) && (undefined === input.facebookLink || "string" === typeof input.facebookLink || $guard(_exceptionable, {
                    path: _path + ".facebookLink",
                    expected: "(string | undefined)",
                    value: input.facebookLink
                })) && (undefined === input.instagramLink || "string" === typeof input.instagramLink || $guard(_exceptionable, {
                    path: _path + ".instagramLink",
                    expected: "(string | undefined)",
                    value: input.instagramLink
                }));
                const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.province || $guard(_exceptionable, {
                    path: _path + ".province",
                    expected: "string",
                    value: input.province
                })) && ("string" === typeof input.district || $guard(_exceptionable, {
                    path: _path + ".district",
                    expected: "string",
                    value: input.district
                })) && ("string" === typeof input.ward || $guard(_exceptionable, {
                    path: _path + ".ward",
                    expected: "string",
                    value: input.ward
                })) && ("string" === typeof input.street || $guard(_exceptionable, {
                    path: _path + ".street",
                    expected: "string",
                    value: input.street
                })) && ("string" === typeof input.note || $guard(_exceptionable, {
                    path: _path + ".note",
                    expected: "string",
                    value: input.note
                }));
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "CreateStoreRequest",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "CreateStoreRequest",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    GetMyStoreResponse: (input: any): GetMyStoreResponse => {
        const __is = (input: any): input is GetMyStoreResponse => {
            const $io0 = (input: any): boolean => null === input.data || "object" === typeof input.data && null !== input.data && $io1(input.data);
            const $io1 = (input: any): boolean => (undefined === input._id || "string" === typeof input._id) && "string" === typeof input.name && "string" === typeof input.slug && "string" === typeof input.tradeName && "string" === typeof input.description && ("object" === typeof input.storeAddress && null !== input.storeAddress && ("string" === typeof (input.storeAddress as any).province && "string" === typeof (input.storeAddress as any).district && "string" === typeof (input.storeAddress as any).ward && "string" === typeof (input.storeAddress as any).street && "string" === typeof (input.storeAddress as any).note)) && "string" === typeof input.avatar && "string" === typeof input.ownerId && "string" === typeof input.landingPageUrl && (Array.isArray(input.followers) && input.followers.every((elem: any) => "string" === typeof elem)) && (Array.isArray(input.following) && input.following.every((elem: any) => "string" === typeof elem)) && ("object" === typeof input.rating && null !== input.rating && ("number" === typeof (input.rating as any).score && "number" === typeof (input.rating as any).reviews && "number" === typeof (input.rating as any).responseTime)) && (Array.isArray(input.tags) && input.tags.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && ("object" === typeof input.contact && null !== input.contact && $io5(input.contact)) && ("ACTIVE" === input.storeStatus || "INACTIVE" === input.storeStatus || "CLOSED" === input.storeStatus || "DELETED" === input.storeStatus) && (undefined === input.isDeleted || "boolean" === typeof input.isDeleted) && (undefined === input.deletedAt || "object" === typeof input.deletedAt && null !== input.deletedAt && false === Array.isArray(input.deletedAt) && $io6(input.deletedAt)) && (undefined === input.updatedAt || "object" === typeof input.updatedAt && null !== input.updatedAt && false === Array.isArray(input.updatedAt) && $io6(input.updatedAt)) && ("object" === typeof input.createdAt && null !== input.createdAt && true);
            const $io4 = (input: any): boolean => "string" === typeof input._id && "string" === typeof input.name && "string" === typeof input.slug;
            const $io5 = (input: any): boolean => "string" === typeof input.email && (Array.isArray(input.phone) && input.phone.every((elem: any) => "string" === typeof elem)) && (undefined === input.youtubeLink || "string" === typeof input.youtubeLink) && (undefined === input.facebookLink || "string" === typeof input.facebookLink) && (undefined === input.instagramLink || "string" === typeof input.instagramLink);
            const $io6 = (input: any): boolean => true;
            return "object" === typeof input && null !== input && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is GetMyStoreResponse => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => null === input.data || ("object" === typeof input.data && null !== input.data || $guard(_exceptionable, {
                    path: _path + ".data",
                    expected: "(__type | null)",
                    value: input.data
                })) && $ao1(input.data, _path + ".data", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".data",
                    expected: "(__type | null)",
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
                })) && ("string" === typeof input.slug || $guard(_exceptionable, {
                    path: _path + ".slug",
                    expected: "string",
                    value: input.slug
                })) && ("string" === typeof input.tradeName || $guard(_exceptionable, {
                    path: _path + ".tradeName",
                    expected: "string",
                    value: input.tradeName
                })) && ("string" === typeof input.description || $guard(_exceptionable, {
                    path: _path + ".description",
                    expected: "string",
                    value: input.description
                })) && (("object" === typeof input.storeAddress && null !== input.storeAddress || $guard(_exceptionable, {
                    path: _path + ".storeAddress",
                    expected: "__type.o1",
                    value: input.storeAddress
                })) && $ao2(input.storeAddress, _path + ".storeAddress", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".storeAddress",
                    expected: "__type.o1",
                    value: input.storeAddress
                })) && ("string" === typeof input.avatar || $guard(_exceptionable, {
                    path: _path + ".avatar",
                    expected: "string",
                    value: input.avatar
                })) && ("string" === typeof input.ownerId || $guard(_exceptionable, {
                    path: _path + ".ownerId",
                    expected: "string",
                    value: input.ownerId
                })) && ("string" === typeof input.landingPageUrl || $guard(_exceptionable, {
                    path: _path + ".landingPageUrl",
                    expected: "string",
                    value: input.landingPageUrl
                })) && ((Array.isArray(input.followers) || $guard(_exceptionable, {
                    path: _path + ".followers",
                    expected: "Array<string>",
                    value: input.followers
                })) && input.followers.every((elem: any, _index1: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".followers[" + _index1 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".followers",
                    expected: "Array<string>",
                    value: input.followers
                })) && ((Array.isArray(input.following) || $guard(_exceptionable, {
                    path: _path + ".following",
                    expected: "Array<string>",
                    value: input.following
                })) && input.following.every((elem: any, _index2: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".following[" + _index2 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".following",
                    expected: "Array<string>",
                    value: input.following
                })) && (("object" === typeof input.rating && null !== input.rating || $guard(_exceptionable, {
                    path: _path + ".rating",
                    expected: "__type.o2",
                    value: input.rating
                })) && $ao3(input.rating, _path + ".rating", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".rating",
                    expected: "__type.o2",
                    value: input.rating
                })) && ((Array.isArray(input.tags) || $guard(_exceptionable, {
                    path: _path + ".tags",
                    expected: "Array<__type>",
                    value: input.tags
                })) && input.tags.every((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                    path: _path + ".tags[" + _index3 + "]",
                    expected: "__type.o3",
                    value: elem
                })) && $ao4(elem, _path + ".tags[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".tags[" + _index3 + "]",
                    expected: "__type.o3",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".tags",
                    expected: "Array<__type>",
                    value: input.tags
                })) && (("object" === typeof input.contact && null !== input.contact || $guard(_exceptionable, {
                    path: _path + ".contact",
                    expected: "__type.o4",
                    value: input.contact
                })) && $ao5(input.contact, _path + ".contact", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".contact",
                    expected: "__type.o4",
                    value: input.contact
                })) && ("ACTIVE" === input.storeStatus || "INACTIVE" === input.storeStatus || "CLOSED" === input.storeStatus || "DELETED" === input.storeStatus || $guard(_exceptionable, {
                    path: _path + ".storeStatus",
                    expected: "(\"ACTIVE\" | \"CLOSED\" | \"DELETED\" | \"INACTIVE\")",
                    value: input.storeStatus
                })) && (undefined === input.isDeleted || "boolean" === typeof input.isDeleted || $guard(_exceptionable, {
                    path: _path + ".isDeleted",
                    expected: "(boolean | undefined)",
                    value: input.isDeleted
                })) && (undefined === input.deletedAt || ("object" === typeof input.deletedAt && null !== input.deletedAt && false === Array.isArray(input.deletedAt) || $guard(_exceptionable, {
                    path: _path + ".deletedAt",
                    expected: "(__type.o5 | undefined)",
                    value: input.deletedAt
                })) && $ao6(input.deletedAt, _path + ".deletedAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".deletedAt",
                    expected: "(__type.o5 | undefined)",
                    value: input.deletedAt
                })) && (undefined === input.updatedAt || ("object" === typeof input.updatedAt && null !== input.updatedAt && false === Array.isArray(input.updatedAt) || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(__type.o5 | undefined)",
                    value: input.updatedAt
                })) && $ao6(input.updatedAt, _path + ".updatedAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".updatedAt",
                    expected: "(__type.o5 | undefined)",
                    value: input.updatedAt
                })) && (("object" === typeof input.createdAt && null !== input.createdAt && false === Array.isArray(input.createdAt) || $guard(_exceptionable, {
                    path: _path + ".createdAt",
                    expected: "__type.o5",
                    value: input.createdAt
                })) && $ao6(input.createdAt, _path + ".createdAt", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".createdAt",
                    expected: "__type.o5",
                    value: input.createdAt
                }));
                const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.province || $guard(_exceptionable, {
                    path: _path + ".province",
                    expected: "string",
                    value: input.province
                })) && ("string" === typeof input.district || $guard(_exceptionable, {
                    path: _path + ".district",
                    expected: "string",
                    value: input.district
                })) && ("string" === typeof input.ward || $guard(_exceptionable, {
                    path: _path + ".ward",
                    expected: "string",
                    value: input.ward
                })) && ("string" === typeof input.street || $guard(_exceptionable, {
                    path: _path + ".street",
                    expected: "string",
                    value: input.street
                })) && ("string" === typeof input.note || $guard(_exceptionable, {
                    path: _path + ".note",
                    expected: "string",
                    value: input.note
                }));
                const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.score || $guard(_exceptionable, {
                    path: _path + ".score",
                    expected: "number",
                    value: input.score
                })) && ("number" === typeof input.reviews || $guard(_exceptionable, {
                    path: _path + ".reviews",
                    expected: "number",
                    value: input.reviews
                })) && ("number" === typeof input.responseTime || $guard(_exceptionable, {
                    path: _path + ".responseTime",
                    expected: "number",
                    value: input.responseTime
                }));
                const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input._id || $guard(_exceptionable, {
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
                const $ao5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.email || $guard(_exceptionable, {
                    path: _path + ".email",
                    expected: "string",
                    value: input.email
                })) && ((Array.isArray(input.phone) || $guard(_exceptionable, {
                    path: _path + ".phone",
                    expected: "Array<string>",
                    value: input.phone
                })) && input.phone.every((elem: any, _index4: number) => "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".phone[" + _index4 + "]",
                    expected: "string",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".phone",
                    expected: "Array<string>",
                    value: input.phone
                })) && (undefined === input.youtubeLink || "string" === typeof input.youtubeLink || $guard(_exceptionable, {
                    path: _path + ".youtubeLink",
                    expected: "(string | undefined)",
                    value: input.youtubeLink
                })) && (undefined === input.facebookLink || "string" === typeof input.facebookLink || $guard(_exceptionable, {
                    path: _path + ".facebookLink",
                    expected: "(string | undefined)",
                    value: input.facebookLink
                })) && (undefined === input.instagramLink || "string" === typeof input.instagramLink || $guard(_exceptionable, {
                    path: _path + ".instagramLink",
                    expected: "(string | undefined)",
                    value: input.instagramLink
                }));
                const $ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => true;
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "GetMyStoreResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "GetMyStoreResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    UpdateStoreRequest: (input: any): UpdateStoreRequest => {
        const __is = (input: any): input is UpdateStoreRequest => {
            const $io0 = (input: any): boolean => (undefined === input.name || "string" === typeof input.name) && (undefined === input.avatar || "string" === typeof input.avatar) && (undefined === input.tradeName || "string" === typeof input.tradeName) && (undefined === input.description || "string" === typeof input.description) && (undefined === input.landingPageUrl || "string" === typeof input.landingPageUrl) && (undefined === input.tags || Array.isArray(input.tags) && input.tags.every((elem: any) => undefined === elem || "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io1(elem))) && (undefined === input.contact || "object" === typeof input.contact && null !== input.contact && false === Array.isArray(input.contact) && $io2(input.contact)) && (undefined === input.storeAddress || "object" === typeof input.storeAddress && null !== input.storeAddress && false === Array.isArray(input.storeAddress) && $io3(input.storeAddress));
            const $io1 = (input: any): boolean => (undefined === input._id || "string" === typeof input._id) && (undefined === input.name || "string" === typeof input.name) && (undefined === input.slug || "string" === typeof input.slug);
            const $io2 = (input: any): boolean => (undefined === input.email || "string" === typeof input.email) && (undefined === input.phone || Array.isArray(input.phone) && input.phone.every((elem: any) => undefined === elem || "string" === typeof elem)) && (undefined === input.youtubeLink || "string" === typeof input.youtubeLink) && (undefined === input.facebookLink || "string" === typeof input.facebookLink) && (undefined === input.instagramLink || "string" === typeof input.instagramLink);
            const $io3 = (input: any): boolean => (undefined === input.province || "string" === typeof input.province) && (undefined === input.district || "string" === typeof input.district) && (undefined === input.ward || "string" === typeof input.ward) && (undefined === input.street || "string" === typeof input.street) && (undefined === input.note || "string" === typeof input.note);
            return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is UpdateStoreRequest => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.name || "string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "(string | undefined)",
                    value: input.name
                })) && (undefined === input.avatar || "string" === typeof input.avatar || $guard(_exceptionable, {
                    path: _path + ".avatar",
                    expected: "(string | undefined)",
                    value: input.avatar
                })) && (undefined === input.tradeName || "string" === typeof input.tradeName || $guard(_exceptionable, {
                    path: _path + ".tradeName",
                    expected: "(string | undefined)",
                    value: input.tradeName
                })) && (undefined === input.description || "string" === typeof input.description || $guard(_exceptionable, {
                    path: _path + ".description",
                    expected: "(string | undefined)",
                    value: input.description
                })) && (undefined === input.landingPageUrl || "string" === typeof input.landingPageUrl || $guard(_exceptionable, {
                    path: _path + ".landingPageUrl",
                    expected: "(string | undefined)",
                    value: input.landingPageUrl
                })) && (undefined === input.tags || (Array.isArray(input.tags) || $guard(_exceptionable, {
                    path: _path + ".tags",
                    expected: "(Array<{ _id?: string | undefined; name?: string | undefined; slug?: string | undefined; } | undefined> | undefined)",
                    value: input.tags
                })) && input.tags.every((elem: any, _index1: number) => undefined === elem || ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                    path: _path + ".tags[" + _index1 + "]",
                    expected: "(__type.o1 | undefined)",
                    value: elem
                })) && $ao1(elem, _path + ".tags[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".tags[" + _index1 + "]",
                    expected: "(__type.o1 | undefined)",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".tags",
                    expected: "(Array<{ _id?: string | undefined; name?: string | undefined; slug?: string | undefined; } | undefined> | undefined)",
                    value: input.tags
                })) && (undefined === input.contact || ("object" === typeof input.contact && null !== input.contact && false === Array.isArray(input.contact) || $guard(_exceptionable, {
                    path: _path + ".contact",
                    expected: "(__type.o2 | undefined)",
                    value: input.contact
                })) && $ao2(input.contact, _path + ".contact", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".contact",
                    expected: "(__type.o2 | undefined)",
                    value: input.contact
                })) && (undefined === input.storeAddress || ("object" === typeof input.storeAddress && null !== input.storeAddress && false === Array.isArray(input.storeAddress) || $guard(_exceptionable, {
                    path: _path + ".storeAddress",
                    expected: "(__type.o3 | undefined)",
                    value: input.storeAddress
                })) && $ao3(input.storeAddress, _path + ".storeAddress", true && _exceptionable) || $guard(_exceptionable, {
                    path: _path + ".storeAddress",
                    expected: "(__type.o3 | undefined)",
                    value: input.storeAddress
                }));
                const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input._id || "string" === typeof input._id || $guard(_exceptionable, {
                    path: _path + "._id",
                    expected: "(string | undefined)",
                    value: input._id
                })) && (undefined === input.name || "string" === typeof input.name || $guard(_exceptionable, {
                    path: _path + ".name",
                    expected: "(string | undefined)",
                    value: input.name
                })) && (undefined === input.slug || "string" === typeof input.slug || $guard(_exceptionable, {
                    path: _path + ".slug",
                    expected: "(string | undefined)",
                    value: input.slug
                }));
                const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.email || "string" === typeof input.email || $guard(_exceptionable, {
                    path: _path + ".email",
                    expected: "(string | undefined)",
                    value: input.email
                })) && (undefined === input.phone || (Array.isArray(input.phone) || $guard(_exceptionable, {
                    path: _path + ".phone",
                    expected: "(Array<string | undefined> | undefined)",
                    value: input.phone
                })) && input.phone.every((elem: any, _index2: number) => undefined === elem || "string" === typeof elem || $guard(_exceptionable, {
                    path: _path + ".phone[" + _index2 + "]",
                    expected: "(string | undefined)",
                    value: elem
                })) || $guard(_exceptionable, {
                    path: _path + ".phone",
                    expected: "(Array<string | undefined> | undefined)",
                    value: input.phone
                })) && (undefined === input.youtubeLink || "string" === typeof input.youtubeLink || $guard(_exceptionable, {
                    path: _path + ".youtubeLink",
                    expected: "(string | undefined)",
                    value: input.youtubeLink
                })) && (undefined === input.facebookLink || "string" === typeof input.facebookLink || $guard(_exceptionable, {
                    path: _path + ".facebookLink",
                    expected: "(string | undefined)",
                    value: input.facebookLink
                })) && (undefined === input.instagramLink || "string" === typeof input.instagramLink || $guard(_exceptionable, {
                    path: _path + ".instagramLink",
                    expected: "(string | undefined)",
                    value: input.instagramLink
                }));
                const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.province || "string" === typeof input.province || $guard(_exceptionable, {
                    path: _path + ".province",
                    expected: "(string | undefined)",
                    value: input.province
                })) && (undefined === input.district || "string" === typeof input.district || $guard(_exceptionable, {
                    path: _path + ".district",
                    expected: "(string | undefined)",
                    value: input.district
                })) && (undefined === input.ward || "string" === typeof input.ward || $guard(_exceptionable, {
                    path: _path + ".ward",
                    expected: "(string | undefined)",
                    value: input.ward
                })) && (undefined === input.street || "string" === typeof input.street || $guard(_exceptionable, {
                    path: _path + ".street",
                    expected: "(string | undefined)",
                    value: input.street
                })) && (undefined === input.note || "string" === typeof input.note || $guard(_exceptionable, {
                    path: _path + ".note",
                    expected: "(string | undefined)",
                    value: input.note
                }));
                return ("object" === typeof input && null !== input && false === Array.isArray(input) || $guard(true, {
                    path: _path + "",
                    expected: "__type",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "__type",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
    UpdateStoreResponse: (input: any): UpdateStoreResponse => {
        const __is = (input: any): input is UpdateStoreResponse => {
            return "object" === typeof input && null !== input && "boolean" === typeof (input as any).res;
        };
        if (false === __is(input))
            ((input: any, _path: string, _exceptionable: boolean = true): input is UpdateStoreResponse => {
                const $guard = (createAssert as any).guard;
                const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => "boolean" === typeof input.res || $guard(_exceptionable, {
                    path: _path + ".res",
                    expected: "boolean",
                    value: input.res
                });
                return ("object" === typeof input && null !== input || $guard(true, {
                    path: _path + "",
                    expected: "UpdateStoreResponse",
                    value: input
                })) && $ao0(input, _path + "", true) || $guard(true, {
                    path: _path + "",
                    expected: "UpdateStoreResponse",
                    value: input
                });
            })(input, "$input", true);
        return input;
    },
};
export { store };
