import Image from 'next/image'
import Header from './_components/Header'
import Hero from './_components/Hero'
import hero from "../../public/hero.png"
import Footer from './_components/Footer'


export default function Home() {
  return (
    <main className='bg-[#1B2430] min-h-screen flex flex-col gap-3 items-center'>
      <div className='w-full'>
        <Header />
      </div>
      <div className='flex items-center max-w-4xl bg-[#2c394bdf] rounded-full border shadow-md px-10 py-3 justify-center my-8 '>
        <h5 className='text-white text-sm'>Over 1k people have become a part of this community 🎉 </h5>
      </div>
      <div className='w-full'>
        <Hero />
      </div>
      <div className='border mb-40'>
        <Image src={hero} alt='hero' className='object-contain' />
      </div>
      <div className='w-full'>
        <Footer />
      </div>
    </main>
  )
}
