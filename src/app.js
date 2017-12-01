const {Button, CollectionView, Composite, ImageView, TextView, ScrollView, ui} = require('tabris');
const IMAGE_PATH = 'images/';

let scrollView = new ScrollView({left: 0, top: 0, right: 0, bottom: 0}).appendTo(ui.contentView);

fetch('http://cursussen.uantwerpen.be/Home/Level')
    .then(response => response.json())
    .then((json) => {
    
    for (var i = 0; i < json.Items.length; i++){
    let text=  json.Items[i].Item;
        new Button({
          left: 16, right: 16, top: 'prev()',
          text: text +  i ,
          id: 'reloadButton'
        })
        .appendTo(scrollView);
    }
});
