import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IBaseData } from "../services/dataBase/getAllDataFirebase";

interface Props {
  props: IBaseData;
  isShowModal: boolean;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
}

function ModalBaseInfo({ props, isShowModal, setShowModal }: Props) {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal show={isShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Подробная информация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Бренд: {props.brand}</p>
          <p>Модель: {props.model}</p>
          <p>Запчасть: {props.parts}</p>
          <p>Описание: {props.description}</p>
          <h4>Владелец</h4>
          <p>Имя: {props.name}</p>
          <p>Телефон: {props.phone}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBaseInfo;
