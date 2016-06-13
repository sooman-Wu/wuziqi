$(function(){
	var canvasS=600;
	var row=15;
	var blockS=canvasS/row;
	var ctx = $('#canvas').get(0).getContext('2d');
	$('#canvas').get(0).height=canvasS;
	$('#canvas').get(0).width=canvasS;
	var starRadius=5;

	var draw=function(){
		 var img = new Image();
        img.src = './image/1.jpg';
        img.onload=function(){
        var pattern = ctx.createPattern(img, 'no-repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0,0,canvasS,canvasS);
    

		var off=blockS/2+0.5;
		var lineWidth=canvasS-blockS;
		ctx.save();
		ctx.beginPath();
		ctx.translate(off,off);
		for (var i = 0; i < row; i++) {
			// if (i===3 || i===11) {
			//     ctx.moveTo(blockS*3,0)
			// 	ctx.arc(blockS*3,0,5,0,(Math.PI/180)*360);
			// 	ctx.fill();
			// };
			if(i===7){
				ctx.moveTo(blockS*7,0);
				ctx.fillStyle='#000';
				ctx.arc(blockS*7,0,starRadius,0,(Math.PI/180)*360);
				ctx.fill();
			}
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
	    for(var i = 0; i<row; i++){
	  //   	if (i===3) {
			//     ctx.moveTo(blockS*8,blockS*3)
			// 	ctx.arc(blockS*8,blockS*3,5,0,(Math.PI/180)*360);
			// 	ctx.fill();
			// };
			// if (i===11) {
			//     ctx.moveTo(0,blockS*11)
			// 	ctx.arc(0,blockS*11,5,0,(Math.PI/180)*360);
			// 	ctx.fill();
			// };
	      ctx.moveTo(0,0)
	      ctx.lineTo(0,lineWidth);
	      ctx.translate(blockS,0);
	    }
	    ctx.stroke();
	    ctx.closePath();
	    ctx.restore();

	    ctx.beginPath();
	    var points=[3.5*blockS+0.5,11.5*blockS+0.5];
	    for (var i = 0; i < points.length; i++) {
	    	for (var j = 0; j < points.length; j++) {
	    		ctx.moveTo(points[i],points[j]);
	    		ctx.fillStyle='#000';
				ctx.arc(points[i],points[j],starRadius,0,(Math.PI/180)*360);
				ctx.fill();
	    	};
	    };
	    ctx.closePath();
	}
	}
	draw();
	
	var qizi={};
	var step=0;
	var drop=function(qizi){
		

		ctx.save();
		ctx.translate((qizi.x+0.5)*blockS,(qizi.y+0.5)*blockS);
		ctx.beginPath();
		ctx.arc(0,0,12,0,(Math.PI/180)*360);
		if (qizi.color===1) {
			var st = ctx.createRadialGradient(5,-5,4,0,0,15);
	  		st.addColorStop(0,'#ccc');
	  		st.addColorStop(0.7,'black')
	  		st.addColorStop(1,'black');
	  		ctx.fillStyle=st;
	  		$('#black').get(0).play();
		}else{
			 var gt = ctx.createRadialGradient(5,-5,2,0,0,15);
	  		gt.addColorStop(0,'#fff');
	  		gt.addColorStop(0.7,'#ccc');
	  		gt.addColorStop(1,'#ccc');
	        ctx.fillStyle = gt;
            $('#black').get(0).play();
		}
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	var All={};
	var kaiguan=true;
	$('#canvas').on('click',function(e){
		var x=Math.floor(e.offsetX/blockS);
		var y=Math.floor(e.offsetY/blockS);
		step+=1;
		if (All[x+'-'+y]) {
			return;
		};

		if (kaiguan) {
			color=1;
			qizi={x:x,y:y,color:color,step:step};
		     drop(qizi);
			if(judge(qizi)){
				$('#carbel').show();
				$('#tishi').text('黑棋获胜');
				return;
			}
			kaiguan=!kaiguan
		}else{
			color=0;
			qizi={x:x,y:y,color:color,step:step};
		    drop(qizi);
			if(judge(qizi)){
				$('#carbel').show();
				$('#tishi').text('白棋获胜');
				return;
			}
			kaiguan=!kaiguan
		}
		All[x+'-'+y]=qizi;

		
	})


    
	var judge=function(qizi){
		var shu=1,hang=1,zuoxie=1,youxie=1;
		var shuju={};
       $.each(All,function(k,v){
          if(v.color===qizi.color){
          	shuju[k]=v;
          }
       })
       var shu=1;
       var tx,ty;
       tx=qizi.x;
       ty=qizi.y;
       while(shuju[tx+'-'+(ty+1)]){
         shu++;
         ty++;
       };
       tx=qizi.x;
       ty=qizi.y;
        while(shuju[tx+'-'+(ty-1)]){
         shu++;
         ty--;
       };
       if(shu>=5){
       	 return true;
       }
        tx=qizi.x;
       ty=qizi.y;
        while(shuju[(tx+1)+'-'+(ty)]){
         hang++;
         tx++;
       };
       tx=qizi.x;
       ty=qizi.y;
        while(shuju[(tx-1)+'-'+(ty)]){
         hang++;
         tx--;
       };
       if(hang>=5){
       	 return true;
       }
tx=qizi.x;
       ty=qizi.y;
        while(shuju[(tx-1)+'-'+(ty+1)]){
         zuoxie++;
         tx--;
         ty++;
       };
       tx=qizi.x;
       ty=qizi.y;
        while(shuju[(tx+1)+'-'+(ty-1)]){
         youxie++;
         tx++;
         ty--;
       };
       if(youxie>=5){
       	 return true;
       }
       tx=qizi.x;
       ty=qizi.y;

        while(shuju[(tx-1)+'-'+(ty-1)]){
         zuoxie++;
         tx--;
         ty--;
       };
       tx=qizi.x;
       ty=qizi.y;
        while(shuju[(tx+1)+'-'+(ty+1)]){
         zuoxie++;
         tx++;
         ty++;
       };
       if(zuoxie>=5){
       	 return true;
       }
	}

	// 点击消失
	$('#carbel').on('click',function(){
		$(this).hide();
	})
	$('.tips').on('click',false);
	$('#restart').on('click',function(){
		$('#carbel').hide();
		ctx.clearRect(0,0,600,600);
		draw();
		kaiguan=true;
		All={};
		step=0;
	})
	$('#qipu').on('click',function(){
		$('#carbel').hide();
		$('#save').show();
		ctx.save();
		ctx.font = '20px consolas';
		for(var i in All){
			if(All[i].color===1){
				ctx.fillStyle='#FFF';
			}else{
				ctx.fillStyle='#333';
			}
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(All[i].step,(All[i].x+0.5)*blockS,(All[i].y+0.5)*blockS);
		}

		ctx.restore();

		  var image = $('#canvas').get(0).toDataURL('image/jpg',1);
	      $('#save').attr('href',image);
	      $('#save').attr('download','qipu.png');
	})
	
		
	
});