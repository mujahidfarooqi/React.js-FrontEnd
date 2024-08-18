import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '@themesberg/react-bootstrap';

export default function DismissableAlerts({ variant, message, show, onClose }) {
  return (
    <Alert variant={variant} show={show} onClose={onClose} dismissible>
      <div className="d-flex flex-column">
        <div className="alert-message">
          {message}
        </div>
      </div>
    </Alert>
  );
}
