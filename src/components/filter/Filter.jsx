import React from "react"
import './Filter.css'
import { useDispatch } from 'react-redux';
import { setFilterRules } from '../../store/productsSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useEffect } from "react";


export const Filter = () => {
    const dispatch = useDispatch();
    let inputsArray = [];
    useEffect(() => {
        inputsArray = document.querySelectorAll('input');
    }, [])
    
    const checkIfChecked = e => {
        let queryFilterRules = [];
        e.preventDefault();
        inputsArray.forEach(input => {
            if (input.type === "radio") {
                if (input.checked === true) {
                    queryFilterRules.push({'filterBy': input.name, 'comparator': input.value});
                } 
            }
        })
        dispatch(setFilterRules(queryFilterRules));
    }

    const resetRules = () => {
        inputsArray.forEach(input => {
            if (input.type === "radio") {
                input.checked = false
            }
        dispatch(setFilterRules([]));
    })};
    
    return (
        <Form onSubmit={(e) => {checkIfChecked(e)}} >
            <Form.Group className="mb-3" controlId="formBasicRadio">
                <Form.Label>Вікова категорія</Form.Label>
                <Form.Check type="radio" label="Дитячий" value={"Дитячий"} name="age" id="Дитячий"/>
                <Form.Check type="radio" label="Дорослий" value={"Дорослий"} name="age" id="Дорослий"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicradio">
                <Form.Label>Розмір комплекту</Form.Label>
                <Form.Check type="radio" label="Полуторний" value={"Полуторний"} name="size" id="Полуторний"/>
                <Form.Check type="radio" label="Двоспальний" value={"Двоспальний"} name="size" id="Двоспальний"/>
                <Form.Check type="radio" label="Сімейний" value={"Сімейний"} name="size" id="Сімейний"/>
                <Form.Check type="radio" label="King-size" value={"King-size"} name="size" id="King-size"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRadio">
                <Form.Label>Наявність</Form.Label>
                <Form.Check type="radio" label="Лише ті, що є в наявності" value={"true"} name="available" id="available_true"/>
                <Form.Check type="radio" label="Немає в наявності" value={"false"} name="available" id="available_false"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRadio">
                <Form.Label>Акції</Form.Label>
                <Form.Check type="radio" label="Зі знижкою" value={"true"} name="sale" id="sale_true"/>
            </Form.Group>

            <ButtonGroup>
                <Button variant="primary" type="submit">
                    Показати
                </Button>
                <Button  onClick={resetRules} variant="light">
                    Скинути
                </Button>
            </ButtonGroup>
        </Form>
    )
}