import { useProfile } from 'hooks'
const Profile = () => {
  const {user, usersData, handleLogout} = useProfile()
  return (
    <div className='profileContent'>
      <h2>Hello {user?.username}</h2>
      <ul>
        {usersData.map((d, idx) => (
          <li key={idx}>{d.email}, {d.username}</li>
        ))}
      </ul>
      <p style={{textAlign: "center"}}>Welcome to your profile</p>
      <button className='logout-btn' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
