import { useState } from "react";

import { Spinner } from "../components";
import InfoModal from "../components/Modal/ModalBaseInfo";
import TableBase from "../components/TableBase";
import { IBaseData } from "../interface";
import { useAppSelector } from "../store";

function BasePage() {
  const { base } = useAppSelector((state) => state.base);

  const [positionInfo, setPositionInfo] = useState<IBaseData>();
  const [showModal, setShowModal] = useState(false);

  const handleDataInfo = (data: IBaseData) => {
    setPositionInfo(data);
    setShowModal(true);
  };

  if (!base) return <Spinner />;
  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="text-center">Запчасти</h2>
        <TableBase handleDataInfo={handleDataInfo} base={base} />
        {positionInfo && (
          <InfoModal
            props={positionInfo}
            isShowModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
}

export default BasePage;
