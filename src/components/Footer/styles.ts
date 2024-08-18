import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: rgba(224, 228, 229, 0.44);
  padding: 20px;
  text-align: center;
  border-radius: 100px 100px 0 0;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 1);
`;

export const Title = styled.h1`
  color: #343a40;
  margin-top: 60px;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const HighlightedText = styled.span`
  color: #2acc32;
`;

export const text = styled.h3`
  color: #2c4026;
  margin-bottom: 20px;
  margin-top: 30px;
  max-width: 60%;
  font-weight: bold;
  margin: 0 auto 20px;
`;
export const Paragraph = styled.p`
  color: #2acc32;
  margin-bottom: 20px;
  margin-top: 30px;
  max-width: 60%;
  font-weight: semibold;
  margin: 0 auto 20px;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 30px;
  padding-left: 70px;
`;

export const ContactItem = styled.div`
  background-color: #e0e4e5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 350px;
  height: 36px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
`;

export const ContactIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const LeftSide = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
`;

export const RightSide = styled.div`
  width: 66.67%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 300px;
  margin-top: 45px;
`;

export const Button = styled.a<{ variant: "green" | "dark" | "white" }>`
  text-decoration: none;
  width: 120px;
  height: 40px;
  padding: 10px 20px;
  border-radius: 100px;
  color: ${({ variant }) => (variant === "white" ? "#343a40" : "white")};
  font-weight: bold;
  margin: 0 20px;
  display: inline-block;
  background-color: ${({ variant }) =>
    variant === "green" ? "#4caf50" : variant === "dark" ? "#2C4026" : "#fff"};
  box-shadow: ${({ variant }) =>
    variant === "white"
      ? "-4px 0 8px rgba(0, 0, 0, 0.7)"
      : "-4px 0 8px rgba(0, 0, 0, 0.7)"};
`;

export const FooterNote = styled.small`
  color: #000000;
  display: block;
  margin-top: 20px;
  font-size: 18px;
`;

export const Buttoncontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;
`;

export const ButtonsText = styled.p`
  font-weight: bold;
  color: #343a40;
  margin-bottom: 15px;
  text-align: left;
  padding-left: 20px;
`;

export const Buttons = styled.div`
  margin-top: 5px;
`;

export const Spatexts = styled.span`
  padding-left: 70px;
`;
