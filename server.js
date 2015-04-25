var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'admin',
   database: 'DB1_PRACTICA4',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/about',function(req,res){
  res.sendFile(__dirname+'/about.html');
});
app.get('/registro',function(req,res){
  res.sendFile(__dirname+'/registro.html');
});
app.get('/bus',function(req,res){
  res.sendFile(__dirname+'/bus.html');
});
app.get('/ruta',function(req,res){
  res.sendFile(__dirname+'/ruta.html');
});
app.get('/recorrido',function(req,res){
  res.sendFile(__dirname+'/recorrido.html');
});
app.get('/ruta_bus',function(req,res){
  res.sendFile(__dirname+'/ruta_bus.html');
});
app.get('/cliente',function(req,res){
  res.sendFile(__dirname+'/cliente.html');
});
app.get('/reservar',function(req,res){
  res.sendFile(__dirname+'/reservar.html');
});
app.get('/viaje',function(req,res){
  res.sendFile(__dirname+'/viaje.html');
});
app.get('/pago',function(req,res){
  res.sendFile(__dirname+'/pago.html');
});
app.get('/boleto',function(req,res){
  res.sendFile(__dirname+'/boleto.html');
});
app.get('/ticket',function(req,res){
  res.sendFile(__dirname+'/ticket.html');
});
app.get('/manual',function(req,res){
  res.sendFile(__dirname+'/manual.html');
});
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  socket.on('mensaje', function(msg){
    var obj = JSON.parse(msg);
    console.log("se leyo el json: "+obj.employees[0].firstName + " " + obj.employees[0].lastName);
    io.emit('mensaje', msg);
  });
  
    socket.on('Truta', function(msg){
    var tabla1='{"tabla":[';
	var cuerpo='';
	var fin=']}';
    var query = connection.query('select RUTA, ORIGEN, DESTINO from RUTA', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
		    //tabla=resultado[0].BUS;
			var i=0;
			while(i<resultado.length){
				if(resultado.length-1==i){
					cuerpo+='{"RUTA":"'+resultado[i].RUTA+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'" }';
				}else{
					cuerpo+='{"RUTA":"'+resultado[i].RUTA+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'" },';
				}
				
				//console.log(resultado[i].BUS + ' ' + resultado[i].Matricula + ' / ' + resultado[i].Tipo);
				i++;
			}
            tabla1=tabla1+cuerpo+fin;
		    io.emit('Truta', tabla1);
         }else{
            console.log('Registro no encontrado');
         }
		 
      }
   }
);
//connection.end();
    
  });
  
  socket.on('Tbus', function(msg){
    var tabla1='{"tabla":[';
	var cuerpo='';
	var fin=']}';
    var query = connection.query('select b.BUS Bus,b.matricula Matricula,t.nombre Tipo,t.CAPACIDAD Capacidad from BUS b, TIPO_BUS t where b.TIPO_BUS_TIPO_BUS=t.TIPO_BUS ', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
		    //tabla=resultado[0].BUS;
			var i=0;
			while(i<resultado.length){
				if(resultado.length-1==i){
					cuerpo+='{"BUS":"'+resultado[i].Bus+'", "Matricula":"'+resultado[i].Matricula+'", "Tipo":"'+resultado[i].Tipo+'", "Capacidad":"'+resultado[i].Capacidad+'" }';
				}else{
					cuerpo+='{"BUS":"'+resultado[i].Bus+'", "Matricula":"'+resultado[i].Matricula+'", "Tipo":"'+resultado[i].Tipo+'", "Capacidad":"'+resultado[i].Capacidad+'" },';
				}
				
				//console.log(resultado[i].BUS + ' ' + resultado[i].Matricula + ' / ' + resultado[i].Tipo);
				i++;
			}
            tabla1=tabla1+cuerpo+fin;
		    io.emit('Tbus', tabla1);
         }else{
            console.log('Registro no encontrado');
         }
		 
      }
   }
);
//connection.end();
    
  });
  
  socket.on('Tbusruta', function(msg){
    var tabla1='{"tabla":[';
	var cuerpo='';
	var fin=']}';
    var query = connection.query('select b.BUS BUS, r.RUTA RUTA, r.ORIGEN ORIGEN, r.DESTINO DESTINO from RUTA_BUS rb,RUTA r, BUS b where rb.BUS_BUS=b.BUS and rb.RUTA_RUTA=r.RUTA;', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
		    //tabla=resultado[0].BUS;
			var i=0;
			while(i<resultado.length){
				if(resultado.length-1==i){
					cuerpo+='{"BUS":"'+resultado[i].BUS+'", "RUTA":"'+resultado[i].RUTA+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'" }';
				}else{
					cuerpo+='{"BUS":"'+resultado[i].BUS+'", "RUTA":"'+resultado[i].RUTA+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'" },';
				}
				
				//console.log(resultado[i].BUS + ' ' + resultado[i].Matricula + ' / ' + resultado[i].Tipo);
				i++;
			}
            tabla1=tabla1+cuerpo+fin;
		    io.emit('Tbusruta', tabla1);
         }else{
            console.log('Registro no encontrado');
         }
		 
      }
   }
);
//connection.end();
    
  });
  
  socket.on('Trecorrido', function(msg){
    var tabla1='{"tabla":[';
	var cuerpo='';
	var fin=']}';
    var query = connection.query('select RECORRIDO,ORIGEN,DESTINO,HORA_SALIDA,HORA_LLEGADA,KILOMETRAJE,COSTO from RECORRIDO', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
		    //tabla=resultado[0].BUS;
			var i=0;
			while(i<resultado.length){
				if(resultado.length-1==i){
					cuerpo+='{"RECORRIDO":"'+resultado[i].RECORRIDO+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'", "HORA_SALIDA":"'+resultado[i].HORA_SALIDA+'", "HORA_LLEGADA": "'+resultado[i].HORA_LLEGADA+'", "KILOMETRAJE":"'+resultado[i].KILOMETRAJE+'", "COSTO":"'+resultado[i].COSTO+'"}';                                                                                                                  
				}else{
					cuerpo+='{"RECORRIDO":"'+resultado[i].RECORRIDO+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'", "HORA_SALIDA":"'+resultado[i].HORA_SALIDA+'", "HORA_LLEGADA": "'+resultado[i].HORA_LLEGADA+'", "KILOMETRAJE":"'+resultado[i].KILOMETRAJE+'", "COSTO":"'+resultado[i].COSTO+'"},';  
				}
				
				//console.log(resultado[i].BUS + ' ' + resultado[i].Matricula + ' / ' + resultado[i].Tipo);
				i++;
			}
            tabla1=tabla1+cuerpo+fin;
		    io.emit('Trecorrido', tabla1);
         }else{
            console.log('Registro no encontrado');
         }
		 
      }
   }
);
//connection.end();
    
  });
  
  socket.on('tablaviaje', function(msg){
	  var obj = JSON.parse(msg);
   
    var tabla1='{"tabla":[';
	var cuerpo='';
	var fin=']}';
    var query = connection.query('select re.RECORRIDO RECORRIDO, re.ORIGEN ORIGEN, re.DESTINO DESTINO, re.HORA_SALIDA HORA_SALIDA, re.HORA_LLEGADA HORA_LLEGADA, re.KILOMETRAJE KILOMETRAJE, re.COSTO COSTO from DETALLE_VIAJE dv, BOLETO b, RECORRIDO re where dv.RECORRIDO_RECORRIDO=re.RECORRIDO and dv.BOLETO_BOLETO=b.BOLETO and b.BOLETO='+obj.tabla[0].boleto, function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
		    //tabla=resultado[0].BUS;
			var i=0;
			while(i<resultado.length){
				if(resultado.length-1==i){
					cuerpo+='{"RECORRIDO":"'+resultado[i].RECORRIDO+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'", "HORA_SALIDA":"'+resultado[i].HORA_SALIDA+'", "HORA_LLEGADA": "'+resultado[i].HORA_LLEGADA+'", "KILOMETRAJE":"'+resultado[i].KILOMETRAJE+'", "COSTO":"'+resultado[i].COSTO+'"}';                                                                                                                  
				}else{
					cuerpo+='{"RECORRIDO":"'+resultado[i].RECORRIDO+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'", "HORA_SALIDA":"'+resultado[i].HORA_SALIDA+'", "HORA_LLEGADA": "'+resultado[i].HORA_LLEGADA+'", "KILOMETRAJE":"'+resultado[i].KILOMETRAJE+'", "COSTO":"'+resultado[i].COSTO+'"},';  
				}
				
				//console.log(resultado[i].BUS + ' ' + resultado[i].Matricula + ' / ' + resultado[i].Tipo);
				i++;
			}
            tabla1=tabla1+cuerpo+fin;
		    io.emit('Trecorrido', tabla1);
         }else{
            console.log('Registro no encontrado');
         }
		 
      }
   }
);
//connection.end();
    
  });
  
  socket.on('puntoruta', function(msg){
    var tabla1='{"tabla":[';
	var cuerpo='';
	var fin=']}';
    var query = connection.query('select ru.RUTA RUTA, re.RECORRIDO RECORRIDO, re.ORIGEN ORIGEN,re.DESTINO DESTINO from RUTA ru, RECORRIDO re, PUNTOS_RUTA p where p.RUTA_RUTA=ru.RUTA and p.RECORRIDO_RECORRIDO=re.RECORRIDO and p.RUTA_RUTA='+msg, function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
		    //tabla=resultado[0].BUS;
			var i=0;
			while(i<resultado.length){
				if(resultado.length-1==i){
					cuerpo+='{"RUTA":"'+resultado[i].RUTA+'", "RECORRIDO":"'+resultado[i].RECORRIDO+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'"}';                                                                                                                  
				}else{
					cuerpo+='{"RUTA":"'+resultado[i].RUTA+'", "RECORRIDO":"'+resultado[i].RECORRIDO+'", "ORIGEN":"'+resultado[i].ORIGEN+'", "DESTINO":"'+resultado[i].DESTINO+'"},'; 
				}
				
				//console.log(resultado[i].BUS + ' ' + resultado[i].Matricula + ' / ' + resultado[i].Tipo);
				i++;
			}
            tabla1=tabla1+cuerpo+fin;
		    io.emit('puntoruta', tabla1);
         }else{
            console.log('Registro no encontrado');
         }
		 
      }
   }
);
//connection.end();
    
  });
  
  socket.on('autenticar', function(msg){
    var obj = JSON.parse(msg);
    //console.log("se leyo el json: "+obj.autenticar[0].usuario + " " + obj.autenticar[0].pass);
    var tabla1='0';
    var query = connection.query('select CLIENTE from CLIENTE where USUARIO=\''+obj.autenticar[0].usuario +'\' and PASSWORD=\''+obj.autenticar[0].pass+'\'', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
		
	tabla1=resultado[0].CLIENTE;                                                                                                                  
				
            
	
         }else{
            console.log('Registro no encontrado');
         }
		console.log("se leyo la tabla: "+tabla1);
		io.emit('mensaje', tabla1); 
      }
   }
);
  });
  

  socket.on('tablaboleto', function(msg){
	  var obj = JSON.parse(msg);
    var tabla1='{"tabla":[';
	var cuerpo='';
	var fin=']}';
    var query = connection.query('select BOLETO, FECHA, TOTAL, ESTADO from BOLETO where CLIENTE_CLIENTE= '+ obj.tabla[0].COD+' and BOLETO='+ obj.tabla[0].FACTURA+' order by BOLETO desc limit 1', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){

		cuerpo='{"BOLETO":"'+resultado[0].BOLETO+'", "FECHA":"'+resultado[0].FECHA+'", "TOTAL":"'+resultado[0].TOTAL+'", "ESTADO":"'+resultado[0].ESTADO+'"}';                                                                                                                  
	
				
            tabla1=tabla1+cuerpo+fin;
		    io.emit('tablaboleto', tabla1);
         }else{
            console.log('Registro no encontrado');
         }
		 
      }
   }
);
//connection.end();
    
  });
  
    socket.on('verfactura', function(msg){
	var obj = JSON.parse(msg);
	var tabla1='{"tabla":[';
	var cuerpo='';
	var fin=']}';
	var query = connection.query('select BOLETO, FECHA, TOTAL, ESTADO from BOLETO where CLIENTE_CLIENTE= '+ obj.tabla[0].COD, function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){

		                                                                                                               
		var i=0;
			while(i<resultado.length){
				if(resultado.length-1==i){
					cuerpo+='{"BOLETO":"'+resultado[i].BOLETO+'", "FECHA":"'+resultado[i].FECHA+'", "TOTAL":"'+resultado[i].TOTAL+'", "ESTADO":"'+resultado[i].ESTADO+'"}';                                                                                                                   
				}else{
					cuerpo+='{"BOLETO":"'+resultado[i].BOLETO+'", "FECHA":"'+resultado[i].FECHA+'", "TOTAL":"'+resultado[i].TOTAL+'", "ESTADO":"'+resultado[i].ESTADO+'"},';     
				}

				i++;
			}
				
            tabla1=tabla1+cuerpo+fin;
		    io.emit('tablaboleto', tabla1);
         }else{
            console.log('Registro no encontrado');
         }
		 
      }
   }
);
//connection.end();
    
  });
  
  socket.on('verfactura2', function(msg){
	
	var tabla1='{"tabla":[';
	var cuerpo='';
	var fin=']}';
	var query = connection.query('select BOLETO, FECHA, TOTAL, ESTADO from BOLETO ', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){

		                                                                                                               
		var i=0;
			while(i<resultado.length){
				if(resultado.length-1==i){
					cuerpo+='{"BOLETO":"'+resultado[i].BOLETO+'", "FECHA":"'+resultado[i].FECHA+'", "TOTAL":"'+resultado[i].TOTAL+'", "ESTADO":"'+resultado[i].ESTADO+'"}';                                                                                                                   
				}else{
					cuerpo+='{"BOLETO":"'+resultado[i].BOLETO+'", "FECHA":"'+resultado[i].FECHA+'", "TOTAL":"'+resultado[i].TOTAL+'", "ESTADO":"'+resultado[i].ESTADO+'"},';     
				}

				i++;
			}
				
            tabla1=tabla1+cuerpo+fin;
		    io.emit('tablaboleto', tabla1);
         }else{
            console.log('Registro no encontrado');
         }
		 
      }
   }
);
//connection.end();
    
  });
  
  socket.on('registro', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
    //console.log("se leyo el json: "+obj.registro[0].nombre + " " + obj.registro[0].usuario+ " " + obj.registro[0].pass);
	var query = connection.query('insert into CLIENTE(nombre,usuario,password) values(\''+obj.registro[0].nombre+'\',\''+obj.registro[0].usuario+'\',\''+obj.registro[0].pass+'\');', function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
 }
);
//connection.end();
	mensaje2="Reservacion creada";
    io.emit('mensaje', mensaje2);
  });
  
  socket.on('cambiarestado', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
    
	var query = connection.query('update BOLETO set ESTADO=\'reservado\' where BOLETO='+obj.tabla[0].boleto, function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
 }
);
//connection.end();
	mensaje2="Reservacion creada";
    io.emit('mensaje', mensaje2);
  });
  
  socket.on('cambiarbus', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
    console.log('update BUS set TIPO_BUS_TIPO_BUS= '+obj.tabla[0].tipo+' where BUS='+obj.tabla[0].codigo);
	var query = connection.query('update BUS set TIPO_BUS_TIPO_BUS= '+obj.tabla[0].tipo+' where BUS='+obj.tabla[0].codigo, function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
 }
);
//connection.end();
	mensaje2="Modificacion realizada";
    io.emit('mensaje', mensaje2);
  });
  
  
  socket.on('pagarboleto', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
    console.log('update BOLETO set ESTADO= \'pagado\' where BOLETO='+obj.tabla[0].codigo);
	var query = connection.query('update BOLETO set ESTADO= \'pagado\' where BOLETO='+obj.tabla[0].COD, function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
   mensaje2="Modificacion realizada";
    io.emit('mensaje', mensaje2);
 }
);
//connection.end();
	
  });
  
  socket.on('eliminarbus', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
	var query = connection.query('delete from RUTA_BUS where BUS_BUS='+obj.tabla[0].codigo, function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
 }
);
	var query = connection.query('delete from BUS where BUS='+obj.tabla[0].codigo, function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
 }
);
 
//connection.end();
	mensaje2="Bus Eliminado";
    io.emit('mensaje', mensaje2);
  });
  
   socket.on('nuevopunto', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
    //console.log("se leyo el json: "+obj.registro[0].nombre + " " + obj.registro[0].usuario+ " " + obj.registro[0].pass);
	var query = connection.query('insert into DETALLE_VIAJE values('+obj.tabla[0].boleto+','+obj.tabla[0].punto+');', function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
 }
);
 var query = connection.query('update BOLETO b set b.TOTAL=(select SUM(re.COSTO) TOTAL from DETALLE_VIAJE dv, RECORRIDO re where dv.BOLETO_BOLETO=b.BOLETO and dv.RECORRIDO_RECORRIDO=re.RECORRIDO and b.BOLETO='+obj.tabla[0].boleto+') where BOLETO='+obj.tabla[0].boleto, function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
 }
);
//connection.end();
	mensaje2="Destino Agregado";
    io.emit('mensaje', mensaje2);
  });
  
  
    socket.on('boleto', function(msg){
   
	var mensaje2="en proceso";
    //console.log("se leyo el json: "+obj.registro[0].nombre + " " + obj.registro[0].usuario+ " " + obj.registro[0].pass);
	var query = connection.query('insert into BOLETO(FECHA,CLIENTE_CLIENTE,TOTAL,ESTADO) values(CURDATE(),'+msg+',0.00,\'pendiente\')', function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
 }
);
//connection.end();
	var query = connection.query('select BOLETO from BOLETO where CLIENTE_CLIENTE= '+msg+' order by BOLETO desc limit 1;', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
		
	tabla1=resultado[0].BOLETO;                                                                                                                  
				
            
	
         }else{
            console.log('Registro no encontrado');
         }
		
		io.emit('mensaje', tabla1); 
      }
   }
);
  });
  
 socket.on('ruta', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
    //console.log("se leyo el json: "+obj.registro[0].nombre + " " + obj.registro[0].usuario+ " " + obj.registro[0].pass);
	var query = connection.query('insert into RUTA(ORIGEN,DESTINO) values(\''+obj.ruta[0].origen+'\',\''+obj.ruta[0].destino+'\');', function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
   	mensaje2="Ruta Registrada";
    io.emit('mensaje', mensaje2);
 }
);
//connection.end();

  });
  
  socket.on('busruta', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
    //console.log("se leyo el json: "+obj.registro[0].nombre + " " + obj.registro[0].usuario+ " " + obj.registro[0].pass);
	var query = connection.query('insert into RUTA_BUS values('+obj.busruta[0].bus+','+obj.busruta[0].ruta+')', function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
   	mensaje2="Ruta Registrada";
    io.emit('mensaje', mensaje2);
 }
);
//connection.end();

  });
 
   socket.on('Punto', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
    //console.log("se leyo el json: "+obj.registro[0].nombre + " " + obj.registro[0].usuario+ " " + obj.registro[0].pass);
	var query = connection.query('insert into PUNTOS_RUTA(RUTA_RUTA,RECORRIDO_RECORRIDO) values('+obj.punto[0].ruta+','+obj.punto[0].recorrido+')', function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
   	mensaje2="Ruta Registrada";
    io.emit('mensaje', mensaje2);
 }
);
//connection.end();

  });
  
  socket.on('bus', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
    //console.log("se leyo el json: "+obj.registro[0].nombre + " " + obj.registro[0].usuario+ " " + obj.registro[0].pass);
	var query = connection.query('insert into BUS(matricula,tipo_bus_tipo_bus) values(\''+obj.bus[0].matricula+'\','+obj.bus[0].tipobus+');', function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
   mensaje2="Bus Registrado";
    io.emit('mensaje', mensaje2);
 }
);
//connection.end();
	
  });
  
  socket.on('recorrido', function(msg){
    var obj = JSON.parse(msg);
	var mensaje2="en proceso";
   
	var query = connection.query('insert into RECORRIDO(ORIGEN,DESTINO,HORA_SALIDA,HORA_LLEGADA,KILOMETRAJE,COSTO) values(\''+obj.recorrido[0].origen+'\',\''+obj.recorrido[0].destino+'\',\''+obj.recorrido[0].salida+'\',\''+obj.recorrido[0].entrada+'\','+obj.recorrido[0].kilometraje+','+obj.recorrido[0].costo+');', function(error, result){
   if(error){
      throw error;
	  mensaje2="error";
   }else{
      console.log(result); 
   }
   mensaje2="Ruta Registrada";
    io.emit('mensaje', mensaje2);
 }
);
//connection.end();
	
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});
