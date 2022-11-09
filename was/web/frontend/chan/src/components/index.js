import React from "react";
import AppRedux from "./AppRedux";
import AppRouter from "./AppRouter";
// 공통 컴포넌트

const App = () => {
    return (
        <AppRedux>
            <AppRouter/>
        </AppRedux>
    );
};

export default App;
