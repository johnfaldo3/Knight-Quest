// FUNCTIONS //////////////////////////////////////////////////////

function examine(obj) {
  if (obj.hasOwnProperty('examine')) {
    alert(obj.examine);
  } else {
      alert('This item cannot be examined.');
  };
}

function get(obj, item) {
  var newItem;
  var pos = obj.contains.hasOwnProperty(item);
  if (pos == false) {
    alert("There isn't a " + item + ".");
  } else {
    playerItems = {...playerItems, [item]: obj.contains[item]};
    delete obj.contains[item];
    alert('You got the ' + item);
  }
}

function use(item) {
  response = prompt('What would you like to use the ' + item + ' on?');
  newObj = itemResponse();
  if (playerItems.indexOf(item) != -1 && newObj.key == 'key') {
    //item = item.toString();
    unlock(newObj);
  } else {
  alert('You cannot use this here');
  }
} 

function unlock(object) {
  if (object.locked == true && object.hasOwnProperty('key') == true && playerItems.indexOf(item) != -1) {
    object.locked = false;
    alert('You unlocked the ' + object.id);
  } else {
    alert('something went wrong'); 
  }
}

function equip(item) {
  let equipmentPos = playerItems.indexOf(item);
  if (equipmentPos != -1) {
    if (equippableItem(item) == 'weapon') {
      equippedWeapon = playerItems.splice(equipmentPos, 1);
      alert('You equipped the ' + item + '.');
    } else if (equippableItem(item) == 'armour') {
      equippedArmour = playerItems.splice(equipmentPos, 1); 
      alert('You equipped the ' + item + '.'); 
    } else {
      alert('The ' + item + ' is not equippable.');
    }
  } else {
    alert('You do not have a ' + item + ' to equip.');
  }
}

function equippableItem(item) {
  switch (item) {
    case 'stick': return 'weapon'; break;
    case 'armour': return 'armour'; break;
    default: return false; break;
  }
}

function open(item) {
  if (item.locked == false && item.type == 'container') {
    var itemContents = Object.keys(item.contains);

    if (itemContents.length == 0) {
      alert('The ' + item.id + ' is empty.');
    } else {
      var take = prompt('The ' + item.id + ' contains ' + itemContents.join(', ').replace(/, ([^,]*)$/, ' and $1') + '. Type the item you want to pick up, or type "leave" to go back.');

      switch (take) {
        case 'close':
        case 'leave':
        case 'exit':
        case 'no':
        case 'back':
          break;
        default:
          get(levelObjects.chest, take);
          open(item);
          break;
      }
    }
  } else if (item.locked == false && item.type == 'door') {
      alert('You went through the door.');
      playerLocation = 'nextRoom'; // END STATE
  } else if (item.locked == true) {
    alert('the ' + item.id + ' is locked.');
  } else {
      alert('You cannot open the ' + item);
  }
}

function myItems() {
  if (playerItems.length > 0 || equippedWeapon != '') {
    alert('Your Items: ' + Object.keys(playerItems).join(', ') + ' \nPlayer Weapon: ' + equippedWeapon);
  } else {
    alert('You don\'t have any items.');
  }
}

function help() {
  alert('Use commands such as "examine", "open" and "use" followed by an object. Type "show" to see what items you have.');
  wrongAnswers= 0;
}

function quit() {
  var quitConfirm = prompt('Are you sure you want to quit?');
  if (yOrN(quitConfirm)) {
    alert('You have quit the game. Refresh the page to try again.');
    fail;
  }
}

function yOrN(response) {
  switch (response) {
    case 'Yes':
    case 'Y':
    case 'yes':
    case 'y':
      return true;
      break;
    case 'No':
    case 'N':
    case 'no':
    case 'n':
      return false;
      break;
    default: alert('not correct');
  }
}

// PLAYER RESPONSE //////////////////////////////////////////////

var item;
var obj;

function playerResponse(resp) {

  item = itemResponse();
  let com = commandResponse();

  switch(com) {
    case 'help': help(); break;
    case 'quit': quit(); break;
    case 'open': open(item); break;
    case 'show': myItems(); break;
    case 'examine': examine(item); break;
    case 'use' : use(item); break;
    case 'equip': equip(item); break;
    default: alert('something went wrong2'); break;
  }
}

function itemResponse() {

  var keyType = /key/i;
  var chestType = /chest/i;
  var roomType = /room/i;
  var doorType = /door/i;
  var stickType = /stick/i;

  switch (true) {
    case keyType.test(response):
      return playerItems.key;
      break;
    case chestType.test(response):
      return levelObjects.chest;
      break;
    case roomType.test(response):
      return levelObjects.room;
      break;
    case doorType.test(response):
      return levelObjects.door;
      break;
    case stickType.test(response):
      return stick;
      break;
    default:
      return 'No such item.';
      break;
  }
}

function commandResponse() {

var equip = /equip/i;
var examine = /examine/i;
var open = /open/i;
var help = /help/i;
var go = /go/i;
var fight = /fight/i;
var talk = /talk/i;
var use = /use/i;
var quit = /quit/i;
var show = /show/i;

  switch (true) {
    case examine.test(response):
      return 'examine';
      break;
    case use.test(response):
      return 'use';
      break;
    case open.test(response):
      return 'open';
      break;
    case equip.test(response):
      return 'equip';
      break;
    case show.test(response):
      return 'show';
      break;
    case help.test(response):
      return 'help';
      break;
    case quit.test(response):
      return 'quit';
      break;
    default:
      alert('Command not recognised.');
      if (wrongAnswers < 1) {
        wrongAnswers++;
        break;
      } else {
        return 'help';
        break;
      }
   }
}

// GLOBAL INITIATOR ////////////////////////////////////////

var playerName;
var playerLives = 3;
var level = 0;
let wrongAnswers = 0;
let levelObjects;

// PLAYER STATUS //

var playerHealth = 10;
var playerItems = [];
var equippedWeapon = 'None';
var equippedArmour = 'None';
var playerMoney;
var response = '';
var playerLocation;

// TITLE SCREEN //

alert('Welcome to Knight Quest!');
playerName = prompt('What is your name?');

//GAME////////////////////////////////////////////////////////////

var startText;

for (x=0; x<4; x++) {
  switch (level) {
    case 0 : training(); break;
    case 1 : levelOne(); break;
    case 2 : levelTwo(); break;
    case 3 : levelThree(); break;
    default: training();
  }
  level++
}

// TRAINING LEVEL //

function training() {
  playerLocation = 'small room';

let trainingLevelObjects = {
  chest: {
    id: 'chest',
    locked: false,
    open: true,
    type: 'container',
    examine: 'A chest with unknown treasure inside.',
    get: 'The chest is too heavy!',
    contains: {
      key: {
        use: 'training door',
        equip: false,
        examine: 'A heavy iron key.',
        type: item
      },
      stick: {
        use: 'The stick cannot be used like this.',
        equip: true,
        examine: 'A stick which can be used as a weapon.',
        type: 'weapon'
      }
    }
  },
  door: {
    id: 'training door',
    locked: true,
    key: 'iron key'
    type: 'door',
    examine: 'A fortified wooden door.',
    get: 'The chest is too heavy!',
    open: true,
 },
  room: {
    id: 'room',
    examine: 'The room is dark in the corners and the walls are made of brick. It is lit by a single torch ensconsed on the wall. The door looks sturdy and fortified. A small chest is on the floor under the torch.',
    get: 'You cannot do this to the room',
    open: 'You cannot do this to the room'
  }
};

  levelObjects = trainingLevelObjects;

  alert('Welcome, ' + playerName + '. You are now entering a world of danger, risk and unlimited possibility. If needed, type "help" when prompted to bring up the help menu.');

  while (playerLocation == 'small room') {

    response = prompt('You are in a room. There is a chest to your left and a door infront of you. What do you do?');

    playerResponse(response);

  }
}

// LEVEL ONE //

function levelOne() {

  let levelOneObjects = {
  };

  levelObjects = levelOneObjects;

startText = 'This is the next room!';
alert(startText);
}

// LEVEL TWO //

function levelTwo() {
startText = 'You approach a castle!';
alert(startText);
}

// LEVEL THREE //

function levelThree() {
startText = 'You stand before a grand battle!';
alert(startText);
}