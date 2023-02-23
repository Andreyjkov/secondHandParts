import { useEffect, useState } from "react";
import ModalUpdate from "../components/Modal/ModalUpdate";
import ProfileUser from "../components/Profile/ProfileUser";
import TableBase from "../components/TableBase";
import { IBaseData } from "../services/dataBase/getAllDataFirebase";
import { useAppSelector } from "../store";

function ProfilePage() {
  const { base } = useAppSelector((state) => state.base);
  const { email } = useAppSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState<IBaseData>();
  const [ownBase, setOwnBase] = useState<IBaseData[]>();

  useEffect(() => {
    const ownData = base.filter((item) => item.userOwn === email);
    setOwnBase(ownData);
  }, [base, email]);

  const handleDataInfo = (data: IBaseData) => {
    setProduct(data);
    setShowModal(true);
  };

  return (
    <div className="container">
      <ProfileUser />

      <div className="card mt-5 pb-2">
        <h2 className="text-center">Изменить позиции</h2>
        {ownBase && (
          <TableBase base={ownBase} handleDataInfo={handleDataInfo} />
        )}
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
