import {useState} from 'react'

const Brand = ({id, name, info, allInfo, sty, sty2, set_brand, index}) =>{
    function delBrand(){
        set_brand((prev) => {
            return prev.filter(item => item.id !== id)
        });
    }

    const [anaURL_input, setAnaURL_input] = useState(true);

    const [rmURL_checked, set_rmURL_checked] = useState(true);
    const rmURL = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qFilterLinks = !rmURL_checked;
                return contant;
            }else{
                return contant;
            };
        });
        if (rmURL_checked){
            setAnaURL_input(false);
        }else{
            anaURL_false();
            setAnaURL_input(true);
        }
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
        });
        set_rmReply_checked(!rmReply_checked);
        set_brand(next);
        console.log(info);
    };

    const [orCashTag, set_orCashTag] = useState('');
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
        console.log(info);
    };

    const [filterQ, setFilterQ] = useState('');
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
        console.log(info);
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
        console.log(info);
    };
    
    const [filVerify_checked, setFilVerify_checked] = useState(false);
    const filVerify = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qFilterVerified = !filVerify_checked;
                return contant;
            }else{
                return contant;
            };
        });
        setFilVerify_checked(!filVerify_checked);
        set_brand(next);
        console.log(info);
    };

    const [loc, setLoc] = useState('');
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
        console.log(info);
    };

    
    const [minLike, setMinLike] = useState(0);
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
        console.log(info);
    };

    const [minRetweet, setMinRetweet] = useState(0);
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
        console.log(info);
    };

    const [minReply, setMinReply] = useState(0);
    const filMinReply = (t) => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.qMinRetweets = t;
                return contant;
            }else{
                return contant;
            };
        });
        set_brand(next);
        console.log(info);
    };

    const [rmEmoji_checked, setRmEmoji_checked] = useState(true);
    const rmEmoji = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.sa_rmEmoji = !rmEmoji_checked;
                return contant;
            }else{
                return contant;
            };
        });
        setRmEmoji_checked(!rmEmoji_checked);
        set_brand(next);
        console.log(info);
    };
    
    const [anaURL_checked, setAnaURL_checked] = useState(false);
    const anaURL = () => {
        let next = allInfo.map((contant, i) => {
            if(i === index){
                contant.anaURL = !anaURL_checked;
                return contant;
            }else{
                return contant;
            };
        });
        setAnaURL_checked(!anaURL_checked);
        set_brand(next);
        console.log(info);
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
        setAnaURL_checked(false);
        set_brand(next);
        console.log(info);
    }

    return (
        <span id={id} className={sty}>
            <center className='brandName'>{name}</center>
            (Filter Tweets)
            <div>
                Any alias name OR cashtag? &emsp;
                <input type="text" placeholder='Use , to separate (can empty)' value={orCashTag} onChange={(event) => {set_orCashTag(event.target.value); add_orCashTag(event.target.value)}}/>
            </div>
            <div>
                Filter out: (Useful to filter out Junk Tweets) &emsp;
                <input type="text" placeholder='Use , to separate (can empty)' value={filterQ} onChange={(event) => {setFilterQ(event.target.value); addFilterQ(event.target.value)}}/>
            </div>
            <div>
                <input type="checkbox" checked={rmURL_checked} onChange={rmURL}/>
                Remove tweets with URL? (Useful to filter out Junk Tweets)
            </div>
            <div>
                <input type="checkbox" checked={rmReply_checked} onChange={rmReply}/>
                Remove replies tweets?
            </div>
            <div>
                <input type="checkbox" checked={filVerify_checked} onChange={filVerify}/>
                Only tweets from verified user?
            </div>
            <div>
                langauage &emsp;
                <select onChange={(event) => {filLang(event.target.value)}}>  
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
                <input type="text" placeholder='can empty' value={loc} onChange={(event) => {setLoc(event.target.value); filLoc(event.target.value)}}/>
            </div>
            <div>
                <span>
                    Likes at least: &nbsp;
                    <input className='numInput' min='0' type="number" placeholder='0' value={minLike} onChange={(event) => {setMinLike(event.target.value); filMinLike(event.target.value)}}/>
                </span>
                <span>
                    &emsp; Retweets at least: &nbsp;
                    <input className='numInput' min='0' type="number" placeholder='0' value={minRetweet} onChange={(event) => {setMinRetweet(event.target.value); filMinRetweet(event.target.value)}}/>
                </span>
                <span>
                    &emsp; Replies at least:
                    <input className='numInput' min='0' type="number" placeholder='0' value={minReply} onChange={(event) => {setMinReply(event.target.value); filMinReply(event.target.value)}}/>
                </span>
            </div>
            <br />
            (Sentiment Analysis)
            <div>
                <span>
                    <input type="checkbox" checked={rmEmoji_checked} onChange={rmEmoji}/>
                    Remove emoji
                </span>
                <span>
                    <input type="checkbox" checked={anaURL_checked} onChange={anaURL} disabled={anaURL_input}/>
                    Analyse Sentiment of the URLs in tweets
                </span>
            </div>
            <div className='delBtn'><input type="button" value="Delete" className={sty2} onClick={delBrand}/></div>
        </span>
    );
}

export default Brand