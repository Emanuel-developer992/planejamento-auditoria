//EXECUTAR AO CARREGAR A PÁGINA
window.onload = function() {

    console.log("--------");
    console.log(getFormMode());
    console.log(getMobile());
    console.log(getWKNumState());
    console.log(getWKUser());
    console.log(getWKNumProces());
    console.log(getWKUserLocale());
    console.log(getWKCardId());
    console.log("--------");
    cronograma();
    hoje('emissao');
    status();
};

var click = 0;
function cronograma() {

    var user = getWKUser();

    var c1 = DatasetFactory.createConstraint("login", user, user, ConstraintType.MUST);

    var constraints = new Array(c1);
    var array = DatasetFactory.getDataset("colleague", null, constraints, null);
    
    var c2 = DatasetFactory.createConstraint("name_norma", array.values[0].colleagueName, array.values[0].colleagueName, ConstraintType.MUST);

    var constraint = new Array(c2);
    var dataset = DatasetFactory.getDataset("DSFormulariodePlanodeAuditoria", null, constraint, null);

    console.log('***');
    console.log(dataset);
    console.log('***');
    var nDts = dataset.values.length;

    for (var i = 0; i < nDts; i++) {

        var dataHrs1 = dataset.values[i].date_planD;
        var dataHrs2 = dataset.values[i].date_planA;

        var dataD = dataHrs1.substring(0, 10);
        var dataA = dataHrs2.substring(0, 10);

        var hrsD = dataHrs1.substring(11, 17);
        var hrsA = dataHrs2.substring(11, 17);

        var dia_closure = dataD.substring(8, 12);
        var mes_closure = dataD.substring(5, 7);
        var ano_closure = dataD.substring(0, 4);

        var date_closure1 = dia_closure + "/" + mes_closure + "/" + ano_closure;

        var dia_closure = dataA.substring(8, 12);
        var mes_closure = dataA.substring(5, 7);
        var ano_closure = dataA.substring(0, 4);

        var date_closure2 = dia_closure + "/" + mes_closure + "/" + ano_closure;


        wdkAddChild('tb_planejamento');
        click++;
        var dadoReq = "";

        //Condição de Busca
        var tb_name = "tb_registro";
        var tbdoc = dataset.values[i].id_norma; // Parâmetros dentro da tabela

        //Filtro de Busca 
        var tbConstraint = DatasetFactory.createConstraint("tablename", tb_name, tb_name, ConstraintType.MUST); // Usar sempre tablename
        var docConstraint = DatasetFactory.createConstraint("tb_norma", tbdoc, tbdoc, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        var arrayConstraint = new Array(tbConstraint, docConstraint); // Tranformas as duas constraint em Array

        // Busca no Dataset + Condições de Filtro
        var array2 = DatasetFactory.getDataset("DSFormulariodeCadastrodeRequisito", null, arrayConstraint, null);

        

        var arrayCount = array2.values.length;

        for (var j = 0; j < arrayCount; j++) {
            dadoReq += array2.values[j].tb_req+'; ';
        }

        $('#tb_data___'+click).val(date_closure1+' - '+date_closure2);
        $('#tb_hrs___'+click).val(hrsD+' - '+hrsA);
        $('#tb_area___'+click).val(dataset.values[i].area_process);
        $('#tb_norma___'+click).val(dataset.values[i].id_norma);
        $('#tb_requisito___'+click).val('Requisito');
        $('#t_tb_requisito___'+click).val(dadoReq);
        $('#tb_auditor___'+click).val('Auditor');
        $('#t_tb_auditor___'+click).val(array.values[0].colleagueName);
        $('#tb_auditado___'+click).val('Auditado');
        $('#t_tb_auditado___'+click).val(dataset.values[0].org_norma);

    }
        
}

//DATA DE HOJE
function hoje(id) {

    // Obtém a data/hora atual
	var data = new Date();
	
    // Guarda cada pedaço em uma variável
    var dia = data.getDate();           // 1-31
    var mes = data.getMonth();          // 0-11 (zero=janeiro)
    var ano4 = data.getFullYear();      // 4 dígitos
    
    // Formata a data e a hora (note o mês + 1)

    if (dia < 10) {
        dia = '0'+dia;
    }
    if (mes < 10) {
        mes = '0'+mes
    }

    var str_data = dia+'/'+mes+'/'+ano4;

    $('#'+id).val(str_data);
    return str_data;

};

function status() {
    $('#status').val('Pendências');
    $('#status').addClass('status-input2');
}