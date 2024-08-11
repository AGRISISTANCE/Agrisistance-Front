import React from 'react';
import { Component } from "react";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";
import { lazy } from "react";
import { Fade, FadeProps } from 'react-awesome-reveal';
import { Col } from 'antd';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import {
    ContentSection,
    Content,
    ContentWrapper,
    StyledRow,
    ButtonWrapper,
} from "./styles";
import Header from "components/Header";
import Footer from "components/Footer";
import { redirect } from "react-router-dom";
interface CustomFadeProps extends FadeProps {
    children: ReactNode;
}
const Contact = lazy(() => import("../../components/ContactForm"));
// const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
// const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const handleClick = () => {
    const element = document.getElementById('what');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
class landingPage extends Component {
    
   
    render() {
        return (
            <>
                <Header />
                <Container>
                    <ScrollToTop />
                    <ContentSection>
                        <Fade direction="right" triggerOnce={true} {...(this.props as CustomFadeProps)}>
                            <StyledRow
                                justify="space-between"
                                align="middle"
                                direction="right"
                                id="intro"
                            >
                                <Col lg={11} md={11} sm={12} xs={24}>
                                    <SvgIcon src="tracteur.svg" width="100%" height="100%" />
                                </Col>
                                <Col lg={11} md={11} sm={11} xs={24}>
                                    <ContentWrapper>
                                        <h6>The future of agriculture is here!</h6>
                                        <h4>From <span className="green">UNCERTAINTY</span> to <span className="green">OPPORTUNITY</span></h4>
                                        <Content>Beautifully designed templates using React.js, ant design and styled-components! Save weeks of time and build your landing page in minutes.</Content>
                                        <ButtonWrapper>
                                        <NavLink to="/auth/login">
                                            <Button>
                                                Get Started
                                            </Button>
                                        </NavLink>
                                        <Button color="#2C4026">Learn More</Button>
                                        </ButtonWrapper>
                                    </ContentWrapper>
                                </Col>
                            </StyledRow>
                        </Fade>
                    </ContentSection>
                    <ContentSection>
                        <Fade direction="left" triggerOnce={true} {...(this.props as CustomFadeProps)}>
                            <StyledRow
                                justify="space-between"
                                align="middle"
                                direction="right"
                                id="what"
                            >
                                <Col lg={11} md={11} sm={12} xs={24}>
                                    <SvgIcon src="SecondContent.svg" width="100%" height="100%" />
                                </Col>
                                <Col lg={11} md={11} sm={11} xs={24}>
                                    <ContentWrapper>
                                        <h6>What is <span className="green">Agrisistance?</span></h6>
                                        <Content>Agrisitance is an <span className="green">AI powered</span> platform that is going to help you see through your land and make the maximum profit out of it no matter the resources you have!</Content><Content> It is a free tool for you to predict your revenue and get your adapted Business Plan and make your project a Calculated SUCCESS!</Content>
                                    </ContentWrapper>
                                </Col>
                            </StyledRow>
                        </Fade>
                    </ContentSection>
                    <ContentSection>
                        <Fade direction="right" triggerOnce={true} {...(this.props as CustomFadeProps)}>
                            <StyledRow
                                justify="space-between"
                                align="middle"
                                direction="left"
                                id="easy"
                            >
                                <Col lg={11} md={11} sm={12} xs={24}>
                                    <SvgIcon src="SecondContent.svg" width="100%" height="100%" />
                                </Col>
                                <Col lg={11} md={11} sm={11} xs={24}>
                                    <ContentWrapper>
                                        <h6>Easy To Use...</h6>
                                        <Content>Agrisitance is Designed for you TO NAVIGATE easily and have the best user experience! A few clicks and you have the plan ready for you to follow through and build your SUCCESS!</Content>
                                    </ContentWrapper>
                                </Col>
                            </StyledRow>
                        </Fade>
                    </ContentSection>
                    <ContentSection>
                        <Fade direction="left" triggerOnce={true} {...(this.props as CustomFadeProps)}>
                            <StyledRow
                                justify="space-between"
                                align="middle"
                                direction="right "
                                id="firstkind"
                            >
                                <Col lg={11} md={11} sm={12} xs={24}>
                                    <SvgIcon src="SecondContent.svg" width="100%" height="100%" />
                                </Col>
                                <Col lg={11} md={11} sm={11} xs={24}>
                                    <ContentWrapper>
                                        <h6>First of a kind in <span className="green">AFRICA!</span></h6>
                                        <Content>Agrisitance is an <span className="green">AI powered</span> platform that is going to help you see through your land and make profit out of it no matter the resources you have! With a Key feature that will help you generate the perfect <span className="green">Business Plan</span> to follow in order to guarantee a positive profit and let the land thrive with best revenue</Content>
                                    </ContentWrapper>
                                </Col>
                            </StyledRow>
                        </Fade>
                    </ContentSection>
                    <ContentSection>
                        <Fade direction="right" triggerOnce={true} {...(this.props as CustomFadeProps)}>
                            <StyledRow
                                justify="space-between"
                                align="middle"
                                direction="left"
                                id="track"
                            >
                                <Col lg={11} md={11} sm={12} xs={24}>
                                    <SvgIcon src="SecondContent.svg" width="100%" height="100%" />
                                </Col>
                                <Col lg={11} md={11} sm={11} xs={24}>
                                    <ContentWrapper>
                                        <h6>Track your <span className="green">Progress!</span></h6>
                                        <Content>Agrisitance is the best tool for you to track and predict the growth of your crops! with a built in <span className="green">Calender</span> and diai A few clicks and you have the plan ready for you to follow through and build your <span className="green">SUCCESS!</span></Content>
                                    </ContentWrapper>
                                </Col>
                            </StyledRow>
                        </Fade>
                    </ContentSection>
                    <Contact title="Contact Form" content="Agrisitance is here to answer your inquiries, fill out the form and let us know your thoughts!" id="contact" />
                </Container>
                <Footer />
            </>
        )
    }
}
export default landingPage



