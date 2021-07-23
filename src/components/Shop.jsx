import React from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

export default function Shop() {
    const { CategoryId } = useParams();

    return (
        <div className="category">
            <div className="category__itemList">
                <ItemList categoryId={CategoryId} />
            </div>
            <div className="category__filters"></div>
        </div>
    );
}
