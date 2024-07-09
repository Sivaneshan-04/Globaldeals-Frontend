'use client'
import {
  SfButton,
  SfIconVisibility,
  SfIconVisibilityOff,
  SfInput,
  SfLoaderCircular,
} from "@storefront-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { postData } from "../../utils/postData";
import { useRouter } from "next/navigation";
import { setJWTokens, setUserCookies } from "../../utils/setCookies";

const SignUpPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [buttonDisable, setButtonDisable] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.password === user.confirmPassword
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log({
      email: user.email,
      password: user.password,
      username: user.username,
    });

    try{
      const resp = await postData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/register`, {
        email: user.email,
        password: user.password,
        name: user.username,
      });
      console.log(resp);
      if(resp){
        toast.success('Signup successful');
        await setUserCookies(JSON.stringify(resp.user.name));
        await setJWTokens(JSON.stringify(resp.tokens.access.token));
        router.push('/login');
      }
    }catch(error){
      console.error(error,error.message);
      toast.error('An error occurred. Please try again');
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 flex-col max-w-full p-6 mt-8 bg-white border border-gray-200 border-solid shadow w-96 rounded-xl border-opacity-70 max-md:px-5"
    >
      <h2 className='text-center font-bold text-2xl text-green-600'>Signup to GlobalDeals</h2>
      <label>
        <span>
          Email Address <span className="text-red-500">*</span>
        </span>

        <SfInput
          type="email"
          size="lg"
          id="email"
          placeholder="Enter your email"
          required
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      
      <label>
        <span>
          Username <span className="text-red-500">*</span>
        </span>
      <SfInput
        type="text"
        id="username"
                  size="lg"
        placeholder="Enter your username"
        required
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
        </label>

        <label>
          <span>
            Password <span className="text-red-500">*</span>
          </span>
        
      <SfInput
        slotSuffix={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <SfIconVisibility size={14} />
            ) : (
              <SfIconVisibilityOff size={14} />
            )}
          </button>
        }
        id="password"
        placeholder="Enter your password"
        required
        type={isVisible ? "text" : "password"}
                  size="lg"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      </label>

      <label>
        <span>
          Confirm Password <span className="text-red-500">*</span>
        </span>
      
      <SfInput
        slotSuffix={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <SfIconVisibility size={14} />
            ) : (
              <SfIconVisibilityOff size={14} />
            )}
          </button>
        }
        id="confirmPassword"
        type={isVisible ? "text" : "password"}
        placeholder="Confirm your password"
        required          size="lg"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />
      </label>
      {isLoading ? (
        <SfLoaderCircular className="items-center"/>
      ) : (
        <SfButton disabled={buttonDisable} type="submit" className="mt-3 font-medium">
          Signup
        </SfButton>
      )}
      <div className="flex items-center justify-center mt-6 text-xs leading-4 text-center whitespace-nowrap text-zinc-500">
        <div className="self-stretch flex-1 h-px my-auto shrink-0 bg-zinc-200"></div>
        </div>
        {/* <span className="self-stretch">OR</span>
        <div className="self-stretch flex-1 h-px my-auto shrink-0 bg-zinc-200"></div>
      <SfButton className="mt-3" variant="secondary">
        <div className="flex items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/86b6587d7c3978e68123d2d756f48614a9c8ab05132aba370ce2ee8ba6fea75e?apiKey=6e8a6127015d45199b071b5b69920048&"
            alt="Google logo"
            className="w-5 mr-2 shrink-0 aspect-square"
          />
          Continue with Google
        </div>
      </SfButton> */}
      <div className="flex items-center justify-center mt-2">
        <p className="text-black">
          Already have an account?{" "}
          <Link href="/login" passHref legacyBehavior>
            <a className="inline-flex text-green-500">Login</a>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpPage;
