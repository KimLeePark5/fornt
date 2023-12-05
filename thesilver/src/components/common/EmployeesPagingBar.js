function EmployeesPagingBar({ pageInfo, setCurrentPage }) {

    // const pageNumber = [...Array(pageInfo.endPage - pageInfo.startPage + 1).keys()]
    //                                 .map(key => key + pageInfo.startPage);

    const pageNumber = [];

    for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageNumber.push(i);
    }


    return (
        <ul className="EmployeesPaging-ul">
            <li>
                <button
                    className="EmployeesPaging-btn"
                    onClick={ () => setCurrentPage(pageInfo.currentPage - 1) }
                    disabled={ pageInfo.currentPage <= 1 }
                >
                    &lt;
                </button>
            </li>
            {
                pageNumber.map(num => (
                    <li key={num}>
                        <button
                            className="EmployeesPaging-btn"
                            style={ pageInfo.currentPage === num ? { color : 'orange'} : null }
                            onClick={ () => setCurrentPage(num) }
                            disabled={ pageInfo.currentPage === num }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
            <li>
                <button
                    className="EmployeesPaging-btn"
                    onClick={ () => setCurrentPage(pageInfo.currentPage + 1) }
                    disabled={ pageInfo.currentPage >= pageInfo.maxPage }
                >
                    &gt;
                </button>
            </li>
        </ul>
    );
}
export default EmployeesPagingBar