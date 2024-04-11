import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <header>
                <Link to='/'>Home</Link>
                <Link to='/posts'>Blog</Link>
                <Link to='about'>About</Link>
            </header> 
            
            <main>
                <Outlet />
            </main>

            <footer className="container">2024</footer>
        </>
    );
}

export { Layout }