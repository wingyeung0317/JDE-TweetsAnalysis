import $ from 'jquery'

const List = ({brands}) => {
    let allBrands = []

    for (let i = 0; i < brands.length; i++) {
        let b = "brand"+i
        console.log(b)
        if (i==0){
            allBrands.push(<span id={b} className="brand b1s">{brands[i]}</span>)
            allBrands.push(<script>$('#{b}').click({showDelete(this)});</script>)
        }else{
            if (i%2==0){
                allBrands.push(<span className="vs">VS</span>)
                allBrands.push(<span id={b} className="brand b1s">{brands[i]}</span>)
                allBrands.push(<script>$('#{b}').click({showDelete(this)});</script>)
            }else{
                allBrands.push(<span className="vs">VS</span>)
                allBrands.push(<span id={b} className="brand b2s">{brands[i]}</span>)
                allBrands.push(<script>$('#{b}').click({showDelete(this)});</script>)
            }
        }
    }

    function showDelete(del){
        console.log(del);
    }

    return (
        <div id="brandList">
            {allBrands}
        </div>
    );
}

export default List