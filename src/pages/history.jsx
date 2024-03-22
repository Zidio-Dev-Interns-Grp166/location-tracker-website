import  { useState } from "react";

const History = () => {
    const [history, setHistory] = useState([]);

    const latitude=

    setHistory(prevHistory => [...prevHistory, { latitude, longitude, timestamp: new Date() }]);

    return ( 
        <div>
            <div className='inner-content'>
                <h2>Location History</h2>
                <ul >
                    {
                        history.map((item, index) => (
                            <li key={index}>
                            Latitude: {item.latitude}, Longitude: {item.longitude}, Timestamp: {item.timestamp.toLocaleString()}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
     );
}
 
export default History;