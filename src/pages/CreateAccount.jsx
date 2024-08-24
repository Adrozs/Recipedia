



export const CreateAccount = () => {

    return (
        <>
            <h1>Login</h1>

            <label htmlFor=""></label>
            <input type="text" placeholder="Email" required />

            <label htmlFor=""></label>
            <input type="text" placeholder="Conirm email" required />

            <label htmlFor=""></label>
            <input type="password" placeholder="Password" />

            <label htmlFor=""></label>
            <input type="password" placeholder="Confirm password" />

            <button type="submit">Create account</button>
        </>
    )
}