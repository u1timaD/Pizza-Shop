import { Link } from "react-router-dom";
import styles from './NotFoundBLock.module.scss'


function NotFoundBlock({NotFoundImg}) {
  return (
    <>
      <h2>
        Страница не найдена<span>😕</span>
      </h2>
      <p>Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
      <img src={NotFoundImg} alt="Empty cart" />
      <Link to="/Pizza-Shop" className={`button button--black ${styles.buttonGreen}`}>
        <span>Вернуться назад</span>
      </Link>
    </>
  );
}

export default NotFoundBlock;
