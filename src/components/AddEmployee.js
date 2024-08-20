import React, { useState, useRef } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import AuthService from '../AuthService'; // Ensure the correct path to AuthService
import DismissableAlerts from '../pages/components/Alerts'; // Import the custom alert component
import { useTranslation } from 'react-i18next';

export const GeneralInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    phone: "",
    position: "",
    joiningDate: "",
    address: "",
    addressNumber: "",
    city: "",
    state: "0",
    zip: ""
  });
  const { t } = useTranslation();
  const [alert, setAlert] = useState({
    show: false,
    variant: 'success',
    message: ''
  });

  const birthdayRef = useRef(null);
  const joiningDateRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date, name, ref) => {
    setFormData({
      ...formData,
      [name]: date ? moment(date).format("YYYY-MM-DD") : ""
    });
    if (ref.current) {
      ref.current.setState({ open: false }); // Close the calendar popup
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.makeAuthorizedRequest('POST', 'http://localhost:15713/api/employees/add', formData);
      setAlert({
        show: true,
        variant: 'success',
        message: 'Employee added successfully!'
      });
      setFormData({
        firstName: "",
        lastName: "",
        birthday: "",
        gender: "",
        email: "",
        phone: "",
        position: "",
        joiningDate: "",
        address: "",
        addressNumber: "",
        city: "",
        state: "0",
        zip: ""
      });
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        variant: 'danger',
        message: 'Failed to add employee.'
      });
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
            <h5 className="mb-4">{t('generalInformation')}</h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="firstName"
                  placeholder="Enter Employee first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  placeholder="Also Employee last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  ref={birthdayRef}
                  onChange={(date) => handleDateChange(date, 'birthday', birthdayRef)}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={formData.birthday ? moment(formData.birthday).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Gender</option>
                  <option value="f">Female</option>
                  <option value="m">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="phone"
                  placeholder="+92 0000000000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="position">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="position"
                  placeholder="Employee Position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="joiningDate">
                <Form.Label>Joining Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  ref={joiningDateRef}
                  onChange={(date) => handleDateChange(date, 'joiningDate', joiningDateRef)}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={formData.joiningDate ? moment(formData.joiningDate).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="address"
                  placeholder="Enter your home address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="addressNumber"
                  placeholder="No."
                  value={formData.addressNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="0">State</option>
                  <option value="puj">Punjab</option>
                  <option value="sin">Sindh</option>
                  <option value="bal">Balochistan</option>
                  <option value="kpk">Khyber Pakhtunkhwa</option>
                  {/* Add other states here */}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="zip"
                  placeholder="ZIP"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3 mb-3">
            <Button variant="primary" type="submit">Save All</Button>
          </div>
        </Form>
        <DismissableAlerts
          variant={alert.variant}
          message={alert.message}
          show={alert.show}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      </Card.Body>
    </Card>
  );
};
