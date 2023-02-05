import $ from 'jquery'
import {v4} from 'uuid'

const Header = ({brands, add_brand}) => {
    function addBrand(){
        let pass = true;
        if($('#insertBrand').val() == ''){
            alert("Brand Name can't be empty");
        }
        else{
            // brands.map((brand) => {
            //     if($('#insertBrand').val().toLowerCase() == brand.name.toLowerCase()){
            //         alert("Brand Name can't be repeat");
            //         pass = false;
            //     }
            // });
            if (pass){add()}
        }
    }

    async function add() {
        let clear = new Promise((resolve, reject) => {
            add_brand((prevBrand)=>{
                let value = $('#insertBrand').val();
                return [...prevBrand, {
                    id:v4(), 
                    name:value, 
                    cashtag:'', 
                    qFilter:'', 
                    qFilterLinks:true, 
                    qFilterReplies:true, 
                    lang:'en', 
                    qFilterVerified:false, 
                    qLocation:'', 
                    qStartTime:NaN, 
                    qEndTime:NaN, 
                    qWithinTime:NaN,
                    qMinLike:0,
                    qMinRetweets:0,
                    qMinReplies:0,
                    sa_rmEmoji:true,
                    anaURL:false
                }];
            });
            resolve("");
        });
        let empty = await clear;
        $('#insertBrand').val(empty)
    }
    return (
        <div className="homeHeader">
            <div>Tweets Analysis</div>
            <div id="insertInput">Topic: <input id="insertBrand" type="text" autoComplete="off"/><input type="button" value="Insert" onClick={addBrand}/></div>
        </div>
    );
}

export default Header