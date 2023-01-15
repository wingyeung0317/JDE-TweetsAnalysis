const Brand = ({id, name, sty}) =>{
    function editBrand(){}
    function delBrand(){}
    return (
        <span id={id} className={sty}><center>{name}</center><div><input type="button" value="Edit" onClick={editBrand}/><input type="button" value="Delete" onClick={delBrand}/></div></span>
    );
}

export default Brand