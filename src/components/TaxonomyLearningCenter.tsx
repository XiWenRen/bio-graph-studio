import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Layers, 
  Dna, 
  Award, 
  ArrowRight, 
  RotateCcw,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import { SpeciesData } from '../types';

interface TaxonomyLearningCenterProps {
  speciesList: SpeciesData[];
  onSelectSpecies: (species: SpeciesData) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  taxaContext: string;
}

const PRESET_QUIZ: QuizQuestion[] = [
  {
    question: '大熊猫 (Ailuropoda melanoleuca) 在现代分子系统学中确切属于哪个科？',
    options: ['浣熊科 (Procyonidae)', '大熊猫科 (Ailuropodidae)', '熊科 (Ursidae)', '犬科 (Canidae)'],
    correctIndex: 2,
    explanation: '分子系统发育学（线粒体与核基因组全测序）已经确凿证实：大熊猫是现生熊科（Ursidae）最早分化出的基部独立支系，而不是浣熊科。',
    taxaContext: '脊索动物门 › 哺乳纲 › 食肉目 › 熊科'
  },
  {
    question: '根据国际植物命名法规 (ICN)，植物学分类中代表“科 (Family)”阶元的标准拉丁后缀通常是？',
    options: ['-ales', '-aceae', '-idae', '-opsida'],
    correctIndex: 1,
    explanation: '在植物分类学中，-aceae 是科的统一定型后缀（如银杏科 Ginkgoaceae、松科 Pinaceae）；而 -ales 代表目，-opsida 代表纲，-idae 是动物科的后缀。',
    taxaContext: '植物界命名法规则'
  },
  {
    question: '被誉为“植物界大熊猫与活化石”、二战后在湖北利川被中国科学家首次发现活体的孑遗树种是？',
    options: ['水杉 (Metasequoia glyptostroboides)', '银杉 (Cathaya argyrophylla)', '珙桐 (Davidia involucrata)', '红豆杉 (Taxus wallichiana)'],
    correctIndex: 0,
    explanation: '水杉曾被古生物学家认为已在白垩纪白垩纪末期灭绝（仅存化石记录），1940年代在湖北利川磨刀溪发现了活体树木，轰动全球植物学界。',
    taxaContext: '松柏门 › 松柏纲 › 柏科 › 水杉属'
  },
  {
    question: '真菌界 (Fungi) 与植物界在细胞结构与生理代谢上的根本区别在于？',
    options: [
      '真菌具有纤维素细胞壁，能够进行光合作用',
      '真菌细胞壁主要成分为几丁质 (Chitin)，无叶绿体，为异养吸收型',
      '真菌不具有细胞核，属于原核生物',
      '真菌通过二分裂进行繁殖'
    ],
    correctIndex: 1,
    explanation: '真菌细胞壁成分为几丁质（与节肢动物外骨骼相同），不能进行光合作用，属于吸收异养型真核生物；在系统发育上真菌与动物的亲缘关系其实比植物更近。',
    taxaContext: '真核生物域五界系统'
  },
  {
    question: '林奈双名法 (Binomial Nomenclature) 标准书写规范中，正确的格式应为？',
    options: [
      '属名大写 + 种加词大写 + 汉字',
      '属名首字母大写 + 种加词全小写 + 命名人 (均以斜体或规定字体)',
      '种加词首字母大写 + 属名小写',
      '直接使用英文通用名'
    ],
    correctIndex: 1,
    explanation: '双名法由林奈创立：第一个词为属名（Genus，首字母大写），第二个词为种加词（Specific epithet，全小写），正文排版使用斜体；后附正体书写的定名人与年代。',
    taxaContext: '分类学命名规范'
  },
  {
    question: '在动物界演化树中，以具有外套膜 (Mantle)、分泌石灰质贝壳、肌肉质足与特征性齿舌 (Radula) 为共同特征的动物门类是？',
    options: ['节肢动物门 (Arthropoda)', '软体动物门 (Mollusca)', '棘皮动物门 (Echinodermata)', '刺胞动物门 (Cnidaria)'],
    correctIndex: 1,
    explanation: '软体动物门（Mollusca）是动物界物种多样性仅次于节肢动物的第二大门。其核心解剖学共有祖征为身体柔软不分节、具外套膜、常分泌碳酸钙贝壳，口腔内多具角质齿舌（双壳纲次生退化），包括双壳纲（砗磲、珍珠蚌）、腹足纲（田螺、鲍鱼）与头足纲（鹦鹉螺、乌贼）等。',
    taxaContext: '动物界 › 软体动物门 (Mollusca)'
  }
];

export const TaxonomyLearningCenter: React.FC<TaxonomyLearningCenterProps> = ({
  speciesList,
  onSelectSpecies
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'matrix' | 'paradox' | 'quiz'>('rules');

  // Quiz state
  const [quizList, setQuizList] = useState<QuizQuestion[]>(PRESET_QUIZ);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState(false);

  const currentQ = quizList[currentQuizIdx];

  const handleSelectAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIdx < quizList.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleGenerateAiQuiz = async () => {
    setIsGeneratingAiQuiz(true);
    try {
      const response = await fetch('/api/ai/taxonomy-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: '动植物系统分类与演化' })
      });
      const data = await response.json();
      if (data.success && data.quiz && data.quiz.length > 0) {
        setQuizList(data.quiz);
        handleRestartQuiz();
        alert('✨ 成功通过 AI 生成新一套生物分类学进阶题库！');
      } else {
        alert('生成新题库异常，使用内置题库');
      }
    } catch (e) {
      console.error(e);
      alert('AI题库生成连接异常');
    } finally {
      setIsGeneratingAiQuiz(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-xs font-semibold">
                分类学速记与知识研习
              </span>
              <span className="text-xs text-slate-400">林奈阶元法则 · 经典演化辨析 · 互动自测</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              生物分类学快速学习与知识进阶中心
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
              系统掌握林奈七级阶元口诀、双名法规范、动植物各大门类演化革新与亲缘分支辨析。
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === 'rules' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              📖 七级阶元速记法则
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === 'matrix' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚖️ 大门类对比矩阵
            </button>
            <button
              onClick={() => setActiveTab('paradox')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === 'paradox' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              💡 亲缘演化争鸣与案例
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === 'quiz' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎯 交互式分类学测验
            </button>
          </div>
        </div>
      </div>

      {/* 1. Rules & Mnemonic Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Linnaean Mnemonic */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>林奈七级分类阶元口诀与层级逻辑</span>
              </div>
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-xl text-center space-y-1">
                <div className="text-base sm:text-lg font-black text-emerald-300 tracking-widest">
                  「界、门、纲、目、科、属、种」
                </div>
                <div className="text-xs text-slate-400">
                  Kingdom → Phylum → Class → Order → Family → Genus → Species
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">1. 包含关系:</span>
                  <span>阶元越高，包含的生物种类越多，共同特征越少；阶元越低，包含的种类越少，亲缘关系越近。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">2. 基本单位:</span>
                  <span>
                    <strong>“种 (Species)”</strong> 是生物分类的基本阶元，指具有相似形态并能在自然状态下相互交配繁育具繁殖力后代的群体。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">3. 亚阶元拓展:</span>
                  <span>在主要阶元之间常设立亚门 (Subphylum)、超目 (Superorder)、亚科 (Subfamily) 或变种 (Variety, var.) 等辅助阶元。</span>
                </li>
              </ul>
            </div>

            {/* Binomial Nomenclature Rules */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>国际标准双名法 (Binomial Nomenclature) 规范</span>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>示例：大熊猫</span>
                  <span className="font-serif italic text-emerald-300">Ailuropoda melanoleuca David, 1869</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-800 text-slate-400">
                  <div>
                    <span className="text-emerald-400 font-bold">Ailuropoda</span>
                    <div>属名 (首字母大写)</div>
                  </div>
                  <div>
                    <span className="text-blue-400 font-bold">melanoleuca</span>
                    <div>种加词 (全小写)</div>
                  </div>
                  <div>
                    <span className="text-amber-400 font-bold">David, 1869</span>
                    <div>定名人与发表年份</div>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>• 属名和种加词在排版时必须使用<strong>斜体字 (Italics)</strong>。</li>
                <li>• 植物学拉丁后缀规则：<strong>-phyta (门)</strong>、<strong>-opsida (纲)</strong>、<strong>-ales (目)</strong>、<strong>-aceae (科)</strong>。</li>
                <li>• 动物学拉丁后缀规则：<strong>-oidea (超科)</strong>、<strong>-idae (科)</strong>、<strong>-inae (亚科)</strong>。</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. Matrix Comparison Tab */}
      {activeTab === 'matrix' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>中国动植物关键类群演化比较矩阵</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">比较维度</th>
                  <th className="p-3 text-emerald-300">裸子植物 (Gymnosperms)</th>
                  <th className="p-3 text-teal-300">被子植物 (Angiosperms)</th>
                  <th className="p-3 text-blue-300">哺乳纲 (Mammalia)</th>
                  <th className="p-3 text-cyan-300">软体动物门 (Mollusca)</th>
                  <th className="p-3 text-amber-300">真菌界 (Fungi)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-3 font-bold text-white">繁殖/器官特征</td>
                  <td className="p-3">胚珠裸露，无子房壁包裹（如银杏、红豆杉）</td>
                  <td className="p-3">具真正的花与果实，胚珠包于子房内（如珙桐、金花茶）</td>
                  <td className="p-3">胎生，雌性具乳腺哺育幼崽</td>
                  <td className="p-3">多雌雄异体，具外套膜、肌肉质足与石灰质贝壳（双壳纲/腹足纲/头足纲）</td>
                  <td className="p-3">产生子囊孢子或担孢子进行有性/无性繁殖</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">维管/细胞与循环</td>
                  <td className="p-3">木质部通常仅具管胞（无导管）</td>
                  <td className="p-3">具发达导管和筛管伴胞系统</td>
                  <td className="p-3">具有高度特化的神经中枢与恒温机制，完全双循环</td>
                  <td className="p-3">真体腔退化为围心腔，多为开管式循环（头足类闭管式，具巨大神经轴突）</td>
                  <td className="p-3">细胞壁由几丁质构成，储藏糖原</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">地质繁盛时代</td>
                  <td className="p-3">中生代（三叠纪、侏罗纪）为主</td>
                  <td className="p-3">白垩纪晚期大爆发至新生代</td>
                  <td className="p-3">新生代（古近纪、新近纪、第四纪）</td>
                  <td className="p-3">寒武纪大爆发至今，奥陶纪头足类称霸</td>
                  <td className="p-3">古生代泥盆纪陆地早期至今</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">中国代表物种</td>
                  <td className="p-3">银杏、水杉、银杉、苏铁</td>
                  <td className="p-3">珙桐、金花茶、华盖木</td>
                  <td className="p-3">大熊猫、川金丝猴、雪豹</td>
                  <td className="p-3">库氏砗磲、鹦鹉螺、佛耳丽蚌、白斑蝾螺</td>
                  <td className="p-3">冬虫夏草、红托竹荪</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Paradoxes & Case Studies Tab */}
      {activeTab === 'paradox' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              <span>争议解析 1: 大熊猫为什么曾被误划入浣熊科？</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              早期解剖学家因为大熊猫具有“伪拇指”（特化的桡侧籽骨）和咀嚼竹子的臼齿形态，且与小熊猫有相似外貌，曾长期争论其归属。但分子系统学证实，大熊猫的“伪拇指”与小熊猫是<strong>趋同进化 (Convergent Evolution)</strong> 的经典范例，大熊猫属于真正的熊科最早期分支。
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
            <h3 className="text-sm font-bold text-blue-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              <span>争议解析 2: 现代支序系统学中“鸟类是活着的恐龙”？</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              在中国辽宁热河生物群发现大量带羽毛恐龙化石（如中华龙鸟、孔子鸟）后，现代支序分类学（Cladistics）将鸟纲（Aves）归入蜥臀目兽脚亚目手盗龙类中，证明现代鸟类是恐龙唯一幸存至今的直系后裔。
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>争议解析 3: 银杏纲为什么被称为“植物界的独生子”？</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              在植物演化史上，银杏门（Ginkgophyta）在二叠纪至侏罗纪曾演化出众多科属。第四纪冰川期后，全球其他银杏类植物全部灭绝，仅在中国东部与西南部山地庇护所存活下唯一的单种属（Monotypic Taxon）——银杏 <em>Ginkgo biloba</em>。
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-purple-400" />
              <span>争议解析 4: 冬虫夏草到底属于动物还是植物？</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              冬虫夏草是<strong>真菌界 (Fungi) 子囊菌门肉座菌目线虫草科</strong>的冬虫夏草菌寄生于鳞翅目蝠蛾科幼虫体内形成的复合体。分类学正名是冬虫夏草菌 <em>Ophiocordyceps sinensis</em>，归属于真菌界。
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3 md:col-span-2">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>争议解析 5: 为什么软体动物门形态跨度极大（从固着砗磲到智慧章鱼/乌贼）？</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              软体动物门（Mollusca）是动物界中形态分化最惊人的大门之一。原始软体动物通过<strong>外套膜分泌碳酸钙硬壳</strong>抵御寒武纪古海洋捕食者；双壳纲（如砗磲、珍珠蚌）头部退化、足特化为斧足、终身营滤食；腹足纲（田螺、鲍鱼）经历扭转演化出单螺旋壳；而头足纲（鹦鹉螺、枪乌贼）则将足特化为敏捷腕足与喷水漏斗，内壳退化为透明内骨骼，并演化出无脊椎动物中最为发达的高度集中脑神经系统与晶状体眼睛，成为无脊椎动物智慧与运动速度的巅峰。
            </p>
          </div>
        </div>
      )}

      {/* 4. Interactive Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-3xl mx-auto shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <h2 className="text-base font-bold text-white">生物分类学知识测评挑战</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">
                当前得分: <strong className="text-emerald-400 font-mono text-sm">{score}</strong> / {quizList.length}
              </span>
              <button
                onClick={handleGenerateAiQuiz}
                disabled={isGeneratingAiQuiz}
                className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-300 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
                title="调用 Gemini AI 生成一套全新分类学测试题"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingAiQuiz ? 'AI出题中...' : 'AI生成新试卷'}</span>
              </button>
            </div>
          </div>

          {!quizFinished ? (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>第 {currentQuizIdx + 1} 题 / 共 {quizList.length} 题</span>
                  <span className="text-purple-400 font-mono">{currentQ.taxaContext}</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-purple-500 h-full transition-all duration-300"
                    style={{ width: `${((currentQuizIdx + 1) / quizList.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-base font-semibold text-white leading-relaxed">{currentQ.question}</h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';
                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-950 border-slate-800 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswered && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>分类学考点详解:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
                  >
                    <span>{currentQuizIdx < quizList.length - 1 ? '下一题' : '查看测试报告'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-8 space-y-4">
              <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-white">测评完成！</h3>
              <p className="text-sm text-slate-300">
                你的最终得分是：<strong className="text-2xl text-emerald-400 font-mono">{score}</strong> / {quizList.length}
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {score === quizList.length
                  ? '🎉 太棒了！你对中国动植物分类学与演化史有非常深厚的掌握！'
                  : '继续加油！利用演化树和林奈阶元检索多观察各物种的亲缘分支。'}
              </p>
              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>再测一次</span>
                </button>
                <button
                  onClick={handleGenerateAiQuiz}
                  disabled={isGeneratingAiQuiz}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI换一套新题</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
