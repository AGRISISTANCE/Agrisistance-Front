import { Row, Col } from "antd";
// import { Slide } from "react-awesome-reveal"; // Commented out for now
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";

const Contact = ({ title, content, id }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate);

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof typeof errors];
    return <Span>{ErrorMessage}</Span>;
  };

  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          {/* <Slide direction="left" triggerOnce> */}
          <Block title={title} content={content} />
          {/* </Slide> */}
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          {/* <Slide direction="right" triggerOnce> */}
          <FormGroup autoComplete="off" onSubmit={handleSubmit}>
            <Row justify="space-between" align="middle">
              <Col span={12}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={values.name || ""}
                  onChange={handleChange}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  name="surname"
                  placeholder="Your Surname"
                  value={values.surname || ""}
                  onChange={handleChange}
                />
                <ValidationType type="name" />
              </Col>
            </Row>
            <Col span={24}>
              <Input
                type="text"
                name="email"
                placeholder="Your Email"
                value={values.email || ""}
                onChange={handleChange}
              />
              <ValidationType type="email" />
            </Col>
            <Col span={24}>
              <TextArea
                placeholder="Your Message"
                value={values.message || ""}
                name="message"
                onChange={handleChange}
              />
              <ValidationType type="message" />
            </Col>
            <ButtonContainer>
              <Button name="submit" color="#2C4026">Submit</Button>
            </ButtonContainer>
          </FormGroup>
          {/* </Slide> */}
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default Contact;
