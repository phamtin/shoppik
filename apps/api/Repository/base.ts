import { AnyBulkWriteOperation } from 'mongodb';
import LeanResultType, { Model, Types, PipelineStage, MongooseBulkWriteOptions } from 'mongoose';

type FilterQuery<T> = LeanResultType.FilterQuery<T>;
type QueryOptions<T> = LeanResultType.QueryOptions<T>;
type UpdateQuery<T> = LeanResultType.UpdateQuery<T>;
type ProjectionType<T> = LeanResultType.ProjectionType<T>;
type PopulateOption = LeanResultType.PopulateOption;

const makeBaseRepo = <T>(EntityModel: Model<T>) => {
	type Entity = typeof EntityModel;

	const countDocuments = async (filter: FilterQuery<T> = {}): Promise<number> => EntityModel.countDocuments(filter);

	const find = async (filter: FilterQuery<T>, options: QueryOptions<T> = {}, projection?: ProjectionType<T>): Promise<T[]> => {
		const { populate, sort } = options;
		const query = EntityModel.find(filter, projection);
		if (sort) await query.sort(sort as string);
		if (!populate) return query.lean();
		if (populate instanceof Array) return query.populate(populate).lean();
		return query.populate([populate]).lean();
	};

	const findOne = async (filter: FilterQuery<T>, options: PopulateOption = {}, projection?: ProjectionType<T>): Promise<T | null> => {
		const { populate } = options;
		const query = EntityModel.findOne(filter, projection);
		if (!populate) return query.lean();
		if (populate instanceof Array) return query.populate(populate).lean();
		return query.populate([populate]).lean();
	};

	const findById = async (_id: Types.ObjectId, options: QueryOptions<T> = {}, projection?: ProjectionType<T>): Promise<T | null> => {
		return EntityModel.findById(_id, projection, options);
	};

	const create = async (data: FilterQuery<T>): Promise<T> => {
		return await EntityModel.create(data);
	};

	const findByIdAndUpdate = async (_id: Types.ObjectId, data: UpdateQuery<T>, options: QueryOptions<T> = {}): Promise<T | null> => {
		return EntityModel.findByIdAndUpdate(_id, data, options);
	};

	const findOneAndUpdate = async (filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<T | null> => {
		return EntityModel.findOneAndUpdate(filter, data);
	};

	const deleteById = async (_id: Types.ObjectId, options?: QueryOptions<T>) => {
		return EntityModel.findByIdAndDelete(_id, options);
	};

	const deleteMany = async (filter: FilterQuery<Entity> = {}, options: QueryOptions<T> = {}) => {
		return EntityModel.deleteMany(filter, options);
	};

	const bulkWrite = async (data: Array<AnyBulkWriteOperation>, options: MongooseBulkWriteOptions = {}) => {
		return EntityModel.bulkWrite(data, options);
	};

	const aggregate = async (pipeline: PipelineStage[] = [], options: LeanResultType.AggregateOptions = {}) => {
		return EntityModel.aggregate(pipeline, options);
	};

	const paginate = async (filter: FilterQuery<T>, options: QueryOptions<T>) => {
		const { sort, populate, page, limit } = options;
		const [total, items] = await Promise.all([
			EntityModel.countDocuments(filter),
			EntityModel.find(filter, {
				lean: true,
				sort,
				page,
				limit,
				populate,
			}),
		]);
		return { total, items };
	};

	return Object.freeze({
		countDocuments,
		find,
		findById,
		findOne,
		create,
		findByIdAndUpdate,
		findOneAndUpdate,
		deleteById,
		deleteMany,
		bulkWrite,
		paginate,
		aggregate,
	});
};

export default makeBaseRepo;
