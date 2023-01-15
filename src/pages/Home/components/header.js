import $ from 'jquery'
import {v4} from 'uuid'

const Header = ({add_brand}) => {
    const addBrand = () => {
        add_brand((prevBrand)=>{
            console.log([...prevBrand, {id:v4(), name:$('#insertBrand').val()}]);
            return [...prevBrand, {id:v4(), name:$('#insertBrand').val()}];
        });
    }
    return (
        <div className="homeHeader">
            <div>Brands Compare</div>
            <div id="insertInput">Brand Name: <input id="insertBrand" type="text" autoComplete="off"/><input type="button" value="Insert" onClick={addBrand}/></div>
        </div>
    );
}

export default Header