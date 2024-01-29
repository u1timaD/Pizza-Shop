import NotFoundBlock from "../components/NotFoundBlock";
import NotFoundImg from "../assets/img/NotFound.gif";


function NotFound() {
	return (
    <div className="content">
      <div className="container container--cart root">
        <div className="cart cart--empty">
          <NotFoundBlock NotFoundImg={NotFoundImg}/>
        </div>
      </div>
    </div>
  );
}

export default NotFound