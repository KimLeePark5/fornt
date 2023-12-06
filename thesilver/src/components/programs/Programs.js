function Programs() {


    return (
        <div className="contents">
            <div>
                <h4><b>❙ 프로그램</b></h4>
            </div>

            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <br/>
                <form onSubmit="return validateMemberNumber()">
                    <b>• 프로그램명</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="search" name="searchValue" id="searchInput" placeholder=" 검색어를 입력해주세요."/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="search-button" onClick="location.href='main-member'">검색</button>
                </form>
            </div>
        </div>
    );

}


export default Programs;