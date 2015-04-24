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
        var self = data.self;

        Parse.User.logIn(data.login, data.pass, {
            success: function (user) {
                RAD.model('itemCollection').fetchItems();
            },
            error: function (user, error) {
                self.showError(error.message);
            }
        });
    };

    app.signUp = function (data) {
        var self =  data.self,
            user = new Parse.User();

        user.set("username", data.username);
        user.set("password", data.password);
        user.set("email", data.email);

        user.signUp(null, {
            success: function (user) {
                var query = new Parse.Query("Group");
                query.equalTo('name', data.groupName);

                query.find()
                    .then(function (groups) {
                        if (groups.length > 0) {
                            var currentGroup = groups[0];

                            var relation = currentGroup.relation("Users");
                            relation.add(user);
                            currentGroup.save();

                            console.log(currentGroup, 'add to group');
                            user.set("group", currentGroup);
                            return user.save();
                        } else {
                            var groupList  = new RAD.models.groupItem();
                            groupList.set({name: data.groupName});
                            groupList.save()
                                .then(function (group) {
                                    console.log(group);
                                    var relation = group.relation("Users");
                                    relation.add(user);
                                    group.save();

                                    user.set('group', group);
                                    return user.save();
                                });
                        }

                    }).then(function () {
                        RAD.model('itemCollection').fetchItems();

                       //self.showLogInView(user);
                    });
            },
            error: function (user, error) {
                self.showError(error.code + " " + error.message);
            }
        });
    };

    //app.fetchItems = function (user) {
    //    RAD.model('ItemCollection').fetchItems(user);
    //};

    app.showLogInView = function () {
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


    return app;
}, true);

