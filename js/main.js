
var aa = [];
for(var i=0; i<6; i++){
	aa.push("https://img1.doubanio.com/mpic/s4023868.jpg".replace(/"\/"/g,"\\/"));
	
}
new bookShelf({
	imgs: aa,
	doms: $('#page1 figure')
});

new bookShelf({
	imgs: aa,
	doms: $('#page2 figure')
});

$('')

$('.main').addClass('after').removeClass('begin');

var allPageNum = 2;
var pageNum = 0;

readyPage();

var data =  {
	"count":1,
	"start":0,
	"total":102,
	"books":[{
		"author":["Jeff Forcier","Paul Bissex"],
		"pubdate":"2009",
		"image":"https:\/\/img3.doubanio.com\/mpic\/s3789820.jpg",
		"binding":"平装",
		"translator":["徐旭铭"],
		"catalog":"",
		"pages":"280",
		"publisher":"机械工业出版社",
		"isbn13":"9787111270287",
		"title":"Django Web开发指南",
		"url":"http:\/\/api.douban.com\/v2\/book\/3740086",
		"author_intro":"Jeffery Forcier现在是Digital Pulp，Inc.的一名系统管理员和Web后台工程师。他在PHP\/Python的Web开发上有7年的经验，自2005年Django问世起他就在工作和业余时间里使用这个框架。\nPaul Bissex很早就开始使用Django，并且开发维护着Django社区的在线着色网站dpaste.com。从1996年起，他就开始主持The Well（well.com），Wired杂志称之为“全世界最有影响力的在线社区”。\nWesley Chun是Prentice Hall的畅销书《Core Python Programming》（corepython.com）、配套的视频教程《Python Fundamentals》（LiveLessons DVD）的作者，以及本书（withdjango.com）的合著者。",
		"summary":"本书讲述如何用Python框架Django构建出强大的Web解决方案，本书讲解了使用新的Django 1.0版的各种主要特性所需要的技术、工具以及概念。 全书分为12章和6个附录，内容包括，Django Python实战，Django速成：构建一个Blog，起始，定义和使用模型，URL、HTTP机制和视图，模板和表单处理，Photo Gallery，内容管理系统，Liveblog，Pastebin，高级Django编程，高级Django部署。附录内容包括命令行基础，安装运行Django，实用Django开发工具，发现、评估、使用Django应用程序，在Google App Engine上使用Django，参与Django项目。 本书适用于Python框架Django初学者，Django Web开发技术人员。",
		"series":{"id":"28671","title":"开发人员专业技术丛书"},"price":"49.00元"}]}

// searchingBooksFirst('django')

//通过豆瓣api搜索图书
//第一次查询
function searchingBooksFirst(q){
	var pageNum = 0;
	$.ajax({  
		url:"https://api.douban.com/v2/book/search",  
		dataType:'jsonp',  
		data:{q: q, count: 6},  
		// jsonp:'callback',  
		success:function(result){
			console.info(result)
			$('.myWindow').empty();
			$('.bb-custom-wrapper').remove();
			allPageNum = Math.ceil(result.total/6);
			createPage(result.start, result.books);
		},  
		timeout:3000  
	});
}
//陆续查询
function searchingBooks(q, start){
	$.ajax({  
		url:"https://api.douban.com/v2/book/search",  
		dataType:'jsonp',  
		data:{q: q, start: start},  
		// jsonp:'callback',  
		success:function(result){
			console.info(result)
		},  
		timeout:3000  
	});
}
//生成一页
function createPage(num, result){
	var img = [];
	$('.myWindow').append('<div class="myPage" id="page'+num+'"><div class="bookshelf"></div></div>');
	for(var i=0; i<result.length; i++){
		var html = '<figure>';
		html += '<div class="book" data-book="'+result[i]['isbn13']+'"></div>';
		html += '<div class="buttons"><a href="#">Look inside</a><a href="#">Details</a></div>';
		console.info(result[i].title.length)
		result[i].title = result[i].title.length>30 ? result[i].title.substr(0, 27)+'...' : result[i].title;
		console.info(result[i].title)
		html += '<figcaption><h2>'+result[i].title+' <span>'+result[i].author+'</span></h2></figcaption>';
		html += '<div class="details"><ul>';
		html += '<li>isbn: '+result[i]['isbn13']+'</li><li>'+result[i]['publisher']+'</li><li>'+result[i]['pages']+' pages</li></ul></div>'
		$('#page'+num+' .bookshelf').append(html);
		img.push(result[i]['image'].replace(/"\/"/g,"\\/"));

		// var html = '<div class="bb-custom-wrapper" id="'+result[i]['isbn13']+'">
		// 	<div class="bb-bookblock">
		// 		<div class="bb-item">
		// 			<div class="bb-custom-side page-layout-3">
		// 				<div>
		// 					<h3>Portraits</h3>
		// 					<p>Photography (1999 &ndash; 2013)</p>
		// 				</div>
		// 			</div>
		// 			<div class="bb-custom-side page-layout-3">
		// 			</div>
		// 		</div>
		// 		<div class="bb-item">
		// 			<div class="bb-custom-side page-layout-1">
		// 				<h3>
		// 					Chapter 9 <span>Nomadic Lifestyle</span>
		// 				</h3>
		// 			</div>
		// 			<div class="bb-custom-side page-layout-1">
		// 				<p>Candy canes lollipop macaroon marshmallow gummi bears tiramisu. Dessert croissant cupcake candy canes. Bear claw faworki faworki lemon drops. Faworki marzipan sugar plum jelly-o marzipan cookie.</p>
		// 			</div>
		// 		</div>
		// 		<div class="bb-item">
		// 			<div class="bb-custom-side page-layout-2">
		// 				<div>
		// 					<h3>Aa</h3>
		// 					<p>Faworki marzipan sugar plum jelly-o marzipan. Soufflé tootsie roll jelly beans. Sweet icing croissant dessert bear claw. Brownie dessert cheesecake danish jelly pudding bear claw soufflé.</p>
		// 				</div>
		// 				<div>
		// 					<h3>Bb</h3>
		// 					<p>Faworki marzipan sugar plum jelly-o marzipan. Soufflé tootsie roll jelly beans. Sweet icing croissant dessert bear claw. Brownie dessert cheesecake danish jelly pudding bear claw soufflé.</p>
		// 				</div>
		// 			</div>
		// 			<div class="bb-custom-side page-layout-2">
		// 				<div>
		// 					<h3>Cc</h3>
		// 					<p>Faworki marzipan sugar plum jelly-o marzipan. Soufflé tootsie roll jelly beans. Sweet icing croissant dessert bear claw. Brownie dessert cheesecake danish jelly pudding bear claw soufflé.</p>
		// 				</div>
		// 				<div>
		// 					<h3>Dd</h3>
		// 					<p>Faworki marzipan sugar plum jelly-o marzipan. Soufflé tootsie roll jelly beans. Sweet icing croissant dessert bear claw. Brownie dessert cheesecake danish jelly pudding bear claw soufflé.</p>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div><!-- /bb-bookblock -->
		// 	<nav>
		// 		<a href="#" class="bb-nav-prev">Previous</a>
		// 		<a href="#" class="bb-nav-next">Next</a>
		// 		<a href="#" class="bb-nav-close">Close</a>
		// 	</nav>
		// </div><!-- /bb-custom-wrapper -->';
		// $('#scroll-wrap').append(html);
	}
	new bookShelf({
		imgs: img,
		doms: $('#page'+num+' figure')
	});
}

//初始化页码
function readyPage(){
	$('.main .bb-nav-prev').hide();
	$('.main .bb-nav-next').hide();
	$('.myWindow').css({'left': '0px'});
	if(allPageNum > 1){
		$('.main .bb-nav-next').show();
	}
}

$('.main .bb-nav-prev').click(function(event) {
	changePage('minus');
});
$('.main .bb-nav-next').click(function(event) {
	changePage('add');
});

//切换页码
function changePage(type){
	if(type == 'add'){
		pageNum++;
		if(pageNum == allPageNum-1) $('.main .bb-nav-next').hide();
		if(pageNum == 1) $('.main .bb-nav-prev').show();
	}else{
		pageNum--;
		if(pageNum == 0) $('.main .bb-nav-prev').hide();
		if(pageNum == allPageNum -2) $('.main .bb-nav-next').show();
	}
	$('.myWindow').css({'left': -pageNum*1000+'px'});
}