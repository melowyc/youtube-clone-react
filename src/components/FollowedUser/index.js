import React from 'react'
import './index.css'
import LikedItem from "./LikedItem";
import { useSelector } from 'react-redux';

const FollowedUser = () => {
    const {follows} = useSelector(state => state.profile);
    console.log(follows)

    return (
        <div>
            <div>
                <h5>Followed Users</h5>
            </div>
            <div className={`rounded-4 mt-3 liked`} style={{backgroundColor: 'white'}}>
                <div className={`row w-100 m-0 p-2`}  >
                    <div className={`col-9 col-lg-9 d-none d-md-block d-flex justify-content-start rounded-pill bg-primary text-white`}>
                        <h4 className={`pt-2 pb-2`}>Username</h4>
                    </div>
                    <div className={`col d-flex justify-content-start bg-warning rounded-pill`}>
                        <h4 className={`pt-2 pb-2`}>Country</h4>
                    </div>

                </div>
                {follows.map((follow) => (
                        <LikedItem key={follow._id} follow={follow}/>
                    ))}
            </div>

        </div>
    )
}

export default FollowedUser