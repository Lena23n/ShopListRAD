RAD.view("view.inner_form", RAD.Blanks.View.extend({
    url: 'source/views/inner/form/from.html',
    events: {
        "click #add": "createOnClickAddButton",
        "click #logout": "logout"
    },
    inputs: {
        name: null,
        quantity: null
    },
    onInitialize: function () {
        'use strict';
        this.changeModel(RAD.model('itemCollection'));
    },
    createOnClickAddButton: function () {
        'use strict';
        this.inputs.name = $("#new-item");
        this.inputs.quantity = $("#count");

        var self = this,
            name = this.inputs.name.val(),
            quantity = this.inputs.quantity.val(),
            currentUser = Parse.User.current(),
            newACL,
            group = null,
            item;

        if (!name || !quantity) {
            this.application.showError('You should fill in all the fields');
            return false;
        }

        group = currentUser.get('group');
        newACL = new Parse.ACL();

        newACL.setPublicReadAccess(true);
        newACL.setPublicWriteAccess(true);

        item = {
            title: name,
            quantity: quantity,
            group: group
        };

        var data = _.extend({
            ACL: newACL
        }, item);

        console.log('save item');

        this.model.create(data, {
            error: function (model, error) {
                self.application.showError(error)
            }
        });

        console.log('clear input');
        this.inputs.name.val('');
        this.inputs.quantity.val('');
    },

    logout: function () {
        'use strict';
        Parse.User.logOut();
        this.application.showAuthView();
    }
}));