const styleBlock = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '15px'
}

function PizzaError({ NotFound }) {
  return (
    <>
      <div style={styleBlock}>
        <h2>
          Произошла ошибка<span>😕</span>
        </h2>
        <p>Попробуйте перезагрузить страницу</p>
        <img src={NotFound} alt="Empty cart" width={500}/>
      </div>
    </>
  );
}

export default PizzaError;
