import React from 'react';
import { useForm } from 'react-hook-form';
import UserProfile from '../components/UserProfile';

// Form for tracker page, needs styles
export default function TrackerForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        let address = process.env.REACT_APP_BACKEND_URL + `/user/tracker/` + UserProfile.getUserID();
        try {
            fetch(address, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    id: UserProfile.getUserID,
                    tracker_username: data.tracker_username, 
                    platform: data.platform, 
                    tracker_link: data.tracker_link, 
                    rank: data.rank
                }),
            }).then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status) {
                     let tracker_info = [{rl_username: res.data.rl_username, rank: res.data.rank, tracker_link: res.data.tracker_link}];
                    //  let tracker_info = [{rl_username: res.data.rl_username, rank: res.data.rank, link: res.data.link}];
                     UserProfile.setTrackerInfo(tracker_info);
                }
            })
        } catch(e) {
            console.log("Couln't send to backend")
            console.log(e)
        }
    }
    console.log(errors);

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="form tracker-form">
        <label htmlFor="tracker_username">Username</label>
        <input type="text" placeholder="Tracker Username" aria-invalid={errors.tracker_username ? "true" : "false"} {...register("tracker_username", {required: true})} />
        {errors.tracker_username && errors.tracker_username.type === "required" && (
            <span role="alert">This is required</span>
        )}
        
        <label htmlFor="platform">Platform</label>
        <select placeholder="epic" aria-invalid={errors.platform ? "true" : "false"} {...register("platform", {required: true})}>
            <option value="epic">Epic</option>
            <option value="steam">Steam</option>
            <option value="xbox">Xbox Live</option>
            <option value="playstation">Playstation Network</option>
        </select>
        {errors.platform && errors.platform.type === "required" && (
            <span role="alert">This is required</span>
        )}

        <label htmlFor="tracker_link">Link</label>
        <input type="text" placeholder="Tracker Link" aria-invalid={errors.tracker_link ? "true" : "false"} {...register("tracker_link", {required: true})} />
        {errors.tracker_link && errors.tracker_link.type === "required" && (
            <span role="alert">This is required</span>
        )}

              
        <label htmlFor="platform">Rank</label>
        <select placeholder="epic" aria-invalid={errors.rank ? "true" : "false"} {...register("rank", {required: true})}>
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
            <span role="alert">This is required</span>
        )}

        <input type="submit" value="Submit Tracker Information"/>
        </form>

    );
}