'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async render() {
        await this.ctx.render('index.ejs', {
            title: 'Hello world',
            user: JSON.stringify(req.user)
        });
    }
}

module.exports = IndexController;