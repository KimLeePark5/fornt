import {callLicenseDeleteAPI} from "../../../apis/CustomerAPICalls";
import {useDispatch} from "react-redux";

function LicenseItem ({license}) {

    const dispatch = useDispatch();

    const onClickLicenseDelete = () => {
        const licenseCode = license.licenseCode;
        dispatch(callLicenseDeleteAPI({licenseCode}))
        console.log("클릭핸들러"+ licenseCode)
    }

    return (
        <div className="customers-license-row">
            <div>{license.registDate}</div>
            <div id="customers-license-status" style={{ background: license.status === "ACTIVE" ? "blue" : "red" }}>{license.status === "ACTIVE" ? "활성" : "비활성"}</div>
            <div>{license.startDate}</div>
            <div>-</div>
            <div>{license.endDate}</div>
            <div
                className="customers-license-delete"
                onClick={onClickLicenseDelete}
            >x</div>
        </div>
    )

}

export default LicenseItem;