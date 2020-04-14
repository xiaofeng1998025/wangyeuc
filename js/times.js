
let myDate = new Date();
let year=myDate.getFullYear();  //年
let month=myDate.getMonth()+1; //月
let day=myDate.getDate();   //日
var shishi=myDate.getHours();//小时
let fenzong=myDate.getMinutes(); //分钟
var weekDayArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]; //星期映射数组
let weekjinm=["今天","明天","后天"];
let nyn_name=[];
let nyn_weekDay=[]; //快车预约时间带星期
for(var k=0;k<=10;k++){
    let  nyr =new Date(year, month, 0).getDate();
    if(k>0){
        day++;
    }
    if(nyr<day){
        month++;
        day=1
    }
    if(month>12){
        year++;
        month=1
    }
     nyn_name.push(`${year+"-"+month+"-"+day}`)
}
function yuyuehsijian() {
    let nyn_weekDay1=[]; //快车预约时间带星期
    let myDate = new Date();
    var shishi=myDate.getHours();//小时
    let fenzong=myDate.getMinutes(); //分钟
    for(var i=0;i<3;i++) {
        var milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24 * i; //当i为0代表当前日期，为1时可以得到明天的日期，以此类推
        var newMyDate = new Date(milliseconds);
        var weekDay = newMyDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        var year1 = newMyDate.getFullYear();//获取当前年
        var month1 = newMyDate.getMonth() + 1;//获取当前月
        var day1 = newMyDate.getDate();//获取当前日
        nyn_weekDay1.push(JSON.parse(`{
   "id":${i},
   "value":"${year1 + "-" + month1 + "-" + day1 +"&nbsp;"+ weekjinm[i]}",
   "childs":[${xiaoshi(i)}]
   }
   `));
        // console.log(year1 + '-' + month1 + '-' + day1 + weekDayArr[weekDay])
    }
    function xiaoshi(data) {
        let xiaoshji = []; //小时
        if (data == 0) {
            for (var i = 0, k = 0; i < 24; i++) {
                if (i >= shishi) {
                    k++;
                    if (i < 10) {
                        xiaoshji.push(`{
                "id":${k - 1},
                "value":"${"0" + i}时",
                "childs":[${fenzhong(data,k-1)}]
            }`)
                    } else {
                        xiaoshji.push(`{
                "id":${k - 1},
                "value":"${i}时",
                "childs":[${fenzhong(data,k-1)}]
            }`)
                    }
                }
            }
        } else {
            for (let i = 0; i < 24; i++) {
                if(i<10){
                    xiaoshji.push(`{
                    "id":${i},
                    "value":"${"0"+i}时",
                    "childs":[${fenzhong(data)}]
                }`)
                }else{
                    xiaoshji.push(`{
                    "id":${i},
                    "value":"${i}时",
                    "childs":[${fenzhong(data)}]
                }`)
                }
            }

        }
        // console.log(xiaoshji)
        return xiaoshji
    }
    function fenzhong(data,fen){
        let fenzhon=[];  //分钟
        if (data == 0&&fen==0) {
            for (var i = 0, k = 0; i < 60; i++) {
                if (i >= fenzong) {
                    k++;
                    if(i<10){
                        fenzhon.push(`{
                    "id":${k-1},
                    "value":"${"0"+i}分"
                }`)
                    }else{
                        fenzhon.push(`{
                    "id":${k-1},
                    "value":"${i}分"
                }`)
                    }
                }
            }
        } else {
            for (let i = 0; i < 60; i++) {
                if(i<10){
                    fenzhon.push(`{
                    "id":${i},
                    "value":"${"0"+i}分"
                }`)
                }else{
                    fenzhon.push(`{
                    "id":${i},
                    "value":"${i}分"
                }`)
                }
            }
        }
        // console.log(fenzhon)
        return fenzhon
    }
    nyn_weekDay=nyn_weekDay1;
    // console.log(nyn_weekDay1)
}

// 选择日期 年月日
function Dato(data) {
    let Jaro=data;
    let myDate = new Date();
    let Dato=[];
    let year1=myDate.getFullYear();   //获取年
    let month1 =myDate.getMonth() + 1;//获取当前月
    let day1 = myDate.getDate();//获取当前日
    for (let i=0;i<Jaro;i++){
        if(i>=1){
            year1--;
        }
        Dato.push(JSON.parse(`{
                   "id":${i},
                   "value":"${year1}",
                   "childs":[${Monato(year1)}]
                   }
        `))
    }
    function Monato(data) {
        let Monato=[];
        if(data==myDate.getFullYear()){
            for(let j=1;j<=myDate.getMonth() + 1;j++){
                if(j<10){
                    Monato.push(`{"id":${j},"value":"${"0"+j}","childs":[${Tago(data,j)}]}`)
                }else{
                    Monato.push(`{"id":${j},"value":"${j}","childs":[${Tago(data,j)}]}`)
                }
            }
        }else{
            for(let j=1;j<=12;j++){
                if(j<10){
                    Monato.push(`{"id":${j},"value":"${'0'+j}","childs":[${Tago(data,j)}]}`)
                }else{
                    Monato.push(`{"id":${j},"value":"${j}","childs":[${Tago(data,j)}]}`)
                }
            }
        }
         return Monato
    }
    function Tago(data,j) {
        let Tago=[];
       let ZdMDate=new Date(data,j,0);
       let DqTago=ZdMDate.getDate();
        if(data==myDate.getFullYear()&&j==myDate.getMonth() + 1){
            for(let k=1;k<=myDate.getDate();k++){
                if(k<10){
                    Tago.push(`{"id":${k},"value":"${'0'+k}"}`)
                }else{
                    Tago.push(`{"id":${k},"value":"${k}"}`)
                }
            }
        }else{
            for(let k=1;k<=DqTago;k++){
                if(k<10){
                    Tago.push(`{"id":${k},"value":"${'0'+k}"}`)
                }else{
                    Tago.push(`{"id":${k},"value":"${k}"}`)
                }
            }
        }
        return Tago
    }
  return Dato
}


//换算小时方法
function ChangeHourMinutestr(str) {
    if (str !== "0" && str !== "" && str !== null) {
        return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() :
            (Math.floor(str / 60)).toString()) + ":" + ((str % 60).toString().length < 2 ? "0" + (str % 60).toString() : (str % 60).toString());
    }
    else
    {
        return "";
    }
}
// 去最后一位小数点
function str(data){
    data=(data.substring(data.length-1)==',')?data.substring(0,data.length-1):data;
    return data
}
// yuyuehsijian()
// console.log(nyn_weekDay1)
// let sdd=`[{"id":1,"value":2},{"id":2,"value":2}]`
// console.log(JSON.parse(sdd));

