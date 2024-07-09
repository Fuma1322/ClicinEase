 "use server"

import { prismaClient }  from "@/lib/db";
import { RegisterInputProps } from "@/types/types";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import EmailTemplate from "@/components/Emails/emailstemplate";
import generateSlug from "@/utils/generateSlug";

export async function createUser (formdata:RegisterInputProps) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { fullName, email, phone, password, role, plan } = formdata;
    try {
        const existingUser = await prismaClient.user.findUnique({
            where: {
              email,
            },
          });
          if (existingUser) {
            return {
              data: null,
              error: `User with this email (${email})  already exists in the Database`,
              status: 409,
            };
          }
          // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //Generate Token
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const userToken = generateToken();
    const newUser = await prismaClient.user.create({
      data: {
        name: fullName,
        email,
        phone,
        password: hashedPassword,
        role,
        plan,
        token: userToken,
      },
    });
     //Send an Email with the Token on the link as a search param
     const token = newUser.token;
     const userId = newUser.id;
     const firstName = newUser.name.split(" ")[0];
     const linkText = "Verify your Account ";
     const message =
       "Thank you for registering with Clinicease. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
     const sendMail = await resend.emails.send({
       from: "Clinic Ease <bookings@clinicease.tech>",
       to: email,
       subject: "Verify Your Email Address",
       react: EmailTemplate({ firstName, token, linkText, message }),
     });
     console.log(token);
     console.log(sendMail);
     console.log(newUser);
    return {
        data: newUser,
        error: null,
        status: 200,
      };
        // return data;
    } catch (error) {
        console.log(error)
        return {
            error: "Something went wrong"
        }
    }
    
}

export async function getUserById(id:string) {
 if(id){
  try {
    const user = await prismaClient.user.findUnique({
      where:{
        id
      }
    })
    return user
  } catch (error) {
    console.log(error)
  }
 } 
}

export async function updateUserById(id:string) {
  if (id) {
    try {
      const updatedUser = await prismaClient.user.update({
        where:{
          id
        },
        data:{
          isVerified:true,
        }
      });
      return updatedUser;
    } catch (error) {
      console.log(error)
    }
  }
}

export async function getDoctors() {
  try {
    const doctors = await prismaClient.user.findMany({
      where: {
        role: "DOCTOR"
      },
      select: {
        id: true,
        name:true,
        email:true,  
        slug:true,
        phone: true,
        doctorProfile:{
          select:{
            id:true,
            firstName:true,
            lastName:true,
            gender:true,
            bio:true,
            profilePicture:true,
            operationMode: true,
            hourlyWage: true,

            availability:{
              select:{
                monday:true,
                tuesday:true,
                wednesday:true,
                thursday:true,
                friday:true,
                saturday:true,
                sunday:true,
              },
            },
          },
        },
      }
      })
      return doctors;
    } catch (error) {
      console.log(error);
      return null;
      
    }
    }

export async function getDoctorBySlug(slug:string){
  if (slug){
    try {
      const doctor = await prismaClient.user.findFirst({
        where:{
          role:"DOCTOR",
          slug,
        },
        select: {
          id:true,
          name:true,
          email:true,
          slug:true,
          phone:true,
          doctorProfile:{
            select:{
              firstName:true,
              lastName:true,
              gender:true,
              bio:true,
              profilePicture:true,
              operationMode:true,
              hourlyWage:true,
              yearsOfExperience:true,
              country:true,
              city:true,
              state:true,
              primarySpecialization:true,
              otherSpecialities:true,
              organizationName:true,
              organizationAddress:true,
              organizationContactNumber: true,
              organizationEmailAddress: true,
              organizationWebsite: true,
              organizationHoursOfOperation: true,
              servicesOffered:true,
              insuranceAccepted:true,
              educatioHistory:true,
              research: true,
              accomplishments:true

            }
          }

        }
      })
      if (!doctor){
        return null;
      }
      return doctor; 
    } catch (error) {
      console.log(error);
    }
  }
}