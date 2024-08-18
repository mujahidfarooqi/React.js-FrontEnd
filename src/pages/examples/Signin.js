import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory  } from 'react-router-dom';
import AuthService from '../../AuthService';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import DismissableAlerts from '../components/Alerts'; // Import the custom alert component
import { useTranslation } from 'react-i18next';

export default () => {
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory ();
  const { t } = useTranslation();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(signInData.email, signInData.password);
      console.log('Login successful, token stored in local storage');
      const token = AuthService.getToken();
    if (token !== 'undefined' && token !== null) {
      history.push(Routes.EmployeeList.path);
    }
    else{
      history.push(Routes.Signin.path);
      setShowAlert(true);
    }
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials and try again.');
      
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                        name="email"
                        value={signInData.email}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={signInData.password}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check type="checkbox">
                      <FormCheck.Input id="defaultCheck5" className="me-2" />
                      <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                    </Form.Check>
                    <Card.Link className="small text-end">Lost password?</Card.Link>
                  </div>
                  {showAlert && 
                    <DismissableAlerts 
                      variant="danger" 
                      message="Wrong Credentials Invalid username or password" 
                      show={showAlert} 
                      onClose={() => setShowAlert(false)} 
                    />
                  }
                  <Button variant="primary" type="submit" className="w-100">
                  {t('signin')}
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
