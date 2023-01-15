import { useState } from "react";
import Header from "./components/header";
import List from "./components/list";
import $ from "jquery"
import { EXPORT_BRANDS } from "../../global/constrants";

const Home = () => {
    const [brands, set_brand] = useState([]);
    function eBrands(){
        let exportVal = '{';
        let i = 0
        brands.map((brand) => {
            exportVal += '"brand'+i+'": "'+brand.name+'", '
            i+=1
        });
        exportVal = exportVal.substring(0, exportVal.length - 2)
        exportVal += '}'
        exportVal = JSON.parse(exportVal);
        console.log(JSON.stringify(exportVal));

        $.post(EXPORT_BRANDS, JSON.stringify(exportVal),
            function(brand_list){
                alert("Data Returned From Python: " + brand_list);
            });
    }
    return (
        <div>
            <Header brands={brands} add_brand={set_brand}/>
            <List brands={brands} del_brand={set_brand}/>
            <button id="submit" onClick={eBrands}>Submit</button>
        </div>
    );
}

export default Home