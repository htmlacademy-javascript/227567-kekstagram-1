import {getRandomInteger, getRandomArrayElement} from './util.js';

const PICTURE_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 20;
const AVATAR_COUNT = 6;

const COMMENTER_NAMES = ['Алексей', 'Борис', 'Владимир', 'Григорий', 'Дмитрий',
  'Елена', 'Зинаида', 'Ирина', 'Константин', 'Людмила'];

const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Великолепный закат над городом, который напомнил мне о красоте природы. #sunset #city #beauty',
  'Долгожданный отдых на море, где каждый день полон солнца и спокойствия. #vacation #beach #relax',
  'Лучшие моменты с друзьями! Воспоминания, которые останутся с нами навсегда. #friends #fun #memories',
  'Утренний кофе в любимом кафе, где я провожу свои самые спокойные утренние часы. #coffee #morning #cafe',
  'Горы зовут! Это было невероятное приключение и испытание для нас. #mountains #hiking #adventure',
  'Вечерняя прогулка по набережной, где мы наслаждаемся шумом волн и свежим воздухом. #evening #walk #waterfront',
  'Волшебные огни ночного города создают атмосферу настоящей магии. #night #citylights #magic',
  'Любимая книга и теплый плед — идеальное сочетание для уютного вечера. #book #cozy #relax',
  'Прекрасное место для пикника, где мы наслаждались природой и вкусной едой. #picnic #nature #outdoor',
  'Восхитительный вид с вершины, который захватывает дух и дарит чувство свободы. #view #summit #landscape',
  'Незабываемое путешествие по Европе, полное удивительных открытий и приключений. #travel #europe #explore',
  'Летние деньки на даче — это солнце, природа и беззаботное время. #summer #countrylife #sunny',
  'Романтический ужин при свечах с любимым человеком — моменты, которые навсегда останутся в сердце. #romantic #dinner #love',
  'Утро в любимом парке, где можно насладиться свежим воздухом и красотой природы. #morning #park #freshair',
  'Счастливые моменты в кругу семьи, которые дарят тепло и радость. #family #love #together',
  'Вкусный завтрак в постели — идеальное начало дня. #breakfast #bed #delicious',
  'Занятия йогой на рассвете наполняют тело и душу энергией и спокойствием. #yoga #sunrise #wellness',
  'Прогулка по старинным улочкам, где каждая деталь хранит свою историю. #walk #history #charm',
  'Зимние забавы на свежем воздухе — это снег, смех и радость. #winter #fun #snow',
  'Весеннее пробуждение природы наполняет сердце радостью и надеждой. #spring #nature #bloom'
];

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      //console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
const generateCommentId = createRandomIdFromRangeGenerator(10,1000);

const createMessage = () => Array.from({length:getRandomInteger(1,2)},() => getRandomArrayElement(COMMENT_LINES)).join(' ');
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(COMMENTER_NAMES)
});
const createPicture = (pictureId) => ({
  id: pictureId,
  url: `photos/${pictureId}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT,LIKE_MAX_COUNT),
  comments: Array.from({length:getRandomInteger(1,COMMENT_COUNT)}, createComment)
});
const getPictures = () => Array.from({length:PICTURE_COUNT},(_, pictureIndex) => createPicture(pictureIndex + 1));

export {getPictures};
