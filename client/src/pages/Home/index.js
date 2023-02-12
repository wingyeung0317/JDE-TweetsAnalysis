import {useState} from "react";
import Header from "./components/header";
import List from "./components/list";
import $ from "jquery";
import { CONNECT_FLASK, GET_TWEETS } from "../../global/constrants";
import Overlay from "./components/overlay";

const Home = () => {
    const [brands, set_brand] = useState([]);
    const [overlay_content, set_content] = useState();
    const [showContent, set_showContent] = useState(false);

    function eBrands(){
        let exportVal = '{';
        let i = 0
        brands.map((brand) => {
            exportVal += '"brand'+i+'": '+JSON.stringify(brand)+', ';
            i+=1;
        });
        exportVal = exportVal.substring(0, exportVal.length - 2);
        exportVal += '}';
        exportVal = JSON.parse(exportVal);

        checkFlask(grapTweets(exportVal));
    }
    
    function checkFlask(next){
        $.post(CONNECT_FLASK, '<center style="position:absolute; top:50%; width:80%; left:10%">Connected to flask. \n Loading Tweets...</center>')
            .done(function(connection){
                set_content(connection);
                set_showContent(true);
                if (next!=null){
                    next();
                }
            })
            .fail(function(xhr, status, error){
                console.log(xhr +'/n'+ status +'/n'+ error);
                set_content('Error occurs when connect to Flask');
                alert('Error occurs when connect to Flask');
                set_showContent(false);
            })
    }

    // function hideAnalysisFirstRen1(tweets_list, func){
    //     set_content(tweets_list);
    //     set_showContent(true);
    //     console.log(overlay_content);
    //     func()
    // }

    // function hideAnalysisFirstRen2(){
    //     $("#analysisInfo").hide()
    // }
    
    function grapTweets(val){
        $.post(GET_TWEETS, JSON.stringify(val))
            .done(function(tweets_list){
                set_content(tweets_list);
                set_showContent(true);
                // hideAnalysisFirstRen1(tweets_list, hideAnalysisFirstRen2)
            })
            .fail(function(xhr, status, error){
                console.log(xhr +'/n'+ status +'/n'+ error);
                set_content('Error occurs when grapping tweets');
                alert('Error occurs when grapping tweets');
                set_showContent(false);
            })
    }

    return (
        <div>
            <Header brands={brands} add_brand={set_brand}/>
            <List brands={brands} del_brand={set_brand}/>
            <button id="submit" onClick={eBrands}>Submit</button>
            <Overlay overlay_content={overlay_content} showContent={showContent} set_showContent={set_showContent}></Overlay>
        </div>
    );
}

export default Home