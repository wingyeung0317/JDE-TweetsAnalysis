import { useState, useRef } from 'react'
import {v4} from 'uuid'

const Brand = ({id, name, info, allInfo, sty, sty2, set_brand, index}) =>{
    function delBrand(){
        set_brand((prev) => {
            return prev.filter(item => item.id !== id)
        })
    }

    // {
    //     id:v4(), 
    //     name:String, 
    //     cashtag:String, 
    //     qFilter:String, 
    //     qFilterLinks:Boolean, 
    //     qFilterReplies:Boolean, 
    //     lang:String, 
    //     qFilterVerified:Boolean, 
    //     qLocation:String, 
    //     qStartTime:Number, 
    //     qEndTime:Number, 
    //     qWithinTime:String
    // }


    const [rmURL_checked, set_rmURL_checked] = useState(true);
    const rmURL = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qFilterLinks = !rmURL_checked;
                return contant;
            }else{
                return contant;
            };
        })
        set_rmURL_checked(!rmURL_checked);
        set_brand(next);
        console.log(info);
    };

    const [rmReply_checked, set_rmReply_checked] = useState(true);
    const rmReply = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qFilterReplies = !rmReply_checked;
                return contant;
            }else{
                return contant;
            };
        })
        set_rmReply_checked(!rmReply_checked);
        set_brand(next);
        console.log(info);
    };

    const [filterQ, setFilterQ] = useState('');
    return (
        <span id={id} className={sty}>
            <center className='brandName'>{name}</center>
            (Filter Tweets)
            <div>Filter out: (Useful to filter out Junk Tweets)<input type="text" placeholder='-keyword1 -"keyword 2"' value={filterQ} onChange={(event) => setFilterQ(event.target.value)}/></div>
            <div><input type="checkbox" id={v4()} checked={rmURL_checked} onChange={rmURL}/>Remove tweets with URL? (Useful to filter out Junk Tweets)</div>
            <div><input type="checkbox" id={v4()} checked={rmReply_checked} onChange={rmReply}/>Remove Replies Tweets?</div>
            <div className='delBtn'><input type="button" value="Delete" className={sty2} onClick={delBrand}/></div>
        </span>
    );
}

export default Brand