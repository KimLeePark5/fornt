import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    
    
    a {
      text-decoration: none; /* 링크의 밑줄 제거 */
      color: inherit; /* 링크의 기본 색상 사용 */
    }
    
    html{
      font-family: 'Noto Sans KR', sans-serif;
      color: #1A1A1C;
      background-color: #F7F8F8;
    }

    body{
      margin: 0;
    }


    hr {
      margin: 0;
    }

    .pageTitle-div {
      font-size: 40px;
      font-weight: bolder;
    }
`;

export default GlobalStyles;