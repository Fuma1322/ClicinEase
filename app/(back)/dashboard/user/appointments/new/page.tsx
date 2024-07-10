import { getDoctors } from '@/actions/users'
import DoctorCard from '@/components/DoctorCard';
import DoctorList from '@/components/DoctorList'


export default async function NewAppointment() {
  const doctors = await getDoctors() || [];
  const telhealthDoctors = doctors.filter(
  (doctor) => doctor.doctorProfile?.operationMode === "TeleHealth visit"
  );
  const inpersonDoctors = doctor.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person visit"
  );
  console.log(inpersonDoctors)
  return ( 
    <section className="">
        <h2 className=" px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">Select the Doctor to Continue</h2>
        {telhealthDoctors && telhealthDoctors.length > 0 && (
        <div className="py-4">
        <h2 className=" px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">TeleHealth Doctors</h2>
        <div className="grid place-items-center">
            {
                telhealthDoctors.map((doctor)=>{
                    return <DoctorCard 
                    key={doctor.id} 
                    isInPerson={true} 
                    doctor={doctor}/>
                })
            }
        </div>
    </div>
    )}
    {inpersonDoctors && inpersonDoctors.length > 0 && (
        <div className="py-4">
        <h2 className=" px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">Inperson Doctors</h2>
        <div className="grid place-items-center">
            {
                inpersonDoctors.map((doctor)=>{
                    return <DoctorCard 
                    key={doctor.id} 
                    isInPerson={true} 
                    doctor={doctor}/>
                })
            }
        </div>
    </div>
    )}
    </section>
  )
}
 