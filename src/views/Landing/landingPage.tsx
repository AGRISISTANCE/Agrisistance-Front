import React, { useState, useEffect, lazy } from 'react';
import { Button } from "../../components/Button";
import { SvgIcon } from "../../components/SvgIcon";
import { Fade } from 'react-awesome-reveal';
import { Col } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { persistor, RootState } from '../../redux/store';
import screen1 from './png/screen1.png';
import screen2 from './png/screen2.png';
import screen3 from './png/screen3.png';
import screen4 from './png/screen4.png';
import Preload from './Preloade';
import { Flex } from '@chakra-ui/react';
import {
    ContentSection,
    Content,
    ContentWrapper,
    StyledRow,
    ButtonWrapper,
} from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Contact = lazy(() => import("../../components/ContactForm"));
const Container = lazy(() => import("../../components/Container"));
const ScrollToTop = lazy(() => import("../../components/ScrollToTop"));

const LandingPage: React.FC = () => {
    const [isPreloadComplete, setIsPreloadComplete] = useState(false);
    const token = useSelector((state: RootState) => state.token.token);

    const handleAnimationComplete = () => {
        setIsPreloadComplete(true);
    };

    const makeGetRequests = async () => {
        try {
            const response1 = await fetch('http://127.0.0.1:8000/');
            if (!response1.ok) {
                throw new Error(`Failed to fetch from http://127.0.0.1:8000/. Status: ${response1.status}`);
            }
            const data1 = await response1.json();
            console.log('Response from http://127.0.0.1:8000:', data1);

            const response2 = await fetch('http://localhost:8081/');
            if (!response2.ok) {
                throw new Error(`Failed to fetch from http://localhost:8081/. Status: ${response2.status}`);
            }
            const data2 = await response2.json();
            console.log('Response from http://localhost:8081:', data2);
        } catch (error) {
            console.error('Error making GET requests:', error);
        }
    };

    useEffect(() => {
        makeGetRequests();
    }, []); // Empty dependency array ensures this runs only once after the initial render.

    //! DONT TOUCH! Added just to solve some problem
    // useEffect(() => {
    // // Purge persisted state on component mount
    // persistor.purge();
    // }, []);


    return(
            <>
                {!isPreloadComplete && <Preload onAnimationComplete={handleAnimationComplete} />}
                {isPreloadComplete && (
                    <div>
                        <Header />
                        <Flex height={'20vh'}></Flex>
                        <Container>
                            <ScrollToTop />
                            <ContentSection id="intro">
                                <Fade direction="right" triggerOnce={true}>
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
                                                <Content>Get the most out of your lands! We offre continuous help and assistance to boost your farming journey.</Content>
                                                <ButtonWrapper>
                                                    <NavLink to={token ? "/dashboard/home" : "/auth/login"}>
                                                        <Button>
                                                            &nbsp; &nbsp; &nbsp; &nbsp;  Get Started &nbsp; &nbsp;  &nbsp; &nbsp;
                                                        </Button>
                                                    </NavLink>
                                                    <Button color="#2C4026">Learn More</Button>
                                                </ButtonWrapper>
                                            </ContentWrapper>
                                        </Col>
                                    </StyledRow>
                                </Fade>
                            </ContentSection>
                            <Flex height={'10vh'} width={'100%'}></Flex>
                            <ContentSection id="what">
                                <Fade direction="left" triggerOnce={true} >
                                    <StyledRow
                                        justify="space-between"
                                        align="middle"
                                        direction="right"
                                        id="what"
                                    >
                                        <Col lg={12} md={12} sm={12} xs={24}>
                                            <img src={screen1} alt='screen1' style={{ filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5))' }} />
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
                            <ContentSection id="easy">
                                <Fade direction="right" triggerOnce={true} >
                                    <StyledRow
                                        justify="space-between"
                                        align="middle"
                                        direction="left"
                                        id="easy"
                                    >
                                        <Col lg={11} md={11} sm={12} xs={24}>
                                            <img src={screen2} alt='screen2' style={{ filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5))' }} />
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
                            <ContentSection id="firstkind">
                                <Fade direction="left" triggerOnce={true} >
                                    <StyledRow
                                        justify="space-between"
                                        align="middle"
                                        direction="right "
                                        id="firstkind"
                                    >
                                        <Col lg={11} md={11} sm={12} xs={24}>
                                            <img src={screen3} alt='screen3' style={{ filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5))' }} />
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
                            <ContentSection id="track">
                                <Fade direction="right" triggerOnce={true}>
                                    <StyledRow
                                        justify="space-between"
                                        align="middle"
                                        direction="left"
                                        id="track"
                                    >
                                        <Col lg={11} md={11} sm={12} xs={24}>
                                            <img src={screen4} alt='screen4' style={{ filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5))' }} />                                </Col>
                                        <Col lg={11} md={11} sm={11} xs={24}>
                                            <ContentWrapper>
                                                <h6>Track your <span className="green">Progress!</span></h6>
                                                <Content>Agrisitance is the best tool for you to track and predict the growth of your crops! with a built in <span className="green">Calender</span> and diai A few clicks and you have the plan ready for you to follow through and build your <span className="green">SUCCESS!</span></Content>
                                            </ContentWrapper>
                                        </Col>
                                    </StyledRow>
                                </Fade>
                            </ContentSection>
                            <Contact id="contact" title="Contact Form" content="Agrisitance is here to answer your inquiries, fill out the form and let us know your thoughts!" />
                        </Container>
                        <Footer />
                    </div>
                )}
            </>
        );
    }
export default LandingPage;
