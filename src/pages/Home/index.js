import { useState } from "react";
import Header from "./components/header";
import List from "./components/list";

const Home = () => {
    const [brands, set_brand] = useState([]);
    return (
        <div>
            <Header add_brand={set_brand}/>
            <List brands={brands} del_brand={set_brand}/>
        </div>
    );
}

export default Home