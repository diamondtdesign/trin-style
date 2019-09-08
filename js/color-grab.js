$(document).ready(function() {
	
// Grabs the HEX color in each #todays_palette div and applies it as the background color	
	$('#todays_palette div').each(function(){
		var bgColor = $(this).html();
		$(this).css({"background-color": bgColor});
	});	
	
	

  // converts RGB to HEX
  function hexFromRGB(r, g, b) {
  	var hex = [
  		r.toString( 16 ),
  		g.toString( 16 ),
  		b.toString( 16 )
  	];

  	$.each( hex, function( nr, val ) {
  		if ( val.length === 1 ) {
  			hex[ nr ] = "0" + val;
  		}
  	});
  	return hex.join( "" ).toUpperCase();
  }

  // converts HEX to RGB
  function hexToR(h) { return parseInt((cutHex(h)).substring(0,2),16) }
  function hexToG(h) { return parseInt((cutHex(h)).substring(2,4),16) }
  function hexToB(h) { return parseInt((cutHex(h)).substring(4,6),16) }
  function cutHex(h) { return (h.charAt(0)=="#") ? h.substring(1,7) : h } 

  // resets swatch background color
  function refreshSwatch() {
  	var red = $( "#red" ).slider( "value" ),
  		green = $( "#green" ).slider( "value" ),
  		blue = $( "#blue" ).slider( "value" ),
  		hex = hexFromRGB( red, green, blue );
  	$( "#swatch" ).css( "background-color", "#" + hex );
  }

  // defaults for slider  
  $( "#red, #green, #blue" ).slider({
  	orientation: "horizontal",
  	range: "min",
  	max: 255,
  	value: 127,
  	slide: refreshSwatch,
  	change: refreshSwatch
  });

  // default slider color
  $( "#red" ).slider( "value", 71 ); //212
  $( "#green" ).slider( "value", 89 ); //221
  $( "#blue" ).slider( "value", 122 ); //106

  // loads results based on current swatch background color
  $('.getit').live('click',function(){
    var q = '';
    var colorChannels = '';
    var rgb = '';
    var myColor = $('#swatch').css('backgroundColor');
    myColor = myColor.replace(' ','');
    myColor = myColor.replace('rgb(','');
    myColor = myColor.replace('rgba(','');
    myColor = myColor.replace(')','');
    myColor = myColor.replace(' ','');
    colorChannels = myColor.split(',');
    if (colorChannels.length == 1) { q = 'hex='+ colorChannels[0]; }
    if ((colorChannels.length == 3) || (colorChannels.length == 4)) { q = 'rgb=' + colorChannels[0] + '-' + colorChannels[1] + '-' + colorChannels[2]; }

    loadPaletteResults(q);    

    return false;
  
  });

  // loads results based on current swatch background color AND updates the slider
  $('.slideit').live('click',function(){
    var hex = $(this).attr('data-color');
    var q = 'hex=' + hex;

    var r = hexToR(hex);
    var g = hexToG(hex);
    var b = hexToB(hex);

    // reset slider
    $( "#red" ).slider( "value", r );
    $( "#green" ).slider( "value", g );
    $( "#blue" ).slider( "value", b );
    
    loadPaletteResults(q);    
    return false;
  });

  function getUrlVars() {
  	var vars = {};
  	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  		vars[key] = value;
  	});
  	return vars;
  }

  // init addThis script
  function addthis_init() {
    var script = 'http://s7.addthis.com/js/250/addthis_widget.js?domready=1';
    if ( window.addthis ) { window.addthis = null; }    
    $.getScript(script);
  }

  function loadPaletteResults(q) {
    $('.palette_effect').remove();
    $('#palette_loader').html('<div class="palette_effect"></div>');    
    // load results and init addThis js again
    $('.palette_effect').css({ opacity:0 }).load('/index.php/includes/_palette-search2?' + q , function(){ addthis_init(); });
    if ( $.browser.msie ) { $('.palette_effect').css({ opacity:1 }); } else { $('.palette_effect').animate({ opacity:1 },1000);  };
  }

  // check for hex or rgb vals
  var hex = getUrlVars()["hex"];
  var rgb = getUrlVars()["rgb"];

  // set slider and update page results with HEX url val
  if (hex) { 
    var q = 'hex=' + hex;
    var r = hexToR(hex);
    var g = hexToG(hex);
    var b = hexToB(hex);

    // reset slider
    $( "#red" ).slider( "value", r );
    $( "#green" ).slider( "value", g );
    $( "#blue" ).slider( "value", b );
    
    loadPaletteResults(q);
    
  }

  // set slider and update page results with RGB url var
  if (rgb) { 
    var q = 'rgb=' + rgb;
    var rgbParts = rgb.split('-');  
    
    // reset slider
    $( "#red" ).slider( "value", rgbParts[0] );
    $( "#green" ).slider( "value", rgbParts[1] );
    $( "#blue" ).slider( "value", rgbParts[2] );

    loadPaletteResults(q);

  }
  
  
  addthis_init();
  
  
});
