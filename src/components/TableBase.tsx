import { Table } from "react-bootstrap";
import { IBaseData } from "../services/dataBase/getAllDataFirebase";

interface ITableBase {
  base: IBaseData[];
  handleDataInfo: (data: IBaseData) => void;
}

function TableBase(props: ITableBase) {
  return (
    <Table responsive className="table-striped">
      <thead>
        <tr>
          <th>Бренд</th>
          <th>Модель</th>
          <th>Запчасть</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        {props.base.map((el) => {
          return (
            <tr
              className="cursor-pointer"
              key={el.docId}
              onClick={() => props.handleDataInfo(el)}
            >
              <td>{el.brand}</td>
              <td>{el.model}</td>
              <td>{el.parts}</td>
              <td>{el.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TableBase;
