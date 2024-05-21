import {Search} from "@/components/MainPage/Search/Search";
import React from "react";
import {UserTable} from "@/components/MainPage/UserTable/UserTable";
import styles from "./FilterUsers.module.scss";



export const FilterUsers = () => {

    return (
        <div className={styles.mainWrapper}>
            <Search />
            <UserTable/>
        </div>
    )
}