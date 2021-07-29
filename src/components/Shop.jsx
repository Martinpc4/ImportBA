import React from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

export default function Shop() {
    const { CategoryId } = useParams();

    return (
        <div className="shop">
            <div className="shop__itemList">
                <ItemList categoryId={CategoryId} vertical={true} />
            </div>
            <div className="shop__filters"></div>
        </div>
    );
}
