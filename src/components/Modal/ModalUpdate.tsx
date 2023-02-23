import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { ToastContainer } from "react-toastify";
import { db } from "../../firebase";
import { IFormData } from "../../pages/AddPosition";
import { deleteDocFirebase, updateDocFirebase } from "../../services";
import { IBaseData } from "../../services/dataBase/getAllDataFirebase";

import { useAppDispatch } from "../../store";
import { deleteDocStore, updataDocStore } from "../../store/sliceBase";
import UpdateForm from "../Form/UpdateForm";

interface Props {
  props: IBaseData;
  isShowModal: boolean;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
}

function ModalUpdate({ props, isShowModal, setShowModal }: Props) {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const docId = doc(db, "base", props.docId);
    const unsub = onSnapshot(docId, (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";

      if (source === "Local") {
        const payload = { ...doc.data(), docId: doc.id } as IBaseData;
        dispatch(updataDocStore(payload));
      }
    });

    return unsub;
  }, [dispatch, props.docId]);

  const onSubmit = (formData: IFormData) => {
    updateDocFirebase(props.docId, formData);
    handleClose();
  };

  const handleDelete = () => {
    deleteDocFirebase(props.docId);
    dispatch(deleteDocStore(props.docId));
    handleClose();
  };

  return (
    <>
      <Modal show={isShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать позицию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateForm
            onSubmit={onSubmit}
            data={props}
            onDelete={handleDelete}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default ModalUpdate;
