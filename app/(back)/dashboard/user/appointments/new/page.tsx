import { getDoctors } from '@/actions/users';
import DoctorCard from '@/components/DoctorCard';

export default async function NewAppointment() {
  try {
    const doctors = (await getDoctors()) || [];
    console.log("Fetched doctors in NewAppointment:", doctors);

    const telhealthDoctors = doctors.filter(
      (doctor) => doctor.doctorProfile?.operationMode === "Telehealth visit"
    );
    const inpersonDoctors = doctors.filter(
      (doctor) => doctor.doctorProfile?.operationMode === "In-person visit"
    );

    console.log("Telehealth doctors:", telhealthDoctors);
    console.log("In-person doctors:", inpersonDoctors);

    return (
      <section className="">
        <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">Select the Doctor to Continue</h2>

        {telhealthDoctors.length > 0 && (
          <div className="py-4">
            <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">TeleHealth Doctors</h2>
            <div className="grid place-items-center">
              {telhealthDoctors.map((doctor) => {
                console.log("Rendering Telehealth doctor:", doctor);
                return <DoctorCard key={doctor.id} isInPerson={false} doctor={doctor} />;
              })}
            </div>
          </div>
        )}

        {inpersonDoctors.length > 0 && (
          <div className="py-4">
            <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">In-person Doctors</h2>
            <div className="grid place-items-center">
              {inpersonDoctors.map((doctor) => {
                console.log("Rendering In-person doctor:", doctor);
                return <DoctorCard key={doctor.id} isInPerson={true} doctor={doctor} />;
              })}
            </div>
          </div>
        )}
      </section>
    );
  } catch (error) {
    console.error("Error in NewAppointment component:", error);
    return (
      <div>Error loading doctors. Please try again later.</div>
    );
  }
}
