import {authRequest, request} from "./Api";
import {

    getJournal,
    getJournals
} from "../modules/JournalsModule";


export const callGetJournalListAPI = ({currentPage = 1}) => { // 전체 조회

    return async (dispatch, getState) => {

        console.log("::: 요청 시작 > callGetJournalListAPI :::");

        const result = await request('GET', `/api/v1/journals?page=${currentPage}`);

        // 인증이 필요한 요청으로, await request 대신 await authRequest.get 사용
        // const result = await authRequest.get(`/api/v1/journals?page=${currentPage}`)

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callGetJournalListAPI :::");
        } else {
            console.log("::: 요청 성공 > callGetJournalListAPI :::");
            console.log('callGetJournalListAPI result : ', result);
            dispatch(getJournals(result));
        }
    }
};

export const callJournalManySearchListAPI = ({ categoryCode, employeeCode, observation,  currentPage = 1 }) => { // 다중 검색

    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/journals/search?employeeCode=${employeeCode}&categoryCode=${categoryCode}&observation=${observation}&page=${currentPage}`);

        console.log('callJournalManyListAPI result 검색 : ', result);

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callJournalManyListAPI :::");
        } else {
            console.log("::: 요청 성공 > callJournalManyListAPI :::");
            console.log('callJournalManyListAPI result : ', result);
            dispatch(getJournals(result));
        }

    }
};

// 직원 이름과 카테고리 이름 조회 액션 생성자 함수
// export const getSelectOptionsAPI = () => {
//     return async (dispatch, getState) => {
//         try {
//             // 직원 이름 조회
//             const employeeNamesResult = await request(
//                 'GET',
//                 `/api/v1/journals/employeeName`
//             );
//             dispatch(getEmployeeName(employeeNamesResult));
//
//             // 카테고리 이름 조회
//             const categoryNamesResult = await request(
//                 'GET',
//                 `/api/v1/journals/categoryName`
//             );
//             dispatch(getCategoryName(categoryNamesResult));
//         } catch (error) {
//             console.error("::: 선택 옵션 조회 실패 ::: ", error);
//         }
//     };
// };

// // 셀렉트 바 (직원 이름)
// export const callGetEmployeeNamesAPI = () => {
//     return async (dispatch, getState) => {
//         try {
//             const result = await request('GET', `/api/v1/journals/employeeName`);
//             console.log('callGetEmployeeNamesAPI result 검색 : ', result);
//
//             if (result?.status !== 200) {
//                 console.log("::: 요청 실패 > callGetEmployeeNamesAPI :::");
//             } else {
//                 console.log("::: 요청 성공 > callGetEmployeeNamesAPI :::");
//                 console.log('callGetEmployeeNamesAPI result : ', result);
//                 // 여기서 필요하다면 result를 활용하여 추가적인 처리 수행 가능
//             }
//         } catch (error) {
//             console.error("::: 요청 실패 > callGetEmployeeNamesAPI ::: ", error);
//         }
//     };
// };
//
// // 셀렉트 바 (카테고리 이름) 조회 액션 생성자 함수
// export const callGetCategoryNamesAPI = () => {
//     return async (dispatch, getState) => {
//         try {
//             const result = await request('GET', `/api/v1/journals/categoryName`);
//             console.log('callGetCategoryNamesAPI result 검색 : ', result);
//
//             if (result?.status !== 200) {
//                 console.log("::: 요청 실패 > callGetCategoryNamesAPI :::");
//             } else {
//                 console.log("::: 요청 성공 > callGetCategoryNamesAPI :::");
//                 console.log('callGetCategoryNamesAPI result : ', result);
//                 // 여기서 필요하다면 result를 활용하여 추가적인 처리 수행 가능
//             }
//         } catch (error) {
//             console.error("::: 요청 실패 > callGetCategoryNamesAPI ::: ", error);
//         }
//     };
// };



export const callJournalDetailAPI = ({ journalCode }) => { // 상세 (관리자는 등록 버튼 보이게)

    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/journals/${journalCode}`); //url
        console.log('callJournalDetailAPI result : ', result);

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callJournalDetailAPI :::");
        } else {
            console.log("::: 요청 성공 > callJournalDetailAPI :::");
            console.log('callJournalDetailAPI result : ', result); //데이터 잘 나옴
            dispatch(getJournal(result));
        }

    }
};