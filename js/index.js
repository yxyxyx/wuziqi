// $(function(){
// 	var canvas=document.querySelector('#canvas');
// 	var ctx = canvas.getContext('2d');
// 	ctx.translate(20,20);
// 	ctx.beginPath();

// 	for(var i=0;i<16;i++){
// 		ctx.moveTo(0,40*i);
// 	    ctx.lineTo(560,40*i);
// 	}
// 	for(var i=0;i<16;i++){
// 		ctx.moveTo(40*i,0);
// 	    ctx.lineTo(40*i,560);
// 	}
// 	ctx.stroke();
// 	ctx.moveTo(285,280);
// 	ctx.arc(280,280,5,0,(Math.PI/180)*360);
// 	ctx.moveTo(125,120);
// 	ctx.arc(120,120,5,0,(Math.PI/180)*360);
// 	ctx.moveTo(440,120);
// 	ctx.arc(440,120,5,0,(Math.PI/180)*360);
// 	ctx.moveTo(445,440);
// 	ctx.arc(440,440,5,0,(Math.PI/180)*360);
// 	ctx.moveTo(125,120);
// 	ctx.arc(120,440,5,0,(Math.PI/180)*360);
// 	ctx.fill();
// 	ctx.closePath();
// })
$(function(){
	var canvasS=600;
	var row=15;
	var blockS = canvasS/row;
	var ctx=$('#canvas').get(0).getContext('2d');
  $('#canvas').get(0).width = canvasS;
  $('#canvas').get(0).height = canvasS;
//画页面
  var draw = function(){
  	var lineWidth = canvasS-blockS;
  	var off = blockS/2+0.5;

  	ctx.save();
  	ctx.beginPath();
  	ctx.translate(off,off);
  	for(var i=0;i<row;i++){
  		ctx.moveTo(0,0);
  	    ctx.lineTo(lineWidth,0);
  	    ctx.translate(0,blockS);
  	}
  	ctx.stroke();
  	ctx.closePath();
  	ctx.restore();

  	ctx.save();
  	ctx.beginPath();
  	ctx.translate(off,off);
  	for(var i=0;i<row;i++){
  		ctx.moveTo(0,0);
  	    ctx.lineTo(0,lineWidth);
  	    ctx.translate(blockS,0);
  	}
  	ctx.stroke();
  	ctx.closePath();
  	ctx.restore();

  	var points = [3.5*blockS+0.5,11.5*blockS+0.5];
  	for(var i=0;i<2;i++){
  		for(var j=0;j<2;j++){
  			var x=points[i];
  			var y=points[j];
  			ctx.save();
  	        ctx.beginPath();
  	        ctx.translate(x,y);
  	        ctx.arc(0,0,3,0,(Math.PI/180)*360);
  	        ctx.fill();
  	        ctx.closePath();
  	        ctx.restore();
  		}
  	}

   	ctx.save();
  	ctx.beginPath();
  	ctx.translate(7.5*blockS+0.5,7.5*blockS+0.5);
  	ctx.arc(0,0,3,0,(Math.PI/180)*360);
  	ctx.fill();
  	ctx.closePath();
  	ctx.restore();  	
  }
  draw();

//落子
   var qiziRadius = blockS/2*0.8;
   var drop =function(qizi){
  	ctx.save();
  	ctx.translate((qizi.x+0.5)*blockS,(qizi.y+0.5)*blockS);
  	ctx.beginPath();
  	ctx.arc(0,0,qiziRadius,0,(Math.PI/180)*360);
  	if(qizi.color===1){
  		var st = ctx.createRadialGradient(5,-5,4,0,0,15);
  		st.addColorStop(0,'#ccc');
  		st.addColorStop(0.7,'black')
  		st.addColorStop(1,'black');
  		ctx.fillStyle=st;
  	}else{
  		var gt = ctx.createRadialGradient(5,-5,2,0,0,15);
  		gt.addColorStop(0,'#fff');
  		gt.addColorStop(0.7,'#ccc');
  		gt.addColorStop(1,'#ccc');
        ctx.fillStyle = gt;
  	}
  	ctx.fill();
  	ctx.closePath();
  	ctx.restore();
   }
   var kaiguan = true;
   var All = {};
   var step = 1;
   var panduan = function(qizi){
   var shuju = {};
   	$.each(All,function(k,v){
   		if(v.color===qizi.color){
   			shuju[k] = v;
   		}
   	});
   	var shu = 1,heng = 1, zuoxie = 1,youxie = 1;
   	var tx,ty;

   	//竖
   	tx =qizi.x; ty = qizi.y;
   	while(shuju [tx + '-' + (ty + 1)]){
   		shu++;ty++;
   	}
   	tx = qizi.x; ty = qizi.y;
   	while(shuju [tx + '-' + (ty - 1)]){
   		shu++;ty--;
   	}

   	//横
   	tx =qizi.x; ty = qizi.y;
   	while(shuju [(tx + 1) + '-' + ty]){
   		heng++;tx++;
   	}
   	tx = qizi.x; ty = qizi.y;
   	while(shuju [(tx - 1) + '-' + ty]){
   		heng++;tx--;
   	}
   	//左斜
   	tx = qizi.x;ty = qizi.y;
   	while(shuju[(tx - 1)+ '-' +(ty + 1)]){
   		zuoxie++;tx--;ty++;
   	}
   	while(shuju[(tx + 1)+ '-' +(ty - 1)]){
   		zuoxie++;tx++;ty--;
   	}
   	//右斜
   	tx = qizi.x;ty = qizi.y;
   	while(shuju[(tx - 1)+ '-' +(ty - 1)]){
   		youxie++;tx--;ty--;
   	}
   	while(shuju[(tx + 1)+ '-' +(ty + 1)]){
   		youxie++;tx++;ty++;
   	}
   	if(heng>=5||shu>=5||zuoxie>=5||youxie>=5){
   		return true;
   	}
   }
//下棋
$('#canvas').on('click',function(e){
	var x = Math.floor(e.offsetX/blockS);
	var y = Math.floor(e.offsetY/blockS);
	if(All[x+'-'+y]){
		return
	}
	var qizi;
	if(kaiguan){
		qizi = {x:x,y:y,color:1,step:step};
		drop(qizi);
		if(panduan(qizi)){
			$('.zhe').fadeIn(500);
      $('#qi').text('黑');
			return;
		}
	}else{
		qizi = {x:x,y:y,color:0,step:step};
		drop(qizi);
		if(panduan(qizi)){
			$('.zhe').fadeIn(500);
      $('#qi').text('白');
			return;
		}
	}
  step+= 1;
	kaiguan = !kaiguan;
	All[x+'-'+y] = qizi;
  })
//事件
 $('.tip').on('click',false);
 $('#out').on('click',function(){
  $('.zhe').fadeOut(500);
 })
 $('.zhe').on('click',function(){
  $(this).fadeOut(500);
 }) 
 $('#restart').on('click',function(){
  $('.zhe').fadeOut(500);
  ctx.clearRect(0,0,600,600);
  draw();
  kaiguan = true;
  All = {};
  step = 1;
 })
 $('#dayin').on('click',function(){
   $('.zhe').fadeOut(500);
   $('.cun').show(600);
   ctx.save();
   ctx.font = "20px consolas";
   for(var i in All){
    if(All[i].color === 1){
      ctx.fillStyle = '#fff';
    }else{
      ctx.fillStyle = 'black';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(All[i].step,(All[i].x+0.5)*blockS,(All[i].y+0.5)*blockS);
   }
   ctx.restore();
   var image = $('#canvas').get(0).toDataURL('image/jpg',1);
   $('.cun').attr('href',image);
   $('.cun').attr('download','qipu.png');
 })
})