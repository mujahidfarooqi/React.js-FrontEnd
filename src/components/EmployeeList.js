import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Form, Card, Button, Table, Dropdown, InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import AuthService from '../../src/AuthService';
import {CounterWidget} from '../components/Widgets';
import { t } from 'i18next';

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const EmployeeList = () => {
  const TableRow = (props) => {
    const { id, name, position, phone, join_date } = props;
    return (
      <tr>
        <td>
          <span className="fw-normal">
            {id}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {name}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {position}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {phone}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {join_date}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDelete(id, name)} className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [editEmployeeData, setEditEmployeeData] = useState({ id: null, name: '', position: '' });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, employees]);

  useEffect(() => {
    // Reset page number when search query or employees change
    setCurrentPage(1);
  }, [searchQuery, employees]);

  const fetchEmployees = async () => {
    try {
      const response = await AuthService.makeAuthorizedRequest('POST', 'http://localhost:15713/api/employees/get');
      setEmployees(response.data.Data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      let delEmployee = { id, name };
      await AuthService.makeAuthorizedRequest('POST', `http://localhost:15713/api/employees/delete`, delEmployee);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEmployeeData({ ...editEmployeeData, [name]: value });
  };

  const handleEdit = (employee) => {
    setEditEmployeeId(employee.id);
    setEditEmployeeData({ id: employee.id, name: employee.name, position: employee.position });
  };

  const handleUpdate = async (id) => {
    try {
      await AuthService.makeAuthorizedRequest('POST', `http://localhost:15713/api/employees/edit`, editEmployeeData);
      setEmployees(employees.map(employee => (employee.id === id ? editEmployeeData : employee)));
      setEditEmployeeId(null);
      setEditEmployeeData({ name: '', position: '' });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleAdd = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Paginate the filtered employees
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <>
    <CounterWidget employee={employees} />
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Header>
          <Row className="align-items-center">
            <Col>
              <h5>{t('employeeList')}</h5>
            </Col>
            <Col>
              <Form className="navbar-search">
                <Form.Group id="topbarSearch">
                  <InputGroup className="input-group-merge search-bar">
                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search by name"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">EmployeeId</th>
                <th className="border-bottom">Name</th>
                <th className="border-bottom">Position</th>
                <th className="border-bottom">Phone</th>
                <th className="border-bottom">Join Date</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map(employee => <TableRow key={`${employee.id}`} {...employee} />)}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>
                {[...Array(totalPages).keys()].map(number => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{Math.min(filteredEmployees.length, itemsPerPage * currentPage)}</b> out of <b>{filteredEmployees.length}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};
