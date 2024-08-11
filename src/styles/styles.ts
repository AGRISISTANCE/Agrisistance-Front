import { createGlobalStyle } from "styled-components";
export const Styles = createGlobalStyle`

    body,
    html,
    a {
        font-family: "Jost", sans-serif;
    }


    body {
        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: #F4F6FA;
        overflow-x: hidden;
    }

    a:hover {
        color: #18216d;
    }

    input,
    textarea {
        border-radius: 50px;
        border: 1px solid #2ACC32;
        background: #FFFFFF;
        transition: all 0.3s ease-in-out;  
        outline: none;
        width: 100%;  
        padding: 1rem 1.25rem;
        ::placeholder{
            // color: #000;
            font-size: 20px;        
            line-height: 1.41;
        }
        :focus-within {
            background: none;
            box-shadow: #2e186a 0px 0px 0px 1px;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: "Jost", sans-serif;
        color: #000;
        font-size: 35px;
        line-height: 1.18;
        font-weight:600;
        @media only screen and (max-width: 890px) {
          font-size: 30px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 25px;
        }
    }
    h4{
        font-size:40px;
    }
    p,
    label {
        color: #000;
        font-size: 20px;        
        line-height: 1.41;
    }

    a {
        text-decoration: none;
        outline: none;
        color: #000;

        :hover {
            color: #2ACC32;
        }
    }
    
    *:focus {
        outline: none;
    }

    .about-block-image svg {
        text-align: center;
    }

    .ant-drawer-body {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-top: 1.5rem;
    }

    .ant-drawer-content-wrapper {
        width: 300px !important;
    }
    .green{
        color:#2ACC32;
        font-weight: bold;
    }
    p .green{
        font-size: 30px;
    }
    h4{
        font-size: 40px;
    }
.africa {
        width: 100%;
        height: 100px;
        background: url('../../../public/img/icons/bg.png') no-repeat center center fixed;
        background-size: cover;
        background-color: #fff;
    }
`;
