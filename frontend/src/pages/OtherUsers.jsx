import React, { useEffect } from 'react'
import OtherUser from './OtherUser';;
import {useDispatch, useSelector} from "react-redux";
import { fetchLawyers } from '../store/slice/userSlice';


const OtherUsers = () => {
    // my custom hook
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchLawyers());
       
      }, [dispatch]);
    const {lawyers} = useSelector(store=>store.user);

    if (!Array.isArray(lawyers)) return; // early return in react
     
    return (
        <div className='overflow-auto flex-1'>
            {
                lawyers?.map((user)=>{
                    return (
                        <OtherUser key={user._id} user={user}/>
                    )
                })
            }
            
        </div>
    )
}

export default OtherUsers