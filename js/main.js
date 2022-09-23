const PHOTO_DESCRIPTIONS = [
  'Эйфелева башня невероятно красива, да и мы около неё стоим не менее красивые',
  'Эта башня невероятно наклонена и не падает много лет, но я делаю вид, что держу её',
  'Здание на фотографии имеет причудливую форму медного цвета. Мог ли это быть офис компании?',
  'Оказался в центре Лондона: люди, двухэтажные автобусы, машины. Красиво тут, в Казани...'
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Дарина', 'Богдан', 'Борислав', 'Владислав',
  'Милорад', 'Радислав', 'Святослав', 'Вениамин',
  'Мефодий', 'Митрофан', 'Никодим', 'Добрыня',
  'Мефодий', 'Савва', 'Аврора', 'Евдокия'
];
const IMAGES_NUMBER = 25;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElementFromArray = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const checkStringLength = (string, length) => string.length <= length;

const uniqueNumberGenerator = () => {
  let prevNumber = 0;

  return () => ++prevNumber;
};

const commentIdGenerator = uniqueNumberGenerator();
const imageIdGenerator = uniqueNumberGenerator();
const photoNumberGenerator = uniqueNumberGenerator();

const createComment = () => ({
  id: commentIdGenerator(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomElementFromArray(COMMENTS),
  name: getRandomElementFromArray(NAMES)
});

const createImage = () => ({
  id: imageIdGenerator(),
  url: `photos/${photoNumberGenerator()}.jpg`,
  description: getRandomElementFromArray(PHOTO_DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: getRandomPositiveInteger(1, 4)}, createComment)
});

const createImages = () => Array.from({length: IMAGES_NUMBER}, createImage);

createImages();
checkStringLength('test', 3);


