import {UserPageComponent} from "@/components/UserPage/UserPage";
import {UserController} from "@/api/UserController";
import {GetServerSideProps} from "next";
import {IUser} from "@/api/interfaces";

export const getServerSideProps = (async (context) => {
    // Fetch data from external API
    const id = context.params?.id
    const user = await UserController.fetchUserByName(id as string).then(data => data).catch(() => null);

    if (!user?.id) {
        return {
            notFound: true,
        }
    }
    // Pass data to the page via props
    return { props: { user } }
}) satisfies GetServerSideProps<{ user: IUser }>

const UserPage = ({user}: { user: IUser }) => {

    return (
        <>
            <UserPageComponent user={user} />
        </>
    )
}

export default UserPage
