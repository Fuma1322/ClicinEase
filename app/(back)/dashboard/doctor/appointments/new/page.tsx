import { getDoctors } from '@/actions/users';
import DoctorCard from '@/components/DoctorCard';

// Component for selecting doctors for new appointments
export default async function NewAppointment() {
  const doctors = (await getDoctors()) || [];

  // Filter doctors based on operation mode
  const telhealthDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "TeleHealth visit"
  );
  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person visit"
  );

  console.log(inpersonDoctors); // Logging in-person doctors

  return (
    <section className="">
      <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">Select the Doctor to Continue</h2>

      {/* Render TeleHealth doctors section if there are any */}
      {telhealthDoctors && telhealthDoctors.length > 0 && (
        <div className="py-4">
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">TeleHealth Doctors</h2>
          <div className="grid place-items-center">
            {telhealthDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} isInPerson={false} doctor={doctor} />
            ))}
          </div>
        </div>
      )}

      {/* Render In-person doctors section if there are any */}
      {inpersonDoctors && inpersonDoctors.length > 0 && (
        <div className="py-4">
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">In-person Doctors</h2>
          <div className="grid place-items-center">
            {inpersonDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} isInPerson={true} doctor={doctor} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
