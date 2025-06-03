'use server'
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"; 
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/actions/sendEmails";
import EmailTemplate from "@/emails/template";

export async function getCurrentBudget(accountId) {
  try{  
    const {userId}=await auth();
    if(!userId){
        throw new Error('Unauthorized');
    }
    const user=await db.user.findUnique({
        where:{
            clerkUserId:userId
        }
    });
    if(!user){
        throw new Error('User not found');
    }
    const budget=await db.budget.findFirst({
        where:{
            userId:user.id
        },
    })
    const currentDate=new Date();
    const startOfMonth=new Date(currentDate.getFullYear(),currentDate.getMonth(),1);
    const endOfMonth=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0);
    const expenses=await db.transaction.aggregate({
        where:{
            userId:user.id,
            type:'EXPENSE',
            date:{
                gte:startOfMonth,
                lte:endOfMonth
            },
            accountId,
        },
        _sum:{
            amount:true,
        }
    });
    return {
        budget:budget?{...budget,amount:budget.amount.toNumber()}:null,
        currentExpenses:expenses._sum.amount?expenses._sum.amount.toNumber():0,
    }
  }catch(error){
    console.log("error fetching the budget",error);
    throw error;      
  }
}
export async function updateBudget(amount) {
  try{
    const {userId}=await auth();
    if(!userId){
        throw new Error('Unauthorized');
    }
    const user=await db.user.findUnique({
        where:{
            clerkUserId:userId
        }
    });
    if(!user){
        throw new Error('User not found');
    }
    const budget=await db.budget.upsert({
        where:{
            userId:user.id
        },
        update:{
            amount
        },
        create:{
            userId:user.id,
            amount,
        }
    });
    revalidatePath('/dashboard');
    // Call budget alert after updating the budget
    if (budget) {
      const defaultAccount = await db.account.findFirst({ where: { userId: user.id, isDefault: true } });
      if (defaultAccount) {
        await checkAndSendBudgetAlert(user.clerkUserId, defaultAccount.id);
      }
    }
    return {success:true,budget:{...budget,amount:budget.amount.toNumber()}   }
  }catch(error){
    console.log("error updating the budget",error);
    return {succes:false,error:error.message}
  } 
}

// Utility to check and send budget alert instantly
export async function checkAndSendBudgetAlert(userId, accountId) {
  // Fetch budget and user
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      accounts: { where: { isDefault: true } },
      budgets: true,
    },
  });
  if (!user) return;
  const budget = user.budgets[0];
  const defaultAccount = user.accounts[0];
  if (!budget || !defaultAccount) return;

  // Calculate current month expenses for default account
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const expenses = await db.transaction.aggregate({
    where: {
      userId: user.id,
      accountId: defaultAccount.id,
      type: "EXPENSE",
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
  });
  const totalExpenses = expenses._sum.amount ? expenses._sum.amount.toNumber() : 0;
  const budgetAmount = budget.amount;
  const percentageUsed = (totalExpenses / budgetAmount) * 100;
  // Only send if >= 80% and not already sent this month
  const isNewMonth = (lastAlertDate, currentDate) => {
    if (!lastAlertDate) return true;
    return (
      lastAlertDate.getMonth() !== currentDate.getMonth() ||
      lastAlertDate.getFullYear() !== currentDate.getFullYear()
    );
  };
  if (
    percentageUsed >= 80 &&
    isNewMonth(budget.lastAlertSent, currentDate)
  ) {
    await sendEmail({
      to: user.email,
      subject: `Budget Alert for ${defaultAccount.name}`,
      react: EmailTemplate({
        userName: user.name,
        type: "budget-alert",
        data: {
          percentageUsed,
          budgetAmount: parseInt(budgetAmount).toFixed(1),
          totalExpenses: parseInt(totalExpenses).toFixed(1),
          accountName: defaultAccount.name,
        },
      }),
    });
    await db.budget.update({
      where: { id: budget.id },
      data: { lastAlertSent: new Date() },
    });
  }
}