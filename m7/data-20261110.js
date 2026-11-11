const AUDIT_20261110 = {
  "report": "VGyBPpdQJ3LrcKj8",
  "title": "盘卷祭坛 · P3 问题复盘",
  "subtitle": "11月10日 · 聚焦进入P3的五把",
  "intro": "按经过、后果和下次处理逐条看问题，只保留有日志证据、需要改进的异常。",
  "scope": "本页聚焦 WCL 6、9、10、11、12 的 P3，时间均为开怪后的分钟与秒。",
  "coverage": [
    "五把共2170709条原始事件，全部分页结束且通过稳定性校验。",
    "分担同时核对伤害、吸收、零伤接触、易伤与免疫；没有普通伤害不等于没参加。",
    "套圈同时核对四人点名、真实命中、墓缚层数和白魂回收；点名者不自动成为责任人。",
    "团灭触发后的连锁仅解释后果，不追加独立个人失误；没有把日志截止当作已确认的语音喊灭。",
    "大怪打断、第一盾和搬球记录已检查。无证据的个人归责与正常处理不展示。"
  ],
  "footer": "来源：Warcraft Logs · 11月10日。只按已核实的日志事实复盘，证据不足的归责不补猜。",
  "fights": [
    {
      "id": 6
    },
    {
      "id": 9
    },
    {
      "id": 10
    },
    {
      "id": 11
    },
    {
      "id": 12
    }
  ],
  "roster": {
    "Elsa": "Priest",
    "白开掺可乐": "DeathKnight",
    "韶光逍珑": "Evoker",
    "小丶枂神": "Paladin",
    "Logwarlock": "Warlock",
    "派瑞星": "Monk",
    "Qui": "Mage",
    "黄色闪光": "Rogue",
    "剑二十三丶": "Warrior",
    "奶不到就放生": "Evoker",
    "先睡一会吧": "Mage",
    "吾王的荣耀": "Paladin",
    "莉姆": "Hunter",
    "小枂神": "DeathKnight",
    "深蓝色蒋洪福": "Shaman",
    "以血为生": "DeathKnight",
    "茗浩小宝贝": "Druid",
    "小林历奇": "Druid",
    "丨天灾丨牧师": "Priest",
    "大老板的猎手": "Hunter"
  },
  "categories": [
    {
      "id": "soak",
      "label": "分担",
      "title": "分担 · 易伤与落点",
      "description": "分担失败、重复参加与有效免疫分开看。"
    },
    {
      "id": "circle",
      "label": "套圈与白魂",
      "title": "套圈与白魂回收",
      "description": "先看谁实际受击，再追踪墓缚叠层与回收结果。"
    },
    {
      "id": "rescue",
      "label": "救人",
      "title": "恐惧行军 · 未救出",
      "description": "正常点名与后续再次受控分开记录。"
    },
    {
      "id": "other",
      "label": "共鸣与毒液",
      "title": "共鸣与毒液连锁",
      "description": "保留伤害开端与实际后果，不凭受害者反推触发者。"
    },
    {
      "id": "tank",
      "label": "前置减员",
      "title": "P3 前置减员",
      "description": "交代直接致死链，避免把后续连锁倒写成起因。"
    }
  ],
  "records": [
    {
      "key": "nov10-6-soak2",
      "fight": 6,
      "category": "soak",
      "phase": "P3",
      "time": "8:33",
      "title": "第二次分担带易伤，黄色闪光被击杀",
      "players": [
        "黄色闪光",
        "小林历奇"
      ],
      "process": "7:28黄色闪光已经参加第1次分担。第2次点名小林历奇，黄色闪光在8:33结算前施放暗影步到小林身边，再次吃到分担，易伤叠到2层。结算时没有暗影斗篷覆盖。",
      "result": "这一击造成87万实际伤害、10万吸收，并有447万过量伤害，黄色闪光当场死亡。不能把这次写成没进圈，问题是重复分担时没有有效免疫。",
      "reminder": "已有分担易伤的人再次参加前，先确认有效免疫已经生效。暗影步只能帮助进位，闪避和保护祝福不能替代暗影伤害免疫。",
      "evidenceText": "对齐第1次分担命中、第2次暗影步、易伤叠至2层、分担伤害及死亡；检查完整防护光环，未将没有普通伤害的免疫接触漏掉。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=6&type=events&start=1988737&end=2060737",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": [
        [
          "7:28",
          "第1次分担命中",
          "留下分担易伤"
        ],
        [
          "8:33",
          "暗影步 → 分担命中",
          "易伤2层，暗影斗篷未覆盖"
        ],
        [
          "8:33",
          "死亡",
          "致命伤害为分担，不是场地持续伤害"
        ]
      ]
    },
    {
      "key": "nov10-10-soak3",
      "fight": 10,
      "category": "soak",
      "phase": "P3",
      "time": "10:11–10:16",
      "title": "第3次分担触发冷酷处决",
      "players": [
        "先睡一会吧",
        "白开掺可乐"
      ],
      "process": "10:11第3次分担点名先睡一会吧。10:14他施放闪光术，读条结束后仍继续移动；到10:16结算时，分担要求没有满足，冷酷处决触发。",
      "result": "读条结束附近到结算附近，点名者的位置又变化约13码。失败惩罚先于部分分担伤害结算，日志只留下先睡和白开的直接分担伤害，不能据此断言实际只有两人进圈。",
      "reminder": "点名后提前确定落点，分担组及时跟到最终位置，尽量避免临近结算再拉长距离。这里按团队分担失败复盘，不把所有未留下伤害记录的人直接判成漏分担。",
      "evidenceText": "冷酷处决1299301实际发生；对齐点名、闪光术、读条结束、连续位置采样和后续伤害。位置为异步采样，不据边缘距离逐人定责。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=10&type=events&start=4112957&end=4119957",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": [
        [
          "10:11",
          "分担点名",
          "先睡一会吧"
        ],
        [
          "10:14",
          "闪光术、读条结束",
          "其后继续移动"
        ],
        [
          "10:16",
          "冷酷处决",
          "后续减员归入这一失败链，不再逐人追加判案"
        ]
      ]
    },
    {
      "key": "nov10-11-soak2",
      "fight": 11,
      "category": "soak",
      "phase": "P3",
      "time": "8:24–8:30",
      "title": "第2次分担未站齐，冷酷处决触发",
      "players": [
        "小林历奇",
        "莉姆",
        "大老板的猎手"
      ],
      "process": "8:24第2次分担点名小林历奇，8:28读条结束，8:29出现冷酷处决。点名者继续往外移动，读条结束和结算附近的站位记录都只见莉姆紧跟在附近，队伍没有完成这一轮分担。",
      "result": "莉姆已开灵龟守护，并留下0伤分担接触；不能说她没参加。大老板也开了灵龟，但仅有免疫光环不能证明他站进分担。8:30集中减员属于这次处决的后果。",
      "reminder": "点名者提前停在可集合的位置，分担组在落地前站齐。免疫覆盖和实际站位分别核对，不用全团伤害榜代替参与证据。",
      "evidenceText": "1299266点名、1299267读条、1299301失败惩罚和莉姆1299296零伤接触联合核对。大怪随后8:37读完的记录在团灭触发后，不追加独立漏断责任。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=11&type=events&start=4786208&end=4800208",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-6-circle1",
      "fight": 6,
      "category": "circle",
      "phase": "P3",
      "time": "7:38",
      "title": "套圈额外覆盖小丶枂神",
      "players": [
        "小丶枂神"
      ],
      "process": "7:38套圈结算时，未被本轮点名的小丶枂神额外吃到一次幽暗炸弹。",
      "result": "这一击造成约29万伤害，另有少量吸收。这里记录额外覆盖，不把小丶枂神直接当作携圈者或移动责任人。",
      "reminder": "套圈落点避开没有点名的队友，尤其不要让大怪附近的人额外承担白魂回收。",
      "evidenceText": "1310883实际伤害与同轮点名名单交叉核对；吸收附属事件不另算一次命中。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=6&type=events&start=2001737&end=2006737",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-6-circle2",
      "fight": 6,
      "category": "circle",
      "phase": "P3",
      "time": "8:13–8:26",
      "title": "旧魂没收完又叠新圈，派瑞星墓缚死亡",
      "players": [
        "派瑞星",
        "小林历奇",
        "韶光逍珑",
        "小丶枂神"
      ],
      "process": "派瑞星8:13受到枯萎斩击后先获得3层墓缚，收回两魂后还剩1层。8:22他自己的套圈又增加3层，叠到4层；8:25只再收回1魂，最终还有3层没清。",
      "result": "8:26墓缚结算将派瑞星击杀。同轮套圈还额外覆盖未点名的小林历奇、韶光逍珑、小丶枂神。旧墓缚未清与额外盖人是两个问题，不能混作一个责任。",
      "reminder": "旧白魂要在到期前收齐，再处理新圈。套圈落点同时给未点名队友留出距离，避免增加额外回收负担。",
      "evidenceText": "1286837层数与1308330回收逐次核对：3层→2→1，再叠至4，回收后剩3；1297906为最终致死。点名名单与1310883另确认三名额外受击者。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=6&type=events&start=2037737&end=2053737",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": [
        [
          "8:13",
          "新增墓缚",
          "3层"
        ],
        [
          "8:16、8:18",
          "两次回收",
          "仍剩1层"
        ],
        [
          "8:22",
          "新套圈结算",
          "叠到4层"
        ],
        [
          "8:25",
          "再回收1魂",
          "仍剩3层"
        ],
        [
          "8:26",
          "墓缚到期",
          "派瑞星死亡"
        ]
      ]
    },
    {
      "key": "nov10-6-circle3",
      "fight": 6,
      "category": "circle",
      "phase": "P3",
      "time": "9:00–9:13",
      "title": "额外吃圈后漏最后1魂，深蓝成为末段首个减员",
      "players": [
        "深蓝色蒋洪福",
        "小丶枂神",
        "大老板的猎手",
        "莉姆",
        "Qui"
      ],
      "process": "9:00套圈额外覆盖小丶枂神、大老板的猎手、深蓝色蒋洪福、莉姆、Qui。深蓝新增3层墓缚，随后只收回两魂，还剩最后1层。",
      "result": "9:13深蓝被墓缚击杀。这是本把末段连锁的开端；之后才出现毒液爆裂集中减员，不能反过来把深蓝的死因写成毒液，也不把之后每个死亡再单独判一次。",
      "reminder": "额外吃圈后也要完成新增白魂回收，最后1魂不能漏。先减少圈对队友的覆盖，再检查各自的剩余层数。",
      "evidenceText": "1310883额外命中、1286837由3层降至1层、1297906致死按时间对齐。深蓝死亡在9:13，毒液爆裂批次在其后出现。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=6&type=events&start=2084737&end=2101737",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-10-grave-elsa",
      "fight": 10,
      "phase": "P3",
      "category": "circle",
      "time": "7:45–7:58",
      "title": "Elsa墓缚未回收，到期触发救赎之魂",
      "players": [
        "Elsa"
      ],
      "process": "7:45 Elsa承受枯萎斩击后留下墓缚。到期前没有白魂回收记录，7:58承受墓缚的巨额到期伤害，并进入救赎之魂。",
      "result": "未回收导致墓缚到期可以确认。这里不直接写成普通死亡：该段没有对应死亡事件，之后有救赎之魂、实际施法、正血量和复活等多种状态记录，不能只凭最后一击补猜完整生死过程。",
      "reminder": "斩击后同样要检查并回收白魂，不只盯套圈带来的墓缚。先解决回收遗漏，特殊死亡状态单独看。",
      "evidenceText": "1307292斩击、1286837墓缚、期间无1308330回收、1297906到期伤害与27827救赎之魂按时间核对。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=10&type=events&start=3965957&end=3981957",
      "evidenceRows": [],
      "evidenceHeaders": []
    },
    {
      "key": "nov10-10-circle2",
      "fight": 10,
      "category": "circle",
      "phase": "P3",
      "time": "9:03–9:16",
      "title": "Log套圈后未回收白魂，墓缚到期死亡",
      "players": [
        "Logwarlock",
        "小丶枂神"
      ],
      "process": "9:03 Logwarlock自己的套圈结算，留下墓缚。此后到到期前没有白魂回收记录。该轮还额外覆盖了未点名的小丶枂神。",
      "result": "9:16 Log被墓缚击杀。套圈本身结算与后续回收没有接上，不能只写成最后一跳突然掉血。",
      "reminder": "圈结算后立即确认并回收自己的白魂，不要直接回头继续输出；周围未点名的人也要避开圈的覆盖区。",
      "evidenceText": "1310883与1286837确认套圈及墓缚；到期前没有1308330回收或降层记录，最后1297906致死。初始光环没有直接标明层数，不将层数当作原始事件实录。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=10&type=events&start=4043957&end=4059957",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-10-circle3",
      "fight": 10,
      "category": "circle",
      "phase": "P3",
      "time": "10:07–10:09",
      "title": "小丶枂神同轮双吃圈，墓缚叠到6层",
      "players": [
        "小丶枂神",
        "黄色闪光",
        "剑二十三丶",
        "茗浩小宝贝",
        "小林历奇"
      ],
      "process": "10:07本轮点名小林历奇、剑二十三丶、茗浩小宝贝、黄色闪光。小丶枂神没有被点名，却同轮承受两次幽暗炸弹，墓缚直接叠到6层。",
      "result": "两次伤害各约29万，随后需要处理6个白魂。10:09已出现两次回收，降到4层。结算位置指向附近的两个近战圈重叠区，具体是哪一次伤害来自哪位携圈者，日志没有直接标识。 后面的墓缚到期死亡发生在10:16分担团灭之后，不再追加独立个人责任。",
      "reminder": "两圈消掉大怪的盾以后，仍要避免重叠覆盖旁边的人。点名名单、实际覆盖和谁主动移动分开看，不把小丶枂神直接判成携圈失误。",
      "evidenceText": "两条独立1310883伤害与1286837明确stack=6相互印证。小丶枂神距黄色闪光约12码、距剑二十三约15码；另两名点名者超过40码。位置用于解释候选覆盖关系，不当作逐条伤害归属。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=10&type=events&start=4106957&end=4112957",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-11-circle1",
      "fight": 11,
      "category": "circle",
      "phase": "P3",
      "time": "8:19",
      "title": "以血为生被本轮套圈额外覆盖",
      "players": [
        "以血为生"
      ],
      "process": "8:19套圈结算，未被点名的以血为生额外吃到一次幽暗炸弹。",
      "result": "实际伤害约27万，并有吸收。这发生在8:29分担失败之前，保留覆盖问题；不把之后冷酷处决造成的死亡归到这一次圈伤。",
      "reminder": "套圈时给未点名队友留出距离，避免额外增加伤害和白魂处理。",
      "evidenceText": "同轮点名名单与1310883实际命中交叉核对，事件在团灭触发前。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=11&type=events&start=4780208&end=4784208",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-12-circle2",
      "fight": 12,
      "category": "circle",
      "phase": "P3",
      "time": "9:03",
      "title": "Elsa额外吃到本轮套圈",
      "players": [
        "Elsa",
        "吾王的荣耀",
        "奶不到就放生",
        "莉姆",
        "派瑞星"
      ],
      "process": "9:03套圈点名吾王的荣耀、奶不到就放生、莉姆、派瑞星。Elsa本轮没有点名，仍额外吃到一次幽暗炸弹。",
      "result": "这一击造成约29万伤害，并增加了额外的白魂回收负担。",
      "reminder": "圈落点留出余量，避免把没有点名的治疗也罩进去。覆盖事实不直接等于谁主动靠近。",
      "evidenceText": "1310883实际伤害与四人点名名单对应核对；没有把点名名单当责任名单。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=12&type=events&start=5564813&end=5568813",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-10-rescue-mage",
      "fight": 10,
      "phase": "P3",
      "category": "rescue",
      "time": "8:08–8:16",
      "title": "先睡一会吧未救出，随后死亡",
      "players": [
        "先睡一会吧"
      ],
      "process": "8:08正常恐惧行军点名先睡一会吧，救人盾初始约57万。到8:16死亡前，日志仅记录约17万削盾，没有完成救出的移除记录。",
      "result": "按已记录削盾推算，还剩约40万，也就是约70%的盾。8:16先睡死亡，8:17被战复。剩余盾量是算术推算，不是显式的光环移除值。",
      "reminder": "三人点名要分别确认救出，不能只看其他两人已经恢复。没有个人救人分工证据，按本次未完成救人的结果复盘。",
      "evidenceText": "1297445初盾568393，死亡前吸收消耗173307，差额395086；缺少光环移除事件，故残盾仅作推算。死亡和复活分别有记录。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=10&type=events&start=3988957&end=4000957",
      "evidenceRows": [],
      "evidenceHeaders": []
    },
    {
      "key": "nov10-10-rescue-evoker",
      "fight": 10,
      "category": "rescue",
      "phase": "P3",
      "time": "8:33–8:40",
      "title": "韶光被控后未救出，死亡时仍有大部分盾",
      "players": [
        "韶光逍珑"
      ],
      "process": "8:33韶光逍珑再次受到恐惧行军控制，救人盾初始约57万。到8:40控制结束时，盾仍余约47万，紧接着死亡。",
      "result": "这一段只打掉约17%的救人盾，未完成救出。它是后续单独发生的受控记录，不能冒充新一轮三人正常点名。",
      "reminder": "继续关注再次受控的人，及时转火救出。这里只确认救人结果，没有既定个人分工证据，不点名谁漏救。",
      "evidenceText": "1297445初始吸收568393，移除仍剩470740，随后死亡。真实点名波次与后续单独受控分别统计。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=10&type=events&start=4014957&end=4023957",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-9-venom",
      "fight": 9,
      "category": "other",
      "phase": "P3",
      "time": "8:10",
      "title": "毒液爆裂先造成减员，随后团灭",
      "players": [
        "黄色闪光",
        "吾王的荣耀"
      ],
      "process": "8:10毒液爆裂先集中命中，黄色闪光和吾王的荣耀在第一批伤害中死亡，随后进入持续减员。",
      "result": "保留这段毒液爆裂作为本把末段崩盘的开端。搬球效果移除和附近位置能帮助看经过，但没有直接事件指明是谁或哪颗球触发，不能写成某人撞球。",
      "reminder": "继续把绿紫球路线与落点分开，搬运前看清经过的位置。本条只确认毒液爆裂链，不凭效果消失判断送达成功，也不凭受伤人反推触发者。",
      "evidenceText": "1299838第一批在8:10，黄色闪光8:10、吾王8:10受到致命伤害，均早于第一条死亡记录。之后的未救出和读条不另追加独立责任。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=9&type=events&start=3378578&end=3386578",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-10-resonance",
      "fight": 10,
      "category": "other",
      "phase": "P3",
      "time": "8:44–8:49",
      "title": "深蓝与吾王同时出现恶毒共鸣，深蓝死亡",
      "players": [
        "深蓝色蒋洪福",
        "吾王的荣耀"
      ],
      "process": "8:44深蓝色蒋洪福与吾王的荣耀同时出现恶毒共鸣，随后持续受到共鸣伤害。8:48深蓝被其中一跳击杀，吾王8:49承受最后一跳后只剩约7万血。",
      "result": "共鸣与减员的伤害链可以确认。两人当时各有自己的追踪鬼，但现有记录没有把共鸣源直接关联到两个鬼的实体接触，不能写成两人一定把鬼撞在了一起。",
      "reminder": "带鬼移动时继续保持路线间距，减少交叉。这里列受影响者和实际后果，不将受害者直接当触发者。",
      "evidenceText": "1310744同刻光环、1312132连续伤害、死亡与剩余血量已对应。鬼的追踪绑定有效，但共鸣事件来源没有鬼实例标识，附近也缺两鬼的位置样本。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=10&type=events&start=4025957&end=4032957",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    },
    {
      "key": "nov10-6-tank",
      "fight": 6,
      "category": "tank",
      "phase": "P3",
      "time": "8:13",
      "title": "小枂神叠到两层刀伤时死亡",
      "players": [
        "小枂神"
      ],
      "process": "8:13小枂神再次承受枯萎斩击，相关易伤叠到2层。此前他已经施放吸血鬼之血和冰封之韧，不能把这次简单归为没开减伤。",
      "result": "斩击造成约179万实际伤害、56万吸收，仍有34万过量伤害，小枂神死亡，之后已被战复。这是本把P3的前置减员，晚于它的套圈、白魂和分担问题分别列明。",
      "reminder": "先核这段连续接刀与换坦安排，再看减伤覆盖是否足够，不用死亡结果直接认定某位坦克漏交技能。",
      "evidenceText": "1307292相关刀伤与叠至2层记录，对齐吸血鬼之血、冰封之韧的实际施法、吸收与死亡；记录的是致死事实，不推定个人换坦责任。",
      "url": "https://cn.warcraftlogs.com/reports/VGyBPpdQJ3LrcKj8#fight=6&type=events&start=2035737&end=2042737",
      "evidenceHeaders": [
        "时间",
        "记录",
        "说明"
      ],
      "evidenceRows": []
    }
  ]
};
