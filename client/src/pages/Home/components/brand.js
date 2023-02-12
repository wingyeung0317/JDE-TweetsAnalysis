import {useState} from 'react'
import { v4 } from 'uuid';

const Brand = ({id, name, info, allInfo, sty, sty2, set_brand, index}) =>{

    function delBrand(){
        set_brand((prev) => {
            return prev.filter(item => item.id != id)
        });
        // lsupdate();
    }
    const [anaURL_input, setAnaURL_input] = useState(true)
    const [dateHowR, setDateHowR] = useState(false)
    const [dateHowW, setDateHowW] = useState(false)

    const rmURL = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qFilterLinks = !contant.qFilterLinks;
                return contant;
            }else{
                return contant;
            };
        });
        if (info.qFilterLinks){
            anaURL_false();
            setAnaURL_input(true);
        }else{
            anaURL_false();
            setAnaURL_input(false);
        }
        set_brand(next);
    };

    const rmReply = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qFilterReplies = !contant.qFilterReplies;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const add_orCashTag = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.cashtag = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const addFilterQ = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qFilter = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };
    
    const filLang = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.lang = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };
    
    const filVerify = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qFilterVerified = !contant.qFilterVerified;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const filLoc = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qLocation = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const filStartDate = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qStartTime = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const filEndDate = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qEndTime = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const filMinLike = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qMinLike = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const filMinRetweet = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qMinRetweets = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const filMinReply = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qMinReplies = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const filWithinTime = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qWithinTime = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const filSamples = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.samples = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const rmEmoji = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.sa_rmEmoji = !contant.sa_rmEmoji;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };
    
    const anaURL = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.anaURL = !contant.anaURL;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    };

    const anaURL_false = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.anaURL = false;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    }

    const dateNull = () =>{
        setDateHowR(true)
        setDateHowW(true)
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qWithinTime = '';
                contant.qStartTime = NaN;
                contant.qEndTime = NaN;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    }
    
    const dateWithin = () =>{
        setDateHowR(true);
        setDateHowW(false);
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qStartTime = NaN;
                contant.qEndTime = NaN;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    }
    
    const dateRange = () => {
        setDateHowR(false);
        setDateHowW(true);
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qWithinTime = '';
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
    }

    return (
        <span id={id} className={sty}>
            <center className='brandName'>{name}</center>
            (Filter Tweets)
            <div>
                Any alias name OR cashtag? &emsp;
                <input type="text" placeholder='Use , to separate (can empty)' value={info.cashtag} onChange={(event) => add_orCashTag(event.target.value)}/>
            </div>
            <div>
                Filter out: (Useful to filter out Junk Tweets) &emsp;
                <input type="text" placeholder='Use , to separate (can empty)' value={info.qFilter} onChange={(event) => addFilterQ(event.target.value)}/>
            </div>
            <div>
                <input type="checkbox" checked={info.qFilterLinks} onChange={rmURL}/>
                Remove tweets with URL? (Useful to filter out Junk Tweets)
            </div>
            <div>
                <input type="checkbox" checked={info.qFilterReplies} onChange={rmReply}/>
                Remove replies tweets?
            </div>
            <div>
                <input type="checkbox" checked={info.qFilterVerified} onChange={filVerify}/>
                Only tweets from verified user?
            </div>
            <div>
                langauage &emsp;
                <select value={info.lang} onChange={(event) => {filLang(event.target.value)}}>  
                    <option value='af'>Afrikaans</option>
                    <option value='sq'>Albanian</option>
                    <option value='am'>Amharic</option>
                    <option value='ar'>Arabic</option>
                    <option value='hy'>Armenian</option>
                    <option value='az'>Azerbaijani</option>
                    <option value='eu'>Basque</option>
                    <option value='be'>Belarusian</option>
                    <option value='bn'>Bengali</option>
                    <option value='bs'>Bosnian</option>
                    <option value='bg'>Bulgarian</option>
                    <option value='ca'>Catalan</option>
                    <option value='ny'>Chichewa</option>
                    <option value='zh'>Chinese</option>
                    <option value='co'>Corsican</option>
                    <option value='hr'>Croatian</option>
                    <option value='cs'>Czech</option>
                    <option value='da'>Danish</option>
                    <option value='nl'>Dutch</option>
                    <option value='en' selected>English</option>
                    <option value='eo'>Esperanto</option>
                    <option value='et'>Estonian</option>
                    <option value='tl'>Filipino</option>
                    <option value='fi'>Finnish</option>
                    <option value='fr'>French</option>
                    <option value='fy'>Frisian</option>
                    <option value='gl'>Galician</option>
                    <option value='ka'>Georgian</option>
                    <option value='de'>German</option>
                    <option value='el'>Greek</option>
                    <option value='gu'>Gujarati</option>
                    <option value='ht'>Haitian Creole</option>
                    <option value='ha'>Hausa</option>
                    <option value='iw'>Hebrew</option>
                    <option value='hi'>Hindi</option>
                    <option value='hu'>Hungarian</option>
                    <option value='is'>Icelandic</option>
                    <option value='ig'>Igbo</option>
                    <option value='id'>Indonesian</option>
                    <option value='ga'>Irish</option>
                    <option value='it'>Italian</option>
                    <option value='ja'>Japanese</option>
                    <option value='jw'>Javanese</option>
                    <option value='kn'>Kannada</option>
                    <option value='kk'>Kazakh</option>
                    <option value='km'>Khmer</option>
                    <option value='ko'>Korean</option>
                    <option value='ku'>Kurdish (Kurmanji)</option>
                    <option value='ky'>Kyrgyz</option>
                    <option value='lo'>Lao</option>
                    <option value='la'>Latin</option>
                    <option value='lv'>Latvian</option>
                    <option value='lt'>Lithuanian</option>
                    <option value='lb'>Luxembourgish</option>
                    <option value='mk'>Macedonian</option>
                    <option value='mg'>Malagasy</option>
                    <option value='ms'>Malay</option>
                    <option value='ml'>Malayalam</option>
                    <option value='mt'>Maltese</option>
                    <option value='mi'>Maori</option>
                    <option value='mr'>Marathi</option>
                    <option value='mn'>Mongolian</option>
                    <option value='my'>Myanmar (Burmese)</option>
                    <option value='ne'>Nepali</option>
                    <option value='no'>Norwegian</option>
                    <option value='ps'>Pashto</option>
                    <option value='fa'>Persian</option>
                    <option value='pl'>Polish</option>
                    <option value='pt'>Portuguese</option>
                    <option value='pa'>Punjabi</option>
                    <option value='ro'>Romanian</option>
                    <option value='ru'>Russian</option>
                    <option value='sm'>Samoan</option>
                    <option value='gd'>Scots Gaelic</option>
                    <option value='sr'>Serbian</option>
                    <option value='st'>Sesotho</option>
                    <option value='sn'>Shona</option>
                    <option value='sd'>Sindhi</option>
                    <option value='si'>Sinhala</option>
                    <option value='sk'>Slovak</option>
                    <option value='sl'>Slovenian</option>
                    <option value='so'>Somali</option>
                    <option value='es'>Spanish</option>
                    <option value='su'>Sundanese</option>
                    <option value='sw'>Swahili</option>
                    <option value='sv'>Swedish</option>
                    <option value='tg'>Tajik</option>
                    <option value='ta'>Tamil</option>
                    <option value='te'>Telugu</option>
                    <option value='th'>Thai</option>
                    <option value='tr'>Turkish</option>
                    <option value='uk'>Ukrainian</option>
                    <option value='ur'>Urdu</option>
                    <option value='uz'>Uzbek</option>
                    <option value='vi'>Vietnamese</option>
                    <option value='cy'>Welsh</option>
                    <option value='xh'>Xhosa</option>
                    <option value='yi'>Yiddish</option>
                    <option value='yo'>Yoruba</option>
                    <option value='zu'>Zulu</option>
                </select>
                &emsp;(Sentiment analysis only work in English)
            </div>
            <div>
                Location: &emsp;
                <input type="text" placeholder='can empty' value={info.qLocation} onChange={(event) => filLoc(event.target.value)}/>
            </div>
            <div>
                <span>
                    Likes at least: &nbsp;
                    <input className='numInput' min='0' type="number" placeholder='0' value={info.qMinLike} onChange={(event) => filMinLike(event.target.value)}/>
                </span>
                <span>
                    &emsp; Retweets at least: &nbsp;
                    <input className='numInput' min='0' type="number" placeholder='0' value={info.qMinRetweets} onChange={(event) => filMinRetweet(event.target.value)}/>
                </span>
                <span>
                    &emsp; Replies at least:
                    <input className='numInput' min='0' type="number" placeholder='0' value={info.qMinReplies} onChange={(event) => filMinReply(event.target.value)}/>
                </span>
            </div>
            <div>
                <span>
                    <input type="radio" id={'datehow_within'+id} name={id} onChange={dateWithin}/>
                    <label htmlFor={'datehow_within'+id}>
                        Within: &nbsp;
                        <input className='withinInput' type="text" placeholder='e.g.: 180d' value={info.qWithinTime} onChange={(event) => filWithinTime(event.target.value)} disabled={dateHowW}/>
                    </label>
                </span>
                <br />
                <span>
                    <input type="radio" id={'datehow_dateSelect'+id} name={id} onChange={dateRange}/>
                    <label htmlFor={'datehow_dateSelect'+id}>
                        <span>
                            Start Date: &nbsp;
                            <input type="date" value={info.qStartTime} onChange={(event) => filStartDate(event.target.value)} disabled={dateHowR}/>
                        </span>
                        <span>
                            &emsp; End Date:
                            <input type="date" value={info.qEndTime} onChange={(event) => filEndDate(event.target.value)} disabled={dateHowR}/>
                        </span>
                    </label>
                </span>
                <br />
                <span>
                    <input type="radio" id={'datehow_any'+id} name={id} onChange={dateNull}/>
                    <label htmlFor={'datehow_any'+id}>
                        Anytime
                    </label>
                </span>
            </div>
            <br />
            (Sentiment Analysis)
            <div>
                <span>
                    <input type="checkbox" checked={info.sa_rmEmoji} onChange={rmEmoji}/>
                    Remove emoji
                </span>
                <span>
                    <input type="checkbox" checked={info.anaURL} onChange={anaURL} disabled={anaURL_input}/>
                    Analyse Sentiment of the URLs in tweets
                </span>
            </div><br />
            <div>
                How many tweets tou want to grap: &nbsp;
                <input className='numInput' min='1' type="number" placeholder='20' value={info.samples} onChange={(event) => filSamples(event.target.value)}/>

            </div>
            <div className='delBtn'><input type="button" value="Delete" className={sty2} onClick={delBrand}/></div>
        </span>
    );
}

export default Brand