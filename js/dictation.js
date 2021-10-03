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
		$(".content").style.zIndex = 100;
		$(".content").style.opacity = 1;

		const content = contents[`${months[ new Date().getMonth()]}${ new Date().getDate() }`];
		const keys = Object.keys( content );
		
		const p = document.createElement("p");
		p.className = "card";
		
		keys.forEach( ( cur, idx, arr ) => p.innerHTML += `${idx + 1}.${cur}　　` );

		$(".content").appendChild( p );	

	}, 1000 );
}