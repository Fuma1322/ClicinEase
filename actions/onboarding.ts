"use server"
import WelcomeEmail from "@/components/Emails/welcome-email";
import  {prismaClient } from "@/lib/db";

import { Resend } from "resend";

export async function createDoctorProfile(formdata: any) {
    // const resend = new Resend(process.env.RESEND_API_KEY);
    const { 
        page,
        firstName,
        lastName,
        middleName,
        dob,
        gender,
        userId,
        trackingNumber,
        
    } = formdata;
    try {
        const newProfile = await prismaClient.doctorProfile.create({
            data: {
                page,
                firstName,
                lastName,
                middleName,
                dob,
                gender,
                userId,
                trackingNumber,
            },
        });
        console.log(newProfile);
        return {
            data: newProfile,
            status: 201,
            error: null,
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: 500,
            error: "Something went wrong"
        };
    }
}

export async function updateDoctorProfile(id:string | undefined, data: any) {
    if (id) {
      try {
        const updatedProfile = await prismaClient.doctorProfile.update({
          where:{
            id
          },
          data,
        });
        console.log(updatedProfile);
        return {
            data: updatedProfile,
            status: 201,
            error: null,
        };
      } catch (error) {
        return {
            data: null,
            status: 500,
            error: "Profile was not updated."
        };
        console.log(error)
      }
    }
  }

  export async function getApplicationByTrack(trackingNumber:string) {
    if(trackingNumber){
     try {
       const existingProfile = await prismaClient.doctorProfile.findUnique({
         where:{
           trackingNumber,
         }
       })

       if(!existingProfile) {
        return {
          data: null,
          status: 404,
          error: "Wrong Tracking Number",
      };
       }
       return {
        data: existingProfile,
        status: 200,
        error: null,
    };
     } catch (error) {
       console.log(error)
       return {
        data: null,
        status: 500,
        error: "Something went wrong",
    };
     }
    } 
   }

   export async function getDoctorById(id:string) {
    if(id){
     try {
       const existingProfile = await prismaClient.doctorProfile.findUnique({
         where:{
           id
         }
       })

       if(!existingProfile) {
        return {
          data: null,
          status: 404,
          error: "Wrong Tracking Number",
      };
       }
       return {
        data: existingProfile,
        status: 200,
        error: null,
    };
     } catch (error) {
       console.log(error)
       return {
        data: null,
        status: 500,
        error: "Something went wrong",
    };
     }
    } 
   }

   export async function createAvailability(data: any) {
  }
  
   export async function updateAvailabilityById(id: string |undefined, data:any ) {
  }

   export async function completeProfile(id: string|undefined, data: any){
            const resend = new Resend(process.env.RESEND_API_KEY);
            if (id){
                try{
                    const existingProfile = await prismaClient.doctorProfile.findUnique({
                        where:{
                            id,
                        }
                    });
                    if (!existingProfile){
                        return {
                            data: null,
                            status: 404,
                            error: "Profile Not Found",
                        };
                    }
                    // send welcome email
                    const firstName = existingProfile.firstName;
                    const email = existingProfile.email as string
                    const previewText = "Welcome to ClinicEase";
                    const message =
                    "Thank you for joining Clinicease. we are so grateful to have you onboard ";
                    const sendMail = await resend.emails.send({
                    from: "ClinicEase <bookings@clinicease.tech>",
                     to: email,
                     subject: "Welcome to ClinicEase",
                     react: WelcomeEmail({ firstName,previewText, message }),
                    });
                    const updatedProfile = await prismaClient.doctorProfile.update({
                         where:{
                            id,
                        },
                        data,
                    });
                    console.log(updatedProfile);
                    return {
                        data: updatedProfile,
                        status: 201,
                        error: null,
                    };
                } catch (error){
                    console.log(error);
                     return {
                        data: null,
                        status:500,
                        error: "Profile was not updated",
                    }
                }
            }
            }

            export async function getDoctorProfileById(userId:string | undefined) {
              if (userId) {
                try {
                  const profile = await prismaClient.doctorProfile.findUnique({
                    where: {
                      userId,
                    },
                    include : {
                      availability : true,
                    }
                  });
                  console.log(profile);
                  return {
                      data: profile,
                      status: 200,
                      error: null,
                  };
                } catch (error) {
                  return {
                      data: null,
                      status: 500,
                      error: "Profile was not fetched."
                  };
                  console.log(error)
                }
              }
            }
   