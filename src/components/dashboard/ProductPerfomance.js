import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Axios from "axios";

import FeatherIcon from "feather-icons-react";
import {
  Typography,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  AlertTitle,
  Alert,
} from "@mui/material";

import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";

function extractPublicId(url) {
  // Get the last part of the URL after the last slash
  const filename = url.substring(url.lastIndexOf("/") + 1);

  // Remove the file extension
  const publicId = filename.substring(0, filename.lastIndexOf("."));
  return publicId;
}

const convetDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  return dateObj.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }); // "04/20/2023"
};

const ProductPerfomance = ({ data, showDelete }) => {
  const router = useRouter();
  let blogs = data?.allBlogs;

  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleDelete = async (url, id) => {
    try {
      let res = await Axios.delete(
        `${process.env.NEXT_PUBLIC_DEV_URL}/api/blogs/deleteblogs`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
          data: {
            _id: id,
            public_id: extractPublicId(url),
          },
        }
      );
      setShowAlert({
        show: true,
        message: "Succesfully Deleted The blog",
        type: "success",
      });
      setTimeout(() => setShowAlert({ show: false }), 3000);
    } catch (error) {
      console.log(error);
      setShowAlert({
        show: true,
        message: "Something Went Wrong unable to deleate blog",
        type: "error",
      });
      setTimeout(() => setShowAlert({ show: false }), 3000);
    }
  };

  return (
    <BaseCard title="Product Perfomance">
      {showAlert.show && (
        <Alert severity={showAlert.type}>
          <AlertTitle>{showAlert.type}</AlertTitle>
          {showAlert.message}
        </Alert>
      )}
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="inherit">
                S.No
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="inherit">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="inherit">
                Author
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="inherit">
                Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color="textSecondary"
                align="center"
                variant="inherit"
              >
                Image
              </Typography>
            </TableCell>
            <TableCell>
              {showDelete && (
                <Typography
                  color="textSecondary"
                  align="right"
                  variant="inherit"
                >
                  Edit/Delete
                </Typography>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs?.map((item, index) => (
            <TableRow key={item?._id}>
              <TableCell>
                <Typography color="textSecondary" variant="inherit">
                  {index + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textsecondary"
                  variant="inherit"
                  noWrap={true}
                >
                  {item?.title.slice(0, 40)}...
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="inherit">
                  {item?.author}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="inherit">
                  {convetDate(item?.createdAt)}
                </Typography>
              </TableCell>
              <TableCell variant="inherit" align="right">
                <Image
                  src={item?.img}
                  width={200}
                  height={200}
                  className="object-cover aspect-[16/12]"
                  alt={item?.title}
                />
              </TableCell>
              {showDelete && (
                <TableCell align="right" variant="inherit">
                  <Stack spacing={2} direction="row">
                    <Link href={`/admin/editblog/${item?.slug}`}>
                      <IconButton aria-label="edit" color="success">
                        <FeatherIcon icon="edit" width="20" height="20" />
                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(item?.img, item?._id)}
                    >
                      <FeatherIcon icon="trash" width="20" height="20" />
                    </IconButton>
                  </Stack>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default ProductPerfomance;
