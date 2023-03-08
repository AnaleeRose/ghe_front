import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserProfile from './UserProfile';
import { Link } from "react-router-dom";

// Form for tracker page, needs styles
export default function TrackerForm(props) {
    const [updateSuccessful, setUpdateSuccessful] = useState(null);
    let tracker_data = (props.tracker_data && props.tracker_data!== "empty") ? props.tracker_data.data : null
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: tracker_data
    })

    const onSubmit = data => {
        setUpdateSuccessful(false)
        let address = process.env.REACT_APP_BACKEND_URL + `/user/tracker/` + UserProfile.getUserID();
        try {
            fetch(address, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: "include",
                body: new URLSearchParams({
                    'id': UserProfile.getUserID(),
                    'rl_username': data.rl_username,
                    'platform': data.platform,
                    'tracker_link': data.tracker_link,
                    'rank': data.rank,
                })
            }).then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status) {
                     UserProfile.setIsTrackerLinked(true);
                    setUpdateSuccessful(true)
                }
            })
        } catch(e) {
            console.log("Couln't send to backend")
            console.log(e)
            setUpdateSuccessful(false)
        }
    }
    console.log(errors);

    if (updateSuccessful == null) {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="form tracker-form">
                <h2 className="header">{props.stage === "manage" ? "Update RL Tracker Information" : "Add RL Tracker Information"}</h2>
                <div className="input-container">
                    <label htmlFor="rl_username">Rocket League Username</label>
                    <input type="text" placeholder="Username" aria-invalid={errors.rl_username ? "true" : "false"} {...register("rl_username", {required: true})} />
                    {errors.rl_username && errors.rl_username.type === "required" && (
                        <span role="alert" className="alert error">This is required</span>
                    )}
                </div>
                
                <div className="input-container">
                    <label htmlFor="platform">Platform</label>
                    <select placeholder="epic" aria-invalid={errors.platform ? "true" : "false"} {...register("platform", {required: true})}>
                        <option value="epic">Epic</option>
                        <option value="steam">Steam</option>
                        <option value="xbox">Xbox Live</option>
                        <option value="playstation">Playstation Network</option>
                    </select>
                    {errors.platform && errors.platform.type === "required" && (
                        <span role="alert" className="alert error">This is required</span>
                    )}
                </div>

                <div className="input-container">
                    <label htmlFor="tracker_link">Link</label>
                    <input type="text" placeholder="Tracker Link" aria-invalid={errors.tracker_link ? "true" : "false"} {...register("tracker_link", {required: true})} className="long" />
                    {errors.tracker_link && errors.tracker_link.type === "required" && (
                        <span role="alert" className="alert error">This is required</span>
                    )}
                </div>
        
                    
                <div className="input-container">
                    <label htmlFor="platform">Rank</label>
                    <select placeholder="b1" aria-invalid={errors.rank ? "true" : "false"} {...register("rank", {required: true})}>
                        <option value="b1">Bronze 1</option>
                        <option value="b2">Bronze 2</option>
                        <option value="b3">Bronze 3</option>
                        <option value="s1">Silver 1</option>
                        <option value="s2">Silver 2</option>
                        <option value="s3">Silver 3</option>
                        <option value="g1">Gold 1</option>
                        <option value="g2">Gold 2</option>
                        <option value="g3">Gold 3</option>
                        <option value="p1">Platinum 1</option>
                        <option value="p2">Platinum 2</option>
                        <option value="p3">Platinum 3</option>
                        <option value="d1">Diamond 1</option>
                        <option value="d2">Diamond 2</option>
                        <option value="d3">Diamond 3</option>
                        <option value="c1">Champ 1</option>
                        <option value="c2">Champ 2</option>
                        <option value="c3">Champ 3</option>
                        <option value="gc1">Grand Champ 1</option>
                        <option value="gc2">Grand Champ 2</option>
                        <option value="gc3">Grand Champ 3</option>
                        <option value="ssl">Supersonic Legend</option>
                    </select>
                    {errors.rank && errors.rank.type === "required" && (
                        <span role="alert" className="alert error">This is required</span>
                    )}
                </div>
        
                <input type="submit" value={props.stage === "manage" ? "Update Tracker Information" : "Add Tracker Information"} className="btn btn-submit simple" />
            </form>
        );
    } else if (updateSuccessful) {
        return (
            <>
                <p>Update successful!</p>
                <Link to="/user">Return to Profile</Link>
            </>
        );
    } else {
        return (
            <>
                <p>Update unsuccessful, please try again later.</p>
                <Link to="/user">Return to Profile</Link>
            </>
        );
    }

}

