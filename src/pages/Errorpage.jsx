import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function Errorpage() {
    const error = useRouteError();

    // return (
    //     <div>
    //         <h1>{error.status}</h1>
    //         <h2>{error.statusText || 'Something goes wrong'}</h2>
    //     </div>
    // );
   
   
   
   

   
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status}</h1>
                <h2>{error.data.message || 'Something goes wrong'}</h2>
                <h3>{error.data.reason}</h3>
            </div>
        );
    }

    // return <div>Something goes wrong</div>
    throw error;
   
}

export default Errorpage;