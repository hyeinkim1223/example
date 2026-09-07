import './GridExample.css';
function GridExample() {
  return (
    <div className="layout">
      <header>
        <div className="logo">LOGO</div>
        <input className="searchBar"></input>
        <div className="cartIcon">cart</div>
      </header>
      <div class="itemSection">
        <div className="thumnail"></div>
        <div className="title">
          프리미엄 무선 노이즈 캔슬링 헤드폰 블랙 에디션 2세대 프리미엄 무선
          노이즈 캔슬링 헤드폰 블랙 에디션 2세대
        </div>
        <div className="delivery">무료배송</div>
        <div className="price">7,900원</div>
      </div>
    </div>
  );
}

export default GridExample;
