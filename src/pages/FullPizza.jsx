import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function FullPizza() {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          `https://656ee0506529ec1c6236d4b2.mockapi.io/items/${id}`
        );
        return setData(data);
      } catch (error) {
        alert(`Ошбика при получении пиццы: ${error}`)
      }
    }

    getPizza();
  }, []);

  console.log(data);

  // +Условный рендер
  if (!data) {
    return (
      <>
        <h1>ЗАГРУЗКА ПИЦЦЫ...</h1>
      </>
    );
  }
  return (
    <>
      <div>
        <h2>{data.title}</h2>
        <img src={data.imageUrl}></img>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus quasi
          laudantium dolore ab non ad provident exercitationem, asperiores enim
          ullam? Quidem expedita commodi totam sed ad vero suscipit delectus
          nihil?
        </p>
      </div>
    </>
  );
}

export default FullPizza;


// +Заметка: Когда нажимаем на картинку пиццы, ссылка зашитая в Link прописвается в пути url, далее роутер через данимический считывальщик по id (/pizza/:id) читает этот самый id из нашего url. Далее в самом компоненте, которй собираемся отрендерить, мы читаем  id через хук useParams. Далее делаем запрос на сервак этим id и уже теперь забираем данные нужной нам пиццы, а именно находим по id. Теперь рендерим всё основываясь на данных с бд и бац, всё заработало. Ах, да, не забываем добавить условный рендеринг, чтобы до момента, когда данные подгрузятся у нас была плашка по типу "Загружается ..."