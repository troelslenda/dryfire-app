
app = {
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

  addTarget : function(){
    target = this.targetStencil.clone();
    target.draggable(
      //{ containment: "parent" }
    ).resizable({
        aspectRatio: 5 / 7
    }).rotatable();
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


    moveForwardHandle = $('<div>').addClass('ui-forward-handle').on('click', function(){
      $(this).parent().zIndex(app.mostForward);
      app.mostForward++;
    });
    moveBackwardsHandle = $('<div>').addClass('ui-backwards-handle').on('click', function(){
      $(this).parent().zIndex(app.mostBehind);
      app.mostBehind--;
    });
    destroyHandle = $('<div>').addClass('ui-destroy-handle').on('click', function(){
      $(this).parent().remove();
    });
    target.append(moveForwardHandle);
    target.append(moveBackwardsHandle);
    target.append(destroyHandle);
    return target;
  },
  addNS : function(){
    //target = this.targetStencil.clone();
    target = this.addTarget();
    $(target).find('path, polygon').attr('fill','white');
    target.removeClass('target').addClass('penalty-target');
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

$('.screen').draggable().resizable(
  {aspectRatio : 16 / 9}
);
});
