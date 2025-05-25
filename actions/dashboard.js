'use server'
import { auth } from "@clerk/nextjs/server"
import {db} from "./generated/prisma"
const serializeTransaction=(obj)=>{
   const serialized={...obj};
   if(obj.balance)
   {
    serialized.balance=obj.balance.toNumber();
   }
}
export async function createAccount(data){
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
        //convert balance to float before saving to db
        const balancefloat=parseFloat(data.balance);
        if(isNaN(balancefloat)){
            throw new Error('Invalid balance');
        }
        //check if this is users first account
        const existingAccount=await db.account.findMany({
            where:{
                userId:user.id
            },
        });
        const shouldBeDefault=existingAccount.length===0?true:data.isDefault;
        //if this account should be default then set all other accounts to not be default 
        if(shouldBeDefault){
            await db.account.updateMany({
                where:{
                    userId:user.id,
                    isDefault:true
                },
                data:{
                    isDefault:false
                }
            });
        }
        const account=await db.account.create({
            data:{
                ...data,
                balance:balancefloat,
                userId:user.id,
                isDefault:shouldBeDefault
            },
        });
        const serializedAccount=serializeTransaction(account);
        revalidatePath("/dashboard");
        return {
            success:true,
            data:serializedAccount
        };
    }catch(err){
        throw new Error(err.message);
    }
}