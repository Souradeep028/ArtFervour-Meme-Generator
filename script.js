$(document).ready(function(){

  var canvas = document.getElementById('meme');
  var ctx = canvas.getContext('2d');

  let img = document.getElementById('start-image');
  let fontSize = parseInt( $('#text_font_size').val() );
  let memeSize = parseInt( $('#canvas_size').val() );

  $("#img-result").hide();
  $("#pnew").hide();

  // Main drawing function
  function drawMeme()
  {
    // set form field properties
    $('#text_top_offset').attr('max', memeSize);
    $('#text_bottom_offset').attr('max', memeSize);

    // initialize canvas element with desired dimensions
    canvas.width = memeSize;
    canvas.height = memeSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // calculate minimum cropping dimension
		var croppingDimension = img.height;
		if( img.width < croppingDimension ){
			croppingDimension = img.width;
		}
		ctx.drawImage(img, 0, 0, croppingDimension, croppingDimension, 0, 0, memeSize, memeSize);

    // settings for writing text
    ctx.lineWidth  = parseInt( $('#text_stroke_width').val() );
    ctx.font = fontSize + 'pt sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    var lineHeight = fontSize + parseInt( $('#text_line_height').val() );
    var maxTextAreaWidth = memeSize * 0.85;

    // text 1
    var text1 = $('#text_top').val();
    text1 = text1.toUpperCase();
    x = memeSize / 2;
    y = parseInt( $('#text_top_offset').val() );
    writeText(ctx, text1, x, y, maxTextAreaWidth, lineHeight);

    // text 2
    var text2 = $('#text_bottom').val();
    text2 = text2.toUpperCase();
    y = parseInt( $('#text_bottom_offset').val() );
    writeText(ctx, text2, x, y, maxTextAreaWidth, lineHeight);

  };

  // function to write text on Image
  function writeText(ctx, text, x, y, maxWidth, lineHeight)
  {
    var words = text.split(' ');
    var line = '';
    var lines = [];

    for (var n = 0; n < words.length; n++)
    {
  			var testLine = line + ' ' + words[n];
  			var testWidth = ctx.measureText(testLine).width;
  			if (testWidth > maxWidth)
        {
  				lines.push(line);
  				line = words[n] + ' ';
  			}
        else
        {
  				line = testLine;
  			}
		}

    // pushing the last line
    lines.push(line);

    // displaying the text on canvas
    for (var k=0;k<lines.length;k++)
    {
			ctx.strokeText(lines[k], x, y + lineHeight * k);
			ctx.fillText(lines[k], x, y + lineHeight * k);
		}

	};

  // function to change the image according to the one selected by user
  $("#imgInp").change(function(){
		var input = this;

		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#start-image').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}

		window.setTimeout(function(){drawMeme()}, 100);
  });
  
  $('#p1').click(() => {
    $('#meme').show();
    $('#img-text').show();
    $('#choose').text('Choose Painting')
    $("#img-result").hide();
    $("#pnew").hide();
    let p1 = $('#p1').attr('src');
    img.src = p1;
    window.setTimeout(function(){drawMeme()}, 100);
  });
  
  $('#p2').click(() => {
    $('#meme').show();
    $('#img-text').show();
    $('#choose').text('Choose Painting')
    $("#img-result").hide();
    $("#pnew").hide();
    let p2 = $('#p2').attr('src');
    $('#start-image').attr('src', p2);
    window.setTimeout(function(){drawMeme()}, 100);
  });
  
  $('#p3').click(() => {
    $('#meme').show();
    $('#img-text').show();
    $('#choose').text('Choose Painting')
    $("#img-result").hide();
    $("#pnew").hide();
    let p3 = $('#p3').attr('src');
    $('#start-image').attr('src', p3);
    window.setTimeout(function(){drawMeme()}, 100);
  });

  $('#p4').click(() => {
    $('#meme').show();
    $('#img-text').show();
    $('#choose').text('Choose Painting')
    $("#img-result").hide();
    $("#pnew").hide();
    let p3 = $('#p4').attr('src');
    $('#start-image').attr('src', p3);
    window.setTimeout(function(){drawMeme()}, 100);
  });

  // register event listeners
  $(document).on('change keydown keyup', '#text_top', function() {
  	drawMeme();
  });
  $(document).on('change keydown keyup', '#text_bottom', function() {
  	drawMeme();
  });
  $(document).on('input change', '#text_top_offset', function() {
  	$('#text_top_offset__val').text( $(this).val() );
  	drawMeme();
  });
  $(document).on('input change', '#text_bottom_offset', function() {
  	$('#text_bottom_offset__val').text( $(this).val() );
  	drawMeme();
  });
  $(document).on('input change', '#text_font_size', function() {
  	$('#text_font_size__val').text( $(this).val() );
  	drawMeme();
  });
  $(document).on('input change', '#text_line_height', function() {
  	$('#text_line_height__val').text( $(this).val() );
  	drawMeme();
  });
  $(document).on('input change', '#text_stroke_width', function() {
  	$('#text_stroke_width__val').text( $(this).val() );
  	drawMeme();
  });
  $(document).on('input change', '#canvas_size', function() {
  	$('#canvas_size__val').text( $(this).val() );
  	drawMeme();
  });

  $('#download_meme').click(function(e){
    let URI = canvas.toDataURL("image/jpeg", 0.2)
    $('#generated').attr('src', URI);
    $('#meme').hide();
    $('#img-text').hide();
    $('#choose').text('Create Another - Choose Painting')
    $("#img-result").show();
    $("#pnew").show();
    // $(this).attr('href', URI);
    // console.log(test);
		// $(this).attr('download', 'meme.jpg');
	});

	// init at startup
	window.setTimeout(function(){
		drawMeme();
	}, 100);

});
