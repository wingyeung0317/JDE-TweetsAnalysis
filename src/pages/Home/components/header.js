import $ from 'jquery'

const Header = ({add_brand}) => {
    const addBrand = () => {
        add_brand((prevBrand)=>{
            return [...prevBrand, $('#insertBrand').val()];
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