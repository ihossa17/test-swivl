import Head from "next/head";
import {FilterUsers} from "@/components/MainPage/FilterUsers/FilterUsers";

export default function Home() {
  return (
    <>
      <Head>
        <title>Githab finder</title>
        <meta name="description" content="Search githab" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <FilterUsers />
      </main>
    </>
  );
}
