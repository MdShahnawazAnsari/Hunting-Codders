import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";

import { Grid } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";

const Table = ({ blogs }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/admin/auth/login");
  }, []);
  return (
    <>
      <style jsx global>{`
        #header,
        #footer,
        #news_letter {
          display: none;
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <ProductPerfomance data={blogs} showDelete={true} />
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default Table;

export async function getServerSideProps(context) {
  let blogs = await Axios.post(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/getallblogs?page=1`
  );

  // Remove the headers property from the blogs object
  blogs = JSON.parse(JSON.stringify(blogs.data));
  return {
    props: { blogs }, // will be passed to the page component as props
  };
}
