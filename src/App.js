// Libraries
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Styles
import "./styles/components.css";
// Components
import NavBar from "./components/NavBar.jsx";
import Category from "./components/Category";
import Catalogue from "./components/Catalogue";
import Home from "./components/Home";

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Category" component={Catalogue} />
                <Route exact path="/Category/:CategoryId" component={Category} />
            </Switch>
        </BrowserRouter>
    );
}
