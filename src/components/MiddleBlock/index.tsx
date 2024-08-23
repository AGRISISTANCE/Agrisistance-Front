import React from 'react';

import { Row, Col } from "antd";
// import { Slide } from "react-awesome-reveal"; // Commented out for now
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";

interface MiddleBlockProps {
  title: string;
  content: string;
  button?: string; // Made optional in case it's not always provided
}

const MiddleBlock = ({ title, content, button }: MiddleBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <MiddleBlockSection>
      {/* <Slide direction="up" triggerOnce> */}
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{title}</h6>
              <Content>{content}</Content>
              {button && (
                <Button name="submit" onClick={() => scrollTo("mission")}>
                  {button}
                </Button>
              )}
            </Col>
          </ContentWrapper>
        </Row>
      {/* </Slide> */}
    </MiddleBlockSection>
  );
};

export default MiddleBlock;
