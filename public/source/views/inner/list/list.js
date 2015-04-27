RAD.view("view.inner_list", RAD.Blanks.View.extend({
    url: 'source/views/inner/list/list.html',
    events: {
        "click .toggle": "toggleDone",
        "click a.destroy": "clear"
    },

    onInitialize : function () {
        'use strict';
        this.changeModel(RAD.model('itemCollection'));
    },

    toggleDone: function(e) {
        'use strict';
        var idx, modelToToggle;

        idx = $(e.currentTarget).closest('li').index();
        modelToToggle = this.model.at(idx);

        console.log(idx);
        console.log(modelToToggle);

        modelToToggle.toggle();
    },


    clear: function(e) {
        'use strict';
        var idx, modelToDestroy;

        idx = $(e.currentTarget).closest('li').index();
        modelToDestroy = this.model.at(idx);

        modelToDestroy.destroy();
    }

}));