import React, { useState } from 'react';
import { Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  const handleClose = () => setShow(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    handleClose(); // Close the dropdown after selecting a language
  };

  return (
    <Dropdown as={ButtonGroup} className="me-2 mb-2" show={show} onToggle={handleToggle}>
      <Button variant="primary" onClick={handleToggle}>
        <FontAwesomeIcon icon={faGlobe} className="me-2" />
        {i18n.language.toUpperCase()}
      </Button>

      <Dropdown.Toggle split variant="primary">
        <FontAwesomeIcon icon={faGlobe} className="dropdown-arrow" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLanguageChange('en')}>English</Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange('fr')}>Français</Dropdown.Item>
        {/* Add more languages as needed */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
