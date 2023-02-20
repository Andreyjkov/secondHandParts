import { useEffect } from "react";

import { Spinner } from "../components";
import { getAllDataFirebase } from "../services";

import { useAppDispatch, useAppSelector } from "../store";
import { setBase } from "../store/sliceBase";

function BasePage() {
  const dispatch = useAppDispatch();
  const { base } = useAppSelector((state) => state.base);

  useEffect(() => {
    const dataBase = async () => {
      const data = await getAllDataFirebase();
      dispatch(setBase(data));
    };
    dataBase();
  }, [dispatch]);

  console.log(base);
  if (!base) return <Spinner />;
  return (
    <div className="container">
      <h2>Запчасти</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Бренд</th>
            <th scope="col">Модель</th>
            <th scope="col">Запчасть</th>
            <th scope="col">Описание</th>
          </tr>
        </thead>
        <tbody>
          {base.map((el, i) => {
            return (
              <tr className="" key={el.docId}>
                <td className="">{el.brand}</td>
                <td className="">{el.model}</td>
                <td className="">{el.parts}</td>
                <td className="">{el.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BasePage;
