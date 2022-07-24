import React from "react"
import './Filter.css'
import { useDispatch, useSelector } from 'react-redux';
import { setQueryParams } from '../../store/productsSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


export const Filter = () => {
    const dispatch = useDispatch(),
        { queryParams } = useSelector(state => state.products);
    let filterBy,
        operator,
        comparator;
        
    const inputsArray = document.querySelectorAll('input');

    const checkIfChecked = e => {
        let queryFilterRules = []
        e.preventDefault();
        inputsArray.forEach(input => {
            if (input.type === 'checkbox') {
                operator = "=";
                if (input.checked === true) {
                    filterBy = `"${input.id}"`;
                    comparator = `"${input.value}"`;
                    queryFilterRules.push({'filterBy': filterBy, 'operator': operator, 'comparator': comparator});
                }
            }
        })
        console.log(queryFilterRules.join(', '));
        dispatch(setQueryParams(queryFilterRules));
    }
    return (
        <Form onSubmit={(e) => {checkIfChecked(e)}} >
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Вікова категорія</Form.Label>
                <Form.Check type="checkbox" label="Дитячий" value={"Дитячий"} id="age" />
                <Form.Check type="checkbox" label="Дорослий" value={"Дорослий"} id="age" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Розмір комплекту</Form.Label>
                <Form.Check type="checkbox" label="Полуторний" value={"Полуторний"} id="size"/>
                <Form.Check type="checkbox" label="Двоспальний" value={"Двоспальний"} id="size"/>
                <Form.Check type="checkbox" label="Сімейний" value={"Сімейний"} id="size"/>
                <Form.Check type="checkbox" label="King-size" value={"King-size"} id="size"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Наявність</Form.Label>
                <Form.Check type="checkbox" label="Лише ті, що є в наявності" value={"true"} id="available"/>
                <Form.Check type="checkbox" label="Немає в наявності" value={"false"} id="available"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Акції</Form.Label>
                <Form.Check type="checkbox" label="Зі знижкою" value={"true"} id="sale"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Показати
            </Button>
        </Form>
    )
}