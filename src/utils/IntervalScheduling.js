/**
   * Monta uma matriz de tamanho 6x14 representando os horários disponíveis durante a semana (SEGUNDA A SABADO DE 08 AS 22H)
   */
function montaTabela() {
    grade = [];
    for (var i=0; i<6; i++) {
        grade.push([]);
        for (var j=8; j<=22; j++) {
            grade[i].push("-");
        }
    }

    return grade;
}


/**
   * Função que recebe o dia e retorna o index correspondente na tabela de horários.
   * @param  {Number} dia  Número do dia traduzido do padrão de horários do SIGAA
   */
var traduzDia = (dia) => dia-2;


/**
   * Função que traduz o período da aula e devolve o index correspondente na tabela de horários
   * @param  {String} periodo  Dia da aula traduzido do padrão de horários do SIGAA
   * @param  {Number} horario  Horário da aula traduzido do padrão de horários do SIGAA
   */
var traduzHorario = (periodo, horario) => {
    var offset
    if (periodo == 'M') offset = -1;
    if (periodo == 'T') offset = 4;
    if (periodo == 'N') offset = 10;
    
    return horario+offset;
};


/**
   * Função que recebe o horário da aula no formato do SIGAA e devolve um objeto traduzindo os dias, período e horários.
   * @param  {String} horario  Horário da aula no formato do SIGAA.
   */
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


/**
   * Função que verifica se o horário da matéria já está ocupado com outra disciplina.
   * @param  {Array<Array<String>>} grade  Tabela de horários.
   * @param  {Object} horarioMapeado       Horário já traduzido do padrão sigaa.
   */
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


/**
   * Função que atualiza os horários da grade horária com o nome da matéria
   * @param  {Array<Array<String>>} grade     Tabela de horários.
   * @param  {Array<Array<Number>>} posicoes  Conjunto de index da matéria.
   * @param  {String} nome                    Nome da matéria.
   */
function atualizaGrade(grade, posicoes, nome) {
    for (const posicao of posicoes) {
        var i = posicao[0];
        var j = posicao[1];

        grade[i][j] = nome;
    }
}

/**
   * Função que monta a grade de horários
   * @param  {Array<Array<Object>>} listaDeMaterias  Lista de lista de matérias ordenada a partir da prioridade das matérias
   */
export default function montaGrade(listaDeMaterias) {
    var grade = montaTabela();
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

