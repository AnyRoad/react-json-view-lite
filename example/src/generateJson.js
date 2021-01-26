const fs = require('fs');

const stringSample =
  'Aenean eget cursus sapien. Pellentesque eget volutpat mi. Suspendisse potenti. Vivamus posuere sapien nec arcu consequat, id tempor est sagittis. Fusce augue mi, aliquet et justo ac, semper rutrum eros. Vivamus id porttitor lacus, vel consectetur quam. In vulputate nunc non nisi pretium, ut aliquam nibh sagittis. Cras blandit egestas accumsan.Donec a rutrum diam, in pellentesque velit. Mauris luctus, massa gravida ultricies tincidunt, nisl dolor semper velit, sit amet venenatis ex massa eu felis. In ut arcu pretium, ultricies lectus eu, euismod ante. Mauris venenatis aliquam sapien ut euismod. Vivamus quis urna in leo lobortis maximus tincidunt nec est. Praesent rutrum tellus quis luctus pulvinar. Proin risus enim, consequat et erat tempor, venenatis blandit arcu. Cras eget tortor fringilla, volutpat magna id, eleifend felis. Praesent non felis consequat, aliquet nulla sit amet, tincidunt ante.Sed sed mollis turpis. Aliquam consectetur scelerisque leo. Fusce interdum dui nulla, condimentum tincidunt est fermentum ultrices. Pellentesque bibendum nisi purus, nec congue lectus gravida a. Ut ipsum sem, pellentesque nec ligula non, aliquam condimentum arcu. Donec tempor ligula at imperdiet mattis. Nulla facilisi. Pellentesque fringilla suscipit lectus. Suspendisse fringilla tempor lectus vel efficitur. Aliquam maximus fringilla sem, sagittis commodo mauris hendrerit nec.Sed vulputate risus eu ullamcorper suscipit. Donec eleifend nisi sit amet consequat tempor. Nullam vestibulum ac risus a hendrerit. Nam et sem molestie, condimentum nisl quis, faucibus dui. Mauris dignissim cursus mauris quis interdum. Ut pharetra metus vel sapien luctus congue. Nunc congue, augue non ullamcorper pulvinar, ante lectus dictum magna, sit amet ultrices neque lacus tristique purus. Nullam id ante posuere, fringilla metus ut, ornare risus. Sed a nisl non justo tincidunt porttitor in nec diam. Curabitur commodo nulla ac justo sodales ultrices. Nullam imperdiet mauris lorem, vel blandit lacus suscipit nec. Proin vel sem sit amet dolor iaculis ullamcorper.Maecenas id ipsum quis erat semper luctus sed a tortor. Mauris nec dapibus enim. Vivamus euismod nulla justo, ac fermentum dui imperdiet eget. Cras eget purus nisl. Mauris nec ultrices neque. Pellentesque interdum fermentum est vel commodo. Morbi sed est maximus odio lobortis dapibus ut ultrices tortor. Nam eros odio, cursus eu risus quis, euismod laoreet ligula. Fusce diam erat, molestie id interdum ac, convallis vitae elit. Nulla posuere ullamcorper iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi neque ligula, tempus a mauris quis, aliquam tempus elit. Donec vulputate orci purus, id vestibulum urna interdum a.Pellentesque nec congue ex, sit amet ultrices urna. Proin in urna mauris. Morbi lorem eros, mattis in odio non, dapibus varius massa. Fusce convallis sollicitudin maximus. Nullam vel sem vitae magna finibus congue at nec massa. Vivamus tempus tortor eu enim luctus vestibulum. Etiam dolor nisi, cursus vitae ipsum vitae, egestas interdum erat. Nullam vestibulum, mauris nec molestie hendrerit, nisl tellus euismod mauris, sed pellentesque quam ligula a magna. Vestibulum dolor turpis, semper sed condimentum vel, fermentum ac ante. Ut eleifend bibendum luctus. Aliquam quis finibus sapien, at lacinia orci. Aenean pretium suscipit magna vel facilisis. Etiam nisl purus, bibendum non purus sit amet, convallis egestas augue. Aenean gravida varius mauris, vel rutrum dolor vulputate sit amet.Donec gravida purus id mollis ultrices. Donec rhoncus vulputate ante et ornare. Cras vel velit lacus. Donec justo nisl, iaculis a est id, elementum accumsan felis. Mauris augue eros, ullamcorper eget porttitor nec, placerat non ante. Aliquam ac risus ac lacus dapibus consectetur. Phasellus mi purus, aliquet sed justo vel, dignissim rhoncus purus.Nam tincidunt, nibh ut luctus rutrum, tortor libero convallis quam, vel porttitor urna neque vel lorem. Nam pharetra finibus metus, eget auctor enim dictum quis. Nunc eu pretium ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque nec neque ultricies, rutrum ipsum eget, hendrerit risus. Phasellus faucibus dolor diam, et placerat lectus viverra quis. Sed iaculis eget quam at placerat.Aenean venenatis neque iaculis lorem rhoncus posuere. Cras id nisi nulla. Morbi eu molestie turpis. Donec fringilla tortor eu maximus dictum. Proin fermentum massa id massa ultrices porta. Donec imperdiet mauris vestibulum elit sagittis, in fermentum sapien luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam vitae pretium lacus. In mattis vulputate erat id faucibus. Etiam id quam et nibh fringilla tincidunt a sit amet orci. Curabitur eu massa non tortor consequat blandit quis vel diam. Sed ac tincidunt arcu. Cras mauris nulla, congue et augue et, varius imperdiet augue. Suspendisse et accumsan odio, sed pharetra metus. Aliquam eget ullamcorper libero, sit mi.';

const propertyNames = [
  'apple',
  'air',
  'conditioner',
  'airport',
  'ambulance',
  'aircraft',
  'apartment',
  'arrow',
  'antlers',
  'apro',
  'alligator',
  'architect',
  'ankle',
  'armchair',
  'aunt',
  'ball',
  'bermudas',
  'beans',
  'balloon',
  'bear',
  'blouse',
  'bed',
  'bow',
  'bread',
  'black',
  'board',
  'bones',
  'bill',
  'bitterness',
  'boxers',
  'belt',
  'brain',
  'buffalo',
  'bird',
  'baby',
  'book',
  'back',
  'butter',
  'bulb',
  'buckles',
  'bat',
  'bank',
  'bag',
  'boots',
  'blazer',
  'bikini',
  'bookcase',
  'bookstore',
  'busStop',
  'brass',
  'brother',
  'boy',
  'blender',
  'bucket',
  'bakery',
  'bow',
  'bridge',
  'boat',
  'car',
  'cow',
  'cap',
  'cooker',
  'cheeks',
  'cheese',
  'credenza',
  'carpet',
  'crow',
  'crest',
  'chest',
  'chair',
  'candy',
  'cabinet',
  'cat',
  'coffee',
  'children',
  'cookware',
  'chicken',
  'casino',
  'cabin',
  'castle',
  'church',
  'cafe',
  'cinema',
  'choker',
  'cravat',
  'cane',
  'costume',
  'cardigan',
  'chocolate',
  'crib',
  'couch',
  'cello',
  'cashier',
  'composer',
  'cave',
  'country',
  'computer',
  'canoe',
  'clock',
  'dog',
  'deer',
  'donkey',
  'desk',
  'desktop',
  'dress',
  'dolphin',
  'doctor',
  'dentist',
  'drum',
  'dresser',
  'designer',
  'detective',
  'daughter',
  'egg',
  'elephant',
  'earrings',
  'ears',
  'eyes',
  'estate',
  'finger',
  'fox',
  'frock',
  'frog',
  'fan',
  'freezer',
  'fish',
  'film',
  'foot',
  'flag',
  'factory',
  'father',
  'farm',
  'forest',
  'flower',
  'fruit',
  'fork',
  'grapes',
  'goat',
  'gown',
  'garlic',
  'ginger',
  'giraffe',
  'gauva',
  'grains',
  'gasStation',
  'garage',
  'gloves',
  'glasses',
  'gift',
  'galaxy',
  'guitar',
  'grandmother',
  'grandfather',
  'governor',
  'girl',
  'guest',
  'hamburger',
  'hand',
  'head',
  'hair',
  'heart',
  'house',
  'horse',
  'hen',
  'horn',
  'hat',
  'hammer',
  'hostel',
  'hospital',
  'hotel',
  'heels',
  'herbs',
  'host',
  'jacket',
  'jersey',
  'jewelry',
  'jaw',
  'jumper',
  'judge',
  'juicer',
  'keyboard',
  'kid',
  'kangaroo',
  'koala',
  'knife',
  'lemon',
  'lion',
  'leggings',
  'leg',
  'laptop',
  'library',
  'lamb',
  'london',
  'lips',
  'lung',
  'lighter',
  'luggage',
  'lamp',
  'lawyer',
  'mouse',
  'monkey',
  'mouth',
  'mango',
  'mobile',
  'milk',
  'music',
  'mirror',
  'musician',
  'mother',
  'man',
  'model',
  'mall',
  'museum',
  'market',
  'moonlight',
  'medicine',
  'microscope',
  'newspaper',
  'nose',
  'notebook',
  'neck',
  'noodles',
  'nurse',
  'necklace',
  'noise',
  'ocean',
  'ostrich',
  'oil',
  'orange',
  'onion',
  'oven',
  'owl',
  'paper',
  'panda',
  'palm',
  'pasta',
  'pumpkin',
  'pharmacist',
  'potato',
  'parfume',
  'panther',
  'pad',
  'pencil',
  'pipe',
  'police',
  'pen',
  'pharmacy',
  'petrolStation',
  'policeStation',
  'parrot',
  'plane',
  'pigeon',
  'phone',
  'peacock',
  'pencil',
  'pig',
  'pouch',
  'pagoda',
  'pyramid',
  'purse',
  'pancake',
  'popcorn',
  'piano',
  'physician',
  'photographer',
  'professor',
  'painter',
  'park',
  'plant',
  'parfume',
  'radio',
  'razor',
  'ribs',
  'rainbow',
  'ring',
  'rabbit',
  'rice',
  'refrigerator',
  'remote',
  'restaurant',
  'road',
  'surgeon',
  'scale',
  'shampoo',
  'sink',
  'salt',
  'shark',
  'sandals',
  'shoulder',
  'spoon',
  'soap',
  'sand',
  'sheep',
  'sari',
  'stomach',
  'stairs',
  'soup',
  'shoes',
  'scissors',
  'sparrow',
  'shirt',
  'suitcase',
  'stove',
  'stairs',
  'snowman',
  'shower',
  'swan',
  'suit',
  'sweater',
  'smoke',
  'skirt',
  'sofa',
  'socks',
  'stadium',
  'skyscraper',
  'school',
  'sunglasses',
  'sandals',
  'slippers',
  'shorts',
  'sandwich',
  'strawberry',
  'spaghetti',
  'shrimp',
  'saxophone',
  'sister',
  'son',
  'singer',
  'senator',
  'street',
  'supermarket',
  'swimmingPool',
  'star',
  'sky',
  'sun',
  'spoon',
  'ship',
  'smile',
  'table',
  'turkey',
  'tie',
  'toes',
  'truck',
  'train',
  'taxi',
  'tiger',
  'trousers',
  'tongue',
  'television',
  'teacher',
  'turtle',
  'tablet',
  'trainStation',
  'toothpaste',
  'tail',
  'theater',
  'trenchCoat',
  'tea',
  'tomato',
  'teen',
  'tunnel',
  'temple',
  'town',
  'toothbrush',
  'tree',
  'toy',
  'tissue',
  'telephone',
  'underwear',
  'uncle',
  'umbrella',
  'vest',
  'voice',
  'veterinarian',
  'villa',
  'violin',
  'village',
  'vehicle',
  'vase',
  'wallet',
  'wolf',
  'waist',
  'wrist',
  'waterMelon',
  'whale',
  'water',
  'wings',
  'whisker',
  'watch',
  'woman',
  'washingMachine',
  'wheelchair',
  'waiter',
  'wound',
  'xylophone',
  'zebra',
  'zoo'
];

const extraPropertyBytes = 3;
const extraStringBytes = 2;
const emptyArrayBytes = 2;
const emptyObjectBytes = 2;
const commaBytes = 1;

const Actions = {
  AddBoolean: 0,
  AddString: 1,
  AddNumber: 2,
  AddNull: 3,
  AddArray: 4,
  AddObject: 5,
  GoToSubNode: 6,
  GoToSubNode2: 7,
  GoToSubNode3: 8,
  GoToSubNode4: 9,
  GoToSubNode5: 10
};

function generateNewPropertyName(existingProperties) {
  const availableProperties = propertyNames.filter(
    (prop) => existingProperties.indexOf(prop) === -1
  );
  return availableProperties[getRandom(availableProperties.length - 1)];
}

function getRandom(max, min) {
  const realMin = min || 0;
  return Math.floor(Math.random() * (max + 1 - realMin)) + realMin;
}

function addRandomContent(sizeLimit, maxPropertiesForObject, result, currentSize) {
  let newSize = currentSize;

  while (newSize < sizeLimit) {
    newSize += addRandomField(result, maxPropertiesForObject);
  }

  return newSize;
}

function generateRandomString(maxLength) {
  const stringStart = getRandom(stringSample.length - 2);
  return stringSample.substring(
    stringStart,
    stringStart + getRandom(Math.min(maxLength, stringSample.length - stringStart))
  );
}

function addRandomField(result, maxPropertiesForObject) {
  const objectKeys = Object.keys(result);
  const complexFields = objectKeys.filter(
    (field) => result[field] && typeof result[field] === 'object'
  );

  const minAction =
    objectKeys.length < maxPropertiesForObject
      ? Actions.AddBoolean
      : complexFields.length === 0
      ? Actions.AddObject
      : Actions.GoToSubNode;
  const maxAction = complexFields.length > 0 ? Actions.GoToSubNode5 : Actions.AddObject;

  const action = getRandom(maxAction, minAction);
  const newPropertyName = generateNewPropertyName(objectKeys);

  let newValue;
  let newValueLen = 0;

  switch (action) {
    case Actions.AddBoolean:
      newValue = Math.random() > 0.5;
      newValueLen = newValue.toString().length;
      break;
    case Actions.AddString:
      newValue = generateRandomString(200);
      newValueLen = newValue.length + extraStringBytes;
      break;
    case Actions.AddNumber:
      newValue = getRandom(10_000);
      newValueLen = newValue.toString().length;
      break;
    case Actions.AddNull:
      newValue = null;
      newValueLen = 'null'.length;
      break;
    case Actions.AddArray:
      newValue = [];
      newValueLen = emptyArrayBytes;
      break;
    case Actions.AddObject:
      newValue = {};
      newValueLen = emptyObjectBytes;
      break;
    case Actions.GoToSubNode:
    case Actions.GoToSubNode2:
    case Actions.GoToSubNode3:
    case Actions.GoToSubNode4:
    case Actions.GoToSubNode5: {
      const subNodeName = complexFields[getRandom(complexFields.length - 1)];
      const subNode = result[subNodeName];
      if (Array.isArray(subNode)) {
        if (subNode.length === 0 || Math.random() > 0.98) {
          subNode.push({});
          newValueLen = emptyObjectBytes;
        } else {
          newValueLen = addRandomField(
            subNode[getRandom(subNode.length - 1)],
            maxPropertiesForObject
          );
        }
      } else {
        newValueLen = addRandomField(subNode, maxPropertiesForObject);
      }
      break;
    }
    default:
      console.log('action=', action);
      break;
  }
  let addedSize = newValueLen;
  if (action < Actions.GoToSubNode) {
    result[newPropertyName] = newValue;
    addedSize +=
      extraPropertyBytes + newPropertyName.length + (objectKeys.length > 0 ? commaBytes : 0);
  }

  return addedSize;
}

/* eslint-disable no-unused-vars */
function generateJson(sizeLimit, maxPropertiesForObject, fileName) {
  const result = {};
  const size = addRandomContent(sizeLimit, maxPropertiesForObject, result, emptyObjectBytes);
  console.log(`size = ${size}`);

  const json = JSON.stringify(result);
  writeFile(json, fileName);
}

function generateArrayJson(arraySize, fileName) {
  const array = [];

  function generatePhoneNumber() {
    const phoneNumber = [];
    for (let i = 0; i < 10; i++) {
      phoneNumber.push(getRandom(9));
    }
    return phoneNumber.join('');
  }

  for (let i = 0; i < arraySize; i++) {
    array.push({
      firstName: generateRandomString(10),
      secondName: generateRandomString(10),
      phone: generatePhoneNumber(),
      address: generateRandomString(200),
      age: getRandom(100, 0)
    });
  }

  const json = JSON.stringify(array);
  writeFile(json, fileName);
}

function writeFile(content, fileName) {
  const data = new Uint8Array(Buffer.from(content));
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

// generateJson(300 * 1024, 50, './src/hugeJson.json');
generateArrayJson(1_000, './src/hugeArray.json');
