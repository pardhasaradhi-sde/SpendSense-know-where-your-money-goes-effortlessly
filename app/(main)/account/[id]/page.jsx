import { getAccountWithTransaction } from "@/actions/accounts";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { TransactionTable } from "../_components/transactiontable";
import { BarLoader } from "react-spinners";
import {AccountChart} from "../_components/accountchart";

const Accountpage = async ({ params }) => {
  const { id } = await params;
  const accountData = await getAccountWithTransaction(id);
  if (!accountData) {
    notFound();
  }
  const { transactions, ...account } = accountData;
  return (
    <div className="max-w-screen-2xl w-full mx-auto space-y-8 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>
        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold ">
            ${parseFloat(account.balance).toFixed(2)}
            <p className="text-sm text-muted-foreground">
              {accountData.transactions.length} Transactions
            </p>
          </div>
        </div>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default Accountpage;
