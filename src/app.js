/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
var UI = require('ui');
var Vector2 = require('vector2');
var Feature = require('platform/feature');


var wind = new UI.Window({
  backgroundColor: 'white'
});
var cupolan = [];
var x = Feature.resolution().x;
var y = Feature.resolution().y;
for(var i = 0; i < 10; i++){
  cupolan.push(new UI.Image({
    position: new Vector2(0, (y-x)/4),
    size: new Vector2(x,x),
    backgroundColor: 'white',
    image: 'images/cupolan-pose'+i+'.png'
  }));
}

var timeText = new UI.TimeText({
  position: new Vector2(0, y-76),
  size: new Vector2(x,74),
  text: "%m-%d\n%X",
  font: 'leco-28-light-numbers',
  color: 'vividCerulean',
  textAlign: 'center',
  backgroundColor: 'white',
  textOverflow:'wrap'
});

var currentCupolan = null;
var currentMin = null;
var clockThread = function(){
    var now = new Date();
    var min = now.getMinutes() ;
    if( currentMin !== min ){
      if( null !== currentCupolan ){
        wind.remove(currentCupolan);
      }
      if( null !== timeText ){
        wind.remove(timeText);
      }
      currentCupolan = cupolan[min % 10];
  
      wind.add(currentCupolan);
      wind.add(timeText);
      currentMin = min;
    }
};
setInterval(clockThread,1000);
wind.show();