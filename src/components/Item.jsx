import React from "react";
import { Link } from "react-router-dom";

export default function Item(props) {
    return (
        <div className="item">
            <Link to={`/Shop/${props.categoryId}/${props.id}`} className="item__link">
                <div className="item__link__title">
                    <p>{props.title}</p>
                </div>
                <div className="item__link__image">
                    <img src={props.imageURL} alt="" />
                </div>
            </Link>
            <div className="item__model">
                <p>{props.title} - {props.memory}</p>
            </div>
            <div className="item__price">
                <p>{props.price} USD $</p>
            </div>
            <div className="item__actions">
                <button type="button" className="btn btn-secondary">Agregar al carrito</button>
            </div>
        </div>
    );
}
