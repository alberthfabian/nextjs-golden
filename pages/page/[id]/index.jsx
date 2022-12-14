// Libs
import Head from "next/head";
import { useRouter } from "next/router";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Pág: {id}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Page {id}</div>
    </>
  );
};

export default Edit;
