import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Table.css';

function Table() {
    const [tableContent, setTableContent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
                const productsArray = Object.keys(response.data.products).map((key) => ({
                    id: key,
                    ...response.data.products[key],
                }));
                setTableContent(productsArray);
                console.log(productsArray); 
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div>
            <h1>Product List</h1>
            <table id="productTable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Popularity</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.popularity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
