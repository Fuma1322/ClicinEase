import { getDoctors } from '@/actions/users';
import DoctorList from '@/components/DoctorList'
import Hero from '@/components/Frontend/Hero'
import Footer from '@/components/Frontend/Footer';
import TabbedSection from '@/components/Frontend/TabbedSection';
import Brands from '@/components/Frontend/Brands';

export default async function Home() {
  const doctors = await getDoctors() || [];
  const telhealthDoctors = doctors.filter(
  (doctor) => doctor.doctorProfile?.operationMode === "TeleHealth visit"
  );
  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person visit"
  );
  console.log(inpersonDoctors)
  return ( 
    <section className="">
    <Hero />
    <Brands />
    <TabbedSection />
    <DoctorList doctors={telhealthDoctors}/>
    <DoctorList className="bg-blue-50 dark:bg-slate-900 py-8 lg:py-24"
     title="In-person doctor visit" 
     isInPerson={true}
     doctors={telhealthDoctors}/>
     <Footer />
    </section>
  )
}
