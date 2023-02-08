import $ from "jquery";
import {useState, useEffect} from "react";

const Overlay = ({overlay_content, showContent, set_showContent}) =>{
    const [firstRender, setFirstRender] = useState(false);
    useEffect(() => {
        if (!firstRender) {
            $('#overlay').hide();
            setFirstRender(false);
        }else{
            showOrNot();
        }
    }, [firstRender]);

    const showOrNot = () => {
        if (showContent){
            $('#overlay').show();
        }else{
            $('#overlay').hide();
        }
    }

    showOrNot();
    
    function switchContent(show){
        if (show){
            $('#overlay').show()
        }else{
            $('#overlay').hide();
        }
    }

    const oc = () =>{
        $('#overlayContent').html(overlay_content);
    }

    const showAnalyse=()=>{
        $('#tweets').hide();
        $('#analysisInfo').show();
    }

    return(
        <div id="overlay">
            <div id="overlayContent">{oc()}</div>
            <div>
                <span onClick={()=>{set_showContent(false); switchContent(false)}} id='closeOverlay'>XXX Close XXX</span>
                <span id="showAnalyse" onClick={showAnalyse}>Show Analysing</span>
            </div>
            
        </div>
    );

}

export default Overlay