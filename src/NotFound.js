import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not found" style={{backgroundColor: 'pink', borderRadius: '3.5em', padding: '1em'}}>
            <h2> Sorry </h2>
            <p>That page cannot be found </p> 
            <p>Womp Womp </p> 
            <Link to="/">Back to the homepage...</Link>
        </div>
    )
}

export default NotFound; 