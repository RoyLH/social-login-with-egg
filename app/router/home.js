'use strict'

module.exports = app => {
    const { router, controller } = app;

    const { home } = controller;

    router.get('/', home.render);
};