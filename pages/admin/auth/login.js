import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = await Axios.post(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/user/getuser`,
      {
        email: credentials.email,
        password: credentials.password,
      }
    );
    const token = user.data.token;
    if (token) {
      localStorage.removeItem("token");
      localStorage.setItem("token", token);
      setTimeout(() => {
        router.push("/admin");
      }, 3000);
    } else {
      console.log("Unable To LogIn");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/admin");
  }, []);

  return (
    <main>
      <div className="flex flex-col my-20 justify-center items-center border max-w-[70%] mx-auto">
        <h1 className="text-center font-bold text-[2rem]">Login Form</h1>
        <div className="flex justify-center items-center mt-4">
          <button className="py-2 px-4 mx-2 border-black border-[2px] bg-orange-600 rounded">
            Login
          </button>
          <button className="py-2 px-4 mx-2 border-black border-[2px] rounded">
            <Link href="/admin/auth/signup">SignUp</Link>
          </button>
        </div>
        <div className="mt-12">
          <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
            <label
              htmlFor="email"
              className="border-black border-[2px] my-2 rounded"
            >
              <input
                type="email"
                name="email"
                className="focus:border-none px-4 py-1 outline-none w-full"
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
            <button
              type="submit"
              className={`mx-auto mt-8 py-1 border-black border-[2px] w-[70%] bg-orange-600 rounded ${
                !credentials.password || credentials.password.length < 8
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                !credentials.password || credentials.password.length < 8
              }
            >
              Login
            </button>
          </form>
        </div>
        <div className="mt-2 mb-8">
          <p>
            Create An Account{" "}
            <span className="cursor-pointer font-bold">
              <Link href="/admin/auth/signup">Signup Now</Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
