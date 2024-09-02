"use client";

import { BuildersCard } from "./BuildersCard";
import { BuilderInsert } from "~~/services/database/repositories/builders";

export const BuildersList = ({ builders }: { builders: BuilderInsert[] }) => {
  return (
    <div className="max-w-7xl container mx-auto px-6">
      {builders.length === 0 ? (
        <div role="alert" className="alert col-span-2">
          <span>No builders yet.</span>
        </div>
      ) : (
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Total Builders: {builders.length}</span>
        </h1>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {builders.map(builder => {
          return <BuildersCard key={builder.id} builder={builder} />;
        })}
      </div>
    </div>
  );
};
