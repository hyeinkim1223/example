import './GridExample.css';
function GridExample() {
  return (
    <div className="layout">
      <header>
        <div className='headerBar'>
          <div className="logo">MyShop</div>
          <input className="searchBar" placeholder='상품 검색'></input>
          <div className="cartIcon">카트</div>
        </div>
      </header>
      <div class="itemSection">
        <div className="thumnail"></div>
        <div className="title">
          프리미엄 무선 노이즈 캔슬링 헤드폰 블랙 에디션 2세대 프리미엄 무선
          노이즈 캔슬링 헤드폰 블랙 에디션 2세대
        </div>
        <div className="delivery">무료배송 / 내일도착</div>
        <div className="price">7,900원</div>
      </div>
    </div>
  );
}

export default GridExample;
