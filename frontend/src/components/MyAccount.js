import React from 'react'

function MyAccount({ user })
{
  const { first_name, last_name, phone_number, username, email } = user
  console.log(user)
  return (
    <div className='myaccount'>
      <div className='my-account-header'>
        <h1>{first_name} {last_name}</h1>
      </div>
      <div className='my-account-body'>
        <p><b>Email:</b> {email}</p>
        <p><b>Username:</b> {username}</p>
        <p><b>Phone:</b> {phone_number}</p>
      </div>
    </div>
  )
}

export default MyAccount