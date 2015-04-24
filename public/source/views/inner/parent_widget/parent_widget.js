RAD.view("view.inner_parent_widget", RAD.Blanks.View.extend({
    url: 'source/views/inner/parent_widget/parent_widget.html',
    children: [
        {
            container_id: '#form',
            content: "view.inner_form",
            animation: "none"
        },
        {
            container_id: '#item-list-block',
            content: "view.inner_list",
            animation: "none"
        }
    ]
}));