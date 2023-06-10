import React from "react";
import "./Filter.css";
import { useDispatch } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useEffect } from "react";

import { setFilterRules } from "../../store/productsSlice";

export const Filter = () => {
  const dispatch = useDispatch();
  let inputsArray = [];
  useEffect(() => {
    inputsArray = document.querySelectorAll("input");
  }, []);

  const checkIfChecked = (e) => {
    const queryFilterRules = [];
    e.preventDefault();
    inputsArray.forEach((input) => {
      if (input.type === "radio") {
        if (input.checked === true) {
          console.log(input.value > 0);
          console.log({ filterBy: input.name, comparator: input.value });
          queryFilterRules.push({ filterBy: input.name, comparator: input.value });
        }
      }
    });
    dispatch(setFilterRules(queryFilterRules));
  };

  const resetRules = () => {
    inputsArray.forEach((input) => {
      if (input.type === "radio") {
        input.checked = false;
      }
      dispatch(setFilterRules([]));
    });
  };

  return (
    <Form
      onSubmit={(e) => {
        checkIfChecked(e);
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicRadio">
        <Form.Label>Рік</Form.Label>
        <Form.Check type="radio" label="2021" value={2021} name="year" id="2021" />
        <Form.Check type="radio" label="2022" value={2022} name="year" id="2022" />
        <Form.Check type="radio" label="2023" value={2023} name="year" id="2023" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicradio">
        <Form.Label>Виробник</Form.Label>
        <Form.Check type="radio" label="BMW" value={"BMW"} name="manufacturer" id="BMW" />
        <Form.Check type="radio" label="Mercedes-Benz" value={"Mercedes-Benz"} name="manufacturer" id="Mercedes-Benz" />
        <Form.Check type="radio" label="Volvo" value={"Volvo"} name="manufacturer" id="Volvo" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRadio">
        <Form.Label>Колір</Form.Label>
        <Form.Check type="radio" label="Чорний" value={"чорний"} name="color" id="black" />
        <Form.Check type="radio" label="Білий" value={"білий"} name="color" id="white" />
        <Form.Check type="radio" label="Сірий" value={"сірий"} name="color" id="grey" />
        <Form.Check type="radio" label="Зелений" value={"зелений"} name="color" id="green" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRadio">
        <Form.Label>Обʼєм двигуна</Form.Label>
        <Form.Check type="radio" label="1 л" value={1} name="engine" id="engine_1l" />
        <Form.Check type="radio" label="2 л" value={2} name="engine" id="engine_2l" />
        <Form.Check type="radio" label="3 л" value={3} name="engine" id="engine_3l" />
        <Form.Check type="radio" label="4 л" value={4} name="engine" id="engine_4l" />
      </Form.Group>

      <ButtonGroup>
        <Button variant="primary" type="submit">
					Показати
        </Button>
        <Button onClick={resetRules} variant="light">
					Скинути
        </Button>
      </ButtonGroup>
    </Form>
  );
};
