var apiUser = 'your-api-user-id'; // you can get these at : https://habitica.com/#/options/settings/api
var apiKey = 'your-api-token';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var requestify = require('requestify');

var respuestaPrincipal; // donde se guardará la repsuesta al request de tareas

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('./public')); //para que el servidor tenga archivos estáticos para el front-end
  // le permite al html acceder a los archivos en las carpetas js y css

//INICIO
app.get('/',function(req,res)
{
    res.sendFile(__dirname + '/index.html');
});

//CONSEGUIR TODAS LAS TAREAS
app.get('/getTasks',function(req,res) 
{
  requestify.request('https://habitica.com/api/v3/tasks/user?type=todos', {
    method : 'GET',
    headers: {
      'x-api-user' : apiUser,
      'x-api-key' : apiKey
    }
  })
  .then(function(response)
  {
    console.log("hay respuesta por habitica");
    respuestaPrincipal = response.getBody(); // TO DO: falta verificar si fue una respuesta exitosa ( "response.code" agregar después como una función)
    //console.log(respuestaPrincipal['data']);
    res.json({data: respuestaPrincipal['data']}).end();
  });
});

// AGREGANDO UNA TAREA
app.post('/addTask', function (req,res) 
{
  var nameTask = req.body.text_task; //console.log(req.body.text_task);
  var noteTask = req.body.note_task; //console.log(req.body.note_task);
  
  requestify.request('https://habitica.com/api/v3/tasks/user', {
    method : 'POST',
    body: {
      text: nameTask,
      notes: noteTask,
  		type: 'todo',
      priority: '2'
  	},
    headers: {
      'x-api-user' : apiUser,
      'x-api-key' : apiKey
    }
  })
  .then(function(response)
  {
    //console.log("codigo de respuesta : " + response.code);
    //console.log("body : " + response.getBody());
    res.json({data: response.getBody()}).end();
  });
});

// MARCAR UNA TAREA COMO HECHA
app.post('/checkTask', function (req,res) 
{
  var taskId = req.body.id_task;
  var checkTaskString = "https://habitica.com/api/v3/tasks/" + taskId + "/score/up";

  requestify.request(checkTaskString, {
    method : 'POST',
    headers: {
      'x-api-user' : apiUser,
      'x-api-key' : apiKey
    }
  })
  .then(function(response)
  {
    //console.log(response.code);
    res.json({data: response.code}).end();
  });
});

// BORRAR UNA TAREA
app.post('/deleteTask', function (req,res) 
{
  var idTask = req.body.id_task;
  var stringURL = "https://habitica.com/api/v3/tasks/" + idTask;

  requestify.request(stringURL, {
    method : 'DELETE',
    headers: {
      'x-api-user' : apiUser,
      'x-api-key' : apiKey
    }
  })
  .then(function(response)
  {
    res.json({data: response.code}).end();
  });
});

// AGREGAR UNA SUBTAREA
app.post('/addSubTask', function (req,res) 
{
  var idTask = req.body.id_task;
  var nameSubTask = req.body.text_subTask;   //console.log(req.body.text_task);
  var stringURL = "https://habitica.com/api/v3/tasks/" + idTask + "/checklist";

  requestify.request(stringURL, {
    method : 'POST',
    body: {
  		text: nameSubTask,
  	},
    headers: {
      'x-api-user' : apiUser,
      'x-api-key' : apiKey
    }
  })
  .then(function(response)
  {
    res.json({code: response.code , data: response.getBody()}).end(); //envia codigo y respuesta (TO DO: usar codigo para el front-end)
  });
});

// MARCAR O DESMARCAR UNA SUBTAREA 
app.post('/checkSubTask', function (req,res) 
{
  var taskId = req.body.id_task;
  var substaskId = req.body.id_subtask;

  var checkSubTaskString = "https://habitica.com/api/v3/tasks/" + taskId + "/checklist/" + substaskId + "/score";
  // ejm = https://habitica.com/api/v3/tasks/c563ad31-8964-42d8-8819-bebb23cf87c9/checklist/6d38b5b2-3f13-4007-a731-40fb9d1d4bae/score
    // esos son ids de ejm de la tarea y subtarea correspondiente 
  requestify.request(checkSubTaskString, {
    method : 'POST',
    headers: {
      'x-api-user' : apiUser,
      'x-api-key' : apiKey
    }
  })
  .then(function(response)
  {
    //console.log(response.code);
    res.json({data: response.code}).end();
  });
});


app.listen(3000);
console.log("servidor ejecutandose, entrar a http://localhost:3000");
