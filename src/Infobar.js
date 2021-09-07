import "./infobar.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSubjects } from "./context/subjects";

function Infobar() {
  const { subjects } = useSubjects();

  return (
    <div className="Infobar">
      {subjects.map((sub) =>
        sub.map((info, id) => (
          <div className="info">
            <p>
              {info.nome} - {info.horario}
            </p>
            <DeleteIcon />
          </div>
        ))
      )}
    </div>
  );
}

export default Infobar;
