import React from "react";
import { Modal, Text, Row } from "@nextui-org/react";

const ModalInfo = ({ visible, setVisible, children, title }) => {
  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text b size={18}>
            {title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row justify="space-between">{children}</Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalInfo;
