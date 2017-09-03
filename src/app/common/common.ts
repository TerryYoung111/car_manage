export class Tools{

  //获取本地时间字符串
  getStrDate(showWeek){
    let date = new Date();
    let year,month,day,hour,min,week;
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate();
    date.getHours()<10 ? hour = `0${date.getHours()}` : hour = date.getHours();
    date.getMinutes()<10 ? min = `0${date.getMinutes()}` : min = date.getMinutes();
    switch(date.getDay()){
      case 0 : week = "星期日";break;
      case 1 : week = "星期一";break;
      case 2 : week = "星期二";break;
      case 3 : week = "星期三";break;
      case 4 : week = "星期四";break;
      case 5 : week = "星期五";break;
      case 6 : week = "星期六";break;
    };
    if (showWeek) { // 显示周
        return `${year}年${month}月${day}日 ${week} ${hour}:${min} `;
    }
    else{ // 不显示周
      return `${year}年${month}月${day}日 ${hour}:${min} `;
    }
  }

  //时间字符串-精确到秒
  getStrTime(date){
    console.log(date)
    let year,month,day,hour,min,sec;
    year = date.getFullYear();
    // month = date.getMonth()+1;
    // day = date.getDate();
    month = (date.getMonth()+1).toString().length == 1 ? `0${(date.getMonth()+1).toString()}` : (date.getMonth()+1).toString();
    day = (date.getDate()+1).toString().length == 1 ? `0${date.getDate().toString()}` : date.getDate().toString();
    date.getHours()<10 ? hour = `0${date.getHours()}` : hour = date.getHours();
    date.getMinutes()<10 ? min = `0${date.getMinutes()}` : min = date.getMinutes();
    date.getSeconds()<10 ? sec = `0${date.getMinutes()}` : sec = date.getMinutes();
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  }


  //对象转数组
  mapObj(object){
    let arr = [];
    for (let key in object) {
        let obj = {};
        obj['key'] = key;
        obj['value'] = object[key]
        arr.push(obj);
        obj = null;
    }
    return arr;
  }
}
