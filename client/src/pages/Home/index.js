import {useState, useEffect, useCallback} from "react";
import Header from "./components/header";
import List from "./components/list";
import $ from "jquery";
import { EXPORT_BRANDS } from "../../global/constrants";

const Home = () => {
    const [brands, set_brand] = useState([]);
    const [overlayContent, set_content] = useState();
    const [showContent, set_showContent] = useState(false);
    const [firstRender, setFirstRender] = useState(false);
    useEffect(() => {
        if (!firstRender) {
            if (showContent){
                $('#overlay').show();
            }else{
                $('#overlay').hide();
            }
            setFirstRender(true);
        }else{
            $('#overlay').hide();
        }
    }, [firstRender]);

    
    function switchContent(show){
        if (show){
            $('#overlay').show()
        }else{
            $('#overlay').hide();
        }
        // $('#overlay').show()?showContent:$('#overlay').hide();
    }

    function eBrands(){
        let exportVal = '{';
        let i = 0
        brands.map((brand) => {
            console.log(JSON.stringify(brand));
            exportVal += '"brand'+i+'": '+JSON.stringify(brand)+', ';
            i+=1;
        });
        exportVal = exportVal.substring(0, exportVal.length - 2);
        exportVal += '}';
        console.log(exportVal);
        exportVal = JSON.parse(exportVal);
        console.log(JSON.stringify(exportVal));

        $.post(EXPORT_BRANDS, JSON.stringify(exportVal),
            function(brand_list){
                let promise = new Promise((resolve, reject)=>{
                    set_content(brand_list);
                    set_showContent(true);
                    switchContent(true);
                    resolve(brand_list)
                });
                promise.then(()=>$('#overlayContent').html(overlayContent));
            });
    }
    return (
        <div>
            <Header brands={brands} add_brand={set_brand}/>
            <List brands={brands} del_brand={set_brand}/>
            <button id="submit" onClick={eBrands}>Submit</button>
            <div id="overlay">
                <div id="overlayContent"></div>
                <div onClick={()=>{set_showContent(false); switchContent(false)}} id='closeOverlay'>XXX Close XXX</div>
            </div>
        </div>
    );
}

export default Home