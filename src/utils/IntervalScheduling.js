function montaGrade() {
    grade = [];
    for (var i=0; i<6; i++) {
        grade.push([]);
        for (var j=8; j<=22; j++) {
            grade[i].push("-");
        }
    }

    return grade;
}

var traduzDia = (dia) => {
    if      (dia == "SEG") return 0;
    else if (dia == "TER") return 1;
    else if (dia == "QUA") return 2;
    else if (dia == "QUI") return 3;
    else if (dia == "SEX") return 4;
    else if (dia == "SAB") return 5;
    else return -1;
}

var traduzHorario = (horario) => horario-8;
