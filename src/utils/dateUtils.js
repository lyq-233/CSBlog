//改变日期格式
export default function changeDateFormat(date) {
    let d = new Date(Date.parse(date))
    let year = d.getFullYear()
    year = year < 10 ? '0' + year : year
    let month = d.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = d.getDate()
    day = day < 10 ? '0' + day : day
    let h = d.getHours()
    h = h < 10 ? '0' + h : h
    let m = d.getMinutes()
    m = m < 10 ? '0' + m : m
    let s = d.getSeconds()
    s = s < 10 ? '0' + s : s
    let result = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
    return result
}