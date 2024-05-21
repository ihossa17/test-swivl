import {IUser} from "@/api/interfaces";
import React from "react";

import styles from "./UserPage.module.scss"
import Link from "next/link";
import {Avatar, IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useRouter} from "next/router";

interface IUserPageComponent{
    user:IUser
}


export const UserPageComponent =  ({user}: IUserPageComponent) => {

    const router = useRouter();

    return (
        <>
            <div className={styles.wrapUser}>
                <button className={styles.navButton} onClick={() => router.back()}>
                    <IconButton children={<ArrowBackIosIcon/>}/>
                    <span className={styles.login}>Back to list</span>
                </button>
                <Avatar sizes={'90px'} alt={user.login} src={user.avatar_url}/>
                <span className={styles.login}>{user.login}</span>
                <div className={styles.wrapInfo}>
                    <div className={styles.infoSection}>
                        <span className={styles.label}>followers</span>
                        <span className={styles.value}>{user?.followers}</span>
                    </div>
                    <div className={styles.infoSection}>
                        <span className={styles.label}>following</span>
                        <span className={styles.value}>{user?.following}</span>
                    </div>
                </div>
                <div className={styles.fieldWrapper}>
                    <span className={styles.label}>company: </span>
                    <span className={styles.value}>{user?.company || "-"}</span>
                </div>
                <div className={styles.fieldWrapper}>
                    <span className={styles.label}>blog: </span>
                    <span className={styles.value}>{user?.bio || "-"}</span>
                </div>
            </div>
        </>
    )
}