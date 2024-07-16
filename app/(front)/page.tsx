import { getDoctors } from '@/actions/users'; // Importing function to fetch doctors from actions/users
import DoctorList from '@/components/DoctorList'; // Importing DoctorList component to display doctors
import Hero from '@/components/Frontend/Hero'; // Importing Hero component for homepage hero section
import Footer from '@/components/Frontend/Footer'; // Importing Footer component for the page footer
import TabbedSection from '@/components/Frontend/TabbedSection'; // Importing TabbedSection component for tabbed content
import Brands from '@/components/Frontend/Brands'; // Importing Brands component for brand display
import { Doctor } from '@/types/types'; // Importing Doctor type for TypeScript typings

export default async function Home() {
  const doctors = (await getDoctors()) || []; // Fetching list of doctors asynchronously
  const telhealthDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "TeleHealth visit" // Filtering doctors for TeleHealth visits
  );
  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person visit" // Filtering doctors for In-person visits
  );

  console.log(inpersonDoctors); // Logging In-person doctors to console

  return ( 
    <section className="">
      <Hero /> {/* Rendering Hero component for homepage */}
      <Brands /> {/* Rendering Brands component for brand display */}
      <TabbedSection /> {/* Rendering TabbedSection component for tabbed content */}
      <DoctorList doctors={telhealthDoctors} /> {/* Rendering DoctorList with TeleHealth doctors */}
      <DoctorList
        className="bg-blue-50 dark:bg-slate-900 py-8 lg:py-24"
        title="In-person doctor visit"
        isInPerson={true}
        doctors={inpersonDoctors} // Rendering DoctorList with In-person doctors
      />
      <Footer /> {/* Rendering Footer component for page footer */}
    </section>
  );
}
