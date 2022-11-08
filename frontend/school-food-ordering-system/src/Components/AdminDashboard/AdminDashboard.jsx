import React, { useEffect, useState } from 'react'

//component that will render all paid users of the system
//also will render deleted users of the system(after user pays)
function AdminDashboard() {
  const[paidStudents, setPaidStudents] = useState();

  //after initial render of component, fetch all paid users from database
  useEffect(()=>{
    async function fetchPaidStudents(){
      let response = await fetch('/PlacedOrders');
      let paidStudents = await response.json();
      setPaidStudents(paidStudents)
    }
    fetchPaidStudents();
  }, [])

  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard