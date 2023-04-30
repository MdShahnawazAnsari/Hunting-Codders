import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Axios from "axios";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";

import {
  Grid,
  Stack,
  TextField,
  Button,
  AlertTitle,
  Alert,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const slugs = [];

const AddBlogs = () => {
  const router = useRouter();

  const [input, setInput] = useState({
    title: "",
    author: "Hunting Codders",
    category: "horizontal",
    desc: "",
  });
  const [image, setImage] = useState(null);
  const [generateSlug, setGeneratedSlug] = useState("");
  const [slugIncludes, setSlugIncludes] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSlug = (e) => {
    setGeneratedSlug(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.title.length > 4 &&
      generateSlug.length > 4 &&
      input.author.length > 4 &&
      input.category.length > 4 &&
      input.desc.length > 4
    ) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      let res = await Axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      postBlog(res.data.secure_url);
    } else {
      setShowAlert({
        show: true,
        message: "incompleate form",
        type: "error",
      });
      setTimeout(() => setShowAlert({ show: false }), 3000);
    }
  };

  const postBlog = async (imgUrl) => {
    const token = localStorage.getItem("token");
    try {
      let blogRes = await Axios.post(
        `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/addblogs`,
        {
          title: input.title,
          slug: generateSlug,
          author: input.author,
          category: input.category,
          desc: input.desc,
          img: imgUrl,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setShowAlert({
        show: true,
        message: "Succesfully Uploaded The blog",
        type: "success",
      });
      setTimeout(() => setShowAlert({ show: false }), 3000);
    } catch (error) {
      setShowAlert({
        show: true,
        message: "SomeThing happned , unable to upload the blog",
        type: "error",
      });
      setTimeout(() => setShowAlert({ show: false }), 3000);
    }
  };

  const fetchSlug = async () => {
    const token = localStorage.getItem("token");
    let slug = await Axios.get(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/getallslugs`,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    slug?.data?.allSlugs?.map((i) => {
      if (!slugs.includes(i.slug)) slugs.push(i.slug);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/admin/auth/login");
    fetchSlug();
  }, []);
  useEffect(() => {
    setSlugIncludes(slugs.includes(generateSlug));
  }, [generateSlug]);

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
              <BaseCard title="Add Blog">
                <Stack spacing={3}>
                  <TextField
                    id="title"
                    required={true}
                    label="Title"
                    variant="outlined"
                    value={input.title}
                    name="title"
                    onChange={(e) => {
                      handleChange(e);
                      setGeneratedSlug(
                        e.target.value.toLowerCase().split(" ").join("-")
                      );
                    }}
                  />
                  <TextField
                    id="slug"
                    required
                    label="Slug"
                    placeholder="this-is-an-example-slug"
                    variant="outlined"
                    value={generateSlug}
                    name="slug"
                    onChange={(e) => {
                      handleSlug(e);
                    }}
                  />
                  {slugIncludes ? (
                    <div className="text-[red]">
                      Slug is Already Present In The Database Try Onther One
                    </div>
                  ) : (
                    <div className="text-[green]">Slug is Available</div>
                  )}
                  <TextField
                    id="author"
                    label="author"
                    value={input.author}
                    required
                    variant="outlined"
                    name="author"
                    onChange={(e) => handleChange(e)}
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
                    value={input.category}
                    name="category"
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    id="description"
                    label="Description"
                    required
                    multiline
                    value={input.desc}
                    rows={4}
                    name="desc"
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

export default AddBlogs;
