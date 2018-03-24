import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';

const Alert = ({ title, message, onPositiveSelect, onNegativeSelect, onClose }) => (
  <Modal size="small" open={true} onClose={onClose}>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      <p>{message}</p>
    </Modal.Content>
    <Modal.Actions>
      { onNegativeSelect && <Button onClick={onNegativeSelect} negative>No</Button> }
      { onPositiveSelect && <Button onClick={onPositiveSelect} positive>Ok</Button>}
    </Modal.Actions>
  </Modal>
);

export default Alert;
