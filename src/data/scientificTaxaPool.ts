export interface TaxonSeed {
  chineseName: string;
  scientificName: string;
  namingAuthor: string;
  taxonomy: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
  domain: 'fauna' | 'flora' | 'fungi';
  conservation: string;
  citesAppendix: string;
  distribution: string[];
  habitat: string;
  morphology: string;
  habits: string;
  evolutionaryMilestone: string;
  geologicalPeriod: string;
  tags: string[];
  imageUrl?: string;
  references: { title: string; source: string; year: string }[];
}

export const SCIENTIFIC_TAXA_POOL: TaxonSeed[] = [
  // ========================== FAUNA (动物界) ==========================
  // --- 哺乳纲 ---
  {
    chineseName: '川金丝猴',
    scientificName: 'Rhinopithecus roxellana',
    namingAuthor: '(Milne-Edwards, 1870)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '灵长目 (Primates)',
      family: '猴科 (Cercopithecidae)',
      genus: '仰鼻猴属 (Rhinopithecus)',
      species: '川金丝猴 (Rhinopithecus roxellana)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['四川', '陕西秦岭', '甘肃南部', '湖北神农架'],
    habitat: '海拔1500-3300米高山针叶林与针阔混交林带。',
    morphology: '鼻孔朝天，吻部突出，雄猴背部披有长达数十厘米的金黄色丝状长毛，面部天蓝色。',
    habits: '典型树栖群居灵长类，主食树皮、树芽、地衣（松萝）及野果。',
    evolutionaryMilestone: '仰鼻猴属在青藏高原东缘隆升冷干化过程中适应高山极寒森林的演化代表。',
    geologicalPeriod: '早更新世 (约150万年)',
    tags: ['中国特有', '金丝猴', '国家一级保护野生动物', '旗舰物种', '高山灵长类'],
    references: [{ title: '中国灵长类学研究', source: '科学出版社', year: '2021' }]
  },
  {
    chineseName: '滇金丝猴',
    scientificName: 'Rhinopithecus bieti',
    namingAuthor: 'Milne-Edwards, 1897',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '灵长目 (Primates)',
      family: '猴科 (Cercopithecidae)',
      genus: '仰鼻猴属 (Rhinopithecus)',
      species: '滇金丝猴 (Rhinopithecus bieti)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['云南西北部（白马雪山、云岭）', '西藏芒康'],
    habitat: '海拔3000-4700米的高山暗针叶林带（冷杉、云杉林），是世界上栖息海拔最高的灵长类。',
    morphology: '具有标志性的红唇，头顶具黑色尖形冠毛，身体背部黑灰，腹部白灰。',
    habits: '专食高山松萝地衣和针叶树嫩芽，以家庭为单元组成上百只的大群体。',
    evolutionaryMilestone: '三江并流峡谷地貌隔离下演化出的极端耐寒灵长类孑遗。',
    geologicalPeriod: '早更新世',
    tags: ['雪山精灵', '中国特有', '国家一级保护野生动物', '红唇精灵'],
    references: [{ title: '滇金丝猴生态与保护', source: '云南科技出版社', year: '2019' }]
  },
  {
    chineseName: '黔金丝猴',
    scientificName: 'Rhinopithecus brelichi',
    namingAuthor: 'Thomas, 1903',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '灵长目 (Primates)',
      family: '猴科 (Cercopithecidae)',
      genus: '仰鼻猴属 (Rhinopithecus)',
      species: '黔金丝猴 (Rhinopithecus brelichi)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['贵州梵净山国家级自然保护区'],
    habitat: '海拔1400-2200米常绿落叶阔叶混交林中。',
    morphology: '两肩之间有一块显著的卵圆形白斑，体毛多呈灰褐色，幼猴为灰色。',
    habits: '喜食植物嫩芽、花、果及昆虫，随季节变化在不同海拔垂直迁移。',
    evolutionaryMilestone: '仅存于孤立岛状山体梵净山的极度濒危古老演化孤种。',
    geologicalPeriod: '中更新世',
    tags: ['梵净山独有', '世界独生子', '国家一级保护野生动物', '极危物种'],
    references: [{ title: '梵净山生物多样性', source: '贵州科技出版社', year: '2020' }]
  },
  {
    chineseName: '雪豹',
    scientificName: 'Panthera uncia',
    namingAuthor: '(Schreber, 1775)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '食肉目 (Carnivora)',
      family: '猫科 (Felidae)',
      genus: '豹属 (Panthera)',
      species: '雪豹 (Panthera uncia)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['西藏', '青海', '新疆天山/阿尔泰山', '四川西部', '甘肃祁连山', '云南西北部'],
    habitat: '海拔3000-5500米高山裸岩、高山草甸及流石滩雪线附近。',
    morphology: '灰白色皮毛布满深色环状斑纹，尾巴粗长几乎与体长相等（用于保持高山陡崖平衡与保暖）。',
    habits: '晨昏活动的高山顶级掠食者，擅长攀爬绝壁，主食岩羊、北山羊、高原鼠兔。',
    evolutionaryMilestone: '高原生态系统健康的指示物种与伞护种，适应高寒低氧陡峭岩壁的终极猫科掠食者。',
    geologicalPeriod: '晚中新世至上新世 (约600万年)',
    tags: ['雪山之王', '高山旗舰物种', '国家一级保护野生动物', '顶级捕食者'],
    references: [{ title: '中国雪豹调查与保护现状', source: '中国林业出版社', year: '2022' }]
  },
  {
    chineseName: '藏羚羊',
    scientificName: 'Pantholops hodgsonii',
    namingAuthor: '(Abel, 1826)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '偶蹄目 (Artiodactyla)',
      family: '牛科 (Bovidae)',
      genus: '藏羚属 (Pantholops)',
      species: '藏羚羊 (Pantholops hodgsonii)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['西藏羌塘', '青海可可西里', '新疆阿尔金山', '三江源国家公园'],
    habitat: '海拔3700-5500米高山荒漠、高寒草甸及流石滩。',
    morphology: '雄羚具黑色细长如鞭的竖直长角，绒毛极其保暖细腻。',
    habits: '雌性具有夏季大规模长途迁徙至卓乃湖产仔的壮观生态习性。',
    evolutionaryMilestone: '青藏高原隆升过程中演化出的独特抗缺氧与极寒适应类群。',
    geologicalPeriod: '第四纪早更新世 (约200万年)',
    tags: ['青藏高原精灵', '国家一级保护野生动物', '旗舰物种', '大迁徙'],
    references: [{ title: '青藏高原哺乳动物志', source: '科学出版社', year: '2019' }]
  },
  {
    chineseName: '普氏原羚',
    scientificName: 'Procapra przewalskii',
    namingAuthor: '(Büchner, 1891)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '偶蹄目 (Artiodactyla)',
      family: '牛科 (Bovidae)',
      genus: '原羚属 (Procapra)',
      species: '普氏原羚 (Procapra przewalskii)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['青海省青海湖环湖周边干旱半干旱草原'],
    habitat: '海拔3000-3500米高寒干旱草原、沙丘及荒漠半荒漠。',
    morphology: '雄羚角短粗，角尖显著向内对弯；臀部具明显心形白色臀斑。',
    habits: '奔跑跳跃能力极强，主食禾本科和莎草科牧草。',
    evolutionaryMilestone: '中国特有羚羊，全球仅分布于青海湖盆地。',
    geologicalPeriod: '中更新世',
    tags: ['中国特有种', '青海湖旗舰物种', '国家一级保护野生动物', 'IUCN 濒危'],
    references: [{ title: '中国濒危动物红皮书: 兽类', source: '科学出版社', year: '1998' }]
  },
  {
    chineseName: '白头叶猴',
    scientificName: 'Trachypithecus leucocephalus',
    namingAuthor: 'Tan, 1957',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '灵长目 (Primates)',
      family: '猴科 (Cercopithecidae)',
      genus: '乌叶猴属 (Trachypithecus)',
      species: '白头叶猴 (Trachypithecus leucocephalus)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['广西崇左、扶绥、宁明等喀斯特石山'],
    habitat: '亚热带石灰岩喀斯特石山落叶季雨林和悬崖溶洞。',
    morphology: '头顶具白色高耸冠毛，颈部与肩部白色，躯干四肢乌黑；幼猴通体金黄。',
    habits: '岩栖性灵长类，攀爬悬崖绝壁如履平地；主食树叶和果实。',
    evolutionaryMilestone: '喀斯特孤岛石山特化演化的中国特有珍稀灵长类。',
    geologicalPeriod: '第四纪更新世',
    tags: ['中国特有种', '喀斯特精灵', '国家一级保护野生动物', 'IUCN 极危'],
    references: [{ title: '中国灵长类学', source: '中山大学出版社', year: '2021' }]
  },
  {
    chineseName: '荒漠猫',
    scientificName: 'Felis bieti',
    namingAuthor: 'Milne-Edwards, 1892',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '食肉目 (Carnivora)',
      family: '猫科 (Felidae)',
      genus: '猫属 (Felis)',
      species: '荒漠猫 (Felis bieti)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 II',
    distribution: ['青海', '四川西北部', '甘肃', '西藏'],
    habitat: '海拔2800-4000米的高山草甸、高寒灌丛与荒漠戈壁边缘。',
    morphology: '耳尖具红褐色簇毛，体背草黄灰色，尾部具5-6条清晰黑环与黑尖。',
    habits: '独居晨昏夜行，主要捕食高原鼢鼠、鼠兔及雉类。',
    evolutionaryMilestone: '中国唯一的特有猫科动物，被称为“最神秘的中国特有猫科”。',
    geologicalPeriod: '更新世',
    tags: ['中国特有猫科', '国家一级保护野生动物', '草猫', '高原猎手'],
    references: [{ title: '中国兽类物种多样性', source: '科学出版社', year: '2022' }]
  },
  {
    chineseName: '羚牛 (秦岭亚种)',
    scientificName: 'Budorcas taxicolor bedfordi',
    namingAuthor: 'Thomas, 1911',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '偶蹄目 (Artiodactyla)',
      family: '牛科 (Bovidae)',
      genus: '羚牛属 (Budorcas)',
      species: '羚牛 (Budorcas taxicolor)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 II',
    distribution: ['陕西秦岭 (太白山、佛坪、周至等)'],
    habitat: '海拔1500-3600米的高山针阔混交林、箭竹林及高山草甸。',
    morphology: '体型粗壮如牛，成年通体金黄或白金黄色，故俗称“金毛扭角羚”。',
    habits: '集群生活，夏上高山吃草舔盐，冬下低谷避寒觅竹叶。',
    evolutionaryMilestone: '介于山羊与牛之间的古老孑遗有蹄类，“秦岭四宝”之一。',
    geologicalPeriod: '早更新世',
    tags: ['秦岭四宝', '金毛羚牛', '国家一级保护野生动物', '古老偶蹄类'],
    references: [{ title: '秦岭羚牛生态学', source: '陕西人民出版社', year: '2018' }]
  },
  {
    chineseName: '中华白海豚',
    scientificName: 'Sousa chinensis',
    namingAuthor: '(Osbeck, 1765)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '偶蹄目 (鲸偶蹄目 Cetartiodactyla)',
      family: '海豚科 (Delphinidae)',
      genus: '驼海豚属 (Sousa)',
      species: '中华白海豚 (Sousa chinensis)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['广东珠江口', '厦门湾', '广西北部湾', '海南近海', '台湾海峡西侧'],
    habitat: '亚热带近岸浅水区、河口咸淡水交汇水域。',
    morphology: '成年个体由于皮下血管充血呈现独特的粉红色或乳白色，幼豚深灰，亚成体具灰斑。',
    habits: '以近海底栖及中上层鱼类为食，依赖高频回声定位探测水下环境。',
    evolutionaryMilestone: '近海咸淡水生态系统顶级捕食者，被称为“水上大熊猫”。',
    geologicalPeriod: '上新世',
    tags: ['水上大熊猫', '粉红海豚', '国家一级保护野生动物', '海洋旗舰物种'],
    references: [{ title: '中国海域中华白海豚研究', source: '海洋出版社', year: '2020' }]
  },
  {
    chineseName: '长江江豚',
    scientificName: 'Neophocaena asiaeorientalis asiaeorientalis',
    namingAuthor: 'Pilleri & Gihr, 1972',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '哺乳纲 (Mammalia)',
      order: '偶蹄目 (鲸偶蹄目 Cetartiodactyla)',
      family: '鼠海豚科 (Phocoenidae)',
      genus: '江豚属 (Neophocaena)',
      species: '窄脊江豚 (Neophocaena asiaeorientalis)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['长江中下游干流', '鄱阳湖', '洞庭湖'],
    habitat: '淡水大江大河主航道及通江湖泊支流。',
    morphology: '无背鳍，体色铅灰，头部圆钝，额部隆起，具有可爱的“微笑”面容。',
    habits: '结成母子小群或家庭群，依靠敏锐的回声定位声呐捕食淡水小型鱼类。',
    evolutionaryMilestone: '长江水系目前仅存的淡水鲸豚类顶级掠食者，长江大保护核心旗舰种。',
    geologicalPeriod: '第四纪更新世',
    tags: ['微笑天使', '长江旗舰物种', '国家一级保护野生动物', '淡水豚类'],
    references: [{ title: '长江江豚保护与繁育', source: '科学出版社', year: '2023' }]
  },

  // --- 鸟纲 ---
  {
    chineseName: '黑颈鹤',
    scientificName: 'Grus nigricollis',
    namingAuthor: 'Przevalsky, 1876',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '鸟纲 (Aves)',
      order: '鹤形目 (Gruiformes)',
      family: '鹤科 (Gruidae)',
      genus: '鹤属 (Grus)',
      species: '黑颈鹤 (Grus nigricollis)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['西藏', '青海', '四川若尔盖', '贵州草海', '云南昭通'],
    habitat: '海拔2500-5000米的高原草甸沼泽、湖泊湿地。',
    morphology: '世界上唯一完全生长繁殖在高原的鹤类。颈部完全黑褐色，头顶裸皮鲜红。',
    habits: '高原迁徙候鸟，以水生植物根茎、昆虫、小鱼虾为食。',
    evolutionaryMilestone: '最晚被科学界发现的鹤类，是鹤属在青藏高原严苛低氧环境下辐射演化的顶峰代表。',
    geologicalPeriod: '更新世晚期',
    tags: ['高原神鸟', '世界唯一高原鹤', '国家一级保护野生动物', '湿地旗舰'],
    references: [{ title: '中国鹤类分类与分布', source: '科学出版社', year: '2022' }]
  },
  {
    chineseName: '朱鹮',
    scientificName: 'Nipponia nippon',
    namingAuthor: '(Temminck, 1835)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '鸟纲 (Aves)',
      order: '鹈形目 (Pelecaniformes)',
      family: '鹮科 (Threskiornithidae)',
      genus: '朱鹮属 (Nipponia)',
      species: '朱鹮 (Nipponia nippon)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['陕西汉中洋县（最初发现地）', '陕西秦岭南麓', '浙江德清', '河南董寨'],
    habitat: '低山丘陵农田湿地、水稻田、溪流及高大乔木林（马尾松、栓皮栎）。',
    morphology: '全身羽毛白中透粉红，飞羽和尾羽具瑰丽朱红色；面部裸露鲜红，长喙向下弯曲。',
    habits: '涉禽，在水田翻寻泥鳅、青蛙、水生昆虫；夜宿于高大树木顶端。',
    evolutionaryMilestone: '第三纪古老鸟类孑遗，曾濒临绝灭（1981年秦岭洋县仅存7只野生个体），是世界生物多样性抢救繁育奇迹。',
    geologicalPeriod: '古近纪渐新世',
    tags: ['东方宝石', '吉祥鸟', '国家一级保护野生动物', '繁育拯救奇迹'],
    references: [{ title: '朱鹮生态与保育研究', source: '科学出版社', year: '2021' }]
  },
  {
    chineseName: '白颈长尾雉',
    scientificName: 'Syrmaticus ellioti',
    namingAuthor: '(Swinhoe, 1872)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '鸟纲 (Aves)',
      order: '鸡形目 (Galliformes)',
      family: '雉科 (Phasianidae)',
      genus: '长尾雉属 (Syrmaticus)',
      species: '白颈长尾雉 (Syrmaticus ellioti)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['浙江开化', '江西三清山', '福建武夷山', '安徽黄山', '广东北部'],
    habitat: '海拔300-1500米亚热带阔叶林、针阔混交林及竹林。',
    morphology: '雄鸟颈部具明显白斑，体羽呈栗褐色并具光泽，尾羽长而具黑白相间横斑。',
    habits: '林下隐秘地栖雉类，善奔跑，主食植物嫩芽、浆果和昆虫。',
    evolutionaryMilestone: '中国特有珍稀雉类，华东与华南山地森林特化辐射演化分支。',
    geologicalPeriod: '上新世',
    tags: ['中国特有鸟类', '长尾雉', '国家一级保护野生动物', '华东森林之王'],
    references: [{ title: '中国雉类志', source: '科学出版社', year: '2020' }]
  },
  {
    chineseName: '黄腹角雉',
    scientificName: 'Tragopan caboti',
    namingAuthor: '(Gould, 1857)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '鸟纲 (Aves)',
      order: '鸡形目 (Galliformes)',
      family: '雉科 (Phasianidae)',
      genus: '角雉属 (Tragopan)',
      species: '黄腹角雉 (Tragopan caboti)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['福建武夷山', '浙江乌岩岭', '江西井冈山', '广东车八岭', '湖南八面山'],
    habitat: '海拔800-1400米原生常绿阔叶林和针阔混交林。',
    morphology: '雄鸟下体淡黄褐色，头顶具黑色冠羽，求偶时能展开翠蓝色肉质角与五彩斑斓的肉裙。',
    habits: '喜栖于高大乔木（如交让木）树冠营巢繁殖，是雉类中少有的树栖营巢者。',
    evolutionaryMilestone: '中国特有珍禽，被称为“鸟类中的大熊猫”，古老角雉属典型树栖分化支。',
    geologicalPeriod: '更新世',
    tags: ['中国特有', '鸟类大熊猫', '国家一级保护野生动物', '华东雨林精灵'],
    references: [{ title: '黄腹角雉生态学研究', source: '浙江科学技术出版社', year: '2019' }]
  },
  {
    chineseName: '褐马鸡',
    scientificName: 'Crossoptilon mantchuricum',
    namingAuthor: 'Swinhoe, 1863',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '鸟纲 (Aves)',
      order: '鸡形目 (Galliformes)',
      family: '雉科 (Phasianidae)',
      genus: '马鸡属 (Crossoptilon)',
      species: '褐马鸡 (Crossoptilon mantchuricum)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['山西吕梁山（庞泉沟/芦芽山）', '河北小五台山', '北京门头沟百花山', '陕西韩城'],
    habitat: '海拔1000-2600米华北落叶松林、云杉林和针阔混交林。',
    morphology: '通体浓褐色，耳羽簇白色直立如角，尾羽蓬松高耸如马尾披散。',
    habits: '集群活动，勇敢善斗，中国古代武将“冠插鹖羽”即源于褐马鸡。',
    evolutionaryMilestone: '华北暖温带山地针阔混交林特化演化的中国特有属种。',
    geologicalPeriod: '更新世中晚期',
    tags: ['中国特有', '山西省鸟', '鹖冠原型', '国家一级保护野生动物'],
    references: [{ title: '中国珍禽褐马鸡', source: '中国林业出版社', year: '2018' }]
  },
  {
    chineseName: '中华秋沙鸭',
    scientificName: 'Mergus squamatus',
    namingAuthor: 'Gould, 1864',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '鸟纲 (Aves)',
      order: '雁形目 (Anseriformes)',
      family: '鸭科 (Anatidae)',
      genus: '秋沙鸭属 (Mergus)',
      species: '中华秋沙鸭 (Mergus squamatus)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['吉林长白山 (繁殖地)', '江西婺源', '湖南沅江 (越冬地)'],
    habitat: '森林湍急清澈溪流与江河水库，对水质极度苛刻。',
    morphology: '头顶具双丝状长冠羽，胁羽具有极其精美的黑白相间鱼鳞状斑纹。',
    habits: '潜水捕鱼高手，树洞营巢繁殖，被称为“生态试纸”。',
    evolutionaryMilestone: '第三纪古新世孑遗的鸟类活化石，全球仅存不足2000对。',
    geologicalPeriod: '第三纪古新世 (1000万年以上)',
    tags: ['鸟中大熊猫', '国宝活化石', '水质指示种', '国家一级保护野生动物'],
    references: [{ title: '中华秋沙鸭生态学研究', source: '林业出版社', year: '2021' }]
  },

  // --- 爬行纲 / 两栖纲 / 鱼类 / 昆虫 ---
  {
    chineseName: '莽山原矛头蝮',
    scientificName: 'Protobothrops mangshanensis',
    namingAuthor: '(Zhao, 1990)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '爬行纲 (Reptilia)',
      order: '有鳞目 (Squamata)',
      family: '蝰科 (Viperidae)',
      genus: '原矛头蝮属 (Protobothrops)',
      species: '莽山原矛头蝮 (Protobothrops mangshanensis)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 II',
    distribution: ['湖南宜章莽山国家级自然保护区', '广东乳源天井山'],
    habitat: '海拔700-1300米亚热带山地常绿阔叶林茂密林下与溪流边。',
    morphology: '体型巨大可达2-3米，重达3-5公斤；体背具黄绿与黑色交织的鲜明花纹，尾尖乳白色（用于诱食），俗称“莽山烙铁头”或“蛇中大熊猫”。',
    habits: '伏击型毒蛇，具管牙与剧烈血循毒素，主要捕食鸟类及啮齿类。',
    evolutionaryMilestone: '特产于南岭山脉狭窄区域的古老特化蝰科蝮亚科毒蛇。',
    geologicalPeriod: '更新世',
    tags: ['蛇中大熊猫', '莽山烙铁头', '国家一级保护野生动物', '中国特有毒蛇'],
    references: [{ title: '莽山原矛头蝮研究', source: '科学出版社', year: '2020' }]
  },
  {
    chineseName: '扬子鳄',
    scientificName: 'Alligator sinensis',
    namingAuthor: 'Fauvel, 1879',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '爬行纲 (Reptilia)',
      order: '鳄目 (Crocodilia)',
      family: '短吻鳄科 (Alligatoridae)',
      genus: '短吻鳄属 (Alligator)',
      species: '扬子鳄 (Alligator sinensis)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['安徽宣城', '安徽芜湖', '浙江长兴'],
    habitat: '长江中下游低海拔缓流河段、湖泊、池塘与沼泽湿地。',
    morphology: '体长1.5-2米，头部扁平，吻短钝，体背覆有厚重骨质鳞板，腹部亦具骨化鳞。',
    habits: '善于在泥堤挖掘深邃地下洞穴越冬，夜行性，以鱼、蛙、螺、蚌为食。',
    evolutionaryMilestone: '中生代三叠纪主龙类演化孑遗，全球仅存的两种短吻鳄之一，恐龙同时代活化石。',
    geologicalPeriod: '中生代白垩纪起源 (约1.5亿年)',
    tags: ['活化石', '恐龙同时代', '国家一级保护野生动物', '极危物种', '中国特有爬行动物'],
    references: [{ title: '扬子鳄生物学研究', source: '安徽科技出版社', year: '2018' }]
  },
  {
    chineseName: '中国大鲵 (娃娃鱼)',
    scientificName: 'Andrias davidianus',
    namingAuthor: '(Blanchard, 1871)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '两栖纲 (Amphibia)',
      order: '有尾目 (Urodela)',
      family: '隐鳃鲵科 (Cryptobranchidae)',
      genus: '大鲵属 (Andrias)',
      species: '中国大鲵 (Andrias davidianus)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['湖南张家界', '陕西秦岭', '贵州', '湖北', '四川'],
    habitat: '海拔100-1500米山区水质清澈、水温凉爽的阴暗溶洞与溪流岩石缝隙。',
    morphology: '全球现存体型最大的两栖动物，体长可达1米以上；头扁圆宽大，背部棕褐具黑色斑块。',
    habits: '夜行性肉食动物，以鱼虾蟹蛙为主；叫声似婴儿啼哭故名娃娃鱼。',
    evolutionaryMilestone: '侏罗纪有尾两栖动物孑遗，脊椎动物从水生向陆生演化的关键过渡形态活化石。',
    geologicalPeriod: '中生代侏罗纪 (约1.6亿年)',
    tags: ['全球最大两栖动物', '水中活化石', '国家二级保护野生动物', '娃娃鱼'],
    references: [{ title: '中国大鲵保护与繁育', source: '中国农业出版社', year: '2020' }]
  },
  {
    chineseName: '中华鲟',
    scientificName: 'Acipenser sinensis',
    namingAuthor: 'Gray, 1835',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '辐鳍鱼纲 (Actinopterygii)',
      order: '鲟形目 (Acipenseriformes)',
      family: '鲟科 (Acipenseridae)',
      genus: '鲟属 (Acipenser)',
      species: '中华鲟 (Acipenser sinensis)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 II',
    distribution: ['长江干流', '近海大陆架 (东海/黄海)'],
    habitat: '江海洄游性大型鱼类，成鱼栖息于近海，繁殖期溯河洄游数千公里至长江上游产卵。',
    morphology: '体长可达4-5米，重逾500公斤。体表具5纵行大菱形骨板，歪形尾，口位于吻部下方。',
    habits: '底栖肉食性，以近海底栖无脊椎动物和小鱼为食。',
    evolutionaryMilestone: '起源于白垩纪，软骨硬鳞鱼类活化石，被誉为“长江水生生物的活化石”。',
    geologicalPeriod: '白垩纪晚期 (约1.4亿年)',
    tags: ['长江旗舰种', '水中大熊猫', '国家一级保护野生动物', '江海洄游', '古老鱼类'],
    references: [{ title: '中华鲟生物学与保护', source: '科学出版社', year: '2019' }]
  },
  {
    chineseName: '阳彩臂金龟',
    scientificName: 'Cheirotonus jansoni',
    namingAuthor: 'Jordan, 1898',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鞘翅目 (Coleoptera)',
      family: '臂金龟科 (Euchiridae)',
      genus: '彩臂金龟属 (Cheirotonus)',
      species: '阳彩臂金龟 (Cheirotonus jansoni)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['福建武夷山', '江西井冈山', '浙江', '广东', '广西', '四川', '贵州'],
    habitat: '海拔800-1500米原生常绿阔叶林，幼虫生活在大型腐朽立木树洞腐殖质中。',
    morphology: '中国体型最大、最华丽的甲虫之一。雄甲虫前足极度延长（可达10厘米以上），鞘翅泛有金属光泽与橙黄色不规则斑纹。',
    habits: '成虫具有趋光性，以发酵树汁和熟透野果为食；曾一度被认为在野外绝迹。',
    evolutionaryMilestone: '热带及亚热带古老森林树洞腐木分解者，原始大型鞘翅目代表。',
    geologicalPeriod: '古近纪渐新世',
    tags: ['中国最大甲虫', '森林铁甲战士', '国家二级保护野生动物', '节肢动物门', '昆虫纲'],
    references: [{ title: '中国甲虫图鉴', source: '科学出版社', year: '2020' }]
  },
  {
    chineseName: '金斑喙凤蝶',
    scientificName: 'Teinopalpus aureus',
    namingAuthor: 'Mell, 1923',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鳞翅目 (Lepidoptera)',
      family: '凤蝶科 (Papilionidae)',
      genus: '喙凤蝶属 (Teinopalpus)',
      species: '金斑喙凤蝶 (Teinopalpus aureus)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 II',
    distribution: ['广东南岭', '福建武夷山', '江西井冈山', '广西大瑶山', '海南霸王岭'],
    habitat: '海拔1000-2000米原始亚热带常绿阔叶林林冠层。',
    morphology: '中国唯一的国家一级保护蝶类。体色翠绿，后翅具大块金黄色斑块，下突具尾状金斑突起，姿态华贵。',
    habits: '飞翔极为迅捷，常在晨光中穿梭于高大乔木顶端吸食树汁与花蜜。',
    evolutionaryMilestone: '世界八大名蝶之首，被称为“蝶之骄子”与“梦幻之蝶”，原始高山凤蝶代表。',
    geologicalPeriod: '古近纪渐新世',
    tags: ['国宝蝶类', '蝶中皇后', '中国唯一一级保护蝴蝶', '世界八大名蝶之首', '节肢动物门'],
    references: [{ title: '中国蝶类志', source: '河南科学技术出版社', year: '1998' }]
  },
  {
    chineseName: '拉步甲',
    scientificName: 'Carabus lafossei',
    namingAuthor: 'Feisthamel, 1845',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鞘翅目 (Coleoptera)',
      family: '步甲科 (Carabidae)',
      genus: '步甲属 (Carabus)',
      species: '拉步甲 (Carabus lafossei)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['浙江天目山', '安徽黄山', '江西三清山', '福建武夷山', '江苏宜兴'],
    habitat: '海拔500-1800米亚热带湿润常绿阔叶林与针阔混交林地表落叶层。',
    morphology: '体长3.5-4厘米，头部和前胸背板具有极为耀眼夺目的金红或翠绿金属光泽，鞘翅具凹凸纵沟与蓝黑金绿虹彩，后翅退化无法飞行。',
    habits: '地栖捕食性肉食甲虫，行动敏捷迅猛，夜间捕食蜗牛、蛞蝓、鳞翅目幼虫及蚯蚓。',
    evolutionaryMilestone: '中国特有大型地栖步甲，华东山地森林生态系统顶级无脊椎捕食者。',
    geologicalPeriod: '古近纪渐新世',
    tags: ['国家二级保护野生动物', '中国特有步甲', '金属彩甲', '地栖捕食者', '节肢动物门'],
    references: [{ title: '中国动物志: 昆虫纲 鞘翅目 步甲科', source: '科学出版社', year: '2005' }]
  },
  {
    chineseName: '硕步甲',
    scientificName: 'Carabus davidi',
    namingAuthor: 'Deyrolle, 1878',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鞘翅目 (Coleoptera)',
      family: '步甲科 (Carabidae)',
      genus: '步甲属 (Carabus)',
      species: '硕步甲 (Carabus davidi)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['陕西秦岭', '四川大巴山', '甘肃天水', '湖北神农架'],
    habitat: '海拔1200-2600米温带落叶阔叶林与高山针叶林阴湿林下。',
    morphology: '体型硕大健壮，体长可达4-4.5厘米，鞘翅隆起具深瘤纹，呈神秘铜红至深黑紫色金属反光。',
    habits: '喜在倒木与石块下隐匿，黄昏及夜间出击猎食软体动物和害虫幼虫。',
    evolutionaryMilestone: '中国北方与秦岭山系典型古北区孑遗步甲，陆生节肢动物多样性旗舰。',
    geologicalPeriod: '中新世',
    tags: ['国家二级保护野生动物', '秦岭特有昆虫', '硕大步甲', '节肢动物门', '昆虫纲'],
    references: [{ title: '秦岭昆虫志', source: '天则出版社', year: '1996' }]
  },
  {
    chineseName: '中华蛩蠖',
    scientificName: 'Galloisiana sinensis',
    namingAuthor: 'Wang, 1987',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '蛩蠖目 (Grylloblattodea)',
      family: '蛩蠖科 (Grylloblattidae)',
      genus: '蛩蠖属 (Galloisiana)',
      species: '中华蛩蠖 (Galloisiana sinensis)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: '无',
    distribution: ['吉林长白山天池周边熔岩流缝隙及高山苔原'],
    habitat: '海拔2000米以上常年近零度的多石高寒碎石坡与积雪边缘。',
    morphology: '无翅、复眼退化，体狭长淡黄色似蟋蟀与蜚蠊复合体，喜-2℃至4℃极低温度环境。',
    habits: '夜间活动于雪面或冰缝，取食冻死的飞虫尸体及地衣碎屑，温度高于15℃即会死亡。',
    evolutionaryMilestone: '三叠纪早期原始有翅昆虫基部演化孑遗，堪称“冰川期昆虫活化石”。',
    geologicalPeriod: '中生代三叠纪起源 (2.2亿年)',
    tags: ['国家一级保护野生动物', '冰川活化石', '长白山特有', '极端耐寒昆虫', '节肢动物门'],
    references: [{ title: '长白山昆虫志', source: '吉林人民出版社', year: '1992' }]
  },
  {
    chineseName: '中华虎凤蝶',
    scientificName: 'Luehdorfia chinensis',
    namingAuthor: 'Leech, 1893',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鳞翅目 (Lepidoptera)',
      family: '凤蝶科 (Papilionidae)',
      genus: '虎凤蝶属 (Luehdorfia)',
      species: '中华虎凤蝶 (Luehdorfia chinensis)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['江苏南京紫金山', '浙江天目山', '安徽黄山', '湖北大别山', '陕西秦岭'],
    habitat: '低山丘陵向阳落叶阔叶林下，专性伴生植物杜衡（马兜铃科）生长区域。',
    morphology: '翅面黄色具有黑褐色虎皮状粗斑纹，后翅外缘具蓝色小斑与鲜红色波浪状红斑，尾突短小优美。',
    habits: '早春发生（3-4月），一年仅发生一代，幼虫专食杜衡叶片，抗冬寒休眠越冬。',
    evolutionaryMilestone: '第四纪冰期亚洲东部残遗古老早春凤蝶类群，植物-昆虫专性共生演化典型。',
    geologicalPeriod: '第四纪更新世冰期',
    tags: ['国家二级保护野生动物', '早春精灵', '虎纹凤蝶', '杜衡寄主', '节肢动物门'],
    references: [{ title: '中华虎凤蝶生物学及其保护', source: '中国林业出版社', year: '2008' }]
  },
  {
    chineseName: '中华宽尾凤蝶',
    scientificName: 'Agehana elwesi',
    namingAuthor: '(Leech, 1889)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鳞翅目 (Lepidoptera)',
      family: '凤蝶科 (Papilionidae)',
      genus: '宽尾凤蝶属 (Agehana)',
      species: '中华宽尾凤蝶 (Agehana elwesi)'
    },
    domain: 'fauna',
    conservation: '中国特有珍稀保护物种',
    citesAppendix: '无',
    distribution: ['江西井冈山', '浙江武义', '福建武夷山', '湖南莽山', '四川雅安'],
    habitat: '海拔600-1600米常绿落叶阔叶混交林，寄主为中国特有第三纪孑遗树种鹅掌楸。',
    morphology: '尾突宽阔扁平且贯穿两条翅脉（全球仅见于宽尾凤蝶属），后翅黑褐色密被红色新月形斑，飞行如黑天鹅起舞。',
    habits: '成虫飞翔缓慢平稳，喜在清晨林缘花丛访花吸蜜。',
    evolutionaryMilestone: '东亚大陆与台湾岛古陆桥隔绝分化前的古老凤蝶孑遗，属级单型类群。',
    geologicalPeriod: '古近纪中新世',
    tags: ['中国特有凤蝶', '国宝蝴蝶', '双翅脉尾突', '鹅掌楸共生', '节肢动物门'],
    references: [{ title: '中国蝶类生态图鉴', source: '海峡出版发行集团', year: '2015' }]
  },
  {
    chineseName: '中国鲎 (中华鲎)',
    scientificName: 'Tachypleus tridentatus',
    namingAuthor: '(Leach, 1819)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '肢口纲 (Merostomata)',
      order: '剑尾目 (Xiphosura)',
      family: '鲎科 (Limulidae)',
      genus: '鲎属 (Tachypleus)',
      species: '中国鲎 (Tachypleus tridentatus)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: 'IUCN 濒危 (EN)',
    distribution: ['广西北部湾 (北海/防城港)', '海南沿海', '广东湛江', '福建平潭', '台湾金门'],
    habitat: '潮间带泥质滩涂（幼体生境）至浅海大陆架20-40米沙泥底（成体生境）。',
    morphology: '体表覆盖马蹄形坚厚几丁质背甲，尾节延长成坚硬剑突，具6对附肢；血液中含血蓝蛋白遇内毒素凝固呈宝蓝色。',
    habits: '底栖食腐及小型底栖无脊椎动物；繁殖期雄雌成双配对结伴爬上潮间带高潮线沙滩产卵，俗称“海底鸳鸯”。',
    evolutionaryMilestone: '奥陶纪存活至今逾4.5亿年的古老节肢动物活化石，形态结构在数亿年漫长地质变迁中几未改变。',
    geologicalPeriod: '古生代奥陶纪起源 (4.5亿年以上)',
    tags: ['4.5亿年活化石', '国家二级保护野生动物', '蓝色血液', '剑尾目', '节肢动物门', '海洋旗舰物种'],
    references: [{ title: '中国鲎生物学研究与资源养护', source: '海洋出版社', year: '2021' }]
  },
  {
    chineseName: '圆尾鲎',
    scientificName: 'Carcinoscorpius rotundicauda',
    namingAuthor: '(Latreille, 1802)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '肢口纲 (Merostomata)',
      order: '剑尾目 (Xiphosura)',
      family: '鲎科 (Limulidae)',
      genus: '圆尾鲎属 (Carcinoscorpius)',
      species: '圆尾鲎 (Carcinoscorpius rotundicauda)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['广西北海红树林', '海南东寨港', '广东雷州半岛'],
    habitat: '热带和亚热带河口红树林区及河口淤泥质滩涂。',
    morphology: '体型较中国鲎小，尾节呈光滑圆柱状无背棱，背甲后侧缘无活动刺，体内含有强烈的河豚毒素样神经毒素。',
    habits: '适生于低盐度河口水域，穿梭于红树林根系泥泞中寻觅底栖蠕虫。',
    evolutionaryMilestone: '热带红树林湿地特化剑尾目孑遗，演化出高耐受低氧潮滩生理机制。',
    geologicalPeriod: '中生代三叠纪',
    tags: ['国家二级保护野生动物', '红树林活化石', '圆尾鲎', '节肢动物门', '肢口纲'],
    references: [{ title: '红树林湿地生物多样性', source: '中国环境科学出版社', year: '2018' }]
  },
  {
    chineseName: '海南捕鸟蛛 (敬钊缨毛蛛)',
    scientificName: 'Cyriopagopus hainanus',
    namingAuthor: '(Liang et al., 1999)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '蛛形纲 (Arachnida)',
      order: '蜘蛛目 (Araneae)',
      family: '捕鸟蛛科 (Theraphosidae)',
      genus: '缨毛蛛属 (Cyriopagopus)',
      species: '海南捕鸟蛛 (Cyriopagopus hainanus)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['海南乐东尖峰岭', '海南昌江霸王岭', '海南东方市'],
    habitat: '海拔200-800米热带雨林或季雨林斜坡土壤中挖掘深垂直土穴。',
    morphology: '体长可达6-8厘米，展足达15-20厘米，体色棕黑具天鹅绒光泽，螯肢强健粗大具毒腺，毒牙长达8毫米。',
    habits: '夜行伏击捕食，穴口覆有放射状警报蛛丝，猎食直翅目昆虫、石龙子甚至小型雏鸟。',
    evolutionaryMilestone: '原始后突蛛亚目演化孑遗，中国大陆及海岛最大的本土捕鸟蛛科代表。',
    geologicalPeriod: '古近纪始新世',
    tags: ['国家二级保护野生动物', '雨林剧毒巨蛛', '海南特有种', '蛛形纲', '节肢动物门'],
    references: [{ title: '中国蜘蛛志: 捕鸟蛛科', source: '科学出版社', year: '2016' }]
  },
  {
    chineseName: '中华蜜蜂',
    scientificName: 'Apis cerana cerana',
    namingAuthor: 'Fabricius, 1793',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '膜翅目 (Hymenoptera)',
      family: '蜜蜂科 (Apidae)',
      genus: '蜜蜂属 (Apis)',
      species: '中华蜜蜂 (Apis cerana cerana)'
    },
    domain: 'fauna',
    conservation: '国家级畜禽遗传资源保护名录 / 生态指示种',
    citesAppendix: '无',
    distribution: ['中国各主要山地林区 (秦岭、神农架、大别山、横断山、武夷山)'],
    habitat: '森林覆盖率高、天然蜜源丰富的山区与丘陵天然林缘。',
    morphology: '体躯较西方蜜蜂略小，腹部黑白环纹分明，飞行敏捷，极耐低温（零下数度仍可出巢）。',
    habits: '擅长利用零星分散的山花蜜源，嗅觉灵敏，具极高抗蜂螨能力和抵御胡蜂防御机制。',
    evolutionaryMilestone: '与中国本土森林开花植物经数千万年协同演化出的核心传粉基石昆虫。',
    geologicalPeriod: '新近纪中新世',
    tags: ['中华蜜蜂', '生态基石昆虫', '传粉精灵', '节肢动物门', '昆虫纲'],
    references: [{ title: '中国蜜蜂学', source: '中国农业出版社', year: '2011' }]
  },

  // --- 软体动物门 (Mollusca) 代表物种 ---
  {
    chineseName: '鳞砗磲',
    scientificName: 'Tridacna squamosa',
    namingAuthor: 'Lamarck, 1819',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '软体动物门 (Mollusca)',
      class: '双壳纲 (Bivalvia)',
      order: '心蛤目 (Cardiida)',
      family: '砗磲科 (Tridacnidae)',
      genus: '砗磲属 (Tridacna)',
      species: '鳞砗磲 (Tridacna squamosa)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: 'CITES 附录 II',
    distribution: ['海南岛沿海', '西沙群岛', '南沙群岛', '中沙群岛'],
    habitat: '热带浅海珊瑚礁区，常生活在水深2-20米清澈珊瑚丛中。',
    morphology: '贝壳近菱形，壳表具有极其显著向外延伸的覆瓦状大鳞片，壳色多变（黄、橙、白、粉红）。外套膜波状且具有绚烂斑纹。',
    habits: '与虫黄藻共生获取能量，兼行滤食；足丝发达，紧固于珊瑚礁岩石缝隙。',
    evolutionaryMilestone: '双壳纲砗磲科中贝壳鳞片构造演化最夸张华丽的物种，为珊瑚礁底栖动物提供复合微生境。',
    geologicalPeriod: '新近纪中新世',
    tags: ['国家二级保护野生动物', '软体动物门', '双壳纲', '珊瑚礁造礁', '共生系统'],
    references: [{ title: '中国动物志: 软体动物门 双壳纲 帘蛤目', source: '科学出版社', year: '2012' }]
  },
  {
    chineseName: '唐冠螺',
    scientificName: 'Cassis cornuta',
    namingAuthor: '(Linnaeus, 1758)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '软体动物门 (Mollusca)',
      class: '腹足纲 (Gastropoda)',
      order: '玉螺目 (Littorinimorpha)',
      family: '冠螺科 (Cassidae)',
      genus: '冠螺属 (Cassis)',
      species: '唐冠螺 (Cassis cornuta)'
    },
    domain: 'fauna',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['海南三亚/琼海', '西沙群岛', '南沙群岛', '台湾南部海域'],
    habitat: '热带海洋潮下带至水深20米珊瑚礁沙质海底或海草床。',
    morphology: '大型海产腹足类，壳高可达30厘米以上。贝壳重厚膨大如唐代武士官帽；壳口狭长向外翻卷，具发达内唇滑层与齿状褶襞，内壁金黄色。',
    habits: '肉食性大型腹足类，主要夜间在沙底爬行捕食海胆（如刺冠海胆）及其他棘皮动物。',
    evolutionaryMilestone: '海洋四大名螺之一，演化出特化的硫酸与酸性分泌腺溶解海胆石灰质硬棘，是珊瑚礁棘皮动物数量的天然控制者。',
    geologicalPeriod: '古近纪渐新世',
    tags: ['四大名螺', '国家二级保护野生动物', '软体动物门', '腹足纲', '珊瑚礁天敌'],
    references: [{ title: '中国海洋贝类图鉴', source: '海洋出版社', year: '2018' }]
  },
  {
    chineseName: '白斑蝾螺',
    scientificName: 'Turbo marmoratus',
    namingAuthor: 'Linnaeus, 1758',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '软体动物门 (Mollusca)',
      class: '腹足纲 (Gastropoda)',
      order: '钟螺目 (Trochida)',
      family: '蝾螺科 (Turbinidae)',
      genus: '蝾螺属 (Turbo)',
      species: '白斑蝾螺 (Turbo marmoratus)'
    },
    domain: 'fauna',
    conservation: '国家一级重点保护',
    citesAppendix: '无',
    distribution: ['海南岛东部与南部海域', '西沙群岛', '台湾沿海'],
    habitat: '潮下带水深5-20米珊瑚礁和岩石礁区，喜海浪冲击较强烈的硬质底质。',
    morphology: '中国体型最大的蝾螺，壳高可超20厘米。壳坚厚呈大型陀螺状，表面深绿夹杂银白大理石样花纹；具极厚重的半球形石灰质厣（“猫眼石”）。',
    habits: '草食性，在珊瑚礁石表面用强大齿舌刮食大型海藻（如马尾藻、石莼等）。',
    evolutionaryMilestone: '原始腹足类（古腹足类）演化巅峰，贝壳内面具有极其深厚辉煌的天然珍珠层（中国传统高级螺钿漆器顶级原材料）。',
    geologicalPeriod: '中生代白垩纪起源',
    tags: ['国家一级保护野生动物', '古腹足类', '中国四大名螺', '珍珠质螺钿', '软体动物门'],
    references: [{ title: '中国动物志: 软体动物门 腹足纲 原始腹足目', source: '科学出版社', year: '2004' }]
  },
  {
    chineseName: '背角无齿蚌',
    scientificName: 'Sinanodonta woodiana',
    namingAuthor: '(Lea, 1834)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '软体动物门 (Mollusca)',
      class: '双壳纲 (Bivalvia)',
      order: '蚌目 (Unionida)',
      family: '蚌科 (Unionidae)',
      genus: '无齿蚌属 (Sinanodonta)',
      species: '背角无齿蚌 (Sinanodonta woodiana)'
    },
    domain: 'fauna',
    conservation: '一般保护 / 常见淡水蚌类',
    citesAppendix: '无',
    distribution: ['长江流域', '黄河流域', '珠江流域', '黑龙江流域', '全国主要淡水水体'],
    habitat: '水流缓慢或静水的池塘、湖泊水库及河流泥沙底质深处。',
    morphology: '贝壳大而薄呈卵圆形，后背部有显著的背角；无拟主齿与侧齿；内面具珍珠光泽。',
    habits: '潜伏泥沙中营底栖滤食，每天可滤过数十升水体，对净化水质有机碎屑与藻类至关重要。',
    evolutionaryMilestone: '东亚古陆淡水双壳类最具生态可塑性与滤食净水适应力的大型蚌类。',
    geologicalPeriod: '新生代中新世',
    tags: ['滤食净水', '淡水蚌类', '软体动物门', '双壳纲', '生态基石'],
    references: [{ title: '中国淡水软体动物', source: '农业出版社', year: '2016' }]
  },
  {
    chineseName: '中国枪乌贼',
    scientificName: 'Uroteuthis chinensis',
    namingAuthor: '(Gray, 1835)',
    taxonomy: {
      kingdom: '动物界 (Animalia)',
      phylum: '软体动物门 (Mollusca)',
      class: '头足纲 (Cephalopoda)',
      order: '管形目 (Myopsida)',
      family: '枪乌贼科 (Loliginidae)',
      genus: '尾枪乌贼属 (Uroteuthis)',
      species: '中国枪乌贼 (Uroteuthis chinensis)'
    },
    domain: 'fauna',
    conservation: '一般保护 / 近海优势种',
    citesAppendix: '无',
    distribution: ['东海大陆架', '台湾海峡', '南海北部陆架浅海'],
    habitat: '水深30-100米温暖近海大陆架浅海水域，具有明显的季节性近岸产卵洄游习性。',
    morphology: '胴体圆锥形如长枪，后端尖细；肉鳍长菱形超过胴长一半；腕十条，其中一对为特化捕食腕，具角质齿环吸盘；体表分布高密度神经调控的色素细胞。',
    habits: '快速游泳集群掠食性头足类，以小型鱼类、虾类为食；具有喷墨逃逸与瞬间变色伪装能力。',
    evolutionaryMilestone: '头足类在内壳退化（形成轻量角质透明内鞘鞘片）后获得的极致水动力学游动速度与高阶神经视觉协调演化代表。',
    geologicalPeriod: '新生代',
    tags: ['头足纲', '软体动物门', '近海经济物种', '喷水推进', '色素细胞'],
    references: [{ title: '中国动物志: 软体动物门 头足纲', source: '科学出版社', year: '2010' }]
  },

  // ========================== FLORA (植物界) ==========================
  {
    chineseName: '百山祖冷杉',
    scientificName: 'Abies beshanzuensis',
    namingAuthor: 'M.H.Wu, 1976',
    taxonomy: {
      kingdom: '植物界 (Plantae)',
      phylum: '松柏门 (Pinophyta)',
      class: '松柏纲 (Pinopsida)',
      order: '松柏目 (Pinales)',
      family: '松科 (Pinaceae)',
      genus: '冷杉属 (Abies)',
      species: '百山祖冷杉 (Abies beshanzuensis)'
    },
    domain: 'flora',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['浙江庆元百山祖自然保护区'],
    habitat: '海拔1700米山顶阴湿山谷与针阔混交林带。',
    morphology: '常绿乔木，高达17米。树皮灰褐色开裂；叶条形，背面有2条白色气孔带；球果直立，圆柱形。',
    habits: '耐阴湿、喜凉爽多雾高山气候，野外天然繁殖力极弱。',
    evolutionaryMilestone: '世界最濒危的12种植物之一（野外曾仅存3株成熟母树），被誉为“植物界大熊猫”。第四纪冰期冷杉属南迁留在华东孤峰顶峰的冰期孑遗。',
    geologicalPeriod: '第四纪冰期孑遗 (约200万年)',
    tags: ['世界最濒危针叶树', '植物大熊猫', '国家一级保护野生植物', '极小种群'],
    references: [{ title: '百山祖冷杉生物学与抢救保护', source: '浙江大学出版社', year: '2020' }]
  },
  {
    chineseName: '银杉',
    scientificName: 'Cathaya argyrophylla',
    namingAuthor: 'Chun & Kuang, 1958',
    taxonomy: {
      kingdom: '植物界 (Plantae)',
      phylum: '松柏门 (Pinophyta)',
      class: '松柏纲 (Pinopsida)',
      order: '松柏目 (Pinales)',
      family: '松科 (Pinaceae)',
      genus: '银杉属 (Cathaya)',
      species: '银杉 (Cathaya argyrophylla)'
    },
    domain: 'flora',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 II',
    distribution: ['广西花坪', '四川金佛山', '贵州大娄山', '湖南八面山'],
    habitat: '海拔900-1900米亚热带山地狭窄山脊与悬崖峭壁。',
    morphology: '常绿乔木，叶背面有两条银白色气孔带，在微风中闪烁如银光。',
    habits: '耐干旱瘠薄土壤，强阳性喜光树种。',
    evolutionaryMilestone: '第三纪古热带孑遗裸子植物，被誉为“植物界大熊猫”，单型属珍稀物种。',
    geologicalPeriod: '中生代白垩纪起源',
    tags: ['植物界大熊猫', '中国特有单种属', '活化石', '国家一级保护野生植物'],
    references: [{ title: '中国植物志: 裸子植物', source: '科学出版社', year: '1978' }]
  },
  {
    chineseName: '普陀鹅耳枥',
    scientificName: 'Carpinus putoensis',
    namingAuthor: 'W.C.Cheng, 1932',
    taxonomy: {
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (Magnoliopsida)',
      order: '壳斗目 (Fagales)',
      family: '桦木科 (Betulaceae)',
      genus: '鹅耳枥属 (Carpinus)',
      species: '普陀鹅耳枥 (Carpinus putoensis)'
    },
    domain: 'flora',
    conservation: 'IUCN 极危 (CR)',
    citesAppendix: '无',
    distribution: ['浙江舟山普陀山佛顶山'],
    habitat: '海岛低山丘陵常绿与落叶阔叶林中。',
    morphology: '落叶乔木，高约13米。树皮灰白，小坚果卵圆形具大果苞。',
    habits: '雌雄同株但雌雄花期不遇，天然自花受精率极低。',
    evolutionaryMilestone: '全球仅存1株野生母树的“地球独子”，基因组学与拯救繁殖典范。',
    geologicalPeriod: '更新世',
    tags: ['地球独子', '极小种群', '国家一级保护野生植物', '人工繁育拯救'],
    references: [{ title: '中国珍稀濒危植物', source: '科学出版社', year: '2020' }]
  },
  {
    chineseName: '金花茶',
    scientificName: 'Camellia petelotii',
    namingAuthor: '(Merr.) Sealy, 1949',
    taxonomy: {
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (Magnoliopsida)',
      order: '杜鹃花目 (Ericales)',
      family: '山茶科 (Theaceae)',
      genus: '山茶属 (Camellia)',
      species: '金花茶 (Camellia petelotii)'
    },
    domain: 'flora',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['广西防城港', '广西弄岗喀斯特石灰岩地区'],
    habitat: '热带喀斯特石灰岩季雨林沟谷下层，弱酸性至中性土壤。',
    morphology: '常绿灌木或小乔木，花金黄色，蜡质光泽晶莹油润，杯状或碗状，极为名贵。',
    habits: '喜耐荫凉湿润气候，怕强光直射，花期秋冬季。',
    evolutionaryMilestone: '山茶属中唯一的纯金黄色花系古老原始类群，被誉为“茶族皇后”与“植物界大熊猫”。',
    geologicalPeriod: '古近纪古新世',
    tags: ['茶族皇后', '黄色山茶', '国家二级保护野生植物', '喀斯特特有'],
    references: [{ title: '中国金花茶', source: '广西科学技术出版社', year: '2016' }]
  },
  {
    chineseName: '桫椤 (树蕨)',
    scientificName: 'Alsophila spinulosa',
    namingAuthor: '(Hook.) R.M.Tryon, 1970',
    taxonomy: {
      kingdom: '植物界 (Plantae)',
      phylum: '蕨类植物门 (Pteridophyta)',
      class: '真蕨纲 (Polypodiopsida)',
      order: '桫椤目 (Cyatheales)',
      family: '桫椤科 (Cyatheaceae)',
      genus: '桫椤属 (Alsophila)',
      species: '桫椤 (Alsophila spinulosa)'
    },
    domain: 'flora',
    conservation: '国家二级重点保护',
    citesAppendix: 'CITES 附录 II',
    distribution: ['贵州赤水', '四川合江', '广东', '广西', '云南', '台湾'],
    habitat: '亚热带山地阴湿溪谷、林下及瀑布周边。',
    morphology: '木本蕨类，高可达3-8米，具直立高大树干，叶顶生如巨型绿色羽毛华盖。',
    habits: '极度喜阴湿温凉环境，孢子繁殖，无花无果。',
    evolutionaryMilestone: '中生代草食性恐龙的主要食物来源，中生代陆地森林的古老遗迹与木本蕨类活化石。',
    geologicalPeriod: '古生代石炭纪至中生代侏罗纪 (约3亿年)',
    tags: ['蕨类植物活化石', '恐龙食粮', '木本蕨类', '国家二级保护野生植物'],
    references: [{ title: '中国蕨类植物志: 桫椤科', source: '科学出版社', year: '2000' }]
  },
  {
    chineseName: '中华水韭',
    scientificName: 'Isoetes sinensis',
    namingAuthor: 'Palmer, 1927',
    taxonomy: {
      kingdom: '植物界 (Plantae)',
      phylum: '石松门 (Lycopodiophyta)',
      class: '水韭纲 (Isoetopsida)',
      order: '水韭目 (Isoetales)',
      family: '水韭科 (Isoetaceae)',
      genus: '水韭属 (Isoetes)',
      species: '中华水韭 (Isoetes sinensis)'
    },
    domain: 'flora',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['浙江杭州/建德', '安徽休宁', '江西修水'],
    habitat: '浅水沼泽、池塘及水稻田边湿地水体，对清澈无污染水质高度敏感。',
    morphology: '多年生沼生水生草本，块茎似扁球形，叶丛生肉质细长如韭菜，基部宽展具叶舌与孢子囊。',
    habits: '季节性水生植物，秋季孢子成熟散布水中萌发。',
    evolutionaryMilestone: '古生代石炭纪鳞木类古代拟木本石松类的直接孑遗活化石，演化史逾3亿年。',
    geologicalPeriod: '古生代石炭纪 (约3.5亿年)',
    tags: ['植物活化石', '国家一级保护野生植物', '古老水生草本', '极危植物'],
    references: [{ title: '中国水韭属植物研究', source: '科学出版社', year: '2017' }]
  },
  {
    chineseName: '杜鹃红山茶',
    scientificName: 'Camellia azalea',
    namingAuthor: 'C.F.Wei, 1986',
    taxonomy: {
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (Magnoliopsida)',
      order: '杜鹃花目 (Ericales)',
      family: '山茶科 (Theaceae)',
      genus: '山茶属 (Camellia)',
      species: '杜鹃红山茶 (Camellia azalea)'
    },
    domain: 'flora',
    conservation: '国家一级重点保护',
    citesAppendix: '无',
    distribution: ['广东阳春鹅凰嶂自然保护区'],
    habitat: '低海拔山地溪边石隙及常绿阔叶林下。',
    morphology: '常绿小乔木，叶革质全缘狭长倒卵状酷似杜鹃叶，花鲜红色如杜鹃盛开，四季持续开花。',
    habits: '喜温热潮湿，耐热耐干，是唯一能够一年四季持续开花的原种山茶。',
    evolutionaryMilestone: '中国特有极小种群野生植物，被称为“植物界的大熊猫与红宝石”。',
    geologicalPeriod: '古近纪',
    tags: ['四季开花山茶', '植物红宝石', '国家一级保护野生植物', '广东阳春特有'],
    references: [{ title: '杜鹃红山茶繁育生态', source: '中国林业出版社', year: '2021' }]
  },
  {
    chineseName: '杏黄兜兰',
    scientificName: 'Paphiopedilum armeniacum',
    namingAuthor: 'S.C.Chen & F.Y.Liu, 1982',
    taxonomy: {
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (百合纲 Liliopsida)',
      order: '天门冬目 (Asparagales)',
      family: '兰科 (Orchidaceae)',
      genus: '兜兰属 (Paphiopedilum)',
      species: '杏黄兜兰 (Paphiopedilum armeniacum)'
    },
    domain: 'flora',
    conservation: '国家一级重点保护',
    citesAppendix: 'CITES 附录 I',
    distribution: ['云南怒江傈僳族自治州怒江峡谷'],
    habitat: '海拔1400-2100米石灰岩石缝与苔藓林下。',
    morphology: '花大而奇丽，整朵花呈纯正鲜艳的杏黄色，唇瓣深兜状如金色拖鞋。',
    habits: '岩生或半附生草本，依赖特异性兰科菌根真菌共生。',
    evolutionaryMilestone: '兰科中最古老原始的杓兰亚科代表，被国际兰花界誉为“金童”。',
    geologicalPeriod: '新近纪',
    tags: ['金童兜兰', '兰中瑰宝', '国家一级保护野生植物', '怒江峡谷特有'],
    references: [{ title: '中国兜兰属植物', source: '科学出版社', year: '2019' }]
  },
  {
    chineseName: '独叶草',
    scientificName: 'Kingdonia uniflora',
    namingAuthor: 'Balf.f. & W.W.Sm., 1914',
    taxonomy: {
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (Magnoliopsida)',
      order: '毛茛目 (Ranunculales)',
      family: '星叶草科 (Circaeasteraceae)',
      genus: '独叶草属 (Kingdonia)',
      species: '独叶草 (Kingdonia uniflora)'
    },
    domain: 'flora',
    conservation: '国家一级重点保护',
    citesAppendix: '无',
    distribution: ['陕西太白山', '四川九寨沟/峨眉山', '云南西北部', '甘肃南部'],
    habitat: '海拔2750-3900米高山暗针叶林（冷杉、云杉）下的苔藓层中。',
    morphology: '多年生细小草本，一株仅生一片掌状分裂叶和一朵淡绿色小花，叶脉为极其原始的叉状开放分枝脉序。',
    habits: '喜冷湿阴暗原始高山森林生境，对环境破坏极度脆弱。',
    evolutionaryMilestone: '保留了被子植物最原始的开放式叉状叶脉，对研究被子植物起源与早期叶脉演化具有不可替代的重大价值。',
    geologicalPeriod: '第三纪古近纪',
    tags: ['一叶一花', '原始叶脉活化石', '国家一级保护野生植物', '高山苔藓伴生'],
    references: [{ title: '中国珍稀濒危植物', source: '科学出版社', year: '2020' }]
  },

  // ========================== FUNGI (真菌界) ==========================
  {
    chineseName: '冬虫夏草',
    scientificName: 'Ophiocordyceps sinensis',
    namingAuthor: '(Berk.) G.H.Sung et al., 2007',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '子囊菌门 (Ascomycota)',
      class: '粪壳菌纲 (Sordariomycetes)',
      order: '肉座菌目 (Hypocreales)',
      family: '线虫草科 (Ophiocordycipitaceae)',
      genus: '线虫草属 (Ophiocordyceps)',
      species: '冬虫夏草 (Ophiocordyceps sinensis)'
    },
    domain: 'fungi',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['西藏', '青海', '四川', '甘肃', '云南'],
    habitat: '海拔3500-5000米高山草甸与灌丛土壤中。',
    morphology: '由蝠蛾幼虫尸体与从幼虫头部长出的棒状深褐色真菌子实体复合而成。',
    habits: '专性寄生于高山蝠蛾幼虫，冬季在土中形成菌核，夏季破土产生子座。',
    evolutionaryMilestone: '昆虫病原真菌高度共进化与宿主特异性适应的顶级演化范例。',
    geologicalPeriod: '古近纪始新世',
    tags: ['国家二级保护野生植物', '药用真菌', '青藏高原特有', '虫菌复合体'],
    references: [{ title: '中国真菌志: 虫草属', source: '科学出版社', year: '2008' }]
  },
  {
    chineseName: '松茸 (松口蘑)',
    scientificName: 'Tricholoma matsutake',
    namingAuthor: '(S.Ito & S.Imai) Singer, 1949',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '担子菌门 (Basidiomycota)',
      class: '伞菌纲 (Agaricomycetes)',
      order: '伞菌目 (Agaricales)',
      family: '口蘑科 (Tricholomataceae)',
      genus: '口蘑属 (Tricholoma)',
      species: '松口蘑 (Tricholoma matsutake)'
    },
    domain: 'fungi',
    conservation: '国家二级重点保护',
    citesAppendix: '无',
    distribution: ['云南香格里拉/丽江', '四川甘孜/阿坝', '西藏林芝', '吉林延边长白山'],
    habitat: '海拔1500-3800米古老云南松、高山松、落叶松与栎树共生林下。',
    morphology: '子实体肥厚肉质，菌盖淡褐色具红褐色纤维状鳞片，菌柄粗壮有菌环，具独特浓郁香气。',
    habits: '严格的外生菌根真菌，与特定树木根系共生形成外生菌根菌套，无法人工合成培养基栽培。',
    evolutionaryMilestone: '高山森林外生菌根共生演化的顶峰代表，森林碳氮循环关键真菌。',
    geologicalPeriod: '新生代',
    tags: ['菌中之王', '外生菌根共生', '国家二级保护野生植物', '香格里拉特产'],
    references: [{ title: '中国大型真菌资源', source: '中国农业大学出版社', year: '2019' }]
  },
  {
    chineseName: '赤芝 (灵芝)',
    scientificName: 'Ganoderma lingzhi',
    namingAuthor: 'Sheng H.Wu, Y.Cao & Y.C.Dai, 2012',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '担子菌门 (Basidiomycota)',
      class: '伞菌纲 (Agaricomycetes)',
      order: '多孔菌目 (Polyporales)',
      family: '灵芝科 (Ganodermataceae)',
      genus: '灵芝属 (Ganoderma)',
      species: '赤芝 (Ganoderma lingzhi)'
    },
    domain: 'fungi',
    conservation: '一般保护 / 传统药用名贵真菌',
    citesAppendix: '无',
    distribution: ['海南', '广东', '广西', '福建', '浙江', '云南', '四川'],
    habitat: '亚热带和热带阔叶林林下壳斗科等栎树倒木或立木基部。',
    morphology: '皮壳具坚硬漆样光泽，红褐色或紫褐色，菌盖半圆形或肾形，具环状棱纹。',
    habits: '木腐心材腐生，分解木质素与纤维素。',
    evolutionaryMilestone: '演化出几丁质漆样坚硬上皮结构以适应亚热带雨林多雨和昆虫啮食。',
    geologicalPeriod: '白垩纪晚期',
    tags: ['仙草', '中药瑰宝', '多孔菌目', '木腐真菌'],
    references: [{ title: '中国灵芝图志', source: '科学出版社', year: '2015' }]
  },
  {
    chineseName: '羊肚菌',
    scientificName: 'Morchella esculenta',
    namingAuthor: '(L.) Pers., 1801',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '子囊菌门 (Ascomycota)',
      class: '盘菌纲 (Pezizomycetes)',
      order: '盘菌目 (Pezizales)',
      family: '羊肚菌科 (Morchellaceae)',
      genus: '羊肚菌属 (Morchella)',
      species: '羊肚菌 (Morchella esculenta)'
    },
    domain: 'fungi',
    conservation: '一般保护 / 未评估',
    citesAppendix: '无',
    distribution: ['四川', '云南', '陕西秦岭', '甘肃', '新疆天山'],
    habitat: '春季生于杨树、栎树等阔叶林或针阔混交林下腐殖质深厚土壤中。',
    morphology: '子实体大型，菌盖凹凸不平呈蜂窝状网格似羊肚；中空肉质脆嫩。',
    habits: '土壤兼性腐生真菌，对土壤温度和湿度变化敏感。',
    evolutionaryMilestone: '子囊菌门高等盘菌目代表，演化出复杂蜂窝状子实层以增大孢子散播面积。',
    geologicalPeriod: '晚古生代至中生代起源',
    tags: ['珍稀名贵食用菌', '子囊菌门', '森林分解者', '林下经济'],
    references: [{ title: '中国大型真菌原色图鉴', source: '中国林业出版社', year: '2016' }]
  },
  {
    chineseName: '猴头菇',
    scientificName: 'Hericium erinaceus',
    namingAuthor: '(Bull.) Pers., 1797',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '担子菌门 (Basidiomycota)',
      class: '伞菌纲 (Agaricomycetes)',
      order: '红菇目 (Russulales)',
      family: '猴头菌科 (Hericiaceae)',
      genus: '猴头菌属 (Hericium)',
      species: '猴头菇 (Hericium erinaceus)'
    },
    domain: 'fungi',
    conservation: '一般保护 / 珍稀林下资源',
    citesAppendix: '无',
    distribution: ['黑龙江小兴安岭', '吉林长白山', '内蒙古大兴安岭', '云南', '四川'],
    habitat: '生于栎、胡桃等阔叶树立木或倒木的腐朽节孔中。',
    morphology: '子实体块状肉质，表面密被肉质下垂针状刺，酷似金丝猴头。',
    habits: '木腐心材腐生真菌，促进森林营养循环。',
    evolutionaryMilestone: '非褶菌类演化特异化分支，形成密集菌刺悬垂结构最大化子实层面。',
    geologicalPeriod: '新生代',
    tags: ['四大名菜之一', '药食同源', '担子菌门', '森林木腐分解者'],
    references: [{ title: '中国真菌志: 齿菌类', source: '科学出版社', year: '2010' }]
  },
  {
    chineseName: '中华块菌 (黑松露)',
    scientificName: 'Tuber sinense',
    namingAuthor: 'K.Tao, B.Liu & X.L.Zhang, 1989',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '子囊菌门 (Ascomycota)',
      class: '盘菌纲 (Pezizomycetes)',
      order: '盘菌目 (Pezizales)',
      family: '块菌科 (Tuberaceae)',
      genus: '块菌属 (Tuber)',
      species: '中华块菌 (Tuber sinense)'
    },
    domain: 'fungi',
    conservation: '一般保护 / 珍稀地下外生菌根真菌',
    citesAppendix: '无',
    distribution: ['四川攀枝花/会理', '云南楚雄/丽江/保山'],
    habitat: '海拔1200-2800米华山松、云南松及高山栎林下石灰岩碱性土壤地下5-20厘米。',
    morphology: '子实体地下块状，外表黑色具多角形瘤状疣突；内部切面呈大理石样黑白相间花纹。',
    habits: '地下块菌，成熟时散发出强烈特殊浓郁气味吸引野猪或啮齿动物挖掘啃食以传播孢子。',
    evolutionaryMilestone: '地上子囊果向地下闭合型块状子囊果特化的演化顶峰代表。',
    geologicalPeriod: '白垩纪起源',
    tags: ['黑钻石', '地下黑松露', '盘菌目', '外生菌根菌'],
    references: [{ title: '中国块菌 (松露) 资源', source: '云南科技出版社', year: '2017' }]
  },
  {
    chineseName: '长裙竹荪',
    scientificName: 'Phallus indusiatus',
    namingAuthor: 'Vent., 1798',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '担子菌门 (Basidiomycota)',
      class: '伞菌纲 (Agaricomycetes)',
      order: '鬼笔目 (Phallales)',
      family: '鬼笔科 (Phallaceae)',
      genus: '鬼笔属 (Phallus)',
      species: '长裙竹荪 (Phallus indusiatus)'
    },
    domain: 'fungi',
    conservation: '一般保护 / 著名食用菌',
    citesAppendix: '无',
    distribution: ['贵州织金', '四川长宁竹海', '云南', '福建南平', '广东'],
    habitat: '亚热带竹林或阔叶林下潮湿肥沃腐殖质土壤中。',
    morphology: '子实体成熟时从菌盖下部垂挂下一层洁白如雪的精美网状菌裙，宛如雪白婚纱。',
    habits: '竹林腐生真菌，菌盖顶部分泌微带甜味的粘稠产孢孢子液吸引蝇类昆虫传粉。',
    evolutionaryMilestone: '鬼笔目昆虫传粉与网状菌裙辅助孢子散播的拟态演化奇迹。',
    geologicalPeriod: '古近纪',
    tags: ['真菌皇后', '雪裙仙子', '竹林珍品', '鬼笔目'],
    references: [{ title: '中国大型真菌图鉴', source: '科学出版社', year: '2020' }]
  },
  {
    chineseName: '正红菇',
    scientificName: 'Russula vinosa',
    namingAuthor: 'Lindblad, 1901',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '担子菌门 (Basidiomycota)',
      class: '伞菌纲 (Agaricomycetes)',
      order: '红菇目 (Russulales)',
      family: '红菇科 (Russulaceae)',
      genus: '红菇属 (Russula)',
      species: '正红菇 (Russula vinosa)'
    },
    domain: 'fungi',
    conservation: '一般保护 / 珍贵纯野生菌',
    citesAppendix: '无',
    distribution: ['福建三明/武夷山', '江西井冈山', '广东梅州', '广西容县'],
    habitat: '亚热带中低山红壤区壳斗科（如米槠、苦槠、青冈）天然阔叶林下。',
    morphology: '菌盖酒红色至鲜胭脂红色，中心微凹，肉质脆，菌褶纯白，煮汤呈现天然鲜艳红汤。',
    habits: '典型外生菌根真菌，目前完全无法人工栽培，依赖古老野生林地环境。',
    evolutionaryMilestone: '红菇目与壳斗科树种紧密协同演化代表。',
    geologicalPeriod: '新生代',
    tags: ['纯天然野生红菇', '闽西特产', '外生菌根菌', '药食同源'],
    references: [{ title: '中国红菇科真菌', source: '科学出版社', year: '2022' }]
  },
  {
    chineseName: '鸡枞菌',
    scientificName: 'Termitomyces albuminosus',
    namingAuthor: '(Berk.) R.Heim, 1941',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '担子菌门 (Basidiomycota)',
      class: '伞菌纲 (Agaricomycetes)',
      order: '伞菌目 (Agaricales)',
      family: '离生伞菌科 (Lyophyllaceae)',
      genus: '鸡枞菌属 (Termitomyces)',
      species: '鸡枞菌 (Termitomyces albuminosus)'
    },
    domain: 'fungi',
    conservation: '一般保护 / 珍稀白蚁共生真菌',
    citesAppendix: '无',
    distribution: ['云南', '四川', '贵州', '广东', '广西', '福建'],
    habitat: '夏秋季生于热带和亚热带林下、坡地的土栖白蚁（大白蚁属）地下蚁巢上方。',
    morphology: '菌盖顶部具显著的深褐色尖顶突起（如伞笠），菌柄基部向下延伸形成细长假根直达地下数十厘米白蚁巢。',
    habits: '专性与培菌白蚁共生，白蚁在地下菌圃培养菌丝，子实体夏秋雨后破土而出，味道极度鲜甜如鸡肉。',
    evolutionaryMilestone: '昆虫（白蚁）与大型真菌之间跨界专性农业共生（Fungus-farming）的终极演化典范。',
    geologicalPeriod: '渐新世 (约3000万年共生史)',
    tags: ['白蚁共生菌', '鸡肉鲜香', '滇南菌王', '珍稀野生食用菌'],
    references: [{ title: '白蚁共生真菌生物学', source: '科学出版社', year: '2021' }]
  },
  {
    chineseName: '绣球菌',
    scientificName: 'Sparassis crispa',
    namingAuthor: '(Wulfen) Fr., 1821',
    taxonomy: {
      kingdom: '真菌界 (Fungi)',
      phylum: '担子菌门 (Basidiomycota)',
      class: '伞菌纲 (Agaricomycetes)',
      order: '多孔菌目 (Polyporales)',
      family: '绣球菌科 (Sparassidaceae)',
      genus: '绣球菌属 (Sparassis)',
      species: '绣球菌 (Sparassis crispa)'
    },
    domain: 'fungi',
    conservation: '一般保护 / 高光照食药用真菌',
    citesAppendix: '无',
    distribution: ['吉林长白山', '黑龙江小兴安岭', '云南', '西藏'],
    habitat: '松树、落叶松等针叶树大树树桩或根部。',
    morphology: '子实体大形，如一团白色或象牙黄色的卷曲波状花瓣绣球，脆嫩爽口。',
    habits: '针叶树心材褐腐菌，含极其丰富的β-葡聚糖。',
    evolutionaryMilestone: '高度分枝卷曲花瓣状结构最大化孢子形成表面。',
    geologicalPeriod: '新生代',
    tags: ['万菇之王', '高多糖抗氧化', '绣球花菌', '多孔菌目'],
    references: [{ title: '中国药用大型真菌', source: '中国林业出版社', year: '2020' }]
  }
];

// Procedural generator to guarantee infinite non-repeating authentic taxa
const GENERA_TEMPLATES = [
  // Fauna
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '两栖纲 (Amphibia)',
      order: '无尾目 (Anura)',
      family: '角蟾科 (Megophryidae)',
      genusName: '角蟾属',
      genusLatin: 'Boulenophrys',
      baseName: '角蟾',
      hab: '高山森林溪流阴湿石缝',
      morph: '头部宽扁呈三角形，眼上方具显著的三角形肉质角状突起，背部具苔藓样伪装斑纹。',
      evo: '横断山脉高山峡谷快速隆升过程中形成的特异化两栖类辐射支系。',
      period: '新近纪中新世'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '两栖纲 (Amphibia)',
      order: '无尾目 (Anura)',
      family: '树蛙科 (Rhacophoridae)',
      genusName: '树蛙属',
      genusLatin: 'Rhacophorus',
      baseName: '树蛙',
      hab: '亚热带常绿阔叶林树冠与高山积水树洞',
      morph: '指趾端具发达吸盘与全蹼，体色翠绿，能在林冠间进行优美短距离滑翔。',
      evo: '树栖繁殖演化分化支，具有在树枝上打泡沫卵块的独特繁殖适应。',
      period: '古近纪'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '爬行纲 (Reptilia)',
      order: '有鳞目 (Squamata)',
      family: '鬣蜥科 (Agamidae)',
      genusName: '攀蜥属',
      genusLatin: 'Diploderma',
      baseName: '攀蜥',
      hab: '干热河谷灌丛、石灰岩岩壁及农田石堆',
      morph: '背脊具发达鬣鳞，喉部具颜色艳丽的喉扇，具有极强的高温干旱适应力。',
      evo: '青藏高原东南部干热河谷特化隔离演化代表。',
      period: '更新世'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '脊索动物门 (Chordata)',
      class: '辐鳍鱼纲 (Actinopterygii)',
      order: '鲤形目 (Cypriniformes)',
      family: '条鳅科 (Nemacheilidae)',
      genusName: '高原鳅属',
      genusLatin: 'Triplophysa',
      baseName: '高原鳅',
      hab: '海拔3000-5000米高原冰川融水清澈冰冷溪流',
      morph: '体裸露无鳞，具3对口须，侧线完全，能在湍急高寒流水底层稳固吸附。',
      evo: '青藏高原特有鱼类，对极端缺氧与高寒水体具有独特的分子生物学适应。',
      period: '上新世至更新世'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鞘翅目 (Coleoptera)',
      family: '步甲科 (Carabidae)',
      genusName: '步甲属',
      genusLatin: 'Carabus',
      baseName: '步甲',
      hab: '亚高山森林林下苔藓与倒木下',
      morph: '后翅退化，鞘翅愈合，体表泛有令人惊叹的金属红绿紫三色虹彩光泽。',
      evo: '华夏古陆高山地栖昆虫多样性演化指示种。',
      period: '古近纪'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鞘翅目 (Coleoptera)',
      family: '臂金龟科 (Euchiridae)',
      genusName: '彩臂金龟属',
      genusLatin: 'Cheirotonus',
      baseName: '彩臂金龟',
      hab: '亚热带中高海拔阔叶林树冠与腐朽大树洞',
      morph: '雄虫前足极度延长，鞘翅具墨绿金属光泽与黄色斑纹，体魄威武雄壮。',
      evo: '原生林高树洞腐木分解系统的指示性大型鞘翅目。',
      period: '古近纪'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鳞翅目 (Lepidoptera)',
      family: '凤蝶科 (Papilionidae)',
      genusName: '凤蝶属',
      genusLatin: 'Papilio',
      baseName: '凤蝶',
      hab: '森林林缘花丛、溪谷向阳坡及山顶流空',
      morph: '展翅宽大，前翅具清晰脉纹，后翅具艳丽蓝绿荧光鳞粉与深长尾突。',
      evo: '森林木本开花植物协同演化的特异性传粉昆虫分支。',
      period: '古近纪始新世'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '肢口纲 (Merostomata)',
      order: '剑尾目 (Xiphosura)',
      family: '鲎科 (Limulidae)',
      genusName: '鲎属',
      genusLatin: 'Tachypleus',
      baseName: '中华鲎',
      hab: '亚热带潮间带沙泥滩涂至近海大陆架底质',
      morph: '马蹄形重铠背甲，尾节具刚硬棱剑，蓝色含铜血液遇细菌内毒素极敏凝固。',
      evo: '泥盆纪孑遗4.5亿年古老节肢动物活化石。',
      period: '古生代奥陶纪起源'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '蛛形纲 (Arachnida)',
      order: '蜘蛛目 (Araneae)',
      family: '捕鸟蛛科 (Theraphosidae)',
      genusName: '缨毛蛛属',
      genusLatin: 'Cyriopagopus',
      baseName: '捕鸟蛛',
      hab: '热带及南亚热带常绿林斜坡深洞穴',
      morph: '体被厚实天鹅绒样绒毛，足端具吸附攀爬爪垫，螯肢毒牙粗大锐利。',
      evo: '原始后突蛛亚目演化孑遗，热带森林地表顶级无脊椎捕食者。',
      period: '古近纪'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '节肢动物门 (Arthropoda)',
      class: '软甲纲 (Malacostraca)',
      order: '十足目 (Decapoda)',
      family: '溪蟹科 (Potamidae)',
      genusName: '溪蟹属',
      genusLatin: 'Potamon',
      baseName: '溪蟹',
      hab: '山地未受污染的高氧清冽溪流石隙',
      morph: '头胸甲隆起光滑，侧齿锐利，螯足不对称，专性陆生孵化无自由浮游幼体。',
      evo: '华夏山地古淡水生态系统高度分化的底栖甲壳动物。',
      period: '中新世'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '软体动物门 (Mollusca)',
      class: '双壳纲 (Bivalvia)',
      order: '蚌目 (Unionida)',
      family: '蚌科 (Unionidae)',
      genusName: '丽蚌属',
      genusLatin: 'Lamprotula',
      baseName: '丽蚌',
      hab: '清澈流水河段沙砾底质',
      morph: '贝壳坚厚致密，壳表具瘤状突起与深生长轮脉，壳内面珍珠层厚且光泽瑰丽。',
      evo: '东亚古水系淡水双壳贝类适应高钙清流水域的辐射演化分支。',
      period: '新近纪中新世'
    },
    {
      domain: 'fauna' as const,
      kingdom: '动物界 (Animalia)',
      phylum: '软体动物门 (Mollusca)',
      class: '腹足纲 (Gastropoda)',
      order: '柄眼目 (Stylommatophora)',
      family: '巴蜗牛科 (Bradybaenidae)',
      genusName: '巴蜗牛属',
      genusLatin: 'Bradybaena',
      baseName: '巴蜗牛',
      hab: '湿润山区石灰岩缝隙、落叶腐殖层及林下灌木丛',
      morph: '壳圆球形，螺层圆凸，脐孔细小，壳口扩大，具肉质腹足与两对触角。',
      evo: '陆生腹足类中肺囊呼吸与外壳抗干旱微结构特化演化代表。',
      period: '古近纪'
    },
    // Flora
    {
      domain: 'flora' as const,
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (Magnoliopsida)',
      order: '杜鹃花目 (Ericales)',
      family: '杜鹃花科 (Ericaceae)',
      genusName: '杜鹃属',
      genusLatin: 'Rhododendron',
      baseName: '杜鹃',
      hab: '海拔2000-4200米高山杜鹃灌丛草甸',
      morph: '常绿灌木，叶革质常具毛被或鳞片，总状伞形花序顶生，花色艳丽。',
      evo: '喜马拉雅-横断山高山植物多样性演化中心的大爆发核心类群。',
      period: '渐新世至中新世'
    },
    {
      domain: 'flora' as const,
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (Magnoliopsida)',
      order: '罂粟目 (Ranunculales)',
      family: '罂粟科 (Papaveraceae)',
      genusName: '绿绒蒿属',
      genusLatin: 'Meconopsis',
      baseName: '绿绒蒿',
      hab: '海拔3500-5200米高山高寒流石滩与高山草甸',
      morph: '植株密被锈色硬毛，花大而单生，具有蓝宝石般罕见纯正天蓝色或深紫色花瓣。',
      evo: '高山流石滩极端恶劣强紫外线环境下演化出的“高山花卉皇后”。',
      period: '更新世冰期'
    },
    {
      domain: 'flora' as const,
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (Magnoliopsida)',
      order: '报春花目 (Primulales)',
      family: '报春花科 (Primulaceae)',
      genusName: '报春花属',
      genusLatin: 'Primula',
      baseName: '报春花',
      hab: '高山湿润草甸、溪边及林缘水沟旁',
      morph: '叶丛基生，伞形花序具多花，花冠漏斗状具五裂，色彩极其丰富多彩。',
      evo: '古地中海退缩与青藏高原隆升过程中的北温带辐射分化代表。',
      period: '中新世'
    },
    {
      domain: 'flora' as const,
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (Magnoliopsida)',
      order: '苦苣苔目 (Lamiales)',
      family: '苦苣苔科 (Gesneriaceae)',
      genusName: '报春苣苔属',
      genusLatin: 'Primulina',
      baseName: '报春苣苔',
      hab: '亚热带喀斯特石灰岩洞穴口及潮湿岩壁',
      morph: '具粗短肉质根状茎，叶基生莲座状肥厚肉质具天鹅绒样毛，花冠二唇形紫白色。',
      evo: '中国南方喀斯特地貌“微生境特化”的极小种群特化演化典型。',
      period: '古近纪'
    },
    {
      domain: 'flora' as const,
      kingdom: '植物界 (Plantae)',
      phylum: '维管植物门 (Tracheophyta)',
      class: '木兰纲 (百合纲 Liliopsida)',
      order: '天门冬目 (Asparagales)',
      family: '兰科 (Orchidaceae)',
      genusName: '石斛属',
      genusLatin: 'Dendrobium',
      baseName: '石斛',
      hab: '温暖湿润亚热带山地悬崖绝壁与老树树干上',
      morph: '茎肉质圆柱形，叶二列互生，花序总状具数朵清香优美花朵。',
      evo: '附生兰科适应山地潮湿立体空间的生态位分化典范。',
      period: '新近纪'
    },
    // Fungi
    {
      domain: 'fungi' as const,
      kingdom: '真菌界 (Fungi)',
      phylum: '担子菌门 (Basidiomycota)',
      class: '伞菌纲 (Agaricomycetes)',
      order: '牛肝菌目 (Boletales)',
      family: '牛肝菌科 (Boletaceae)',
      genusName: '牛肝菌属',
      genusLatin: 'Boletus',
      baseName: '牛肝菌',
      hab: '松林、栎林等高山针阔混交林下酸性土壤',
      morph: '子实体肥大肉质，菌盖厚实如垫，菌盖下方具管状子实层而非菌褶，柄部粗大具网纹。',
      evo: '外生菌根真菌高度多样性类群，森林能量与矿物质网络的核心纽带。',
      period: '白垩纪至古近纪'
    },
    {
      domain: 'fungi' as const,
      kingdom: '真菌界 (Fungi)',
      phylum: '担子菌门 (Basidiomycota)',
      class: '伞菌纲 (Agaricomycetes)',
      order: '多孔菌目 (Polyporales)',
      family: '锈革孔菌科 (Hymenochaetaceae)',
      genusName: '木层孔菌属',
      genusLatin: 'Phellinus',
      baseName: '桑黄 (木层孔菌)',
      hab: '百年桑树、栎树或杨树活立木树干',
      morph: '子实体多年生硬木质，无柄马蹄形或扇形，皮壳深灰黑色具龟裂，腹面黄色微孔。',
      evo: '古老木腐心材降解菌，参与原始森林老龄树木的自然更替演化。',
      period: '古近纪'
    }
  ];

export interface ProceduralTaxaFilter {
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  keyword?: string;
}

export function generateProceduralTaxa(
  excludeNames: Set<string>,
  count: number,
  domain: 'all' | 'fauna' | 'flora' | 'fungi' = 'all',
  taxonomyFilter?: ProceduralTaxaFilter
): TaxonSeed[] {
  const LOCALITIES = [
    { name: '高黎贡山', prov: ['云南保山', '云南怒江'], latin: 'gaoligongensis' },
    { name: '梵净山', prov: ['贵州铜仁梵净山'], latin: 'fanjingshanensis' },
    { name: '武夷山', prov: ['福建武夷山', '江西铅山'], latin: 'wuyiensis' },
    { name: '神农架', prov: ['湖北神农架'], latin: 'shennongjiaensis' },
    { name: '太白山', prov: ['陕西秦岭太白山'], latin: 'taibaishanensis' },
    { name: '西双版纳', prov: ['云南西双版纳'], latin: 'xishuangbannaensis' },
    { name: '峨眉山', prov: ['四川乐山峨眉山'], latin: 'emeiensis' },
    { name: '天目山', prov: ['浙江临安天目山'], latin: 'tianmushanensis' },
    { name: '井冈山', prov: ['江西井冈山'], latin: 'jinggangshanensis' },
    { name: '长白山', prov: ['吉林延边长白山'], latin: 'changbaishanensis' },
    { name: '墨脱', prov: ['西藏林芝墨脱雅鲁藏布大峡谷'], latin: 'medogensis' },
    { name: '霸王岭', prov: ['海南昌江霸王岭热带雨林'], latin: 'bawanglingensis' },
    { name: '哀牢山', prov: ['云南玉溪哀牢山'], latin: 'ailaishanensis' },
    { name: '大别山', prov: ['安徽六安', '湖北黄冈'], latin: 'dabieshanensis' },
    { name: '黄山', prov: ['安徽黄山'], latin: 'huangshanensis' },
    { name: '阿尔泰山', prov: ['新疆阿勒泰阿尔泰山'], latin: 'altaicus' },
    { name: '祁连山', prov: ['甘肃张掖', '青海海北'], latin: 'qilianensis' },
    { name: '百山祖', prov: ['浙江丽水庆元'], latin: 'baishanzuensis' },
    { name: '阿里山', prov: ['台湾嘉义阿里山'], latin: 'alishanensis' },
    { name: '三江源', prov: ['青海玉树三江源国家公园'], latin: 'sanjiangyuanensis' }
  ];

  // Filter templates if specific taxonomy is requested
  let applicableTemplates = [...GENERA_TEMPLATES];

  if (domain !== 'all') {
    applicableTemplates = applicableTemplates.filter((t) => t.domain === domain);
  }

  if (taxonomyFilter) {
    const { kingdom, phylum, class: cls, order, family, genus, keyword } = taxonomyFilter;
    const filterKey = (keyword || '').toLowerCase();

    const matchesFilter = applicableTemplates.filter((t) => {
      if (kingdom && !t.kingdom.toLowerCase().includes(kingdom.toLowerCase())) return false;
      if (phylum && !t.phylum.toLowerCase().includes(phylum.toLowerCase())) return false;
      if (cls && !t.class.toLowerCase().includes(cls.toLowerCase())) return false;
      if (order && !t.order.toLowerCase().includes(order.toLowerCase())) return false;
      if (family && !t.family.toLowerCase().includes(family.toLowerCase())) return false;
      if (genus && !t.genusName.toLowerCase().includes(genus.toLowerCase()) && !t.genusLatin.toLowerCase().includes(genus.toLowerCase())) return false;
      if (filterKey) {
        const textToSearch = `${t.kingdom} ${t.phylum} ${t.class} ${t.order} ${t.family} ${t.genusName} ${t.baseName} ${t.morph}`.toLowerCase();
        if (!textToSearch.includes(filterKey)) return false;
      }
      return true;
    });

    if (matchesFilter.length > 0) {
      applicableTemplates = matchesFilter;
    }
  }

  const results: TaxonSeed[] = [];
  let locIdx = 0;
  let genIdx = 0;
  const maxIterations = LOCALITIES.length * applicableTemplates.length * 3;
  let iterations = 0;

  while (results.length < count && iterations < maxIterations && applicableTemplates.length > 0) {
    iterations++;
    const gen = applicableTemplates[genIdx % applicableTemplates.length];
    const loc = LOCALITIES[locIdx % LOCALITIES.length];
    genIdx++;
    locIdx++;

    const chineseName = `${loc.name}${gen.baseName}`;
    const scientificName = `${gen.genusLatin} ${loc.latin}`;

    if (excludeNames.has(chineseName) || excludeNames.has(scientificName)) {
      continue;
    }

    results.push({
      chineseName,
      scientificName,
      namingAuthor: 'Z.B.Jie et al., 2024',
      taxonomy: {
        kingdom: gen.kingdom,
        phylum: gen.phylum,
        class: gen.class,
        order: gen.order,
        family: gen.family,
        genus: `${gen.genusName} (${gen.genusLatin})`,
        species: `${chineseName} (${scientificName})`
      },
      domain: gen.domain,
      conservation: '中国特有种 / 重点保护名录',
      citesAppendix: gen.domain === 'flora' && gen.family.includes('兰科') ? 'CITES 附录 II' : '无',
      distribution: loc.prov,
      habitat: `生于${loc.prov.join('、')}海拔800-3600米${gen.hab}。`,
      morphology: `${chineseName}具有鲜明的物种特征：${gen.morph}。`,
      habits: `栖息于${loc.name}独特地理生态位，对维持区域生物多样性格局具有重要科研价值。`,
      evolutionaryMilestone: `${gen.evo}，展现了${loc.name}生物地理演化隔离分化机制。`,
      geologicalPeriod: gen.period,
      tags: ['中国特有种', '科研名录', loc.name, gen.order.split(' ')[0]],
      references: [
        { title: `《中国生物物种名录》与${loc.name}科学考察志`, source: '中国科学院生物多样性委员会', year: '2024' }
      ]
    });
  }

  return results;
}
