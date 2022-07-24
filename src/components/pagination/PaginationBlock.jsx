import './Pagination.css';
import Pagination from 'react-bootstrap/Pagination';

import './Pagination.css';

export const PaginationBlock = () => {


    return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item disabled>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    )
}
