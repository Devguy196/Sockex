import React from 'react';

const Promo = (props) => {
    return (
        <>
<div className="card">
    <div className="card bg-light">
        <div className="card-text">I love socks!</div>
        <div className="card-text"><a href="#">Click to buy!</a></div>
        <div className="card-text">Feature: {props.data.feature}</div>
        <div className="card-text">Benefit: {props.data.benefit} </div>
        <div className="card-text">Target:  {props.data.target_audience}</div>
    </div>
</div>


<div className="card-container d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>
    {/* Be an explorer and map */}
</div>
      
            </>
    )};
           

export default Promo;
