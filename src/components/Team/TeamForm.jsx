import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import UserProfile from '../UserProfile';
import { FindMembers } from './../../hooks/FindMembers'
import { SearchBar } from "../../hooks/SearchBar";

// Form for tracker page, needs styles
export const TeamForm = (props) => {
    const [createResponse, setCreateResponse] = useState(null);
    let [selected, setSelected] = useState(null);
    const [allMemberInfo, setAllMemberInfo] = useState(null);
    const [deletedMembers, setDeletedMembers] = useState(null);
    const [updated, setUpdated] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: props.team_data
    })

    
    useEffect(() => {
        console.log("teamForm props")
        console.log(props)
        if (props.stage === "manage" && props.team_data.team_users) {
            props.team_data.team_users.forEach(async (member) => {
                console.log("team_users member")
                console.log(member)
                let member_formatted = [];
                member_formatted[0] = ["id", member.id];
                member_formatted[1] = ["name", member.discord_name];
                member_formatted[2] = (member.isSub) ? 1 : 0;
                onChangeSelected(member_formatted);
                // let members = props.team_users;
                // let newSelected = [];
                // let new_allmemberinfo;
                // let isSub;
        
                // members.forEach(member => {
                //     isSub = (member.isSub) ? 1 : 0;
                //     new_allmemberinfo = new_allmemberinfo + member.discord_name + '|' + isSub + ","
                // });
                
                // setSelected(newSelected);
                // setAllMemberInfo(new_allmemberinfo);
                // setValue("member_info", new_allmemberinfo)
            });
        }
    }, [])

    const onChangeSelected = (new_info) => {
        (async () => {
            let new_allmemberinfo = null;
            let newSelected;
            let count = 0;

            if (selected === null) selected = [];

                            
            console.log(" selected b4 copy")
            console.log(selected)


            // newSelected = {...selected};



            // console.log("newSelected after copy")
            // console.log(newSelected)
            // newSelected = [];

            let user_info = new_info;
            user_info[2] = 0
            selected.push(user_info)
            console.log("onChangeSelected: user_info")
            console.log(user_info)
            console.log("selected after push")
            console.log(selected)
            selected.forEach((array_item)=>{
                count++
                let isSub = (count > 1) ? 1 : 0
                if (new_allmemberinfo) {
                    new_allmemberinfo = new_allmemberinfo + array_item[0][1] + '|' + isSub + ","
                } else {
                    new_allmemberinfo = new_allmemberinfo + array_item[0][1] + '|' + isSub + ","
                }
            })

            setSelected(selected);
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

    
    // const deleteMember = (e, id) => {
    //     e.preventDefault();
    //     let replace_id = id;
    //     let newDeletedMembers;
    //     let newSelected = selected.map((x) => x);
    //     console.log("newSelected before");
    //     console.log(newSelected);
    //     newSelected.forEach((member, key)=>{
    //         console.log(key);
    //         if (parseInt(member[0][1]) === replace_id) {
    //             newSelected.splice(key, 1);
    //             if (deletedMembers.length) {
    //                 newDeletedMembers = deletedMembers + "," + replace_id
    //             } else {
    //                 newDeletedMembers = "," + replace_id

    //             }
            
    //             console.log("newSelected after");
    //             console.log(newSelected);
    //             console.log("newDeletedMember");
    //             console.log(newDeletedMembers);
    //             console.log("deletedMembers before");
    //             console.log(deletedMembers);
    //         }
    //     })

    //     setDeletedMembers(newDeletedMembers);
    //     console.log("deletedMembers after");
    //     console.log(deletedMembers);
    //     updateMemberIDs();
    // }

    
    const deleteMember = (e, id ) => {
        e.preventDefault();
        let replace_id = id;
        let newDeletedMembers;
        if (selected === null) selected = [];

        selected.forEach((member, key)=>{
            console.log("member key");
            console.log(key);
            if (parseInt(member[0][1]) === replace_id) {
                selected.splice(key, 1);
                if (deletedMembers != null) {
                    newDeletedMembers = deletedMembers + "," + replace_id
                } else {
                    newDeletedMembers = "," + replace_id

                }
            
                console.log("newSelected after");
                console.log(selected);
                console.log("newDeletedMember");
                console.log(newDeletedMembers);
                console.log("deletedMembers before");
                console.log(deletedMembers);
            }
        })

        setDeletedMembers(newDeletedMembers);
        setSelected(selected);
        
        console.log("selected before");
        console.log(selected);

        console.log("deletedMembers after");
        console.log(deletedMembers);
        updateMemberIDs();
    }



    const onSubmit = async (data) => {
        let pass_team_id = (props.team_id ? props.team_id : false)
        setCreateResponse({status: false})
        let address = (props.stage === "manage") ? process.env.REACT_APP_BACKEND_URL + `/team/edit/` : process.env.REACT_APP_BACKEND_URL + `/team/create/`
        console.log("SUBMITTED")
        console.log(data)
        try {
            await fetch(address, {
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
                    'member_info': data.member_ids,
                    'deleted_members': (deletedMembers) ? deletedMembers : false
                })
            }).then(res => res.json())
            .then((res) => {
                console.log("res")
                console.log(res)
                console.log(res.status)
                setCreateResponse({status: res.status})
                if (res.status) {
                    console.log("UPDATED")
                    UserProfile.setTeam(res.data);
                    setUpdated(true);
                }
            }).catch(e => {
                console.log("SUBMIT E")
                console.log(e)
            })
        } catch(e) {
            console.log("Couln't send to backend")
            console.log(e)
            setCreateResponse({status: false})
        }
    }

    

    if (createResponse == null || !createResponse.status) {
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)} className="form tracker-form">
                    <h2 className="header underline">{props.stage === "manage" ? "Edit Team" : "Create a Team"}</h2>
                    {(updated) ? 
                    (<span className='alert success'>Team Updated!</span>) 
                    : 
                    (<></>)}
                    
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
                                {/* <p className="delete">Delete User</p> */}
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
                                            <p className="name" >{member[1][1]}</p>
                                            <p className="userDelete" onClick={(e) => deleteMember(e, member[0][1])}>Delete</p>
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
                        <Link to="/team/delete" className="btn btn-danger simple">Delete Team</Link>
                        {/* {props.stage === "create" ? <Link to="/team/delete" className="btn btn-danger simple">Delete Team</Link> : false} */}
                    </div>
                </form>


            </>
        );
    } else if (createResponse.status) {
        return (
            <>
                <p>Team created!</p>
                <Link to="/user">Return to Profile</Link>
                {/* <Link to="/team/create?users=true">Add Members</Link> */}
            </>
        );
    }
}

// // helper functions
// const fetchTeamInfo = async(data_only = false, team_id) => {
//     let address = process.env.REACT_APP_BACKEND_URL + `/team/` + team_id
//     try {
//         let response = await fetch(address, {
//             method: "GET",
//             headers: {
//             "Content-Type": "application/json",
//             },
//             credentials: "include",
//             })
//         let json = await response.json();
//         if (json.status) {
//             if (data_only) return json.data;
//             return { status: true, team_data: json.data};
//         } else {
//             console.log("res failed")
//             if (data_only) return false;
//             return { status: false };
//         }
//     } catch(e) {
//         console.log("Couln't send to backend")
//         console.log(e)
//         if (data_only) return false;
//         return { status: false };
//     }
// }

// // helper functions
// const fetchTeamInfoDataOnly = async(team_id) => {
//     let address = process.env.REACT_APP_BACKEND_URL + `/team/` + team_id
//     console.log(address)
//     try {
//         fetch(address, {
//             method: "GET",
//             headers: {
//             "Content-Type": "application/json",
//             },
//             credentials: "include",
//         }).then((res)=>{
//             let json = res.json();
//             console.log(json)
//             if (json.status) {
//                 return json.data;
//             } else {
//                 console.log("res failed")
//                 return false;
//             }
//         })
//     } catch(e) {
//         console.log("Couln't send to backend")
//         console.log(e)
//         return false;
//     }
// }