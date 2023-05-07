function hover_event() {
    var obj = document.querySelectorAll("dt")
    var assit = document.querySelector("img.assit")
    obj.forEach(function (cv) {
        //console.log(cv.textContent);
        cv.onmouseover = function () {
            cv.style.opacity = "0.6";
        }
        cv.onmouseout = function () {
            cv.style.opacity = "1";
        }
    });
    assit.onmouseover = function () {
        EmoNum = Math.trunc(Math.random() * 3 + 1);
        console.log(EmoNum);
        switch (EmoNum) {
            case 1:
                assit.src = "/source/img/assit_shy.png";
                break;
            case 2:
                assit.src = "/source/img/assit_dizzy.png";
                break;
            case 3:
                assit.src = "/source/img/assit_angry.png";
                break;
            default:
                break;
        }
    };
    assit.onmouseout = function () {
        assit.src = "/source/img/assit.png";
    };
}
hover_event();
function welcome_page() {
    var obj = document.querySelector("div.ui");
    obj.innerHTML = `
    <p style="color: #ffffff;">欢迎来到枝江大乱斗！</p>
    <p style="color: #ffffff;">点击“加载存档”来加载你的存档！</p>
    <p style="color: #ffffff;">点击“Player”来新建一个存档！</p>
    <p style="color: #ffffff;">完成游玩后不要忘记保存存档噢！</p>
    <br>
    <p style="color: #ffffff;">最近更新时间：2022/9/13</p>
    `
}
function fight_page() {
    var obj = document.querySelector("div.ui");
    obj.innerHTML = `
    <p style="color: #ffffff;">欢迎来到枝江大乱斗！</p>
    <br>
    <p style="color: #ffffff;">战斗信息：</p>
    <div class="fightinfo"></div>
    `
}
function openfile() {
    var inputObj = document.createElement('input')
    inputObj.setAttribute('id', '_ef');
    inputObj.setAttribute('type', 'file');
    inputObj.setAttribute("style", 'visibility:hidden');
    document.body.appendChild(inputObj);
    inputObj.click();
}
function savefile() {
    var inputObj = document.createElement('input')
    inputObj.setAttribute('id', '_ef');
    inputObj.setAttribute('type', 'file');
    inputObj.setAttribute("style", 'visibility:hidden');
    document.body.appendChild(inputObj);
    inputObj.click();
}
function equip_page() {
    var uiobj = document.querySelector('div.ui');
    uiobj.innerHTML = "";//重写
    var row_num = 4;
    var column_num = 10;
    //创建格子
    //创建行
    for (let cnt = 0; cnt < row_num; cnt++) {
        var e_row = document.createElement('dl');
        e_row.className = "equip"
        for (let cnt = 0; cnt < column_num; cnt++) {
            var e_column = document.createElement('dt');
            e_row.appendChild(e_column);
        }
        uiobj.appendChild(e_row);
    }
}
function main_page() {
    var uiobj = document.querySelector('div.ui');
    uiobj.innerHTML = "";//重写
    var maintable = document.createElement('table');
    var row_num = 5;
    var column_num = 2;
    var row_now = 0;
    for (let cnt = 0; cnt < row_num; cnt++) {
        var attributelist = [
            {
                text: "昵称",
                class: "nickname"
            },
            {
                text: "性格",
                class: "characters"
            },
            {
                text: "特性",
                class: "feature"
            },
            {
                text: "等级",
                class: "level"
            },
            {
                text: "金币",
                class: "ely"
            }
        ]
        var table_row = document.createElement('tr');
        for (let cnt = 0; cnt < column_num; cnt++) {
            var table_column = document.createElement('td');
            console.log(row_now);
            if(cnt == 0) table_column.textContent = attributelist[row_now].text;
            else table_column.textContent = "加载中...";
            table_row.appendChild(table_column);
        }
        maintable.appendChild(table_row);
        row_now++;
    }
    uiobj.appendChild(maintable);
}