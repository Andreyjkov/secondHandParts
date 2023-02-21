import { useState } from "react";
import ModalUpdate from "../components/Modal/ModalUpdate";
import ProfileUser from "../components/Profile/ProfileUser";
import TableBase from "../components/TableBase";
import { IBaseData } from "../services/dataBase/getAllDataFirebase";
import { useAppSelector } from "../store";

function ProfilePage() {
  const { base } = useAppSelector((state) => state.base);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState<IBaseData>();

  const ownData = () => {
    // TO DO отфильтровать данные принадлежат данному юзеру
  };

  const handleDataInfo = (data: IBaseData) => {
    setProduct(data);
    setShowModal(true);
  };

  return (
    <div className="container">
      <ProfileUser />

      <div className="card mt-5">
        <h2 className="text-center">Изменить позиции</h2>
        <TableBase base={base} handleDataInfo={handleDataInfo} />
      </div>

      {product && (
        <ModalUpdate
          props={product}
          isShowModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default ProfilePage;
