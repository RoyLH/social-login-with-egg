'use strict';
module.exports = app => {
    const mongoose = app.mongoose,
        Schema = mongoose.Schema;

    let ArticleSchema = new Schema({
        title: {
            type: String,
            default: '',
            trim: true,
            required: 'Title can not be blank'
        },
        content: {
            type: String,
            default: '',
            trim: true
        },
        creator: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    }, {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    });

    return mongoose.model('Article', ArticleSchema, 'articles');
};