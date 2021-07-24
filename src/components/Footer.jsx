import React from "react";

export default function Footer() {
    return (
        <footer>
            <div className="newsletter"></div>
            <div className="sections"></div>
            <div className="constact">
                <div className="contact__header">
                    <p>Contact</p>
                </div>
                <ul className="contact__list">
                    <li className="contact__list__item">
                        <i className="bi bi-instagram"></i>
                        <p>Instagram</p>
                    </li>
                    <li className="contact__list__item">
                        <i className="bi bi-telephone"></i>
                        <p>Telefono</p>
                    </li>
                    <li className="contact__list__item">
                        <i className="bi bi-envelope"></i>
                        <p>Email</p>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
