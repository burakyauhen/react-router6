import { Link, useMatch } from "react-router-dom";

const CustomLink = ({children, to, ...props}) => {
    const match = useMatch({
        path: to, 
        end: to.length === 1,
    });
    return (
        <Link 
            to={to} 
            {...props}
            style={{
                color: match ? 'var(--color-active)' : 'white' 
            }}

        >
            {children}
        </Link>
    );
}

export { CustomLink }