import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import UserProfile from '../UserProfile';
import { FindMembers } from './../../hooks/FindMembers'
import { SearchBar } from "../../hooks/SearchBar";

// Form for tracker page, needs styles
export const TeamForm = (props) => {
    const [createResponse, setCreateResponse] = useState(null);
    const [selected, setSelected] = useState(null);
    const [allMemberInfo, setAllMemberInfo] = useState(null);
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: props.team_data
    })

    const onChangeSelected = (new_info) => {
        (async () => {
            let new_allmemberinfo = null;
            let newSelected;
            let count = 0
            
            if (selected) {
                newSelected = selected.map((x) => x);
            } else {
                newSelected = [];
            }

            let user_info = new_info;
            user_info[2] = 0
            newSelected.push(user_info)
            newSelected.forEach((array_item)=>{
                count++
                let isSub = (count > 1) ? 1 : 0
                if (new_allmemberinfo) {
                    new_allmemberinfo = new_allmemberinfo + array_item[0][1] + '|' + isSub + ","
                } else {
                    new_allmemberinfo = new_allmemberinfo + array_item[0][1] + '|' + isSub + ","
                }
            })

            setSelected(newSelected);
            setAllMemberInfo(new_allmemberinfo);
            setValue("member_ids", new_allmemberinfo)
        })();
    };

    const updateMemberIDs = () => {
        let new_allmemberinfo = null;
        selected.forEach((member, key)=>{
            console.log("updateMemberIDs member")
            console.log(member)
            
            console.log("updateMemberIDs member id...?")
            console.log(member[0][1])

            if (new_allmemberinfo) {
                new_allmemberinfo = new_allmemberinfo + member[0][1] + '|' + member[2] + ","
            } else {
                new_allmemberinfo = new_allmemberinfo + member[0][1] + '|' + member[2] + ","
            }
        })

        setAllMemberInfo(new_allmemberinfo);
        setValue("member_ids", new_allmemberinfo)
    }

    const editMember = (e, id, edit ) => {
        e.preventDefault();
        console.log("allMemberInfo")
        console.log(allMemberInfo)
        console.log("CLICKED")
        console.log(e)
        let members = allMemberInfo.split(",");
        let new_value = false, replace_id;
        replace_id = id;


        let newSelected = selected.map((x) => x);
            
        newSelected.forEach((member, key)=>{
            console.log("selected = member")
            console.log(member)
            console.log("COMPARISON")
            console.log(member[0])
            console.log(member[0][1])
            console.log(typeof member[0][1])
            console.log("COMPARISON2")
            console.log(member[2])
            if (parseInt(member[0][1]) === replace_id) {
                console.log(new_value)
                console.log("b4")
                console.log(member[2])
                switch (edit) {
                    case "sub":
                        member[2] = 1
                        break;

                    case "primary":
                        member[2] = 0
                        break;
                
                    default:
                        return;
                }
                console.log("after")
                console.log(member[2])
            }
        })
        
        console.log("selected1")
        console.log(selected)
        setSelected(newSelected);
        console.log("selected2")
        console.log(selected)
        updateMemberIDs()
    }

    const onSubmit = data => {
        let pass_team_id = (props.team_id ? props.team_id : false)
        setCreateResponse({status: false})
        let address = (props.stage === "manage") ? process.env.REACT_APP_BACKEND_URL + `/team/edit/` : process.env.REACT_APP_BACKEND_URL + `/team/create/`
        console.log("SUBMITTED")
        console.log(data.member_ids)
        // try {
        //     fetch(address, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         },
        //         credentials: "include",
        //         body: new URLSearchParams({
        //             'team_lead_id': UserProfile.getUserID(),
        //             'name': data.team_name,
        //             'region': data.region,
        //             'type_id': data.type_id,
        //             'team_id': pass_team_id,
        //             'member_ids': data.member_ids
        //         })
        //     }).then(res => res.json())
        //     .then((res) => {
        //         console.log("res")
        //         console.log(res)
        //         console.log(res.status)
        //         setCreateResponse({status: res.status})
        //         if (res.status) {
        //             UserProfile.setTeam(res.data);
        //         }
        //     })
        // } catch(e) {
        //     console.log("Couln't send to backend")
        //     console.log(e)
        //     setCreateResponse({status: false})
        // }
    }

    

    if (createResponse == null || !createResponse.status) {
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)} className="form tracker-form">
                    <h2 className="header">{props.stage === "manage" ? "Edit Team" : "Create a Team"}</h2>

                    <div className="input-container">
                        <label htmlFor="team_name">Team Name</label>
                        <input type="text" placeholder="team name" ref={register} aria-invalid={errors.team_name ? "true" : "false"} {...register("team_name", {required: true})} />
                        {errors.team_name && errors.team_name.type === "required" && (
                            <span role="alert" className="alert error">This is required</span>
                        )}

                        {(createResponse && createResponse.error == 0) ? (
                            <>
                            <span role="alert" className="alert error">Name is taken.</span>
                            </>
                        ):(
                            <>
                            </>
                        )}
                    </div>

                    
                    <div className="input-container">
                        <label htmlFor="platform">Region</label>
                        <select ref={register} aria-invalid={errors.region ? "true" : "false"} {...register("region", {required: true})}>
                            <option value="naw">North America West</option>
                            <option value="nae">North America East</option>
                            <option value="eu">Europe</option>
                        </select>
                        {errors.region && errors.region.type === "required" && (
                            <span role="alert" className="alert error">This is required</span>
                        )}
                    </div>
                    
                    <div className="input-container">
                        <label htmlFor="platform">Team Size</label>
                        <select ref={register} aria-invalid={errors.type_id ? "true" : "false"} {...register("type_id", {required: true})}>
                            <option value="1">Standard</option>
                            <option value="2">Duos</option>
                            <option value="3">Solo</option>
                        </select>
                        {errors.type_id && errors.type_id.type === "required" && (
                            <span role="alert" className="alert error">This is required</span>
                        )}
                    </div>

                    <div className="input-container members">
                        <p className='header'>Members</p>
                        <div class="table-header">
                                <p className="isSub">Is Sub</p>
                                <p className="name">Discord Name</p>
                            <p></p>
                        </div>
                    {(selected) ? (
                        <>
                            {(selected.map((member) => {
                                 return(
                                    <>
                                        <div class="member">
                                            {(member[2]) ? 
                                                <p className="a11y-text btn fakeCheck checked" onClick={(e) => editMember(e, member[0][1], "primary")}><span>Make Primary</span></p>
                                                :
                                                <p className="a11y-text btn fakeCheck" onClick={(e) => editMember(e, member[0][1], "sub")}><span>Make Sub</span></p> 
                                            }
                                            <p>{member[1][1]}</p>
                                        </div>
                                    </>
                                )
                            }))}
                        </>
                    ) : false}
                    </div>
                                        
                    {/* {(allMemberInfo) ? (<p>allMemberInfo: {allMemberInfo}</p>) : false}
                    {(selected) ? (<p>selected: {selected}</p>) : false} */}
                    <FindMembers  selected={selected} onChangeSelected={onChangeSelected} />

                    <input type="text" ref={register} className="hidden" {...register("member_ids", {required: false})} />

                    <div className="btns">
                        <input type="submit" value={props.stage === "manage" ? "Edit Team" : "Create Team"} className="btn btn-submit simple" />
                        {props.stage === "create" ? <Link to="/team/delete" className="btn btn-danger simple">Delete Team</Link> : false}
                        
                    </div>
                </form>


            </>
        );
    } else if (createResponse.status) {
        return (
            <>
                <p>Team created!</p>
                {/* <Link to="/team/create?users=true">Add Members</Link> */}
            </>
        );
    }
}

// helper functions
const fetchTeamInfo = async(data_only = false, team_id) => {
    let address = process.env.REACT_APP_BACKEND_URL + `/team/` + team_id
    try {
        let response = await fetch(address, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            })
        let json = await response.json();
        if (json.status) {
            if (data_only) return json.data;
            return { status: true, team_data: json.data};
        } else {
            console.log("res failed")
            if (data_only) return false;
            return { status: false };
        }
    } catch(e) {
        console.log("Couln't send to backend")
        console.log(e)
        if (data_only) return false;
        return { status: false };
    }
}

// helper functions
const fetchTeamInfoDataOnly = async(team_id) => {
    let address = process.env.REACT_APP_BACKEND_URL + `/team/` + team_id
    console.log(address)
    try {
        fetch(address, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((res)=>{
            let json = res.json();
            console.log(json)
            if (json.status) {
                return json.data;
            } else {
                console.log("res failed")
                return false;
            }
        })
    } catch(e) {
        console.log("Couln't send to backend")
        console.log(e)
        return false;
    }
}