import { signinApi } from "@/apis/wallet";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Back } from "iconsax-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  name: string;
  password: string;
};

const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: unknown) => signinApi(data as LoginForm),
  });

  const onSubmit = (data: LoginForm) => {
    mutate(
      { name: data.name, password: data.password },
      {
        onSuccess: () => {
          toast({
            title: "Login successful",
            description: "Welcome to Mycoin system",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          reset();
          navigate("/app");
        },
        onError: () =>
          toast({
            title: "Login failure",
            description: "Wallet name or password is incorrect",
            status: "error",
            duration: 2000,
            isClosable: true,
          }),
      }
    );
  };

  return (
    <div className="min-w-full min-h-screen bg-sky-700 flex flex-col items-center justify-center gap-8">
      <div className="text-5xl text-white  font-bold mb-4 text-center">
        MyCoin
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 p-10 rounded-2xl bg-white shadow-lg"
      >
        <div className="text-3xl uppercase font-bold mb-4 text-center">
          Log in
        </div>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel
            htmlFor="name"
            fontSize="large"
            className="font-medium text-lg mb-2"
          >
            Wallet name
          </FormLabel>
          <Input
            id="name"
            placeholder="Wallet name"
            {...register("name", {
              required: {
                value: true,
                message: "Require",
              },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel
            htmlFor="password"
            fontSize="large"
            className="font-medium text-lg mb-2"
          >
            Password
          </FormLabel>
          <PasswordInput
            id="password"
            placeholder="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Require",
              },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoading}
          type="submit"
          size="lg"
          className="w-full mt-8"
          colorScheme="blue"
        >
          Submit
        </Button>
        <Button
          type="button"
          onClick={() => navigate("/")}
          rightIcon={<Back />}
          size="lg"
          variant="outline"
          className="w-full mt-3"
          colorScheme="blue"
        >
          Back
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
