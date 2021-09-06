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

var traduzDia = (dia) => dia-2;

var traduzHorario = (periodo, horario) => {
    var offset
    if (periodo == 'M') offset = -1;
    if (periodo == 'T') offset = 4;
    if (periodo == 'N') offset = 10;
    
    return horario+offset;
};

function traduzHorarioSigaa(horario) {
    const padrao = /\b([2-7]{1,6})([MTN])([1-7]{1,7})\b/;
    const res = horario.match(padrao);
    
    if (res == null) return null;
    else return {
        'match': res[0],
        'dias': res[1],
        'periodo': res[2],
        'horario': res[3]
    }
}

function verificaCompatibilidade(grade, horarioMapeado) {
    var _dias = horarioMapeado.dias;
    var dias = [];
    for (var i=0; i<_dias.length; i++) {
        dias.push(traduzDia(parseInt(_dias[i])));
    }    
    var periodo = horarioMapeado.periodo;
    var horario = horarioMapeado.horario;

    var retorno = [];

    for (const dia of dias) {
        for (var i=0; i<periodo.length; i++) {
            for (var j=0; j<horario.length; j++) {
                var index = traduzHorario(periodo[i], parseInt(horario[j]));
                if (grade[dia][index] != "-") return [false, null];
                else retorno.push([dia, index]);
            }
        }
    }

    return [true, retorno];
}

function atualizaGrade(grade, posicoes, nome) {
    for (const posicao of posicoes) {
        var i = posicao[0];
        var j = posicao[1];

        grade[i][j] = nome;
    }
}

export default function agendaGrade(listaDeMaterias) {
    var grade = montaGrade();
    var numPrioridades = listaDeMaterias.length;
    for (var i=0; i<numPrioridades; i++) {
        for (const materia of listaDeMaterias[i]) {
            const verifica = verificaCompatibilidade(grade,  traduzHorarioSigaa(materia.horario)); 
            if (verifica[0]) {
                atualizaGrade(grade, verifica[1], materia.nome);
            } 
            else console.log('tá ocupado');
        }
    }

    return grade;
}

