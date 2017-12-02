const {
    Button,
    CollectionView,
    Composite,
    ImageView,
    TextView,
    ScrollView,
    NavigationView,
    Page,
    ui
} = require('tabris');
let json = "";

let navigationView = new NavigationView({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    drawerActionVisible: true
}).appendTo(ui.contentView);

fetch('http://cursussen.uantwerpen.be/Home/Level')
    .then(response => response.json())
    .then((jso) => json = jso)
    .then(() => CreatePage(''));


function CreatePage(Route) {

    let path = Route.split("/").map(Number);
    console['info']('path :' + path);

    switch (path.length) {
        case 1:

            FillWithData(json, Route)
            break;
        case 2:
            FillWithData(json.Items[path[1]], Route)
            break;
        case 3:
            FillWithData(json.Items[path[1]].Items[path[2]], Route)
            break;
        case 4:
            FillWithData(json.Items[path[1]].Items[path[2]].Items[path[3]], Route)
            break;
    }
}

function FillWithData(json, Route) {
    let page = new Page({
        title: json.Title
    }).appendTo(navigationView);

    for (var i = 0; i < json.Items.length; i++) {
        new Button({
                left: 16,
                right: 16,
                top: 'prev()',
                text: json.Items[i].Item,
                id: Route + "/" + i
            })
            .on('select', ({
                target
            }) => {
                CreatePage(target.id)
            })
            .appendTo(page);
    }
}
