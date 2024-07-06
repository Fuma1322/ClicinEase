import React from 'react'

export default function page({params:{id}}:{params:{id:string}}) {
  return (
    <div>
        <h2>Welcome Doctor - {id} </h2>
    </div>
  )
}
