import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Axios from "axios";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FullLayout from "../../../src/layouts/FullLayout";
import theme from "../../../src/theme/theme";

import {
  Grid,
  Stack,
  TextField,
  Button,
  AlertTitle,
  Alert,
} from "@mui/material";
import BaseCard from "../../../src/components/baseCard/BaseCard";

const EditBlog = ({ blog }) => {
  const { singleBlog } = blog;

  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [image, setImage] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [input, setInput] = useState({
    title: singleBlog.title,
    author: singleBlog.author,
    category: singleBlog.category,
    desc: singleBlog.desc,
  });
  const router = useRouter();

  const uploadImage = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );
        let imgSecureUrl = await Axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        setImageLink(imgSecureUrl.data.secure_url);
      } catch (error) {
        console.log(error);
      }
    } else {
      setImageLink(singleBlog?.img);
    }
  };

  const editBlog = async () => {
    const token = localStorage.getItem("token");
    try {
      let blogRes = await Axios.post(
        `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/editblogs`,
        {
          _id: singleBlog._id,
          title: input.title,
          author: input.author,
          category: input.category,
          desc: input.desc,
          img: imageLink,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setShowAlert({
        show: true,
        message: "Blog Added Scuccesfully",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setShowAlert({
        show: true,
        message: "Unable to Edit Blog",
        type: "error",
      });
    }
    setTimeout(() => setShowAlert({ show: false }), 3000);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.title.length > 5 &&
      input.author.length > 5 &&
      input.category.length > 3 &&
      input.desc.length > 5
    ) {
      await uploadImage();
      imageLink && editBlog();
    } else {
      setShowAlert({
        show: true,
        message:
          "incompleate form, all input field should be more then 5 Charecters",
        type: "warning",
      });
      setTimeout(() => setShowAlert({ show: false }), 3000);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/admin/auth/login");
    // console.log(input.title.length);
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
              {showAlert.show && (
                <Alert severity={showAlert.type}>
                  <AlertTitle>{showAlert.type}</AlertTitle>
                  {showAlert.message}
                </Alert>
              )}
              <BaseCard title="Edit Blog">
                <Stack spacing={3}>
                  <TextField
                    id="title"
                    required={true}
                    label="Title"
                    variant="outlined"
                    defaultValue={singleBlog?.title}
                    name="title"
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    id="author"
                    label="author"
                    required
                    variant="outlined"
                    name="author"
                    defaultValue={singleBlog?.author}
                    onChange={(e) => handleChange(e)}
                  />
                  <Image
                    src={singleBlog?.img}
                    width={250}
                    height={250}
                    className="object-cover aspect-[16/12]"
                    alt={singleBlog?.title}
                  />
                  <TextField
                    id="img"
                    required
                    variant="outlined"
                    type="file"
                    name="img"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <TextField
                    id="category"
                    required
                    label="Category"
                    variant="outlined"
                    name="category"
                    defaultValue={singleBlog?.category}
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    id="description"
                    label="Description"
                    required
                    multiline
                    rows={4}
                    name="desc"
                    defaultValue={singleBlog?.desc}
                    onChange={(e) => handleChange(e)}
                  />
                </Stack>
                <br />
                <Button onClick={handleSubmit} variant="outlined" mt={2}>
                  Submit
                </Button>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default EditBlog;

export async function getServerSideProps(context) {
  let blog = await Axios.post(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/getsingleblog?slug=${context.query.slug}`
  );

  // Remove the headers property from the blogs object
  blog = JSON.parse(JSON.stringify(blog.data));
  return {
    props: { blog }, // will be passed to the page component as props
  };
}
