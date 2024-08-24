import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';

// Recipies
import { Recipie } from './pages/Recipie/Recipie';
import { RecipieNew } from './pages/Recipie/RecipieNew';
import { RecipieEdit } from './pages/Recipie/RecipieEdit';

// Collections
import { RecipieCollections } from './pages/Recipie/RecipieCollections';
import { RecipiesList } from './pages/Recipie/RecipiesList';
// import { RecipieNewCollection } from './pages/RecipieCollections/RecipieNewCollection';
// import { RecipieEditCollection } from './pages/RecipieCollections/RecipieEditCollection';

// Shoppinglists
import { Shoppinglist } from './pages/Shoppinglist/Shoppinglist';
import { AllShoppinglists } from './pages/Shoppinglist/AllShoppinglists';
// import { NewShoppinglist } from './pages/Sgoppinglist/NewShoppinglist';
import { ShoppinglistEdit } from './pages/Shoppinglist/ShoppinglistEdit';

// UI
import { Layout } from './pages/Layout';


function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/* User */}
            <Route path="/login" element={<Login />} />

            {/* Recipies */}
            <Route path="/recipie/:recipieId" element={<Recipie />} />
            <Route path="/recipie/new" element={<RecipieNew />} />
            <Route path="/recipie/:recipieId/edit" element={<RecipieEdit />} />

            {/* Collections */}
            <Route path="/collections" element={<RecipieCollections />} />
            {/* <Route path="/collections/new" element={<RecipieNewCollection />} /> */}
            <Route path="/collections/:collectionId" element={<RecipiesList />} />
            {/* <Route path="/collections/:collectionId/edit" element={<RecipieEditCollection />} /> */}

            {/* Shoppinglists */}
            <Route path="/shoppinglists/:shoppinglistId" element={<Shoppinglist />} />
            <Route path="/shoppinglists" element={<AllShoppinglists />} />
            {/*<Route path="/shoppinglists/new" element={<NewShoppinglist />} /> */}
            <Route path="/shoppinglists/:shoppinglistId/edit" element={<ShoppinglistEdit />} />
          </Route>
        </Routes>
      </Router>
    </>
  )


}

export default App;