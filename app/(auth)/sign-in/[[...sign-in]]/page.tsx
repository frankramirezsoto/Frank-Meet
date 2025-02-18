import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
      <div
        className="bg-random w-full h-screen hidden lg:block bg-cover overflow-y-hidden"
        style={{ backgroundImage: "url('./images/background.jpg')" }}
      >
        <div className="m-12 font-extrabold text-3xl text-white">
            <h2 className="bg-dark-1 p-3 mb-3 w-fit">Stay Connected.</h2>
            <h2 className="bg-dark-4 p-3 w-fit">Anytime, Anywhere.</h2>
          </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center mb-5">
        <Image
            src="/icons/logo.svg"
            width={52}
            height={52}
            alt="frank-meet logo"
            className="max-sm:size-10"
          />
          <p className="text-4xl ms-2 font-extralight leading-5 text-white max-sm:hidden ">
            Frank Meet
          </p>
        </div>
        <SignIn />
      </div>
    </main>
  );
};

export default SignInPage;
