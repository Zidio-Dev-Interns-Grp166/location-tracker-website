import { CiFacebook } from "react-icons/ci";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom"






export default function Footer(){
    return(
        <div className="footer">
            <div className="socials">
                <CiFacebook  className="link"/>
                <AiFillTwitterCircle  className="link"/>
                <FaInstagram className="link"/>
                <FaLinkedin className="link"/>
            </div>

            <ul className="list">
                <li>
                    <Link className="links">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="links">
                        Map
                    </Link>
                </li>
                <li>
                    <Link className="links">
                        Download
                    </Link>
                </li>
                <li>
                    <Link className="links">
                        Privacy Policy
                    </Link>
                </li>
            </ul>

            <p className="copyright">
                Zidio development © 2024
            </p>

        </div>
    )
}