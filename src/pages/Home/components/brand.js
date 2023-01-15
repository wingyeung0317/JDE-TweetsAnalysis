const Brand = ({id, name, sty, del_brand}) =>{
    function editBrand(){}
    function delBrand(){
        del_brand((prev) => {
            return prev.filter(item => item.id !== id)
        })
    }
    return (
        <span id={id} className={sty}><center>{name}</center><div><input type="button" value="Edit" onClick={editBrand}/><input type="button" value="Delete" onClick={delBrand}/></div></span>
    );
}

export default Brand