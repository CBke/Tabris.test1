// Create a collection view, initialize its cells and fill it with items
const {Button, CollectionView, Composite, ImageView, TextView, ScrollView, NavigationView,Page, ui} = require('tabris');


let navigationView = new NavigationView({
  left: 0, top: 0, right: 0, bottom: 0,
  drawerActionVisible: true
}).appendTo(ui.contentView);

var Screens = [];
  
fetch('http://cursussen.uantwerpen.be/Home/Level')
    .then(response => response.json())
    .then((json) => {
  
  let page = CreatePage(json.Title);
  Screens.push(page);
  Screens[0].appendTo(navigationView);
  
  CreateButtons(page, json.Items);

for (var i = 0; i < json.Items.length; i++)
  {
    let page = CreatePage(json.Items[i].Title);
    Screens.push(page);
   CreateButtons(page, json.Items[i].Items);
    
    for (var j = 0; j <  json.Items[i].Items.length; j++)
    {
      let page = CreatePage( json.Items[i].Items[j].Title);
      Screens.push(page);
       CreateButtons(page, json.Items[i].Items[j].Items);
       for (var k = 0; k <  json.Items[i].Items[j].Items.length; k++)
    {
      let page = CreatePage( json.Items[i].Items[j].Items[k].Title);
      Screens.push(page);
       CreateButtons(page, json.Items[i].Items[j].Items[k].Items);
    }
    }
    }
  
  
    
   let endpage = new Page({ title:  'JAh', autoDispose:false})
  Screens.push(endpage);

  
});

function CreatePage(Title)
{
  return new Page({ title: Title, autoDispose:false});
}
function CreateButtons(page, Items)
{
  
  //var bttsn = [];
  for (var i = 0; i < Items.length; i++)
  {
    let text = Items[i].Item;
   
    new Button({
      left: 16, right: 16, top: 'prev()',
      text: text +  i ,
      id: i
    })
      .on('select', ({target}) =>
          {
           console['info'](target.id );
           Screens[target.id].appendTo(navigationView);
    })
      .appendTo(page);
  }
}
