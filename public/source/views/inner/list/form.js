RAD.view("view.inner_form", RAD.Blanks.View.extend({
    url: 'source/views/inner/list/from.html',
    events: {
        "click #add": "createOnClickAddButton",
        "click #logout": "logout"
    },
    //model: RAD.model("itemCollection"),
    inputs: {
        name: null,
        quantity: null
    },
    onInitialize : function () {
        this.changeModel(RAD.model('itemCollection'));
    },
    createOnClickAddButton: function () {
        this.inputs.name = $("#new-item");
        this.inputs.quantity = $("#count");

        var name = this.inputs.name.val(),
            quantity = this.inputs.quantity.val(),
            currentUser = Parse.User.current(),
            newACL,
            group = currentUser.get('group'),
            item;

        if (!name || !quantity) {
            alert('You should fill in all the fields');
            return false;
        }
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
            validate: true,
            error: function (model, error) {
                self.showError(error)
            }
        });

        console.log('clear input');
        this.inputs.name.val('');
        this.inputs.quantity.val('');
    },

    logout: function () {
        Parse.User.logOut();
        this.application.showAuthView();
    }
}));