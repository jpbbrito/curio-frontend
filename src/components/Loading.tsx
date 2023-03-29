import './Loading.css';
import loading from './../images/loading-64-64-icon.png';

function Loading() {
    return (
        <div className="loader_container">
            <img className="loader" src={loading} alt="Loading" />
        </div>
    )
}

export default Loading;