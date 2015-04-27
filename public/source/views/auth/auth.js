RAD.view("view.auth", RAD.Blanks.View.extend({
    url: 'source/views/auth/auth.html',
    events: {
        "click #auth": "login",
        "click #signUp": "signUp"
    },
    login: function () {
        'use strict';
        var login = this.$el.find('#login'),
            pass = this.$el.find('#password'),
            data = {
                login: login.val(),
                pass: pass.val()
            };

        this.application.login(data).then(function () {
            login.val('');
            pass.val('');
        });
    },
    signUp: function () {
        'use strict';
        var login = this.$el.find('#newLogin'),
            pass = this.$el.find('#newPassword'),
            mail = this.$el.find('#mail'),
            groupName = this.$el.find('#role'),
            data = {},
            isFieldFilled = !login.val() || !pass.val() || !mail.val() || !groupName.val();

        if (isFieldFilled) {
            this.application.showError('You should fill in all the fields');
            return false;
        }

        data = {
            username: login.val(),
            password: pass.val(),
            email: mail.val(),
            groupName: groupName.val()
        };

        this.application.signUp(data).then(function () {
            login.val('');
            pass.val('');
            mail.val('');
            groupName.val('');
        });
    }
}));