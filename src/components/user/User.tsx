import './User.scss'



const User = ({ user }: any) => {
  
    let {name, username, phone, email } = user

  return (
      <div className="user">
        <div className="user-item">{name}</div>
        <div className="user-item">{username}</div>
        <div className="user-item">{phone}</div>
        <div className="user-item">{email}</div>
      </div>
    )
}
export default User;

