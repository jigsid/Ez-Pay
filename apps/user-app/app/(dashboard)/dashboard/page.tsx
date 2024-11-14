import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { P2pTransactions } from "../../../components/P2pTransactions";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { MoneyFlowCard } from "../../../components/MoneyFlowCard";

async function getUserData() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signup");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.user?.id),
    },
    include: {
      Balance: true,
      sentTransfers: true,
      receivedTransfers: true,
      OnRampTransaction: true,
    },
  });

  if (!user) {
    redirect("/api/auth/signup");
  }

  const totalMoneyIn =
    (user.OnRampTransaction.filter((t) => t.status === "Success").reduce(
      (acc, t) => acc + t.amount,
      0
    ) +
      user.receivedTransfers.reduce((acc, t) => acc + t.amount, 0)) /
    100;

  const totalMoneyOut =
    user.sentTransfers.reduce((acc, t) => acc + t.amount, 0) / 100;

  const transactions = [
    ...user.sentTransfers.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      to: t.toUserId,
      type: "sent" as const,
    })),
    ...user.receivedTransfers.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      from: t.fromUserId,
      type: "received" as const,
    })),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 5);

  const onRampTransactions = user.OnRampTransaction.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }))
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 5);

  return {
    name: user.name,
    balance: {
      amount: user.Balance[0]?.amount || 0,
      locked: user.Balance[0]?.locked || 0,
    },
    totalMoneyIn,
    totalMoneyOut,
    transactions,
    onRampTransactions,
  };
}

export default async function UserDashboard() {
  const userData = await getUserData();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="text-4xl text-[#6a51a6] mb-6 font-bold text-center">
        Welcome, {userData.name}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <BalanceCard
          amount={userData.balance.amount}
          locked={userData.balance.locked}
        />
        <MoneyFlowCard
          totalIn={userData.totalMoneyIn}
          totalOut={userData.totalMoneyOut}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
          <P2pTransactions transactions={userData.transactions} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-2">On-Ramp Transactions</h2>
          <OnRampTransactions transactions={userData.onRampTransactions} />
        </div>
      </div>
    </div>
  );
}
