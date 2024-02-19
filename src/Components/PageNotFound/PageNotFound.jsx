import React from 'react'
import mainImage from "../../Images/pageNotFound.png";

function PageNotFound() {
  return (


    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
      <img
        src={mainImage} alt="Page Not Found"
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default PageNotFound