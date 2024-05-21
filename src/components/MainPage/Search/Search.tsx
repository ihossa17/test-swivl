
import React, {memo} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {useDebouncedCallback} from "use-debounce";

import styles from "./Search.module.scss";

export const Search = memo(() => {

    const searchParams = new URLSearchParams();
    const searchParamsDefault = useSearchParams();
    const search = searchParamsDefault.get('search')
    const pathname = usePathname();

    const debounced = useDebouncedCallback(
        async (query) => {
            const params = new URLSearchParams(searchParams);
            if (query) {
                params.set('search', query);
            } else {
                params.delete('search');
            }
            replace(`${pathname}?${params.toString()}`);
        }, 1000);

    const { replace } = useRouter();


    return <input
        className={styles.search}
        type="search"
        id="outlined-basic"
        placeholder="Search github profiles"
        defaultValue={search || ''}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => debounced(event.target?.value)}
    />
})