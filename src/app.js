const {
    CollectionView,
    Composite,
    ImageView,
    NavigationView,
    Page,
    ScrollView,
    Tab,
    TabFolder,
    TextView,
    ui
} = require('tabris');

let json = "";
let navigationView = ""

function MenuTab(datanode) {
    let page = new Page({
        title: datanode.Title,
        autoDispose: false
    });
    let scrollView1 = new ScrollView({
        left: 0,
        right: 0,
        top: 5,
        bottom: 0
    }).appendTo(page)
    console.log('selected', datanode.Items.length)

    new CollectionView({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        itemCount: datanode.Items.length,
        cellHeight: 50,
        createCell: () => {
            let cell = new Composite({
                    id: 10
                })
                .on('tap', ({
                    target
                }) => {
                    if (!datanode.Items[target.idx].hasOwnProperty('Page')) {
                        if (datanode.Items[target.idx].hasOwnProperty('Items')) {
                            datanode.Items[target.idx].Page = MenuTab(datanode.Items[target.idx])
                        }
                        if (datanode.Items[target.idx].hasOwnProperty('NumerOfBundles')) {
                            datanode.Items[target.idx].Page = DetailTab(datanode.Items[target.idx])
                        }
                    }
                    datanode.Items[target.idx].Page
                        .appendTo(navigationView);
                });


            new TextView({

                id: 'senderText',
                top: 8,
                left: 16,
                font: 'bold 18px'
            }).appendTo(cell);

            new TextView({

                id: 'idx',
                top: 8,
                left: 16,
                font: 'bold 18px'
            }).appendTo(cell);
            return cell;

        },
        updateCell: (cell, index) => {
            let vak = datanode.Items[index];
            cell.find('#senderText').set('text', vak.Item);
            cell.idx = index;


        }
    }).appendTo(scrollView1);

    return page
}

function DetailTab(datanode) {

    let page = new Page({
            title: datanode.Item,
            autoDispose: false
        })
        .on('appear', () => {
            if (datanode.NumerOfBundles === 0) {
                ui.find('#Paketten').first().visible = false
            }
        });

    let tabFolder = new TabFolder({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        paging: true
    }).appendTo(page);

    let Pakkettab = new Tab({
        title: "Paketten",
        id: 'Paketten',
    }).appendTo(tabFolder);
    let scrollView1 = new ScrollView({
        left: 0,
        right: 0,
        top: 5,
        bottom: 0
    }).appendTo(Pakkettab);
    new TextView({
        id: 'senderText',
        top: 8,
        left: 16,
        font: 'bold 18px'
    }).appendTo(scrollView1);
    new CollectionView({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        itemCount: datanode.Bundles.length,
        cellHeight: 120,
        createCell: () => {
            let cell = new Composite();
            new TextView({
                id: 'senderText',
                top: 8,
                left: 16,
                font: 'bold 18px'
            }).appendTo(cell);
            return cell;
        },
        updateCell: (cell, index) => {
            let pakket = datanode.Bundles[index];
            cell.find('#senderText').set('text', pakket.Descr);
        }
    }).appendTo(scrollView1);
    let Cursussentab = new Tab({
        title: "Cursussen"
    }).appendTo(tabFolder);
    let scrollView2 = new ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }).appendTo(Cursussentab);
    new CollectionView({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        itemCount: datanode.Vakken.length,
        cellHeight: 120,
        createCell: () => {
            let cell = new Composite();
            new TextView({
                id: 'senderText',
                top: 8,
                left: 16,
                font: 'bold 18px'
            }).appendTo(cell);
            return cell;
        },
        updateCell: (cell, index) => {
            let vak = datanode.Vakken[index];
            cell.find('#senderText').set('text', vak.Name);
        }
    }).appendTo(scrollView2);
    return page;
}



fetch('http://cursussen.uantwerpen.be/Home/Level')
    .then(response => response.json())
    .then((js) => {
        json = js;

        navigationView = new NavigationView({
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            drawerActionVisible: true
        }).appendTo(ui.contentView);

        json.Page = MenuTab(json);
        json.Page.appendTo(navigationView);
    });
