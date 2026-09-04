import './App.css';

function App() {
    return (
        <>
            <div className="container">
                <h1>Flex 3대 속성 실시간 테스트</h1>
                <p className="guide">
                    style.css에서 .box-1, .box-2, .box-3의 flex 수치를 직접 바꾸면서 확인하세요.
                </p>

                {/* 부모 컨테이너 너비 제어용 래퍼 */}
                <div className="parent-wrapper">
                    <div className="flex-container">
                        <div className="box box-1">
                            <span className="title">박스 1</span>
                            <span className="css-text">.box-1</span>
                        </div>

                        <div className="box box-2">
                            <span className="title">박스 2</span>
                            <span className="css-text">.box-2</span>
                        </div>

                        <div className="box box-3">
                            <span className="title">박스 3</span>
                            <span className="css-text">.box-3</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
