import React from "react";
import ItemList from "./ItemList";

export default function Home() {
    return (
        <div className="categories-ctr">
            <div className="categories-ctr__category">
                <p>Mac</p>
                <ItemList categoryId={1} />
            </div>
            <div className="categories-ctr__category">
                <p>iPad</p>
                <ItemList categoryId={2} />
            </div>
            <div className="categories-ctr__category">
                <p>iPhone</p>
                <ItemList categoryId={3} />
            </div>
            <div className="categories-ctr__category">
                <p>Accesorios</p>
                <ItemList categoryId={4} />
            </div>
        </div>
    );
}
