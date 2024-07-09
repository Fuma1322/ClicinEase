import RegisterFormWitBg from '@/components/Auth/Register';
import React from 'react'

export default function page({
  searchParams,
}:{
  searchParams: { [key: string]: string | string[]| undefined};
}) {
  const { role, plan } = searchParams;
  console.log(role,plan);
  return (
    <div className="">
      <RegisterFormWitBg role={role} plan={plan} />
    </div>
  )
}
