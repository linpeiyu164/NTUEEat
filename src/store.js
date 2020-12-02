function Store(){
    let [comments, setComments] = useState([])
    return(
        <>
            <div className="info">
                <div className="picture">
                </div>
                <span className="stars"></span>
            </div>
            <div className="comments">
                <div className="input">
                    <input></input>
                </div>
                <div className="comment array">
                </div> 
            </div>
            <div className="map">
            </div>
        </>
    )
}