"use server"
import { prismaClient } from "@/lib/db";

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
       const existingProfile = await prismaClient.doctorProfie.findUnique({
         where:{
           trackingNumber
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
       const existingProfile = await prismaClient.doctorProfie.findUnique({
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

   