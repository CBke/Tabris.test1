// Create a collection view, initialize its cells and fill it with items
const {
    Button,
    CollectionView,
    Composite,
    ImageView,
    Tab,
    TabFolder,
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

    console['info']('path.length :' + path.length);

    switch (path.length) {
        case 1:
            FillWithMenuData(json, Route)
            break;
        case 2:
            FillWithMenuData(json.Items[path[1]], Route)
            break;
        case 3:
            FillWithMenuData(json.Items[path[1]].Items[path[2]], Route)
            break;
        case 4:
            FillWithMenuData(json.Items[path[1]].Items[path[2]].Items[path[3]], Route)
            break;
        case 5:
            FillWithBundlesData(json.Items[path[1]].Items[path[2]].Items[path[3]].Items[path[4]], Route)
            break;
    }

}

function FillWithBundlesData(json, Route) {
    let page = new Page({
        title: json.Item
    }).appendTo(navigationView);
    let scrollView = new ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }).appendTo(page);
    console['info']('json.NumerOfBundles :' + json.NumerOfBundles);

    // new TextView({id: 'titleLabel', text: json.Nummer}),

    let tabFolder = new TabFolder({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
    }).appendTo(scrollView);


    if (json.NumerOfBundles > 0) {

        let Pakkettab = new Tab({
            title: "Paketten"
        }).appendTo(tabFolder);
        let scrollView1 = new ScrollView({
            left: 0,
            right: 0,
            top: 5,
            bottom: 0
        }).appendTo(Pakkettab);
        for (var i = 0; i < json.Bundles.length; i++) {

            let Bundle = json.Bundles[i];
            new Composite({
                    id: 'detailsView',
                    left: 10,
                    right: 10,
                    top: 'prev() 10',

                    cornerRadius: 2,
                    elevation: 2,

                }) //.on('tap', () => this._openReadBookPage())
                .append(
                    new TextView({
                        id: 'titleLabel',
                        top: 16,
                        right: 16,
                        text: Bundle.Nummer
                    }),
                    new TextView({
                        id: 'authorLabel',
                        left: '#coverImage 16',
                        top: 'prev() 8',
                        text: Bundle.Descr
                    }),
                    new TextView({
                        id: 'priceLabel',
                        left: '#coverImage 16',
                        top: 'prev() 8',
                        text: '€ ' + Bundle.Price
                    })
                )
                .appendTo(scrollView1);
        }
    }


    let tab = new Tab({
        title: "Cursussen"
    }).appendTo(tabFolder);

    let scrollView2 = new ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }).appendTo(tab);

    for (var i = 0; i < json.Vakken.length; i++) {

        let Vak = json.Vakken[i];
        let c1 = new Composite({
                id: 'detailsView',
                left: 0,
                right: 0,
                top: 'prev() 6',

            }) //.on('tap', () => this._openReadBookPage())
            .append(
                new TextView({
                    id: 'titleLabel',
                    top: 'prev() 16',
                    right: 16,
                    text: Vak.Name
                }))
            .appendTo(scrollView2);;

        for (var j = 0; j < Vak.Cursussen.length; j++) {
            let Cursus = Vak.Cursussen[j];
            new Composite({
                    id: 'detailsView',
                    left: 10,
                    right: 10,
                    top: 'prev() 10',
                    cornerRadius: 2,
                    elevation: 2,
                }).append(
                    new TextView({
                        id: 'authorLabel',
                        left: '#coverImage 16',
                        top: 'prev() 8',
                        text: Cursus.Descr
                    }),
                    new TextView({
                        id: 'priceLabel',
                        left: '#coverImage 16',
                        top: 'prev() 8',
                        bottom: 5,
                        text: '€ ' + Cursus.Price
                    })
                )
                .appendTo(scrollView2);;
        }

    }

}

function FillWithMenuData(json, Route) {

    let page = new Page({
        title: json.Title
    }).appendTo(navigationView);

    let scrollView = new ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }).appendTo(page);

    for (var i = 0; i < json.Items.length; i++) {

        new Composite({
                left: 16,
                right: 16,
                top: 'prev() 10',
                cornerRadius: 2,
                elevation: 2,

                text: json.Items[i].Item,
                id: Route + "/" + i
            })
            .on('tap', ({
                target
            }) => {
                CreatePage(target.id)
            })
            .append(
                new TextView({
                    id: 'authorLabel',
                    left: 16,
                    top: 'prev() 25',
                    bottom: 25,
                    text: json.Items[i].Item,
                    right: 16
                })
                //new TextView({id: 'priceLabel', left: '#coverImage 16', top: 'prev() 8', text: Cursus.Price})
            )
            .appendTo(scrollView);
    }
}

