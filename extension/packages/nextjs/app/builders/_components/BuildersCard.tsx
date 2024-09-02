"use client";

import NextLink from "next/link";
import clsx from "clsx";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { BuilderInsert } from "~~/services/database/repositories/builders";

export const BuildersCard = ({ builder }: { builder: BuilderInsert }) => {
  const { address: connectedAddress } = useAccount();

  return (
    <div
      key={builder.id}
      className={clsx("card bg-base-200 text-secondary-content border border-gray-300 rounded-none", {
        "bg-green-200": builder.id === connectedAddress,
      })}
    >
      <NextLink href={`/builders/${builder.id}`} passHref>
        <div className="card-body p-4 pt-6">
          <Address address={builder.id} disableAddressLink={true} />
        </div>
      </NextLink>
    </div>
  );
};
