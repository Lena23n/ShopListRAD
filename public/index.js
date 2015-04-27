Parse.initialize("YZp2Tqvez72boawZIl1Q6imzyfJvytJuvtmzrvz7", "UvDJCduCQ8b5NSpnBIu5KlypZvTSqgg2Y62QIoJ2");

(function (document, window) {
    'use strict';

    var scripts = [

        "source/application/application.js",
        "source/models/item.js",
        "source/models/group.js",
        "source/views/auth/auth.js",
        "source/views/inner/parent_widget/parent_widget.js",
        "source/views/inner/form/form.js",
        "source/views/inner/list/list.js",
        "source/views/toast/toast.js"
    ];

    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: false,
                defaultAnimation: 'slide',
                animationTimeout: 3000,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));