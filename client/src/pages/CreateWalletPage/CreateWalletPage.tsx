import { createWalletApi } from "@/apis/wallet";
import { PasswordInput } from "@/components/PasswordInput";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Back } from "iconsax-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

type CreateForm = {
  name: string;
  password: string;
  confirmPassword: string;
};

const CreateWalletPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateForm>();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: unknown) =>
      createWalletApi(data as Omit<CreateForm, "confirmPassword">),
  });

  const onSubmit = (data: CreateForm) => {
    mutate(
      { name: data.name, password: data.password },
      {
        onSuccess: () => {
          toast({
            title: "Wallet created",
            description: "We've created your wallet for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          reset();
        },
        onError: () =>
          toast({
            title: "Something wrong",
            description:
              "Wallet name is exist. Please try another name for your waller.",
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
          Create Wallet
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
            info="Should contain at least 8 characters including at least one uppercase letter, one small letter, one number, and one special character"
            placeholder="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Require",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*]).{8,}$/,
                message:
                  "The password is not strong. Please try another password",
              },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel
            htmlFor="confirmPassword"
            fontSize="large"
            className="font-medium text-lg mb-2"
          >
            Password
          </FormLabel>
          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Require",
              },
              validate: (value, formValues) =>
                value !== formValues.password
                  ? "Confirm password is incorrect"
                  : undefined,
            })}
          />
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          size="lg"
          type="submit"
          isLoading={isLoading}
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

export default CreateWalletPage;
