
dummy_target = {
  type : 'target',
  position : {
    left : 34.2769012451172,
    top: -15.8736572265625
  },
  rotation: -0.923674295698944,
  width: 259.285714285714,
  zIndex : 1000
};

app = {
  targets : [],
  defaultSize : {
    width : 100,
    height : 140
  },
  mostForward : 1000000,
  mostBehind: 1000,
  targetStencil : '',
  init : function () {
    this.targetStencil = $('<figure>').addClass('target').load('standard-target.svg');
  },
  paintTarget : function(target){
    newT = this.addTarget();
    newT.position(target.position);
    newT.css('transform', 'rotate(' + target.rotation + ')deg') ;
    //newT.rotate(target.rotation);
    newT.width(target.width);
    newT.zIndex(target.zIndex);
    $('.screen').append(newT);

  },


  addTarget : function(){

    moveForwardHandle = $('<div>').addClass('ui-forward-handle').on('click', function(){
      $(this).parent().parent().zIndex(app.mostForward);
      console.log('forwarrd');
      app.mostForward++;
    });
    moveBackwardsHandle = $('<div>').addClass('ui-backwards-handle').on('click', function(){
      $(this).parent().parent().zIndex(app.mostBehind);
      app.mostBehind--;
    });
    destroyHandle = $('<div>').addClass('ui-destroy-handle').on('click', function(){
      $(this).parent().parent().remove();
    });
    rotateHandle = $('<div>').addClass('ui-rotate-handle');
    dragHandle = $('<div>').addClass('ui-dragable-handle').on('click', function(){

    });

    target = this.targetStencil.clone();
    target.draggable(
      //{ containment: "parent" }

    ).resizable({
        handles : 'se',
        aspectRatio: 5 / 7
    }).rotatable({handle:rotateHandle});
    // Disable rotate on scroll.
    target.unbind('wheel');
    target.width(this.defaultSize.width);
    target.height(this.defaultSize.height);


    // Ensure that when next target is spawned it has the same size.
    target.on( "resizestop", function( event, ui ) {
      app.defaultSize = ui.size
    } );

    target.on( "dragcreate", function( event, ui ) {
      console.log('hest');
      ui.position.left = 100;
      ui.position.top = 100;
    } );



    con = $('<controls>')
      .append(moveForwardHandle)
      .append(moveBackwardsHandle)
      .append(destroyHandle)
      .append(rotateHandle)
      .append(dragHandle);
    target.append(con);
    this.targets.push(target);
    return target;
  },
  addNS : function(){
    //target = this.targetStencil.clone();
    target = this.addTarget();
    $(target).find('path, polygon').attr('fill','white');
    target.addClass('penalty-target');
    return target;
  },
  addSwinger: function (){
    target = this.addTarget();
    target.addClass('swinger');
    cont = $('<div>').addClass('targetContainer').append(target.find('svg'));
    target.append(cont);
    return target;
  }
};


jQuery(function(){
  app.init();
  $('<button>').text('Add Target').on('click', function(){
    target = app.addTarget();
    $('.screen').append(target);
  }).appendTo('.controls');
  $('<button>').text('Add Swinger').on('click', function(){
    target = app.addSwinger();
    $('.screen').append(target);
  }).appendTo('.controls');
  $('<button>').text('Add Penalty Target').on('click', function(){
    target = app.addNS();
    $('.screen').append(target);
  }).appendTo('.controls');

  $('<button>').text('Play!').on('click', function(evt){

    /*zoom.to({
      element: $('.screen')
    });*/

    $('.screen').addClass('play');



setTimeout(function(){
  ready = new Audio('audio/ready.m4a');
  ready.play();
},2000);

    setTimeout(function(){
      ready = new Audio('audio/standby.m4a');
      ready.play();
    },4000);

    setTimeout(function(){
      ready = new Audio('audio/beep.m4a');
      ready.play();
    },7000);

  }).appendTo('.controls');


/*$('.screen').draggable().resizable(
  {aspectRatio : 16 / 9}
).position('center');
*/

  $('body').on('click', function (evt){
//    evt.stopPropagation();
//    $('.screen').removeClass('play');

  });
  //$("body").zoomTarget();


});
