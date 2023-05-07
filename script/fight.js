var hero = {}
var characters = {}
var feature = {}
var FightText=[]
var temptext=""
//角色基础面板
class attribute {
    constructor(uid, chara, feat, race) {
        this.name = uid;
        this.feat = feat;
        this.chara = chara;
        this.race = race;
        this.hpmax = 1000;
        this.hp = 1000;
        this.attack = Math.trunc(100 * characters[2][chara].a_rate);
        this.defense = Math.trunc(50 * characters[2][chara].d_rate);
        this.speed = Math.trunc(100 * characters[2][chara].s_rate);
        this.CritRate = 10;
        this.CritDamageRate = 2;
        this.Accuracy = 90;
        this.Evade = 10;
        this.Anger = 0;
        this.Angermax = 1000;
        this.buff = {
            burned: 0
        }
        this.debuff = {
            burned: {
                name: "【烧伤】",
                level: 0
            },      //烧伤
            poisoned: {
                name: "",
                level: 0
            },    //中毒
            enrage: {
                name: "",
                level: 0
            },       //激怒：降低10%的命中率，增加10%的攻击
        };
        //清除负面效果
        this.DebuffClear = function () {
            this.debuff.burned.level = 0;//重置烧伤层数
            this.debuff.enrage.level = 0;//重置激怒层数
            this.debuff.poisoned.level = 0;//重置中毒层数
        }
        //清除正面效果
        this.DebuffClear = function () {
            
        }
        this.recover = function () {
            this.hp = this.hpmax;
            this.attack = Math.trunc(100 * characters[2][chara].a_rate);
            this.CritRate = 10;
            this.CritDamageRate = 2;
            this.Accuracy = 90;
            this.Evade = 10;
            this.Anger = 0;
            this.Angermax = 1000;
        };
        this.detailname = function () {
            return characters[0][chara] + "的" + feature[0][feat] + hero[0][race]
        }
        this.broadcast = function () {
            Textpush(this.name)
            Textpush(characters[0][chara] + "的" + feature[0][feat] + hero[0][race])
            Textpush("生命值：" + this.hpmax)
            Textpush("攻击：" + this.attack)
            Textpush("防御：" + this.defense)
            Textpush("速度：" + this.speed)
        };
    }
}
//英雄列表
hero[0] = [
    "向晚",
    "贝拉",
    "珈乐",
    "嘉然",
    "乃琳"
]
hero[1] = [
    //向晚技能组
    {
        //必杀技
        EXSkill: {
            name: "【铁棍突袭】",
            ex: function (A, B) {
                Textpush("向晚释放技能")
            }
        },
        //行动技 每次普攻后的追加技能
        MoveSkill: {
            name: "【铁棍突袭】",
            ms: function (A, B) {
                //默认A为攻击方，B为受击方
                var true_attack = A.attack - B.defense;
                var ms_damage = Math.trunc(0.2 * true_attack) //计算技能伤害
                B.hp -= ms_damage;
                console.log(A.name, "释放技能", this.name, "造成了", ms_damage, "伤害")
            }
        }
    },
    //贝拉技能组
    {
        //必杀技
        EXSkill: {
            name: "【铁棍突袭】",
            ex: function () {
                console.log("贝拉释放技能")
            }
        },
        //行动技 每次普攻后的追加技能
        MoveSkill: {
            name: "【铁棍突袭】",
            ms: function (A, B) {
                //默认A为攻击方，B为受击方
                var true_attack = A.attack - B.defense;
                var ms_damage = Math.trunc(0.2 * true_attack) //计算技能伤害
                B.hp -= ms_damage;
                console.log("贝拉释放技能", this.name, "造成了", ms_damage, "伤害")
            }
        },
        //被动技 自动触发
        PassiveSkill: {
            name: "【火系传承】",
            ps: function (A, B) {
                //有50%的几率使敌人灼烧
                var b_rate = (Math.random() * 100);
                if (B.debuff.burned.level == 0) {
                    if (b_rate <= 50) {
                        Textpush(A.name + "对" + B.name + "施加了【灼烧】！");
                        B.debuff.burned.level = 1;
                    }
                }
            },
            story: "出生时，没有人注意到她的指尖冒出了一丝火花。",
            description: "被动。普通攻击时有50%概率附加【灼烧】。"
        }
    },
    //珈乐技能组
    {
        EXSkill: {
            name: "",
            ex: function () {
                console.log("珈乐释放技能")
            }
        }
    },
    //嘉然技能组
    {
        EXSkill: {
            name: "番茄炒蛋拳",
            ex: function () {
                console.log("嘉然释放技能")
            }
        }
    },
    //乃琳技能组
    {
        EXSkill: {
            name:"元素之力",
            ex: function (A,B) {
                //0-4随机 金木水火土元素攻击
                var ElementalDice = Math.trunc(Math.random() * 5)

            }
        },
        //金木水火土 0-4
        EX0:{
            name:"火球术",
            kind:3,
            EX0:function(A,B){
                
            }
        },
        EX1:{
            name:"火球术",
            kind:"",
            EX0:function(A,B){

            }
        },
        EX2:{
            name:"火球术",
            kind:"",
            EX0:function(A,B){

            }
        },
        EX3:{
            name:"火球术",
            kind:"",
            EX0:function(A,B){

            }
        },
        EX4:{
            name:"火球术",
            kind:"",
            EX0:function(A,B){

            }
        },
        //被动技 自动触发
        PassiveSkill: {
            name: "【摸一下】",
            ps: function (A, B) {
                Textpush(B.name + "摸了一下" + A.name + "的大腿");
                A.debuff.enrage.level += 1;
                Textpush(A.name + "：“试图把我激怒！”", "   当前【激怒】层数为", A.debuff.enrage.level);
                A.attack = Math.trunc(A.attack * 1.1); //攻击力提升10%
                if (A.Accuracy >= 30) A.Accuracy -= 10;    //命中率降低10%，低保10%
            },
            story: "摸摸嘛~没事的。",
            description: "被动。每次闪避攻击后，会对敌方进行挑衅，使得敌方进入【激怒】状态。"
        }
    },
]
//性格列表
characters[0] = [
    "胆小",
    "勇敢",
    "胆大",
    "保守",
    "孤独",
    "急躁",
    "害羞",
    "冷静",
    "狂妄",
    "温顺"
]
//性格解释
characters[1] = [
    "+10%速度，-10%攻击",
    "+10%攻击，-10%速度",
    "+10%防御，-10%攻击",
    "平衡",
    "+10%攻击，-10%防御",
    "+10%速度，-10%防御",
    "平衡",
    "+10%攻击，-10%速度",
    "+10%防御，-10%速度",
    "平衡"
]
//性格属性变化
characters[2] = [
    {
        a_rate: 0.9,
        d_rate: 1,
        s_rate: 1.1,
    },
    {
        a_rate: 1,
        d_rate: 1,
        s_rate: 1,
    },
    {
        a_rate: 1,
        d_rate: 1,
        s_rate: 1,
    },
    {
        a_rate: 1,
        d_rate: 1,
        s_rate: 1,
    },
    {
        a_rate: 1,
        d_rate: 1,
        s_rate: 1,
    },
    {
        a_rate: 1,
        d_rate: 1,
        s_rate: 1,
    },
    {
        a_rate: 1,
        d_rate: 1,
        s_rate: 1,
    },
    {
        a_rate: 1,
        d_rate: 1,
        s_rate: 1,
    },
    {
        a_rate: 1,
        d_rate: 1,
        s_rate: 1,
    }
]
feature[0] = [
    "摆烂",
    "摸鱼",
    "省电",
    "拉跨",
    "罕见",
    "风情",
    "武圣",
    "二甲",
    "口胡",
    "嘴硬",
    "打嗝",
    "音速",
    "大力",
    "暴食",
    "好色",
    "大聪明",
    "近视",
    "逆天",
    "敏感",
    "铸币",
    "酷盖",
    "清纯",
    "小",
    "大",
    "圣",
    "萌",
    "憨",
    "烧",
    "巧克力"
]
feature[1] = [
    "摆烂",
    "摸鱼",
    "省电",
    "拉跨",
    "罕见",
    "风情",
    "武圣",
    "二甲",
    "口胡",
    "嘴硬",
    "打嗝",
    "音速",
    "大力",
    "暴食",
    "好色",
    "大聪明",
    "近视",
    "逆天",
    "敏感",
    "铸币",
    "酷盖",
    "清纯",
    "小",
    "大",
    "圣",
    "萌",
    "憨",
    "烧",
    "巧克力"
]
title=[
    {
        text:"师徒组",
        description: "我才是师徒组中的“1”!"
    },
    {
        text:"冷裤子",
        description: "我才是冷裤子中的“1”!"
    },
    {
        text:"嘉晚饭",
        description: "我才是嘉晚饭中的“1”!"
    },
    {
        text:"果丹皮",
        description: "我才是果丹皮中的“1”!"
    },
    {
        text:"贝贝珈",
        description: "我才是贝贝珈中的“1”!"
    },
    {
        text:"超级嘉贝",
        description: "我才是超级嘉贝中的“1”!"
    },
    {
        text:"乃贝",
        description: "我才是乃贝中的“1”!"
    },
    {
        text:"C++",
        description: "我才是C++中的“1”!"
    },
    {
        text:"琳琅",
        description: "我才是琳琅中的“1”!"
    },
    {
        text:"琳嘉女孩",
        description: "我才是琳嘉女孩中的“1”!"
    },
    {
        text:"大三角",
        description: "左拥右抱"
    },
    {
        text:"C52",
        description: "力压4人"
    },
    {
        text:"常胜将军",
        description: "一般一般，世界第三"
    },
    {
        text:"高攻纸防",
        description: "不是高攻脂肪，是高攻纸防！不对，我不是高攻纸防"
    }
]
//console.log(characters[1][1])//调用
console.log(title[0].description);
let webody = new attribute("TiTi", 0, 0, 1)
let enemybody = new attribute("momo", 3, 1, 4)

var timecnt = 1

webody.broadcast();
enemybody.broadcast();

FightTime = 1;
var w = 0;
var e = 0;
var index = 0
while (index < FightTime) {
    webody.recover();
    webody.DebuffClear()
    enemybody.recover();
    enemybody.DebuffClear()
    while (webody.hp * enemybody.hp > 0) {
        Textpush('【第' + timecnt++ + '轮攻击】')
        if (timecnt > 50) break;
        if (webody.speed >= enemybody.speed) {
            normalattack(webody, enemybody);
            DeBuff(webody)
            normalattack(enemybody, webody);
            DeBuff(enemybody)
        } else {
            normalattack(enemybody, webody);
            normalattack(webody, enemybody);
        }
    }
    //对局统计
    if (IsDead(webody)) {
        Textpush(enemybody.name + "(" + enemybody.detailname() + ")" + "获胜");
        e++;
    } else {
        Textpush(webody.name + "(" + webody.detailname() + ")" + "获胜");
        w++;
    }
    timecnt = 0;
    index++;
}
if (FightTime > 1) {
    console.log(webody.name, "的胜率是", w / FightTime, "\n" + enemybody.name, "的胜率是", e / FightTime);
}
console.log(FightText);
Textpush_clg();
//A为攻击者，B为受击者
function normalattack(A, B) {
    //判断攻击方受击方是否死亡
    if (!IsDead(B) && !IsDead(A)) {
        var IsCrit = (Math.random() * 100) < A.CritRate;            //判断攻击者是否能够暴击
        var TrueAccuracy = A.Accuracy - B.Evade;                    //计算真实命中率 攻击命中-受击闪避
        var IsAccuracy = (Math.random() * 100) < TrueAccuracy;      //判断攻击者是否能够命中
        var AttackTip = "攻击，"                                    //攻击行为提词器
        var damage_n = A.attack - B.defense                         //计算普通攻击的正常伤害
        //判断是否命中
        if (IsAccuracy) {
            //命中了
            //特殊判断
            //判断是否暴击
            if (!IsCrit) {
                //没有暴击
                B.hp -= damage_n;
            } else {
                //暴击
                damage_n *= A.CritDamageRate                   //计算暴击伤害加成后的伤害
                B.hp -= damage_n;
                AttackTip = "触发【致命一击】，";                       //修改攻击行为提词器    
            }
            //结算汇报 若剩余血量为负数则显示0
            temptext = A.name + AttackTip + "造成了"+damage_n+"伤害," + B.name + "剩余血量为" + (B.hp > 0 ? B.hp : 0)
            //console.log(temptext);
            Textpush(temptext);
            //若进攻者为贝拉
            if (A.race == 1) { hero[1][1].PassiveSkill.ps(A, B); }
        } else {
            //未命中
            //结算汇报 本次攻击无效
            Textpush(A.name + "的攻击被" + B.name + "闪避了");
            //特殊判断
            if (B.race == 4) hero[1][4].PassiveSkill.ps(A, B);
        }
    }
}

//必杀技释放函数 A为攻击者 B为受击者
function EXSkill_excu(A, B) {
    //判断受击方是否死亡
    if (!IsDead(B) && !IsDead(A)) {
        //每回合根据速度累计怒气
        A.Anger += A.speed
        if (A.Anger > A.Angermax) {
            hero[1][A.race].EXSkill.ex(A, B);
            A.Anger = 0;
        }
    }
}
//DeBuff受伤判定
function DeBuff(A) {
    //判断是否死亡
    if (!IsDead(A) && !IsDead(A)) {
        //判断灼烧层数 大于1时生效
        if (A.debuff.burned.level > 0) {
            //造成1%最大生命的伤害
            var BurnedDamage = Math.trunc(A.hpmax * 0.01);
            A.hp -= BurnedDamage;
            //播报
            Textpush(A.name + "由于" + A.debuff.burned.name + "损失" + BurnedDamage + "点生命，" + "剩余血量为" + (A.hp > 0 ? A.hp : 0));
        }
    }
}
//判断是否死亡
function IsDead(obj) {
    if (obj.hp <= 0) {
        return true
    } else {
        return false
    }
}

//战斗文本输出
function Textpush(text,ifclg=1){
    FightText.push(text);
    if(ifclg){console.log(text);}
}
//战斗文本调试输出
function Textpush_clg(){
    FightText.forEach(function(ft){
        console.log(ft);
    });
}