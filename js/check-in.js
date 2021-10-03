const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WIDTH = canvas.width, HEIGHT = canvas.height;
var startEnd = 0;


function $( path ){
	return document.querySelector( path );
}


function start(){
	$(".back").style.zIndex = 100;	
	$(".back").style.opacity = 1;

	// 黑屏动画
	setTimeout( function(){
		$(".container").removeChild( $(".title") );
		$(".container").removeChild( $("a") );
	}, 1000 );

	// 亮屏动画
	setTimeout( function(){
		$(".back").style.backgroundColor = "rgba( 0, 0, 0, .4 )";
		$("canvas").style.zIndex = 100;

		count( 100, 0, WIDTH, 0, HEIGHT );

		content = contents[`${months[ new Date().getMonth()]}${ new Date().getDate() }`];
		const keys = Object.keys( content );
		let sumTime = 0;

		for( let i = 0 ; i < keys.length ; i ++ ){
			setTimeout( function(){
				show( i + 1, keys[i], content[ keys[i] ] );
			}, 15000 + sumTime * 100 );
			sumTime += content[ keys[i] ];
		}

		setTimeout( function(){
			ctx.clearRect( 0, 0, WIDTH, HEIGHT );
			$(".subtitle").innerHTML = ":: 结束 ::";
			$(".subtitle").style.opacity = 1;
		}, sumTime * 100 );
	}, 1000 );
}

function count( n, x1, x2, y1, y2 ){
	let num = n;
	const timer = setInterval( function(){
		ctx.clearRect( 0, 0, ( x2 - x1 ), ( y2 - y1 ) );
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = "#FFF"
		ctx.font = 'normal 300px Consolas';
		txt = Number.parseFloat( num / 10 ) % 1 ? Number.parseFloat( num / 10 ) : `${Number.parseFloat( num / 10 )}.0`;
		ctx.fillText( txt, ( x2 - x1 ) / 2, ( y2 - y1 ) / 2 );
		num -= 1;
		
		if( num < 0 ){
			clearInterval( timer );
			ctx.clearRect( 0, 0, ( x2 - x1 ), ( y2 - y1 ) );

			$(".subtitle").style.zIndex = 100;
			$(".subtitle").style.opacity = 1;

			return setTimeout( function(){
				$(".subtitle").style.opacity = 0;
			}, 2000 );
		}
	}, 100 );
}

function show( num, txt, time ){
	let n = time;
	const timer = setInterval( function(){
		ctx.clearRect( 0, 0, WIDTH, HEIGHT );

		// 签到或听写内容显示
		ctx.font = 'normal 150px Consolas';
		ctx.fillStyle = '#FFF';
		ctx.fillText( `${num}.${txt}`, WIDTH / 2, HEIGHT / 2 );

		// 倒计时显示
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = n < 50 ? "#F55" : "#FFF";
		ctx.font = 'normal 75px Consolas';
		let ntxt = Number.parseFloat( n / 10 ) % 1 ? Number.parseFloat( n / 10 ) : `${Number.parseFloat( n / 10 )}.0`;
		ctx.fillText( ntxt, WIDTH - 150, 100 );

		n -= 1;

		// 判断倒计时是否结束
		if( n < 0 ){
			clearInterval( timer );
			return ctx.clearRect( WIDTH - 300, 0, WIDTH, 200 );
		}
	}, 100 );
}