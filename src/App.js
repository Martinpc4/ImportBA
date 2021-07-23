// ! Import
// * Libraries
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// * Styles
// Components
import './styles/css/components.css';
// Bootstrap (Modified)
import './styles/css/bootstrap-modified.css';
// * Components
import NavBar from './components/NavBar';
import Category from './components/Category';
import Home from './components/Home';
import Footer from './components/Footer';
import ItemDetail from './components/ItemDetail';

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path='/Home' component={Home} />
                <Route exact path='/Shop/:CategoryId' component={Category} />
                <Route exact path='/Shop/:CategoryId/:ItemId' component={ItemDetail} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}
