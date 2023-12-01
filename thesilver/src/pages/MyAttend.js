import AttendItem from "../components/items/AttendItem";
import CommuteBt from "../components/items/CommuteBt";

function MyAttend(){

    return(
        <>
            내 근태
            <AttendItem/>
            <CommuteBt/>
            {/*<input type="time" onChange={(e)=>{console.log(e.target.value)}}/>*/}
        </>
    )
}
export default MyAttend;