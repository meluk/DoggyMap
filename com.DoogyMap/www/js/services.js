angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Taco Bar',
    lastText: '100 S. de Saretto, carretera hacia los Anonos',
    face: 'img/tacoBarEscazu.jpg'
  }, {
    id: 1,
    name: 'Té con Té',
    lastText: 'Centro Comercial Multiplaza Escazú',
    face: 'img/te_con_te.png'
  }, {
    id: 2,
    name: 'TGIF',
    lastText: 'Entrada Principal a San Rafael de Escazú, diagonal al Perimercados, Escazú',
    face: 'img/TGIF.png'
  }, {
    id: 3,
    name: 'Non Solo Café',
    lastText: 'Plaza Colonial, San Rafael de Escazu del cruze 200 metros oeste sober carretera Santa Ana, Escazu, Costa Rica',
    face: 'img/Non_Solo_Caffe.png'
  }, {
    id: 4,
    name: 'Mandala',
    lastText: 'Galería Escazú (antes Plaza Vita), Local 14 (50 mts oeste de Plaza Colonial), Escazú',
    face: 'img/Mandala.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
