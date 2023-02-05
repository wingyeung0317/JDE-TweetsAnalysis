import Brand from './brand';
import $ from 'jquery'
import { useState } from 'react';

const List = ({brands, del_brand}) => {
    let cnt = 0
    // const [updateStatus, forceUpdate] = useState(false);
    // const lsupdate = () => forceUpdate(!updateStatus);

    return (
        <div id="brandList">
            {
                brands.map((brand, i) => {
                    cnt+=1;
                    if (cnt == 1){
                        return <Brand id={brand.id} name={brand.name} info={brand} allInfo={brands} index={i} sty='b2s' sty2='b1s' set_brand={del_brand}/>
                    }else if (cnt%2==0) {
                        return <span>VS <Brand id={brand.id} name={brand.name} info={brand} allInfo={brands} index={i} sty='b1s' sty2='b2s' set_brand={del_brand}/></span>
                    }else{
                        return <span>VS <Brand id={brand.id} name={brand.name} info={brand} allInfo={brands} index={i} sty='b2s' sty2='b1s' set_brand={del_brand}/></span>
                    }
                })
            }
        </div>
    );
}

export default List