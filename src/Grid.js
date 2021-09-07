import { useState } from "react";
import "./grid.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import montaGrade from "./utils/IntervalScheduling";
import { useSubjects } from "./context/subjects";

function Grid() {
  const { subjects } = useSubjects();
  const row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const [column, setColumn] = useState([]);

  const criarGrid = () => {
    setColumn(montaGrade(subjects));
  };

  return (
    <div className="Grid">
      {column !== undefined && (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Horários</TableCell>
                <TableCell align="right">Segunda</TableCell>
                <TableCell align="right">Terça</TableCell>
                <TableCell align="right">Quarta</TableCell>
                <TableCell align="right">Quinta</TableCell>
                <TableCell align="right">Sexta</TableCell>
                <TableCell align="right">Sabado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.map((id) => (
                <TableRow>
                  <TableCell>{id + 8}h</TableCell>
                  {column.map((col) => (
                    <TableCell align="right">{col[id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="contentButton">
        <Button
          onClick={() => criarGrid()}
          className="add"
          variant="contained"
          color="primary"
        >
          Criar Grade
        </Button>
      </div>
    </div>
  );
}

export default Grid;
