import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  Alert
} from "react-bootstrap";

function App() {

  const API = "/api/todos";

  const [input, setInput] = useState("");

  const [todos, setTodos] = useState([]);

  const [error, setError] = useState("");

  // FETCH TODOS
  const fetchTodos = async () => {

    try {

      const response = await fetch(API);

      const data = await response.json();

      setTodos(data);

      setError("");

    } catch (err) {

      console.error(err);

      setError("Backend connection failed");
    }
  };

  useEffect(() => {

    fetchTodos();

  }, []);

  // ADD TODO
  const addTodo = async () => {

    if (!input.trim()) return;

    try {

      await fetch(API, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          value: input
        })
      });

      setInput("");

      fetchTodos();

    } catch (err) {

      console.error(err);
    }
  };

  // DELETE TODO
  const deleteTodo = async (id) => {

    try {

      await fetch(`${API}/${id}`, {

        method: "DELETE"
      });

      fetchTodos();

    } catch (err) {

      console.error(err);
    }
  };

  // EDIT TODO
  const editTodo = async (todo) => {

    const updatedValue = prompt(
      "Edit Todo",
      todo.value
    );

    if (!updatedValue) return;

    try {

      await fetch(`${API}/${todo.id}`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          value: updatedValue
        })
      });

      fetchTodos();

    } catch (err) {

      console.error(err);
    }
  };

  return (

    <Container className="mt-5">

      <Row className="justify-content-center">

        <Col md={8}>

          <Card className="shadow p-4">

            <h1 className="text-center mb-2">
              DevOps Todo Platform1
            </h1>

            <p className="text-center text-muted">
              Kubernetes • Docker • DevOps
            </p>

            {error && (

              <Alert variant="danger">
                {error}
              </Alert>

            )}

            <InputGroup className="mb-4">

              <FormControl
                placeholder="Enter Todo"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
              />

              <Button
                variant="dark"
                onClick={addTodo}
              >
                Add
              </Button>

            </InputGroup>

            <ListGroup>

              {todos.length === 0 ? (

                <ListGroup.Item className="text-center">
                  No Todos Found
                </ListGroup.Item>

              ) : (

                todos.map((todo) => (

                  <ListGroup.Item
                    key={todo.id}

                    className="
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                  >

                    {todo.value}

                    <div>

                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"

                        onClick={() =>
                          editTodo(todo)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"

                        onClick={() =>
                          deleteTodo(todo.id)
                        }
                      >
                        Delete
                      </Button>

                    </div>

                  </ListGroup.Item>

                ))

              )}

            </ListGroup>

          </Card>

        </Col>

      </Row>

    </Container>

  );
}
export default App;