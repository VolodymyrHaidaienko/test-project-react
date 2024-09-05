import './Users.scss'
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { changeUserList, getAllUser, FilterUserModel } from '../../Store/slice/user.slice';
import User from "../../components/user/User";

type newUsersList = () => FilterUserModel[];

const Users: FC = () => {
  const {usersList, status, error, searchUsersLists} = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllUser());
    }, []);
  
  const [usersvalue, setusersvalue] = useState('')

  const titleList = ['name', 'username', 'phone', 'email'];
 
  const search = (e: ChangeEvent<HTMLInputElement>) => {
    setusersvalue(e.target.value)
  };

  const newUsersList: newUsersList =() => {
    const newArrayList: any = [];
    usersList.forEach(element => {
      const { id, address, company, website, ...others } = element;
      newArrayList.push(others)
    });
    return newArrayList
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      const newArraySearchUser = newUsersList().filter((userObj) => Object.values(userObj).find(userValue => userValue.toLowerCase() == usersvalue.toLowerCase()));
      
      dispatch(changeUserList(newArraySearchUser));
      
     }, 500);
    return ()=> clearTimeout(timer)
       
  }, [usersvalue]);
  
  if (searchUsersLists.length > 0){
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={usersvalue}
          className="searchInputUser"
          onChange={search}
          />
      <div>
        <div>
          <div className="user">
           {titleList.map((titleItem, index) => <div className="user-title" key={index}>{ titleItem}</div>)}
          </div>
          
            {
            searchUsersLists.map((userItem: FilterUserModel, index) => <User key={index} user={userItem} />)
          }
        </div>
      </div>
    </div>
        )
    }else if (newUsersList()) {
        return (
          <div>
        <input
          type="text"
          placeholder="Search..."
          value={usersvalue}
          className="searchInputUser"
          onChange={search}
          />
      <div>
        {status == 'pending' && <h1>Loading...</h1>}
        {error && <h2>{error}</h2>}
        <div>
          <div className="user">
           {titleList.map((titleItem, index) => <div className="user-title" key={index}>{ titleItem}</div>)}
          </div>
          
            {
            newUsersList().map((userItem: FilterUserModel, index) => <User key={index} user={userItem} />)
          }
        </div>
      </div>
    </div>
        );
  } else {
    return (
         <div>
        {status == 'pending' && <h1>Loading...</h1>}
        {error && <h2>{error}</h2>}
      </div>
       )
    }
  
}
export default Users;