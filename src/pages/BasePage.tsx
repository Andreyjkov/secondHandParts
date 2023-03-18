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
  const [SearchText, setSearchText] = useState("");

  const handleDataInfo = (data: IBaseData) => {
    setPositionInfo(data);
    setShowModal(true);
  };

  const filteredBase = base.filter((item) => {
    return (
      item.brand.toLowerCase().includes(SearchText.toLowerCase()) ||
      item.model.toLowerCase().includes(SearchText.toLowerCase()) ||
      item.parts.toLowerCase().includes(SearchText.toLowerCase()) ||
      item.description.toLowerCase().includes(SearchText.toLowerCase())
    );
  });

  if (!base) return <Spinner />;
  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="text-center">Запчасти</h2>
        <Search filterText={SearchText} onFilterTextChange={setSearchText} />
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
