
var allPageNum = 0;
var pageNum = 0;
var searchInfor = '重逢';

searchingBooksFirst('django')

//通过豆瓣api搜索图书
//第一次查询
function searchingBooksFirst(){
	var pageNum = 0;
	$.ajax({  
		url:"https://api.douban.com/v2/book/search",  
		dataType:'jsonp',  
		data:{q: searchInfor, count: 6},  
		// jsonp:'callback',  
		success:function(result){
			// console.info(result)
			$('.myWindow').empty();
			$('.bb-custom-wrapper').remove();
			allPageNum = Math.ceil(result.total/6);
			console.info(allPageNum)
			createPage(result.start, result.books);
			readyPage();
			$('.main').addClass('after').removeClass('begin');
			if(allPageNum > 1){
				searchingBooks(6);
			}
		},  
		timeout:3000  
	});
}
//陆续查询
function searchingBooks(start){
	$.ajax({  
		url:"https://api.douban.com/v2/book/search",  
		dataType:'jsonp',  
		data:{q: searchInfor, start: start, count: 6},  
		// jsonp:'callback',  
		success:function(result){
			createPage(start/6, result.books);
		},  
		timeout:3000  
	});
}
//生成一页
function createPage(num, result){
	var img = [];
	$('.myWindow').append('<div class="myPage" id="page'+num+'" style="left: '+num*1000+'px"><div class="bookshelf"></div></div>');
	for(var i=0; i<result.length; i++){
		var html = '<figure>';
		html += '<div class="book" data-book="'+result[i]['isbn13']+'"></div>';
		html += '<div class="buttons"><a href="#">Look inside</a><a href="#">Details</a></div>';
		// console.info(result[i].author.length)
		var title = result[i].title.length>30 ? result[i].title.substr(0, 27)+'...' : result[i].title;
		// console.info(result[i].title)
		var author = result[i].author.length>1 ? result[i].author[0]+'...' : result[i].author[0];
		// console.info(result[i].author)
		html += '<figcaption><h2>'+title+' <span>'+author+'</span></h2></figcaption>';
		html += '<div class="details"><ul>';
		html += '<li>isbn: '+result[i]['isbn13']+'</li><li>'+result[i]['publisher']+'</li><li>'+result[i]['pages']+' pages</li></ul></div>'
		$('#page'+num+' .bookshelf').append(html);
		img.push(result[i]['image'].replace(/"\/"/g,"\\/"));

		var html = '<div class="bb-custom-wrapper" id="'+result[i]['isbn13']+'">';
		html += '<div class="bb-bookblock"><div class="bb-item">';
		html += '<div class="bb-custom-side page-layout-3">';
		html += '<img src="'+result[i].images.large+'"></div>';
		html += '<div class="bb-custom-side page-layout-3"><div>';
		html += '<p>图书名称：'+result[i].title+'</p>';
		html += '<p>作者：'+result[i].author+'</p>';
		if(result[i].translator.length>0){
			html += '<p>译者：'+result[i].translator+'</p>';
		}
		html += '<p>出版社：'+result[i].publisher+' </p>';
		html += '<p>出版年：'+result[i].pubdate+'</p>';
		html += '<p>页数：'+result[i].pages+'</p>';
		html += '<p>定价：'+result[i].price+'</p>';
		html += '<p>装帧：'+result[i].binding+'</p>';
		html += '<p>isbn：'+result[i]['isbn13']+'</p>';
		html += '<p>豆瓣链接：<a target="blank" href="'+result[i].alt.replace(/"\/"/g,"\\/")+'">'+result[i].alt.replace(/"\/"/g,"\\/")+'</a></p>';
		if(result[i]['ebook_ur']){
			html += '<p>豆瓣电子书链接：<a target="blank" href="'+result[i]['ebook_ur'].replace(/"\/"/g,"\\/")+'">'+result[i]['ebook_ur'].replace(/"\/"/g,"\\/")+'</a></p>';
		}
		if(result[i].tags.length > 0){
			html += '<p>豆瓣标签：</p>';
			for(var j=0; j<result[i].tags.length; j++){
				html += '<span>'+result[i].tags[j].name+'</span>';
			}
			html += '<div class="clear"></div>';
		}
		html += '</div></div></div>';
		html += '<div class="bb-item">';
		html += '<div class="bb-custom-side page-layout-3"><div>';
		html += '<h3>作者介绍</h3>';
		html += '<p>'+result[i]['author_intro']+'</p>';
		html += '</div></div>';
		html += '<div class="bb-custom-side page-layout-3"><div>';
		html += '<h3>图书介绍</h3>';
		html += '<p>'+result[i]['summary']+'</p>';
		html += '</div></div>';
		html += '</div>';
		html += '</div>';
		html += '<nav><a href="#" class="bb-nav-prev">Previous</a><a href="#" class="bb-nav-next">Next</a><a href="#" class="bb-nav-close">Close</a></nav></div>';
		$('#scroll-wrap').append(html);
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
		// console.info(pageNum);
		if(pageNum != allPageNum-1){
			if($('#page'+(pageNum+1)).length == 0){
				// console.info('get')
				searchingBooks(pageNum*6+6);
			}
		}
	}else{
		pageNum--;
		if(pageNum == 0) $('.main .bb-nav-prev').hide();
		if(pageNum == allPageNum -2) $('.main .bb-nav-next').show();
	}
	$('.myWindow').css({'left': -pageNum*1000+'px'});
}