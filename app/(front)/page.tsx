import { getClinics } from '@/actions/users'
import ClinicList from '@/components/ClinicList'
import Accordion from '@/components/Frontend/FAQ'
import Footer from '@/components/Frontend/Footer'
import Hero from '@/components/Frontend/Hero'

export default async function Home() {
  const clinics = await getClinics() || [];

  console.log(clinics)
  return (
<div className='bg-black'>
    <Hero />
    {/* <ClinicList/> */}
    <Accordion />
    <Footer />
    </div>
  )
}
