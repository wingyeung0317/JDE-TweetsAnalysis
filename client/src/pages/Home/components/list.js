import Brand from './brand';

const List = ({brands, del_brand}) => {
    let cnt = 0

    return (
        <div id="brandList">
            {
                brands.map((brand) => {
                    cnt+=1;
                    if (cnt == 1){
                        return <Brand id={brand.id} name={brand.name} sty='b2s' sty2='b1s' del_brand={del_brand}/>
                    }else if (cnt%2==0) {
                        return <span>VS <Brand id={brand.id} name={brand.name} sty='b1s' sty2='b2s' del_brand={del_brand}/></span>
                    }else{
                        return <span>VS <Brand id={brand.id} name={brand.name} sty='b2s' sty2='b1s' del_brand={del_brand}/></span>
                    }
                })
            }
        </div>
    );
}

export default List