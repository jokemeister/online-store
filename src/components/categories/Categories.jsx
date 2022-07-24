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

    // async function writeNewDocCollection() {
    //   const newCategory = doc(firestore, 'categories/checker');
    //   const childDoc = doc(newCategory, '../Велюр');
    //   const docData = { "id": 1, "title": "Бязь Голд", "img":"../../../publick/assets/images/categories" };
    //   setDoc(specialOfTheDay, docData);
    //   setDoc(specialOfTheDay, docData, { merge: true });
    //   updateDoc(specialOfTheDay, docData);
    //   try {
    //     await setDoc(newCategory, docData, { merge: true });
    //     console.log('This value has been written to the database');
    //   } catch (error) {
    //     console.log(`I got an error! ${error}`);
    //   }
    // }
  
    // const ByazCategory = doc(firestore, 'categories/Бязь Голд');
  

  
    // function listenToADocument() {
    //   onSnapshot(ByazCategory, docSnapshot => {
    //     if (docSnapshot.exists()) {
    //       const docData = docSnapshot.data();
    //       console.log(`My data is ${JSON.stringify(docData)}`);
    //     };
    //   });
    // };
  

    // readASingleDocument();
    // listenToADocument();

    const { error, status } = useSelector(state => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
      console.log('categories fetching');
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

