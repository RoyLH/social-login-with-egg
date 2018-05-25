'use strict'

module.exports = app => {
    const { router, controller } = app;

    const { home, user } = controller;

    router.get('/', home.render);
};