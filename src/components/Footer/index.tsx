import { Row, Col } from "antd";
import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";
import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  Chat,
  Empty,
  FooterContainer,
  Language,
  // Label,
} from "./styles";

interface SocialLinkProps {
  href: string;
  src: string;
}

const Footer = () => {

  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Language>Contact</Language>
              <Large to="/">Tell us everything</Large>
              <Para>
                Do you have any question? Feel free to reach out.
              </Para>
              <a href="mailto:l.qqbadze@gmail.com">
                <Chat>Let's Chat</Chat>
              </a>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>Policy</Title>
              <Large to="/">Application Security</Large>
              <Large to="/">Software Principles</Large>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Empty />
              <Large to="/">Support Center</Large>
              <Large to="/">Customer Support</Large>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Empty />
              <Language>Address</Language>
              <Para>Rancho Santa Margarita</Para>
              <Para>Djelfa city</Para>
              <Para>Algeria</Para>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>Company</Title>
              <Large to="/">About</Large>
              <Large to="/">Blog</Large>
              <Large to="/">Press</Large>
              <Large to="/">Careers & Culture</Large>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Title>Company</Title>
              <Large to="/">About</Large>
              <Large to="/">Blog</Large>
              <Large to="/">Press</Large>
              <Large to="/">Careers & Culture</Large>
            </Col>
          </Row>
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: "3rem" }}
          >
            <NavLink to="/">
              <LogoContainer>
                <SvgIcon
                  src="logo.svg"
                  aria-label="homepage"
                  width="101px"
                  height="64px"
                />
              </LogoContainer>
            </NavLink>
            <FooterContainer>
              <SocialLink
                href="https://github.com/Adrinlol/create-react-app-adrinlol"
                src="github.svg"
              />
              <SocialLink
                href="https://twitter.com/Adrinlolx"
                src="twitter.svg"
              />
              <SocialLink
                href="https://www.linkedin.com/in/lasha-kakabadze/"
                src="linkedin.svg"
              />
              <SocialLink
                href="https://medium.com/@lashakakabadze/"
                src="medium.svg"
              />
            </FooterContainer>
          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default Footer;
