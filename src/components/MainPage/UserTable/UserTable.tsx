import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {IUser} from "@/api/interfaces";
import Link from "next/link";
import {UserController} from "@/api/UserController";
import {useSearchParams} from "next/navigation";


export const UserTable = () => {

    const searchParams = useSearchParams()
    const search = searchParams.get('search')

    const [users, setUsers] = useState<IUser[] >([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState<number>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const observerTarget = useRef(null);


    const fetchUsers = async ({username, page}: {username: string, page: number}) => {

        if(isLoading || !username){
            return;
        }

        setIsLoading(true)
        try{
            setError('')

            const resUsers = await UserController.fetchUsers(username, page)
            if(resUsers?.items) {
                setUsers(page !== 0 ? [...users, ...resUsers.items] : resUsers.items)
                setTotalCount(resUsers.total_count)
                setCurrentPage(page)
            }
        } catch (error) {
            setError('Fetching users is wrong');
        } finally {
            setIsLoading(false)
        }
    }

    const fetchMoreUsers = async () => {
        fetchUsers({username: search || '', page: currentPage + 1});
    }


    useEffect(() => {
        setUsers([]);
        fetchUsers({username: search || '', page: 0});
    }, [search]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && users?.length && !isLoading) {
                    fetchMoreUsers();
                }
            },
            { threshold: 1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget, users, isLoading]);


    return (
        <div>

            {users.length > 0 && <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                {users?.map((itemUser, idx) =>
                    <ListItem key={`${itemUser.id}_${idx}`} alignItems="flex-start">
                        <Link href={`/${itemUser.login}`}>
                            <ListItemAvatar>
                                <Avatar alt={itemUser.login} src={itemUser.avatar_url}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={itemUser.login}
                                secondary={`github: ${itemUser.url}`}
                            />
                        </Link>
                    </ListItem>
                )}
            </List>}
            {isLoading && <div>Loading...</div>}
            {error && <span>{error}</span>}
            {users?.length !== totalCount && <div ref={observerTarget}/>}
        </div>

    )
}