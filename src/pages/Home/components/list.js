import $ from 'jquery'
import Brand from './brand';

const List = ({brands}) => {
    let cnt = 0

    return (
        <div id="brandList">
            {
                brands.map((brand) => {
                    cnt+=1;
                    if (cnt == 1){
                        return <Brand id={brand.id} name={brand.name} sty='b2s'/>
                    }else if (cnt%2==0) {
                        return <span>VS <Brand id={brand.id} name={brand.name} sty='b1s'/></span>
                    }else{
                        return <span>VS <Brand id={brand.id} name={brand.name} sty='b2s'/></span>
                    }
                })
            }
        </div>
    );
}

export default List