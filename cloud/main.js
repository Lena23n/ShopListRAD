Parse.Cloud.afterSave("Item", function (request) {
    var itemName = request.object.get("title"),
        itemQuantity = request.object.get("quantity"),
        isItemDone = request.object.get("done"),
        group = null,
        userName = null,
        userMail = null,
        i,
        data = {
            itemName: itemName,
            itemQuantity: itemQuantity,
            isItemDone: isItemDone,
            users: []
        };

    request.object.get("group").fetch().then(function (groupArray) {
        group = groupArray.relation("Users").query();
        return group.find();
    }).then(function (users) {
        for (i = 0; i < users.length; i++) {
            userName = users[i].get('username');
            userMail = users[i].get('email');
            data.users.push({
                email: userMail,
                name: userName
            });
        }

        console.log(data);

        Parse.Cloud.run("sendMail", data, {
            success: function(result) {
                console.log(result);
            },
            error: function(error) {
            }
        });
    });


});


Parse.Cloud.define("sendMail", function (request, response) {

    var itemName = request.params.itemName,
        itemQuantity = request.params.itemQuantity,
        isItemDone = request.params.isItemDone,
        userCredentials = [],
        text = null;

        if (isItemDone) {
            text =  "Hello, dear User! You don't need to buy"
            + itemName + " - " + "count - " + itemQuantity;
        } else {
            text =  "Hello, dear User! You need to buy "
            + itemName + " - " + "count - " + itemQuantity;
        }

    var Mandrill = require('mandrill');
    Mandrill.initialize('3k4990grJOJ7x-2x-AoCRA');

    for (var i = 0; i < request.params.users.length; i++) {

        var userName = request.params.users[i].username,
            userMail = request.params.users[i].email;

        userCredentials.push({
            email: userMail,
            name: userName
        });
    }

    console.log(userCredentials);

    Mandrill.sendEmail({
        message: {
            text: text,
            subject: "Your shopping list was updated",
            from_email: "parse@cloudcode.com",
            from_name: "admin",
            to: userCredentials
        },
        async: true
    }, {
        success: function (httpResponse) {
            console.log(httpResponse);
            response.success("Email sent!");
        },
        error: function (httpResponse) {
            console.error(httpResponse);
            response.error("Uh oh, something went wrong");
        }
    });

});
