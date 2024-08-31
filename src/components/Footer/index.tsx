import React from "react";
import { NavLink } from "react-router-dom";

import {
  FooterContainer,
  Title,
  HighlightedText,
  Paragraph,
  Spatexts,
  ContactInfo,
  ContactItem,
  ContactIcon,
  BottomSection,
  Buttoncontainer,
  ButtonsText,
  LeftSide,
  RightSide,
  Button,
  Buttons,
  FooterNote,
} from "./styles";
import phone from "../icons/phone.png";
import gmail from "../icons/gmail.png";
import whatsapp from "../icons/whatsapp.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const handleScrollUp = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const token = useSelector((state: RootState) => state.token.token);

  return (
    <FooterContainer>
      <Title>
        Efficient, Reliable <HighlightedText>and</HighlightedText> Free!
      </Title>
      <Paragraph>
        We thank you for choosing AGRISTANCE and hope to see you achieve your
        goals and turn speculations into reality!
      </Paragraph>

      <BottomSection>
        <LeftSide>
          <ContactInfo>
            <ContactItem>
              <ContactIcon src={phone} alt="Phone Icon" />
              <Spatexts>+213 555 05 04 96</Spatexts>
            </ContactItem>
            <ContactItem>
              <ContactIcon src={whatsapp} alt="WhatsApp Icon" />
              <Spatexts>wa.link/vq0cnj</Spatexts>
            </ContactItem>
            <ContactItem>
              <ContactIcon src={gmail} alt="Email Icon" />
              <Spatexts>a2sv.agrisistance@gmail.com</Spatexts>
            </ContactItem>
          </ContactInfo>
        </LeftSide>
        <RightSide>
          <Buttoncontainer>
            <ButtonsText>For a Greener Africa, a Better Africa...</ButtonsText>
            <Buttons>
              <NavLink to={token ? "/dashboard/home" : "/auth/login"}>
                <Button variant="green">Get Started</Button>
              </NavLink>
              <Button variant="dark" onClick={handleScrollUp}>
                Home
              </Button>

              <Button variant="dark">Contact Us</Button>
            </Buttons>
          </Buttoncontainer>
        </RightSide>
      </BottomSection>

      <FooterNote>
        ©2024 Agristance Organization. All rights Reserved
      </FooterNote>
    </FooterContainer>
  );
};

export default Footer;
