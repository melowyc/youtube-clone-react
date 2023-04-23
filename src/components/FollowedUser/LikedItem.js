import React from 'react';
import './index.css';
import {BsThreeDots} from "react-icons/bs";
import { Link } from "react-router-dom";

const LikedItem = ({follow}) => {
    return (
        <div className={`row w-100 p-2 m-0`}>
            <div className={`col-9 col-lg-9 text-dark d-none d-md-flex justify-content-center align-items-center bg-warning rounded-pill`}>
                <h4 className={` text-nowrap`}>{follow.username}</h4>
            </div>
            <div className={`col text-dark d-flex justify-content-start align-items-center`}>
                <h4 className={`fw-normal`}>{follow.country}</h4>
            </div>
            <div className={`col-1 p-0 text-primary d-flex justify-content-center align-items-center`}>
                <Link to={`/profile/${follow.username}`}>
                    <BsThreeDots size={20}/>
                </Link>
                
            </div>
        </div>
    )
}

export default LikedItem;