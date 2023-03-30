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
            console.log("user_info")
            console.log(user_info)
            user_info[2] = 0;
            console.log("user_info2")
            console.log(user_info)
            newSelected.push(user_info)
            console.log("newSelected")
            console.log(newSelected)

            console.log("new_allmemberinfo")
            console.log(new_allmemberinfo)
            newSelected.forEach((array_item)=>{
                count++
                let isSub = (count > 1) ? 1 : 0
                if (new_allmemberinfo) {
                    new_allmemberinfo = new_allmemberinfo + array_item[0][1] + '|' + isSub + ","
                } else {
                    new_allmemberinfo = new_allmemberinfo + array_item[0][1] + '|' + isSub + ","
                }
            })

            console.log("newSelected2")
            console.log(newSelected)
            console.log("new_allmemberinfo2")
            console.log(new_allmemberinfo)

            setSelected(newSelected);
            setAllMemberInfo(new_allmemberinfo);
            setValue("member_info", new_allmemberinfo)
        })();
    };

    const updateMemberIDs = () => {
        let new_allmemberinfo = null;
        selected.forEach((member, key)=>{
            if (new_allmemberinfo) {
                new_allmemberinfo = new_allmemberinfo + member[0][1] + '|' + member[2] + ","
            } else {
                new_allmemberinfo = new_allmemberinfo + member[0][1] + '|' + member[2] + ","
            }
        })

        setAllMemberInfo(new_allmemberinfo);
        setValue("member_info", new_allmemberinfo)
    }

    const editMember = (e, id, edit ) => {
        e.preventDefault();
        console.log("allMemberInfo")
        console.log(allMemberInfo)
        console.log("CLICKED")
        console.log(e)
        let replace_id = id;
        let newSelected = selected.map((x) => x);
            
        newSelected.forEach((member, key)=>{
            if (parseInt(member[0][1]) === replace_id) {
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
            }
        })
        
        updateMemberIDs()
    }

    const onSubmit = data => {
        let pass_team_id = (props.team_id ? props.team_id : false)
        setCreateResponse({status: false})
        let address = (props.stage === "manage") ? process.env.REACT_APP_BACKEND_URL + `/team/edit/` : process.env.REACT_APP_BACKEND_URL + `/team/create/`
        console.log("SUBMITTED")
        console.log(data)
        try {
            fetch(address, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: "include",
                body: new URLSearchParams({
                    'team_lead_id': UserProfile.getUserID(),
                    'name': data.team_name,
                    'region': data.region,
                    'type_id': data.type_id,
                    'team_id': pass_team_id,
                    'member_info': data.member_info
                })
            }).then(res => res.json())
            .then((res) => {
                console.log("res")
                console.log(res)
                console.log(res.status)
                setCreateResponse({status: res.status})
                if (res.status) {
                    UserProfile.setTeam(res.data);
                }
            })
        } catch(e) {
            console.log("Couln't send to backend")
            console.log(e)
            setCreateResponse({status: false})
        }
    }

    if (props.status === "manage" && props.team_users.length > 0) {
        props.team_users.forEach(element => {
            // let newSelected;
            // setSelected(newSelected);
        });
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
                        <div className="table-header">
                                <p className="isSub">Is Sub</p>
                                <p className="name">Discord Name</p>
                        </div>
                        {errors.member_info && errors.member_info.type === "required" && (
                            <span role="alert" className="alert error" id="member_info_missing">Please add members</span>
                        )}
                    {(selected) ? (
                        <>
                            {(selected.map((member) => {
                                 return(
                                    <>
                                        <div className="member">
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

                    <input type="text" ref={register} className="hidden" {...register("member_info", {required: true})} />

                    <div className="btns">
                        <input type="submit" value={props.stage === "manage" ? "Edit Team" : "Create Team"} className="btn btn-submit simple" />
                        {props.stage === "manage" ? <Link to="/team/delete" className="btn btn-danger simple">Delete Team</Link> : false}
                        
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
            console.log("JSON RES - TEAM FORM")
            console.log(json)
            if (data_only) return json.data;
            return { status: true, team_data: json.data.team_data, team_users: json.data.team_users};
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