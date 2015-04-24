RAD.model('itemModel', Parse.Object.extend('Item',{
    defaults: {
        title: 'Title...',
        quantity: '',
        done: false,
        group: ''
    },

    toggle: function() {
        this.set({done: !this.get("done")});
        this.save();
    }
}), false);


RAD.model('itemCollection', Parse.Collection.extend({
    model: RAD.model('itemModel'),
    query : new Parse.Query(RAD.model('itemModel')),
    fetchItems : function () {
        /*this.clear();*/
        var currentUser = Parse.User.current(),
            group = currentUser.get('group');

            this.query.equalTo('group', group);
            this.fetch().then(function () {
            RAD.application.showLogInView();
        });
    }
}), true);