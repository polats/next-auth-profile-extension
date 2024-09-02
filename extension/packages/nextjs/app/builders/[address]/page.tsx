import Form from "./_components/Form";
import { Address } from "~~/components/scaffold-eth";
import { getBuilderById } from "~~/services/database/repositories/builders";

type PageProps = {
  params: { address: string };
};

const BuilderPage = async ({ params }: PageProps) => {
  const builder = await getBuilderById(params.address);

  return (
    <div key={params.address} className="card bg-base-200 border border-gray-300 rounded-none">
      <div className="card-body p-4 pt-6">
        {<Address address={builder?.id} />}

        <div className="flex flex-wrap justify-between items-center gap-4">
          <p>Github: {builder?.github || "-"}</p>
          <p>Telegram: {builder?.telegram || "-"}</p>
          <p>E-mail: {builder?.email || "-"}</p>
        </div>

        <Form />
      </div>
    </div>
  );
};

export default BuilderPage;
