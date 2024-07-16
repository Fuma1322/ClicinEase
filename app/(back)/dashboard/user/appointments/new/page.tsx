import { getDoctors } from '@/actions/users'; // Importing getDoctors function from users actions
import DoctorCard from '@/components/DoctorCard'; // Importing DoctorCard component to display doctor information

export default async function NewAppointment() {
  // Fetching list of doctors from the server
  const doctors = (await getDoctors()) || [];

  // Filtering doctors based on operation mode for telehealth visits
  const telhealthDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth visit"
  );

  // Filtering doctors based on operation mode for in-person visits
  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person visit"
  );

  console.log(telhealthDoctors);

  return ( 
    <section className="">
      {/* Section title for selecting a doctor */}
      <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">Select the Doctor to Continue</h2>

      {/* Display telehealth doctors section if there are any */}
      {telhealthDoctors && telhealthDoctors.length > 0 && (
        <div className="py-4">
          {/* Subtitle for telehealth doctors */}
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">TeleHealth Doctors</h2>
          <div className="grid place-items-center">
            {/* Mapping through telehealth doctors and displaying each DoctorCard */}
            {telhealthDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} isInPerson={true} doctor={doctor}/>
            ))}
          </div>
        </div>
      )}

      {/* Display in-person doctors section if there are any */}
      {inpersonDoctors && inpersonDoctors.length > 0 && (
        <div className="py-4">
          {/* Subtitle for in-person doctors */}
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">Inperson Doctors</h2>
          <div className="grid place-items-center">
            {/* Mapping through in-person doctors and displaying each DoctorCard */}
            {inpersonDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} isInPerson={true} doctor={doctor}/>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
