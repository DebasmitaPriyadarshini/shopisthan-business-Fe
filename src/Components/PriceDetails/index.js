import React from "react";
import { PriceWithComma } from "../../Functions";

const PriceDetails = (props) => {
    return (
        <div>
            <div className="piceandgrandtatol">
                <div className="subtotal-and-price-of-products">
                    <p>Total items:</p>
                    <h4>{props.totalItem} items</h4>
                </div>
                <div className="subtotal-and-price-of-products">
                    <p>Subtotal:</p>
                    <h4>{PriceWithComma(props.totalPrice)}</h4>
                </div>
            </div>
            <div className="Total-t-o-tancd">
                <h2>Total</h2>
                <h2>{PriceWithComma(props.totalPrice)}</h2>
            </div>
        </div>
    );
};

export default PriceDetails;
