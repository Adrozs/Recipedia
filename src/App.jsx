import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import { Home } from './pages/Home';
// import { Login } from './pages/Login';

// Recipies
import { Recipie } from './pages/Recipie/Recipie';
import { RecipieNew } from './pages/Recipie/RecipieNew';
import { RecipieEdit } from './pages/Recipie/RecipieEdit';

// Collections
import { RecipieCollections } from './pages/RecipieCollections';
import { RecipiesList } from './pages/RecipiesList';
// import { RecipieNewCollection } from './pages/RecipieCollections/RecipieNewCollection';
// import { RecipieEditCollection } from './pages/RecipieCollections/RecipieEditCollection';

// Shoppinglists
// import { Shoppinglist } from './pages/Shoppinglist';
// import { AllShoppinglists } from './pages/AllShoppinglists';
// import { NewShoppinglist } from './pages/NewShoppinglist';
// import { EditShoppinglist } from './pages/EditShoppinglist';

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
            {/* <Route path="/login" element={<Login />} /> */}

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
            {/*<Route path="/shoppinglists/:shoppinglistId" element={<Shoppinglist />} /> */}
            {/*<Route path="/shoppinglists" element={<AllShoppinglists />} /> */}
            {/*<Route path="/shoppinglists/new" element={<NewShoppinglist />} /> */}
            {/*<Route path="/shoppinglists/:shoppinglistId/edit" element={<EditShoppinglist />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  )


}

export default App;