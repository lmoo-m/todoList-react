import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import UpdateTask from "./components/UpdateTask";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/updateTask/:id" element={<UpdateTask />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
