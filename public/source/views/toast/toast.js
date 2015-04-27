RAD.view("view.toast", RAD.Blanks.View.extend({
    url: 'source/views/toast/toast.html',
    className: 'popup-view',
    attributes: {
        'data-role': 'popup-view'
    },
    onInitialize: function () {
        'use strict';
        var Model = Backbone.Model.extend();

        this.model = new Model();
    },
    onNewExtras: function (extras) {
        'use strict';
        this.model.set({msg: extras.msg});
    }
}));