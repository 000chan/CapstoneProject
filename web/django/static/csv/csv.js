import React, { useState } from "react";

function App() {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>REACTJS CSV IMPORT EXAMPLE </h1>
            <form>
                <input type={"file"} accept={".csv"} />
                <button>IMPORT CSV</button>
            </form>
        </div>
    );
}

