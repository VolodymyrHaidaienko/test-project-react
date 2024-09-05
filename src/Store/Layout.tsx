import React, {FC} from 'react';
import {Link, Outlet} from "react-router-dom";

const Layout: FC = () => {
    return (
      <div>
        <div><Link to={'/'}></Link></div>
            <Outlet/>
        </div>
    );
};

export default Layout;