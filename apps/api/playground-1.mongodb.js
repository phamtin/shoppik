/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('app_shoppik');

db.getCollection('stores').aggregate([
	// Find all of the sales that occurred in 2014.
	{
		$match: {
			createdAt: {
				$gte: new Date('2023-10-14T17:21:26.456+00:00'),
			},
		},
	},
	{
		$unwind: {
			path: '$contact.phone',
			preserveNullAndEmptyArrays: true,
		},
	},
]);
