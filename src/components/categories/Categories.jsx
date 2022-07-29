import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Categories.css';

import { NavLink } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categoriesSlice';



export const Categories = () => {
  const categories = useSelector(state => state.categories.categories);

    const { error, status } = useSelector(state => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchCategories())
    }, [dispatch])

  return (
    <div>
      { status === 'loading' && <h2>Loading products...</h2> }
      { error && <h2>Error: { error }</h2> }
      <Row xs={1} md={4} className="g-4">
        {categories.map((category) => (
          <Col key={category.id}>
            <NavLink to={`/categories/${category.queryTitle}`} >
              <Card className="card" >
                <Card.Img className="card-img" variant="top" src={process.env.PUBLIC_URL+`${category.img}`} />
                <Card.Body>
                  <Card.Title>{category.title}</Card.Title>
                  <Card.Text>
                    {category.body}
                  </Card.Text>
                </Card.Body>
              </Card>
            </NavLink>
          </Col>
        ))}
      </Row>
    </div>
  );
}

