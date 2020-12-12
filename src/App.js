import React from 'react'
import StoreMap from './StoreMap'
function App(){
  return(
    <>
      <StoreMap storename="新馬辣" coordinates={[25, 121]} location={"100台北市中正區汀州路三段295號"} rating={"4.3"}/>
    </>
  )
}
export default App;
