import { Link } from 'react';
import { Select, Button } from '@material-ui/core';
function Navbar(props){
    return(
        <nav>
            <Link to="/"/>
            <Button className="button1"></Button>
            <span>
                <Select className="location"></Select>
                <Select className="pricing"></Select>
                <Select className="preferences"></Select>
            </span>
            <Button className="signin"></Button>
        </nav>
    )
}

export default Navbar;