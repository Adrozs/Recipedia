import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
// import { HomePage } from './pages/HomePage';
// import { Login } from './pages/Login';
import { Recipie } from './pages/Recipie';
import { RecipieCollections } from './pages/RecipieCollections';
import { RecipiesList } from './pages/RecipiesList';
// import { Shoppinglist } from './pages/Shoppinglist';
// import { ShoppinglistsList } from './pages/ShoppinglistsList';

// UI
import { Layout } from './pages/Layout';


function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Recipie />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/recipie" element={<Recipie />} />
            <Route path="/collections" element={<RecipieCollections />} />
            <Route path="/collections/:collectionId" element={<RecipiesList />} />
            {/*<Route path="/shoppinglists/list" element={<Shoppinglist />} />
            <Route path="/shoppinglists" element={<ShoppinglistsList />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  )


}

export default App;