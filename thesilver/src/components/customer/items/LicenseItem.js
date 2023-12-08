import React from "react";

function LicenseItem ({license}) {

    return (
        <div className="customers-license-row">
            <div>{license.registDate}</div>
            <div style={{ color: license.status === "ACTIVE" ? "blue" : "red" }}>{license.status === "ACTIVE" ? "활성" : "비활성"}</div>
            <div>{license.startDate}</div>
            <div>-</div>
            <div>{license.endDate}</div>
        </div>
    )

}

export default LicenseItem;