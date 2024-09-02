"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { useAccount, useSignTypedData } from "wagmi";
import { UpdateBuilderBody } from "~~/app/api/builders/route";
import { EIP_712_DOMAIN, EIP_712_TYPES__SUBMISSION } from "~~/utils/eip712";
import { postMutationFetcher } from "~~/utils/react-query";
import { notification } from "~~/utils/scaffold-eth";

const Form = () => {
  const { address: connectedAddress } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const router = useRouter();
  const pathName = usePathname();

  const { mutateAsync: postUpdatedBuilder } = useMutation({
    mutationFn: (updatedBuilder: UpdateBuilderBody) => postMutationFetcher("/api/builders", { body: updatedBuilder }),
  });

  const clientFormAction = async (formData: FormData) => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    try {
      const github = formData.get("github") as string;
      const telegram = formData.get("telegram") as string;
      const email = formData.get("email") as string;

      if (!github || !telegram || !email) {
        notification.error("Please fill all the required fields");
        return;
      }

      const signature = await signTypedDataAsync({
        domain: EIP_712_DOMAIN,
        types: EIP_712_TYPES__SUBMISSION,
        primaryType: "Message",
        message: {
          github,
          telegram,
          email,
        },
      });

      await postUpdatedBuilder({
        id: connectedAddress,
        role: "user", // TODO: this sets all roles to USER, we need to add a way to set roles
        github,
        telegram,
        email,
        signature,
      });

      notification.success("Builder updated successfully!");
      router.push("/builders/");
    } catch (error: any) {
      if (error instanceof Error) {
        notification.error(error.message);
        return;
      }
      notification.error("Something went wrong");
    }
  };

  return (
    <div className="card w-[95%]">
      {pathName.split("builders/")[1] === connectedAddress && (
        <>
          <h1 className="text-center">Update Socials info below</h1>

          <form action={clientFormAction} className="card-body space-y-2 p-0 md:p-2">
            <div className="space-y-1">
              <p className="m-0 text-lg">Github profile</p>
              <div className="flex border-2 border-base-300 bg-base-200 text-accent">
                <input
                  className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-700 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-gray-300 text-gray-700"
                  placeholder="https://"
                  name="github"
                  autoComplete="off"
                  type="text"
                  maxLength={75}
                />
              </div>
            </div>
            <div className="space-y-1">
              <p className="m-0 text-lg">Your Telegram handle</p>
              <div className="flex border-2 border-base-300 bg-base-200 text-accent">
                <input
                  className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-700 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-gray-300 text-gray-700"
                  placeholder="@username"
                  name="telegram"
                  autoComplete="off"
                  type="text"
                  maxLength={75}
                />
              </div>
            </div>

            <div className="space-y-1">
              <p className="m-0 text-lg">E-mail</p>
              <div className="flex border-2 border-base-300 bg-base-200 text-accent">
                <input
                  className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-700 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-gray-300 text-gray-700"
                  placeholder="user@email.com"
                  name="email"
                  autoComplete="off"
                  type="text"
                  maxLength={75}
                />
              </div>
            </div>
            <SubmitButton />
          </form>
        </>
      )}
    </div>
  );
};

export default Form;
