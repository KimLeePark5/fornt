import {da} from "date-fns/locale";

function MainCal() {
    console.log("MainCal")
    const curDate = new Date();
    const year = curDate.getFullYear();
    const month = curDate.getMonth();
    const date = curDate.getDate();
    const day = curDate.getDay();
    const dayList = ['일','월','화','수','목','금','토'];
    const thisWeek = []
    for(let i = 1; i<6; i++){
        let resultDay = new Date(year,month,date + (i-day))
        let yyyy = resultDay.getFullYear();
        let mm = Number(resultDay.getMonth()) + 1;
        let dd = resultDay.getDate();
        mm = String(mm).length === 1 ? '0' + mm : mm;
        dd = String(dd).length === 1 ? '0' + dd : dd;
        thisWeek[i] = yyyy + '-' + mm + '-' + dd;
    }
    console.log(thisWeek);
    console.log("MainCal")

    return (
        <div class='mainCal'>
            {thisWeek &&
                thisWeek.map(week=>
                <div class='calitem'>
                    <div style={{borderBottom:'1px solid #B6B6B6'}} class='calDate'>
                        {week.substring(8,10)} ({dayList[new Date(week).getDay()]})
                    </div>
                    <div class='calConten'>
                        123
                    </div>
                </div>)
            }
        </div>
    )
}

export default MainCal;