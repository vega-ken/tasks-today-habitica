$("document").ready(function(){
  //CONSEGUIR Y MOSTRAR TODAS LAS TAREAS
  $.ajax(
	{
		type: "GET",
		url: window.location.href+"getTasks",
		success: function(reply_data)
		{
      //console.log(reply_data.data);
      reply_data.data.forEach(function(e,i) { // e : elemento como tal , i : indice del elemento

        $("#contenedorPrincipal2").append(
          "<div class='row filaTarea' id='filaTarea"+e.id+"'>"+
            "<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8'>"+
              "<div id='nTarea"+e.id+"'>"+
                "<p id='"+e.id+"' class='nombreTarea' ondblclick='checkTheTask(id)'>" + e.text + "</p>"+
              "</div>"+
            "</div>"+

            "<span class='fa fa-plus col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons' id='addSubTask"+e.id+"' onclick='addSubTask(this.id)'></span>"+ // value='"+e.id+"' (never could get the attribute value)
            "<span class='fa fa-pencil-square-o col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons'></span>"+ 
            "<span class='fa fa-trash col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons' id='deleteTask"+e.id+"' onclick='deleteTask(this.id)'></span>"+ 
            "<span class='fa fa-arrows-v col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons'></span>"+

          "</div>");
        //agregando notas de cada tarea, si las hay
        if(e.notes)
        {
          $('#nTarea' + e.id).append("<p class='notaTarea'>"+e.notes+"</p>");
        }
        //agregando lista de subtareas como un form para cada tarea. TO DO : averiguar si es realmente necesario usar un form (nunca se hace un submit)
        if(e.checklist.length)
        {
          $('#nTarea' + e.id).append(
            "<form id='nForm"+e.id+"' class='formTareas'>"+
            "</form>");

          for(j=0;j<e.checklist.length;j++)
          {
            $('#nForm' + e.id).append( 
              "<div class='checkbox'>"+
                "<label class='nombreSubtarea'>"+
                  "<input type='checkbox' value='"+e.id+"' name='"+e.checklist[j].id+"' id='nCheckBox"+e.id+e.checklist[j].id+"' class='checkChecked' onclick='checkboxCheckedFunction(value,name)'>"+ // id='nCheckBox"+i+j+"'
                  "<span class='textSubtareaCheckbox'>"+e.checklist[j].text+"</span>"+
                "</label>"+
              "</div>");

            if(e.checklist[j].completed == true) // si la tarea aún no esta hecha
            {
              $('#nCheckBox'+e.id+e.checklist[j].id).prop("checked", true);
            }
          }
        }
      });

      $("#contenedorPrincipal2").sortable(
        {
          handle : ".fa-arrows-v" // elemento quien dirige la propiedad sortable
        }
      );
    }
  })

  // AGREGAR TAREA AL INICIO CUANDO SE PRESIONA ENTER
  $("#formAgregaTarea").on('submit',function(e){ 
    e.preventDefault();
    var newTask = $("#formTextNewTask"); // id del form : newTask.val()
    var textNewTask = newTask.val();

    var indexNoteTask = textNewTask.indexOf('|');
    var nameNewTask;
    var nameNoteTask;

    if(indexNoteTask !== -1)
    {
      nameNewTask = textNewTask.charAt(0).toUpperCase() + textNewTask.slice(1,(indexNoteTask-1));
      nameNoteTask = textNewTask.slice(indexNoteTask+2);
    }
    else{
      nameNewTask = textNewTask.charAt(0).toUpperCase() + textNewTask.slice(1);
      nameNoteTask = "";
    }

    $.ajax(
    {
      type: 'POST',
      dataType: "json",
      url: window.location.href+"addTask",  // toma el url actual y le agrega "addTask" : ejm de como queda :  http://localhost:3000/addTask
      data: {text_task : nameNewTask, note_task : nameNoteTask},
      success:
        function( reply_data ) {
          console.log("respuesta a la creacion de una tarea");
          console.log(reply_data.data);
          //console.log("id : " + reply_data.data.data.id);

          if ( reply_data.data.data.notes === "" ){
            console.log("no hay notas en la nueva tarea");
            $("#contenedorPrincipal2").prepend(
              "<div class='row filaTarea' id='filaTarea"+reply_data.data.data.id+"'>"+ // TO DO : mejorar la forma en como manejar esta respuesta (variables)
                  "<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8'>"+
                    "<div id='nTarea"+reply_data.data.data.id+"'>"+
                      "<p id='"+reply_data.data.data.id+"' class='nombreTarea' ondblclick='checkTheTask(id)'>" + reply_data.data.data.text + "</p>"+
                    "</div>"+
                  "</div>"+
  
                  "<span class='fa fa-plus col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons' id='addSubTask"+reply_data.data.data.id+"' onclick='addSubTask(this.id)'></span>"+ // value='"+e.id+"' (never could get the attribute value)
                  "<span class='fa fa-pencil-square-o col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons'></span>"+
                  "<span class='fa fa-trash col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons' id='deleteTask"+reply_data.data.data.id+"' onclick='deleteTask(this.id)'></span>"+ 
                  "<span class='fa fa-arrows-v col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons'></span>"+
              "</div>");
          }
          else{
            $("#contenedorPrincipal2").prepend(
              "<div class='row filaTarea' id='filaTarea"+reply_data.data.data.id+"'>"+ // TO DO : mejorar la forma en como manejar esta respuesta (variables)
                  "<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8'>"+
                    "<div id='nTarea"+reply_data.data.data.id+"'>"+
                      "<p id='"+reply_data.data.data.id+"' class='nombreTarea' ondblclick='checkTheTask(id)'>" + reply_data.data.data.text + "</p>"+
                      "<p class='notaTarea'>"+reply_data.data.data.notes+"</p>"+
                    "</div>"+
                  "</div>"+
  
                  "<span class='fa fa-plus col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons' id='addSubTask"+reply_data.data.data.id+"' onclick='addSubTask(this.id)'></span>"+ // value='"+e.id+"' (never could get the attribute value)
                  "<span class='fa fa-pencil-square-o col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons'></span>"+
                  "<span class='fa fa-trash col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons' id='deleteTask"+reply_data.data.data.id+"' onclick='deleteTask(this.id)'></span>"+ 
                  "<span class='fa fa-arrows-v col-xs-1 col-sm-1 col-md-1 col-lg-1 action-buttons'></span>"+
              "</div>");
          }
          //console.log("Task agregado a la pagina correctamente");
        }
    })

    $('#formTextNewTask').val(''); // limpiando el texto para una nueva tarea. se limpia fuera del ajax para agregarlas más rápidamente

    //TO DO : llamar a una funcion que actualice un icono que indique que ya está en sincronia con el servidor de habitica, se pondria en la respuesta
  })

});

//FUNCIONES QUE OCURRIRÁN LUEGO DE LA CARGA DE LA PÁGINA

//MARCAR UNA TAREA COMO HECHA Y BORRARLA DE LA PAGINA
function checkTheTask(id){
  $("#filaTarea"+id).remove(); // da la impresión al usuario de que la tarea ya se borró (aunque aún la respuesta se dará en el background)

  $.ajax(
  {
    type: 'POST',
    dataType: "json",
    url: window.location.href+"checkTask",
    data: {id_task : id},
    success:
      function( reply_data ) {
        if (reply_data.data == 200)
        {
            //console.log("task marcado con exito");
            //TO DO: aqui se podria llamar a la funcion que actualice el icono que indica sincronia con el servidor de habitica
        }
      }
  })
}

//ELIMINAR UNA TAREA Y BORRARLA DE LA PAGINA
function deleteTask(id){
  //esto no tendría que hacerse así si pudiera tomar el atributo "value" o "name" de un elemento, pero no he encontrado forma hasta ahora.
  var checkString = id.indexOf("deleteTask");
  if( checkString == 0 )
  {
    var idTaskTarget = id.slice(10);
    $.ajax(
    {
      type: 'POST',
      dataType: "json",
      url: window.location.href+"deleteTask", //"http://ec2-54-211-182-70.compute-1.amazonaws.com:2017/ultimoValor",
      data: {id_task : idTaskTarget},
      success:
        function( reply_data ) {
          if (reply_data.data == 200)
          {
              console.log("Tarea eliminada con éxito");
          }
        }
    })
    $("#filaTarea"+idTaskTarget).remove();
  }
}

//MARCAR O DESMARCAR UNA SUBTAREA
function checkboxCheckedFunction(value, name) {
    //console.log("tarea #" + value);
    //console.log("subtarea #" + name);
    $.ajax(
    {
      type: 'POST',
      dataType: "json",
      url: window.location.href+"checkSubTask",
      data: {id_task : value, id_subtask : name},
      success:
        function( reply_data ) {
          if (reply_data.data == 200)
          {
              //console.log("cambio subtask realizado");
              //TO DO: aqui se podria llamar a la funcion que actualice el icono que indica sincronia con el servidor de habitica
          }
        }
    })
}

// AGREGAR UNA SUBTAREA
function addSubTask(id){
  //esto no tendría que hacerse así si pudiera tomar el atributo "value" o "name", pero no he encontrado forma hasta ahora.
  var checkString = id.indexOf("addSubTask");
  if( checkString == 0 )
  {
    var idTaskTarget = id.slice(10);
    //console.log(idTaskTarget);

    $('#nTarea'+idTaskTarget).append(
      "<form class='formnewsubtask'>"+
        "<input type='text' placeholder='Add new subtask' id='newSubTask"+idTaskTarget+"' onkeypress='return addTheSubTask(event,id,value)' autocomplete='off'/>"+  //value='text here'
      "</form>");
  }
}

function addTheSubTask(e,id,value) { // id = idTaskParent || value = textSubTask
    if (e.keyCode == 13) {
        e.preventDefault(); // evitar que se mande un form
        //console.log(id); //newSubTask-ID-ID-ID-ID
        var checkString = id.indexOf("newSubTask");
        if( checkString == 0 )
        {
          var idTaskTarget = id.slice(10);
          //console.log(newString);

          $.ajax(
          {
            type: 'POST',
            dataType: "json",
            url: window.location.href+"addSubTask",
            data: {id_task : idTaskTarget , text_subTask : value}, 
            success:
              function( reply_data ) {
                if (reply_data.code == 200)
                {
                    //console.log("subTask creado con exito");
                    var subTasksTotal = reply_data.data.data.checklist;

                    var textNewSubTask = subTasksTotal[subTasksTotal.length-1].text; // TO DO: averiguar si puedes reemplazar esto con value (que se recibe en esta funcion)
                    var idNewSubTask = subTasksTotal[subTasksTotal.length-1].id;
                    //console.log(subTasksTotal[subTasksTotal.length-1].text); //[-1].text

                    //Si no existe el form que contiene otras subtareas anteriores, se crea uno. De lo contrario se agrega solamente la nueva subtarea.
                    if ( $('#nForm'+idTaskTarget).length != 0 )
                    {
                      //console.log("existe form, solo agregar checkbox");
                      $('#nForm' + idTaskTarget).append(
                        "<div class='checkbox'>"+
                          "<label class='nombreSubtarea'>"+
                            "<input type='checkbox' value='"+idTaskTarget+"' name='"+idNewSubTask+"' id='nCheckBox"+idTaskTarget+idNewSubTask+"' class='checkChecked' onclick='checkboxCheckedFunction(value,name)'>"+ // id='nCheckBox"+i+j+"'
                            "<span class='textSubtareaCheckbox'>"+textNewSubTask+"</span>"+
                          "</label>"+
                        "</div>");
                    }
                    else {
                      //console.log("no existe form, se crea y se agrega checkbox");
                      $('#nTarea' + idTaskTarget).append(
                        "<form id='nForm"+idTaskTarget+"' class='formTareas'>"+
                          "<div class='checkbox'>"+
                            "<label class='nombreSubtarea'>"+
                              "<input type='checkbox' value='"+idTaskTarget+"' name='"+idNewSubTask+"' id='nCheckBox"+idTaskTarget+idNewSubTask+"' class='checkChecked' onclick='checkboxCheckedFunction(value,name)'>"+ // id='nCheckBox"+i+j+"'
                              "<span class='textSubtareaCheckbox'>"+textNewSubTask+"</span>"+
                            "</label>"+
                          "</div>"+
                        "</form>");
                    }
                }
              }
          })
          // si no quieres efecto de retraso por esperar respuesta de servidor... aquí deberías agregar la info
            // de hecho debería estar antes del ajax para estar seguros que estos elementos existirán para cambiar sus valores y ids (modificarías con Jquery)
          $('.formnewsubtask').remove(); // eliminar el form

        }
        /* 
          esta parte nunca funciona, TO DO : averiguar por que
          console.log("esto es lo que se escribio en la caja de agregar nueva subtarea: "); // lo que se escribio en el subtask
          console.log(value);
        */
        return false;
    }
}