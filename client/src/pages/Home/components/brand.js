const Brand = ({id, name, sty, sty2, del_brand}) =>{
    function delBrand(){
        del_brand((prev) => {
            return prev.filter(item => item.id !== id)
        })
    }
    return (
        <span id={id} className={sty}><center className='brandName'>{name}</center><div className='delBtn'><input type="button" value="Delete" className={sty2} onClick={delBrand}/></div></span>
    );
}

export default Brand