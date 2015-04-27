RAD.application(function (core) {
    'use strict';

    var app = this;

    app.start = function () {
        var options = {
            container_id: '#application',
            content: "view.auth",
            animation: 'none'
        };
        core.publish('navigation.show', options);
    };

    app.login = function (data) {
        'use strict';

        return Parse.User.logIn(data.login, data.pass, {
            success: function (user) {
                RAD.model('itemCollection').fetchItems();
            },
            error: function (user, error) {
                app.showError(error.message);
            }
        });
    };

    app.signUp = function (data) {
        'use strict';
        var self = data.self,
            user = new Parse.User();

        user.set("username", data.username);
        user.set("password", data.password);
        user.set("email", data.email);

        return user.signUp (null, {
            success: function (user) {
                var query = new Parse.Query("Group");
                query.equalTo('name', data.groupName);

                query.find()
                    .then(function (groups) {
                        if (groups.length > 0) {
                            // Add to group
                            var currentGroup = groups[0];

                            var relation = currentGroup.relation("Users");
                            relation.add(user);
                            currentGroup.save()
                                .then(function () {
                                    console.log(currentGroup, 'add to group');
                                    user.set("group", currentGroup);
                                    return user.save();
                                }).then(function () {
                                    RAD.model('itemCollection').fetchItems();
                                });
                        } else {
                            // Create new group
                            var groupList = new RAD.models.groupItem();
                            groupList.set({name: data.groupName});
                            groupList.save().then(function (group) {
                                var relation = group.relation("Users");
                                relation.add(user);
                                return group.save();
                            }).then(function (group) {
                                user.set('group', group);
                                return user.save();
                            }).then(function () {
                                RAD.model('itemCollection').fetchItems();
                            });
                        }
                    });
            },
            error: function (user, error) {
                app.showError(error.message);
            }
        });
    };

    app.showLogInView = function () {
        'use strict';
        console.log('log in view');
        var options = {
            container_id: '#application',
            content: "view.inner_parent_widget",
            backstack: false
        };

        core.publish('navigation.show', options);
    };

    app.showAuthView = function (animation) {
        core.publish('router.clear');
        core.publish('navigation.show', {
            container_id: '#application',
            content: "view.auth",
            animation: animation
        });
    };

    app.showError = function (error) {
        "use strict";
        var msg = error,
            gravity = 'top';

        // show toast
        core.publish('navigation.toast.show', {
            content: "view.toast",
            showTime: 6000,
            gravity: gravity,
            outsideClose: true,
            extras: {
                msg: msg
            }
        });
    };

    return app;
}, true);

