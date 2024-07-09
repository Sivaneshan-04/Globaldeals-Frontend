'use client';
import { SfButton, SfIconVisibility, SfIconVisibilityOff, SfInput, SfLoaderCircular } from '@storefront-ui/react'
import Link from 'next/link';
import React, { useState } from 'react'
import { postData } from '../../utils/postData';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setJWTokens, setUserCookies } from '../../utils/setCookies';

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });

    setIsLoading(true);

    try{
      const resp = await postData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/login`, {email, password});
      console.log(resp);      
      if(resp){
        toast.success('Login successful');
        await setUserCookies(JSON.stringify(resp.user.name));
        await setJWTokens(JSON.stringify(resp.tokens));
        router.push('/');
      }

    }catch(error){
      console.error(error);
      toast.error('An error occurred. Please try again');
    }finally
    {
      setIsLoading(false);
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="flex flex-col max-w-full gap-3 p-6 mt-8 bg-white border border-gray-200 border-solid shadow w-96 rounded-xl border-opacity-70 max-md:px-5"
  >
 <h2 className='text-center font-bold text-2xl text-green-600 mb-4'>Login to GlobalDeals</h2>    <label>
      <span>
        Email Address <span className="text-red-500">*</span>
      </span>
    <SfInput
      type="email"
      id="emailInput"
      size='lg'
      placeholder="Enter your email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
</label>
<label>
  <span>
    Password <span className="text-red-500">*</span>
  </span>

    <SfInput
      id="passwordInput"
      placeholder="Enter your password"
      required
      size='lg'
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
      type={isVisible ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </label>
    <div className="flex justify-between w-full gap-3 mt-3">
      {/* <p className="my-auto text-sm leading-5 text-ellipsis text-zinc-500">
        <Link href="/forgot-password" passHref legacyBehavior>
          <a className="inline-flex text-green-500">Forgot password?</a>
        </Link>
      </p> */}
    </div>
    {isLoading ? (
      <SfLoaderCircular className='items-center' />
    ) : (
      <SfButton  type="submit" className="mt-3 font-medium">
        Login
      </SfButton>
    )}
    <div className="flex items-center justify-center gap-2 mt-6 text-xs leading-4 text-center text-zinc-500">
      <div className="self-stretch flex-1 h-px my-auto shrink-0 bg-zinc-200"></div>
      <div className="self-stretch" aria-hidden="true">
        OR
      </div>
      <div className="self-stretch flex-1 h-px my-auto shrink-0 bg-zinc-200"></div>
    </div>
    {/* <SfButton className="mt-6" variant='secondary'>
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
    <div className="flex items-center justify-center mt-4">
      <p className="text-black">
        Need to create an account?{" "}
        <Link href="/signup" passHref legacyBehavior>
          <a className="inline-flex text-green-500">Sign Up</a>
        </Link>
      </p>
    </div>
  </form>
  )
}

export default SigninPage
