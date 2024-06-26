import React from "react";
import promo_data from '../assets/promo.json'
import Promo from "./Promo";

const Featured = () => {
    return (
        <>
        <h5>Featured </h5>

        <div className="card-container d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>
        {
            promo_data.map((promo) => (
            <Promotion key={promo.id} data={promo} />
            ))
        }
        </div>
        </>
    );
};
export default Featured;