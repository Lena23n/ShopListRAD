RAD.view("view.auth", RAD.Blanks.View.extend({
    url: 'source/views/auth/auth.html',
    events: {
        "click #auth": "login",
        "click #signUp": "signUp"
    },
    login: function () {
        var login = this.$el.find('#login').val(),
            pass = this.$el.find('#password').val(),
            data = {
                login: login,
                pass: pass,
                self: this
            };

        this.application.login(data);
    },
    signUp: function () {
        var login = this.$el.find('#newLogin').val(),
            pass = this.$el.find('#newPassword').val(),
            mail = this.$el.find('#mail').val(),
            groupName = this.$el.find('#role').val(),
            data = {},
            isFieldFilled = !login.length || !pass.length || !mail.length || !groupName.length;

        if (isFieldFilled) {
            this.showError('verify your credentials, please');
            return false;
        }

        data = {
            username: login,
            password: pass,
            email: mail,
            groupName: groupName,
            self: this
        };

        this.application.signUp(data);
    },
    showError: function (error) {
        alert(error);
    }
}));