'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Diaries', [
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "어렵다",
        weather: "바람 많음",
        content: "누군가가 나에게 돈을 빌려 형편상 갚지 못한다면 그것은 어쩔 수 없는 첫 번째 화살을 맞는 것이지만, 그로인해 그를 원망하고, 욕하면서 괴로워한다면 그것은 두 번째, 세 번째 화살을 연거푸 맞는 것이다.",
        private: false,
        picUrl: null,
        date: "2021-05-05 13:35:34",
        feelings: "나쁨",
        createdAt: "2021-05-05 13:35:34",
        updatedAt: "2021-05-05 13:35:34"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "호사다마",
        weather: "맑음",
        content: "좋은 것이 내게 다가오는 그 때를 주의 깊게 지켜보라. 사랑도, 소유도, 물질도, 돈도, 좋은 집도, 좋은 차도, 모든 좋은 것들이 내게 밀물처럼 밀려오는 바로 그 순간이 내 인생 최고의 위기이다.",
        private: false,
        picUrl: null,
        date: "2021-05-06 07:36:06",
        feelings: "피곤",
        createdAt: "2021-05-06 07:36:06",
        updatedAt: "2021-05-06 07:36:06"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "갑자기 너가 생각나",
        weather: "비",
        content: "모두 그 등불때문이야, 갑자기 번쩍이더라 그래서 네가 생각이 났어. 네가 잠에 못 들고 있는 건 아닐까 모두 이 비 때문이야, 갑자기 비가 너무 많이 오네. 아마 힘들거야 너와 함께 있는 것은. 혼자 지내는 밤, 내 마음은 어디에 두어야 할까. 널 안은 후, 내 두 손은 어디에 두어야 할까. 유리창 위에 너의 아름다운 이름을 새겨봐. 외로움이 밀려오면 낡은 비옷은 어디에 두어야 할까. 네 생각을 하는 내 생각을 어떻게 하면 좋을까. 어떻게 해야, 우리 두 사람은 헤어지지 않을까? 모두 이 비 때문이야, 갑자기 비가 너무 많이 오네.",
        private: false,
        picUrl: null,
        date: "2021-05-07 07:36:06",
        feelings: "슬픔",
        createdAt: "2021-05-07 07:36:06",
        updatedAt: "2021-05-07 07:36:06"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "Always remember us this way",
        weather: "비",
        content: "That Arizona sky burning in your eyes. You look at me and, babe, I wanna catch on fire. It's buried in my soul like California gold. You found the light in me that I couldn't find. So when I'm all choked up. And I can't find the words. Every time we say goodbye. Baby, it hurts. When the sun goes down. And the band won't play. I'll always remember us this way. Lovers in the night. Poets trying to write. We don't know how to rhyme. But damn we try. But all I really know. You're where I wanna go. The part of me that's you will never die. So when I'm all choked up. But I can't find the words. Every time we say goodbye. Baby, it hurts. When the sun goes down. And the band won't play. I'll always remember us this way",
        private: false,
        picUrl: null,
        date: "2021-05-14 12:09:48",
        feelings: "좋음",
        createdAt: "2021-05-08 12:09:48",
        updatedAt: "2021-05-08 12:09:48"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "파도가 밀려와도",
        weather: "맑음",
        content: "파도가 자기에게 끊임없이 밀려와서 부서지지만, 그 자신은 견고히 서서 주변의 용솟음치는 바닷물을 고요하게 만드는 해안의 넓은 바위처럼 되라",
        private: false,
        picUrl: null,
        date: "2021-05-09 07:36:06",
        feelings: "좋음",
        createdAt: "2021-05-09 07:36:06",
        updatedAt: "2021-05-09 07:36:06"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "model querying -basics",
        weather: "sunny",
        content: "Sequelize provides various methods to assist querying your database for data.Important notice: to perform production-ready queries with Sequelize, make sure you have read the Transactions guide as well. Transactions are important to ensure data integrity and to provide other benefits.This guide will show how to make the standard CRUD queries.",
        private: false,
        picUrl: null,
        date: "2021-05-11 02:34:57",
        feelings: "good",
        createdAt: "2021-05-11 02:34:57",
        updatedAt: "2021-05-11 02:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "Simple INSERT queries",
        weather: "sunny",
        content: "The Model.create() method is a shorthand for building an unsaved instance with Model.build() and saving the instance with instance.save().",
        private: false,
        picUrl: null,
        date: "2021-05-12 02:34:57",
        feelings: "happy",
        createdAt: "2021-05-12 02:34:57",
        updatedAt: "2021-05-12 02:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "Simple SELECT queries",
        weather: "thunder",
        content: "You can read the whole table from the database with the findAll method: // Find all users const users = await User.findAll();console.log(users.every(user => user instanceof User)); // trueconsole.log(All users:, JSON.stringify(users, null, 2));",
        private: false,
        picUrl: null,
        date: "2021-05-12 03:34:57",
        feelings: "excited",
        createdAt: "2021-05-12 03:34:57",
        updatedAt: "2021-05-12 03:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "Applying WHERE clauses",
        weather: "sunny",
        content: "The where option is used to filter the query. There are lots of operators to use for the where clause, available as Symbols from Op. Observe that no operator (from Op) was explicitly passed, so Sequelize assumed an equality comparison by default.Just like Sequelize inferred the Op.eq operator in the first example, here Sequelize inferred that the caller wanted an AND for the two checks.",
        private: false,
        picUrl: null,
        date: "2021-05-12 06:34:57",
        feelings: "happy",
        createdAt: "2021-05-12 06:34:57",
        updatedAt: "2021-05-12 06:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "Creating in bulk",
        weather: "rainy",
        content: "Sequelize provides the Model.bulkCreate method to allow creating multiple records at once, with only one query.The usage of Model.bulkCreate is very similar to Model.create, by receiving an array of objects instead of a single object.However, by default, bulkCreate does not run validations on each object that is going to be created (which create does). To make bulkCreate run these validations as well, you must pass the validate: true option. This will decrease performance.If you are accepting values directly from the user, it might be beneficial to limit the columns that you want to actually insert. To support this, bulkCreate() accepts a fields option, an array defining which fields must be considered (the rest will be ignored).",
        private: false,
        picUrl: null,
        date: "2021-05-13 03:34:57",
        feelings: "upset",
        createdAt: "2021-05-13 03:34:57",
        updatedAt: "2021-05-13 03:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "로망로랑",
        weather: "sunny",
        content: "산다는것 그것은 치열한 전투이다.",
        private: false,
        picUrl: null,
        date: "2021-05-14 02:34:57",
        feelings: "good",
        createdAt: "2021-05-14 02:34:57",
        updatedAt: "2021-05-14 02:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "랄프 왈도 에머슨",
        weather: "sunny",
        content: "너무 소심하고 까다롭게 자신의 행동을 고민하지 말라 . 모든 인생은 실험이다 . 더많이 실험할수록 더나아진다",
        private: false,
        picUrl: null,
        date: "2021-05-15 02:34:57",
        feelings: "happy",
        createdAt: "2021-05-15 02:34:57",
        updatedAt: "2021-05-15 02:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "루이사 메이올콧",
        weather: "thunder",
        content: "일하는 시간과 노는 시간을 뚜렷이 구분하라 . 시간의 중요성을 이해하고 매순간을 즐겁게 보내고 유용하게 활용하라. 그러면 젋은 날은 유쾌함으로 가득찰것이고 늙어서도 후회할 일이 적어질것이며 비록 가난할 때라도 인생을 아름답게 살아갈수있다",
        private: false,
        picUrl: null,
        date: "2021-05-16 02:34:57",
        feelings: "excited",
        createdAt: "2021-05-16 02:34:57",
        updatedAt: "2021-05-16 02:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "일기쓰기와 정신 건강 사이의 관계",
        weather: "sunny",
        content: "불안감에 시달릴 때 글로 자신을 표현하는 것은 스트레스를 주는 과제에 대한 걱정을 덜어내는 데 도움이 됩니다. 일기를 쓰면 북받치는 감정을 표현하고 사고의 패턴을 관찰하여 거기에 단순 반응하는 데서 벗어날 수 있습니다. 로체스터 대학교 병원이 밝힌 일기쓰기의 혜택은 다음과 같습니다:정신 질환과 관계된 스트레스의 원인이나 징후를 추적할 방법을 제공합니다. 반복되는 트리거를 인지하고 그것이 미치는 영향을 최소화할 방법을 찾을 수 있습니다.문제, 우려, 두려움의 우선순위를 매길 수 있게 도와줍니다. 그럼으로써 제일 화가 나는 일이 무엇인지 알아내고 거기에 집중할 수 있습니다.부정적인 생각과 행동을 해소할 공간을 제공해 줍니다. 결정적으로 일기는 다른 사람의 생각을 걱정할 필요 없는 장소입니다.",
        private: false,
        picUrl: null,
        date: "2021-05-16 15:34:57",
        feelings: "happy",
        createdAt: "2021-05-16 15:34:57",
        updatedAt: "2021-05-16 15:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "일기",
        weather: "rainy",
        content: "일기(日記)란 개인이 일상에서 체험하는 경험, 생각, 감상 등의 제반사항을 하루 단위로 기록하는 비공식적, 사적 기록이다. 보통 일일 단위로 기록하지만, 작성하는 개인에 따라 천차만별이며, 강제성이 있는 공적인 기록이 아니므로 쓰는 간격에 따라서는 사실상 주기(週記)나 월기(月記)가 되기도 한다. 특별한 목적하에 공식적인 기록으로 남기는 것은 보통 일지(日誌)라고 하나, 과거의 일기는 오늘날과 달리 일지와 일기의 성격을 함께 갖는 경우가 많았다. 일기는 일기작성자가 작가이면서 동시에 유일한 독자인 특이한 글쓰기이다. 따라서 어떤 글쓰기보다 사적인 비밀이나 속마음이 적나라하게 표현된다. 일반에 공개된 일기의 일부-안네의 일기-는 문학사에 족적을 남기는 문학작품이 되기도 한다. 실제의 일기가 문학작품이 되는 반면에, 일기의 형식을 따온 문학작품도 다수 존재한다.",
        private: false,
        picUrl: null,
        date: "2021-05-17 03:34:57",
        feelings: "upset",
        createdAt: "2021-05-17 03:34:57",
        updatedAt: "2021-05-17 03:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "일기의 역사",
        weather: "sunny",
        content: "현존하는 가장 오래되고 왕성한 일기를 남긴 사람들은 헤이안 시대 일본의 궁녀들로 알려져 있다.",
        private: false,
        picUrl: null,
        date: "2021-05-18 02:34:57",
        feelings: "good",
        createdAt: "2021-05-18 02:34:57",
        updatedAt: "2021-05-18 02:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "한국의 일기",
        weather: "sunny",
        content: "한국의 일기는 조선 시대 이후의 것이 대부분이며, 그 이전의 일기는 현전하고 있지 않다.",
        private: false,
        picUrl: null,
        date: "2021-05-18 09:34:57",
        feelings: "happy",
        createdAt: "2021-05-18 09:34:57",
        updatedAt: "2021-05-18 09:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "11권은 그룹일기장",
        weather: "thunder",
        content: "교환일기(交換日記)는 친구나 연인 사이에서 서로의 마음을 나누기 위해 돌려 가며 쓰는 일기다. 1990년대 일본에서 시작되었다.",
        private: false,
        picUrl: null,
        date: "2021-05-19 02:34:57",
        feelings: "excited",
        createdAt: "2021-05-19 02:34:57",
        updatedAt: "2021-05-19 02:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "나의 두 번째 일기",
        weather: "sunny",
        content: "불안감에 시달릴 때 글로 자신을 표현하는 것은 스트레스를 주는 과제에 대한 걱정을 덜어내는 데 도움이 됩니다. 일기를 쓰면 북받치는 감정을 표현하고 사고의 패턴을 관찰하여 거기에 단순 반응하는 데서 벗어날 수 있습니다. 로체스터 대학교 병원이 밝힌 일기쓰기의 혜택은 다음과 같습니다:정신 질환과 관계된 스트레스의 원인이나 징후를 추적할 방법을 제공합니다. 반복되는 트리거를 인지하고 그것이 미치는 영향을 최소화할 방법을 찾을 수 있습니다.문제, 우려, 두려움의 우선순위를 매길 수 있게 도와줍니다. 그럼으로써 제일 화가 나는 일이 무엇인지 알아내고 거기에 집중할 수 있습니다.부정적인 생각과 행동을 해소할 공간을 제공해 줍니다. 결정적으로 일기는 다른 사람의 생각을 걱정할 필요 없는 장소입니다.",
        private: false,
        picUrl: null,
        date: "2021-05-20 15:34:57",
        feelings: "happy",
        createdAt: "2021-05-20 15:34:57",
        updatedAt: "2021-05-20 15:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "카카오",
        weather: "rainy",
        content: "카카오만큼 우리 생활의 일부분에 깊숙이 들어온 기업이 일을까? 4600만 명이 넘는 메신저를 쓰는 ‘카카오톡’이 큰 역할을 하고 있다. 텔레그램, 라인, 위챗 등이 대거 등장하긴 했지만 카카오톡은 독보적 1위 자리 한지 오래다. 이 플랫폼은 현재 쇼핑, 게임, 금융, 콘텐츠, 광고 등 사업 영역을 넓혀가고 있다.카카오의 사업은 플랫폼과 콘텐츠로 나눠볼 수 있다. 톡 비즈와 포털 비즈, 신사업 등이 포함된 플랫폼과 게임, 뮤직 등으로 구성된 콘텐츠가 있다. 이 중 특히 2019년 10월 시작한 카카오톡 채팅 상단에 노출시키는 광고인 비즈 보드로 인해 플랫폼의 매출은 지난 2019년 1조 원을 넘어섰다.",
        private: false,
        picUrl: null,
        date: "2021-05-21 03:34:57",
        feelings: "upset",
        createdAt: "2021-05-21 03:34:57",
        updatedAt: "2021-05-21 03:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "같은 그룹 kimcoding과 다른 유저",
        weather: "rainy",
        content: "카카오만큼 우리 생활의 일부분에 깊숙이 들어온 기업이 일을까? 4600만 명이 넘는 메신저를 쓰는 ‘카카오톡’이 큰 역할을 하고 있다. 텔레그램, 라인, 위챗 등이 대거 등장하긴 했지만 카카오톡은 독보적 1위 자리 한지 오래다. 이 플랫폼은 현재 쇼핑, 게임, 금융, 콘텐츠, 광고 등 사업 영역을 넓혀가고 있다.카카오의 사업은 플랫폼과 콘텐츠로 나눠볼 수 있다. 톡 비즈와 포털 비즈, 신사업 등이 포함된 플랫폼과 게임, 뮤직 등으로 구성된 콘텐츠가 있다. 이 중 특히 2019년 10월 시작한 카카오톡 채팅 상단에 노출시키는 광고인 비즈 보드로 인해 플랫폼의 매출은 지난 2019년 1조 원을 넘어섰다.",
        private: false,
        picUrl: null,
        date: "2021-05-22 03:34:57",
        feelings: "upset",
        createdAt: "2021-05-22 03:34:57",
        updatedAt: "2021-05-22 03:34:57"
      },
      {
        userId: 3,
        bookId: 2,
        type: 1,
        title: "3번 유저의 개인 일기장",
        weather: "rainy",
        content: "카카오만큼 우리 생활의 일부분에 깊숙이 들어온 기업이 일을까? 4600만 명이 넘는 메신저를 쓰는 ‘카카오톡’이 큰 역할을 하고 있다. 텔레그램, 라인, 위챗 등이 대거 등장하긴 했지만 카카오톡은 독보적 1위 자리 한지 오래다. 이 플랫폼은 현재 쇼핑, 게임, 금융, 콘텐츠, 광고 등 사업 영역을 넓혀가고 있다.카카오의 사업은 플랫폼과 콘텐츠로 나눠볼 수 있다. 톡 비즈와 포털 비즈, 신사업 등이 포함된 플랫폼과 게임, 뮤직 등으로 구성된 콘텐츠가 있다. 이 중 특히 2019년 10월 시작한 카카오톡 채팅 상단에 노출시키는 광고인 비즈 보드로 인해 플랫폼의 매출은 지난 2019년 1조 원을 넘어섰다.",
        private: false,
        picUrl: null,
        date: "2021-05-22 04:34:57",
        feelings: "upset",
        createdAt: "2021-05-22 04:34:57",
        updatedAt: "2021-05-22 04:34:57"
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Diaries', null, {});
  }
};
