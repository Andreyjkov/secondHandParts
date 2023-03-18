import { useState } from "react";

import { Spinner } from "../components";
import InfoModal from "../components/Modal/ModalBaseInfo";
import { Search } from "../components";
import TableBase from "../components/TableBase";
import { IBaseData } from "../interface";
import { useAppSelector } from "../store";

function BasePage() {
  const { base } = useAppSelector((state) => state.base);

  const [positionInfo, setPositionInfo] = useState<IBaseData>();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleDataInfo = (data: IBaseData) => {
    setPositionInfo(data);
    setShowModal(true);
  };

  const filteredBase = base.filter((item) => {
    return (
      item.brand.toLowerCase().includes(searchText.toLowerCase()) ||
      item.model.toLowerCase().includes(searchText.toLowerCase()) ||
      item.parts.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  if (!base) return <Spinner />;
  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="text-center">Запчасти</h2>
        <Search searchText={searchText} setSearchText={setSearchText} />
        {filteredBase.length === 0 ? (
          <span className="">Совпадений не найдено</span>
        ) : (
          <TableBase handleDataInfo={handleDataInfo} base={filteredBase} />
        )}
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
