import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Collapse from "@material-ui/core/Collapse";
import { Alert } from "@material-ui/lab";
import "./sidebar.css";

function Sidebar({ subjects, setSubjects }) {
  const [schedule, setSchedule] = useState();
  const [subjectsName, setSubjectsName] = useState();
  const [priority, setPriority] = useState();
  const [alert, setAlert] = useState(false);

  const priorityBase = [1, 2, 3, 4, 5];

  const adicionar = () => {
    if (subjectsName && schedule && priority) {
      const materia = {
        nome: subjectsName,
        horario: schedule,
      };

      var aux = [];
      aux = subjects;
      aux[priority - 1].push(materia);

      setSubjects(aux);
    } else {
      setAlert(true);
      setTimeout(() => setAlert(false), 5000);
      return;
    }
  };

  return (
    <div className="Sidebar">
      <div className="sidebar_inputs">
        <TextField
          onChange={(e) => setSubjectsName(e.target.value)}
          className="subject_name"
          label="Nome da matéria"
        />
        <TextField
          onChange={(e) => setSchedule(e.target.value)}
          className="schedule"
          label="Horario da matéria"
        />
        <FormControl className="priority">
          <InputLabel id="priority">Prioridade</InputLabel>
          <Select
            labelId="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {priorityBase.map((res, id) => (
              <MenuItem key={id} value={res}>
                {res}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <div className="contentButton">
          <Button
            onClick={() => adicionar()}
            className="add"
            variant="contained"
            color="primary"
          >
            Adicionar
          </Button>
        </div>

        <Collapse in={alert}>
          <Alert severity="warning">Preencha todos os campos</Alert>
        </Collapse>
      </div>
    </div>
  );
}

export default Sidebar;
