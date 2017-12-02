// Create a collection view, initialize its cells and fill it with items
const {Button, CollectionView, Composite, ImageView, TextView, ScrollView, NavigationView,Page, ui} = require('tabris');
let json = "";

let navigationView = new NavigationView({
  left: 0, top: 0, right: 0, bottom: 0,
  drawerActionVisible: true
}).appendTo(ui.contentView);
  
fetch('http://cursussen.uantwerpen.be/Home/Level')
    .then(response => response.json())
    .then((jso) => 
         {
          json = jso;
          CreatePage('').appendTo(navigationView);
         }
         
         ); 


function CreatePage(Route)
{
  
  console['info']('REZUEST' + Route); 
  
  
  let page = new Page({ title: "Title", autoDispose:false});
  let path = Route.split("/").map(Number);
  
   console['info']('path.length' + path.length); 
  
  console['info']('values :' + path);
  
  switch (path.length) {
  case 1:
       console['info']('path.length :' + path.length);
    FillWithData(page, json, Route)
  break;
  case 2:
    FillWithData(page,json.Items[path[0]], Route)
  break;
  case 3:
    FillWithData(page,json.Items[path[0]].Items[path[1]], Route)
  break;
  case 4:
    FillWithData(page,json.Items[path[0]].Items[path[1]].Items[path[2]], Route)
  break;
  }
  return page;
  
}
function FillWithData(page, json, Route)
{
   console['info']('json.Items.length :' + json.Items.length);
  for (var i = 0; i < json.Items.length; i++)
  {
    let text = json.Items[i].Item;
  
    new Button({
      left: 16, right: 16, top: 'prev()',
      text: text +  i ,
      id: Route + "/" + i
    })
      .on('select', ({target}) =>
          {
           CreatePage(target.id).appendTo(navigationView)
    })
      .appendTo(page);
  } 
}
