'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async render() {
        const { ctx } = this;

        if (ctx.session.lastVisit) {

            console.log('========== ctx.session.lastVisit ==========');
            console.log(ctx.session.lastVisit);

            console.log('========== ctx.session ==========');
            console.log(ctx.session);

            console.log('========== ctx.user ==========');
            console.log(ctx.user);
        }

        ctx.session.lastVisit = new Date();

        await ctx.render('index', {
            title: 'Hello world',
            user: JSON.stringify(ctx.user)
        });
    }
}

module.exports = HomeController;