RAD.view("view.inner_list", RAD.Blanks.View.extend({
    url: 'source/views/inner/list/list.html',
    events: {
        "click .toggle": "toggleDone",
        "click a.destroy": "clear"
    },
    //model : RAD.model('itemCollection'),

    onInitialize : function () {
        this.changeModel(RAD.model('itemCollection'));
    },

    //initialize: function () {
    //    this.listenTo(this.model, 'all', this.render);
    //},

    //render: function () {
    //    if (!this.template) {
    //        return false;
    //    }
    //
    //    var data = null;
    //
    //    if (this.model) {
    //        data = this.model.toJSON();
    //    }
    //    var html = this.template({model: data});
    //
    //    this.$el.html(html);
    //
    //    console.log('List render');
    //    return this;
    //},
    //onInitialize: function () {
    //    this.model = RAD.model('itemCollection');
    //    console.log('list-view',this.model);
    //},

    toggleDone: function(e) {
        var idx, modelToToggle;

        idx = $(e.currentTarget).closest('li').index();
        modelToToggle = this.model.at(idx);

        console.log(idx);
        console.log(modelToToggle);

        modelToToggle.toggle();
    },


    clear: function(e) {
        var idx, modelToDestroy;

        idx = $(e.currentTarget).closest('li').index();
        modelToDestroy = this.model.at(idx);

        modelToDestroy.destroy();
    }

}));