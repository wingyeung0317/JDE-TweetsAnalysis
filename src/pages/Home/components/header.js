import $ from 'jquery'
import {v4} from 'uuid'

const Header = ({add_brand}) => {
    async function addBrand() {
        let clear = new Promise((resolve, reject) => {
            add_brand((prevBrand)=>{
                let value = $('#insertBrand').val()
                console.log([...prevBrand, {id:v4(), name:value}]);
                return [...prevBrand, {id:v4(), name:value}];
            });
            resolve("");
        });
        let empty = await clear;
        $('#insertBrand').val(empty)
    }
    return (
        <div className="homeHeader">
            <div>Brands Compare</div>
            <div id="insertInput">Brand Name: <input id="insertBrand" type="text" autoComplete="off"/><input type="button" value="Insert" onClick={addBrand}/></div>
        </div>
    );
}

export default Header