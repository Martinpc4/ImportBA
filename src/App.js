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
import Shop from './components/Shop';
import Home from './components/Home';
import Footer from './components/Footer';
import ItemDetail from './components/ItemDetail';
// * Contexts
import CartProvider from './components/contexts/CustomCartProvider';

export default function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <NavBar />
                <main>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/Shop/:CategoryId' component={Shop} />
                        <Route exact path='/Shop/:CategoryId/:ItemId' component={ItemDetail} />
                    </Switch>
                </main>
                <Footer />
            </CartProvider>
        </BrowserRouter>
    );
}
