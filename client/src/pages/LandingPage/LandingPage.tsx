import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen min-w-screen bg-sky-700 p-6 flex flex-col gap-2">
      <div className="text-4xl font-bold text-white">MyCoin</div>
      <div className="flex flex-col items-center justify-center w-1/2 mx-auto h-full flex-1 gap-10">
        <div className="flex flex-col gap-2 text-center">
          <div className="text-3xl text-white font-bold">
            MyCoin is the electronic money system
          </div>
          <div className="text-white font-medium text-lg">
            Please select a method to join with us
          </div>
        </div>
        <div className="flex bg-white shadow-lg rounded-2xl p-6 gap-4 w-full justify-between">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-bold">Create a new wallet</div>
            <div>
              If you don't have an account, create one so you can join us
            </div>
          </div>
          <Link to="create">
            <Button colorScheme="blue">Create</Button>
          </Link>
        </div>
        <div className="flex bg-white shadow-lg rounded-2xl p-6 gap-4 w-full justify-between">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-bold">Sign in</div>
            <div>Log in to your wallet to see the necessary information</div>
          </div>
          <Link to="login">
            <Button colorScheme="blue">Sign in</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
