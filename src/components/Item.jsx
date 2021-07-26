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
                {
                    props.memory != 0 ? <p>{props.title} - {props.memory}Gb</p> : <p>{props.title}</p>
                }
            </div>
            <div className="item__price">
                <p>{props.price} USD $</p>
            </div>
        </div>
    );
}
