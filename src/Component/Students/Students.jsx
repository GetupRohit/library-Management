import axios from "axios";
import "./Students.css";
import { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
const Students = () => {
  const history = useNavigate();
  const [Student, setStudent] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    studentsData();
  }, []);

  const studentsData = () => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/students")
      .then((res) => setStudent(res.data));
  };

  const editStudent = (Student) => {
    localStorage.setItem("updateStudent", JSON.stringify(Student));
    history(`/users/${Student.id}/edit`);
  };
  const deleteData = (StudentData) => {
    axios
      .delete(
        `https://6391e7c1ac688bbe4c56457d.mockapi.io/students/${StudentData}`
      )
      .then((response) => {
        console.log(response.data);
        setStudent(Student.filter((item) => item.id !== response.data.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="boxCart">
      <div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell scope="col">ID</TableCell>
              <TableCell scope="col">Student Name</TableCell>
              <TableCell scope="col">E-Mail</TableCell>
              <TableCell scope="col">Contact</TableCell>
              <TableCell scope="col">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Student.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell colSpan="1">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>
                    <div className="btnS">
                      <Button
                        variant="outlined"
                        onClick={() => editStudent(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          deleteData(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Students;
