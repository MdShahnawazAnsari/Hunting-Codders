import Link from "next/link";
import Axios from "axios";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    secretKey: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postUserData = async () => {
    let newUser = await Axios.post(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/user/adduser`,
      {
        secret: credentials.secretKey,
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }
    );
    const token = newUser.data.token;
    if (token) {
      localStorage.clear("token");
      localStorage.setItem("token", token);
      console.log(newUser.data.newUser);
      setTimeout(() => router.push("/admin"), 3000);
    }
    if (newUser.data.message) console.log(newUser.data.message);
    if (newUser.data.error) console.error(newUser.data.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUserData();
  };

  return (
    <main>
      <div className="flex flex-col my-20 justify-center items-center border max-w-[70%] mx-auto">
        <h1 className="text-center font-bold text-[2rem]">Login Form</h1>
        <div className="flex justify-center items-center mt-4">
          <button className="py-2 px-4 mx-2 border-black border-[2px]  rounded">
            <Link href="/admin/auth/login">Login</Link>
          </button>
          <button className="py-2 px-4 mx-2 border-black border-[2px] bg-orange-600 rounded">
            Signup
          </button>
        </div>
        <div className="mt-12">
          <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
            <label
              htmlFor="secret key"
              className="border-black border-[2px] my-2 rounded "
            >
              <input
                type="text"
                name="secretKey"
                min={4}
                className="focus:border-none px-4 py-1 outline-none w-full"
                placeholder="Type your Sekret Token here"
                value={credentials.secretKey}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="name"
              className="border-black border-[2px] my-2 rounded "
            >
              <input
                type="text"
                name="name"
                min={4}
                className="focus:border-none px-4 py-1 outline-none"
                placeholder="Type your Name here"
                value={credentials.name}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="email"
              className="border-black border-[2px] my-2 rounded"
            >
              <input
                type="email"
                name="email"
                className="focus:border-none px-4 py-1 outline-none"
                placeholder="Type your Email here"
                value={credentials.email}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="password"
              className="border-black border-[2px] my-2 rounded"
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                min={8}
                className="focus:border-none px-4 py-1 outline-none"
                placeholder="Type your Password here"
                value={credentials.password}
                onChange={handleChange}
              />
              <button
                className="relative opacity-70 top-1 right-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </button>
            </label>
            <label
              htmlFor="confirm password"
              className="border-black border-[2px] my-2 rounded"
            >
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="focus:border-none px-4 py-1 outline-none"
                placeholder="Confirm Password here"
                value={credentials.confirmPassword}
                onChange={handleChange}
              />
              <button
                className="relative opacity-70 top-1 right-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </button>
            </label>
            <button
              type="submit"
              className={`mx-auto mt-8 py-1 border-black border-[2px] w-[70%] bg-orange-600 rounded ${
                !credentials.password ||
                credentials.password !== credentials.confirmPassword ||
                credentials.password.length < 8 ||
                credentials.name.length < 3
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                !credentials.password ||
                credentials.password !== credentials.confirmPassword ||
                credentials.password.length < 8 ||
                credentials.name.length < 3
              }
            >
              SignUp
            </button>
          </form>
        </div>
        <div className="mt-2 mb-8">
          <p>
            Already Have An Account{" "}
            <span className="cursor-pointer font-bold">
              <Link href="/admin/auth/login">Login Now</Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
