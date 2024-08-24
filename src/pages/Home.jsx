

export const Home = () => {

    return (
        <main className="content-width">
            <h1 className="center" >Welcome to RecipeRover!</h1>

            <div className="mtBtns-container-list width-70">
                <a className="myBtns-primary" href="/login"> Login</a>
                <a className="myBtns-teritary" href="/collections">Recipie collections</a> 
                <a className="myBtns-teritary" href="/collections/1">Recipies</a>
                <a className="myBtns-teritary"  href="/shoppinglists">Shoppinglists</a>                
            </div>


        </main>
    )
}