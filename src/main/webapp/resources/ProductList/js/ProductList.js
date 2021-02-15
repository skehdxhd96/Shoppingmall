//초기페이지 히스토리 저장
$(document).ready(function() {
	var productHtml = $("#productRow").html();
	var buttonHtml = $("#pageButtonGroup").html();
	
	history.pushState({"productHtml":productHtml, "buttonHtml":buttonHtml}, null, null);
});

//페이지버튼 클릭했을 때
$(document).on("click", ".pageButton", function() {
	//클릭시 버튼 주위의 초점 제거
	$(this).trigger("blur");
	
	var index = $(this).attr("index");	//index 속성값
	var page = Number($(this).text());
	var categoryCode = Number($(location).attr('pathname').slice(-1));
	var dataTransfer = {"startIdx":6*(page-1),
						"categoryCode":categoryCode};
	
	$.ajax({
		url:"/ProductList/paging", 
		type:"POST", 
		data:JSON.stringify(dataTransfer),
		contentType: "application/json; charset=utf-8;",
	    dataType: "json",
		success:function(data) {	
			//클릭된 버튼 강조된 스타일로 변경
			$(".pageButton[index=" + index + "]").addClass("clicked_pageButton");
			//클릭된 버튼을 제외하고는 클릭되기 전으로 변경하기
			$(".pageButton[index!=" + index + "]").removeClass("clicked_pageButton");
			
			//해당페이지 상품리스트 정보들을 담은 html을 jsp에 추가하는 함수 호출
			paging(data);
			
		},
		error:function() {
			alert("ERROR");
		}
	});
});

//다음페이지 클릭했을 때
$(document).on("click", "#nextButton", function() {
	var startPage = Number($(".pageButton")[4].textContent)+1;
	var categoryCode = Number($(location).attr('pathname').slice(-1));
	var dataTransfer = {"startIdx":6*(startPage-1),
						"categoryCode":categoryCode};
	
	$.ajax({
		url:"/ProductList/nextButton", 
		type:"POST", 
		data:JSON.stringify(dataTransfer), 
		contentType: "application/json; charset=utf-8;",
	    dataType: "json", 
		success:function(data) {
			//버튼 새로고침
			var buttonHtml = "";
			var totalPage = data.totalPage;
			buttonHtml += "<button id=\"prevButton\" type=\"button\" class=\"btn btn-light\">이전</button>";
			if (startPage+4>=totalPage) {
				for (var page=startPage; page<=totalPage; page++) {
					buttonHtml += "<button type=\"button\" class=\"btn btn-light pageButton\" index=\"" + page%5 + "\">" + page + "</button>";
				}
			}
			else {
				for (var page=startPage; page<=startPage+4; page++) {
					buttonHtml += "<button type=\"button\" class=\"btn btn-light pageButton\" index=\"" + page%5 + "\">" + page + "</button>";
				}
				buttonHtml += "<button id=\"nextButton\" type=\"button\" class=\"btn btn-light\">다음</button>";
			}
			
			$("#pageButtonGroup").html(buttonHtml);
			
			// 다음페이지의 첫번째 페이지 버튼 클릭된 상태 스타일로 변경
			$(".pageButton[index=1]").addClass("clicked_pageButton");
			
			//해당페이지 상품리스트 정보들을 담은 html을 jsp에 추가하는 함수 호출
			paging(data.productList);
		}, 
		error:function() {
			alert("ERROR!!");
		}
	});
});

//이전버튼 클릭했을 때
$(document).on("click", "#prevButton", function() {
	var lastPage = Number($(".pageButton")[0].textContent)-1;
	var categoryCode = Number($(location).attr('pathname').slice(-1));
	var dataTransfer = {"startIdx":6*(lastPage-1),
						"categoryCode":categoryCode};
						
	$.ajax({
		url:"/ProductList/paging", 
		type:"POST", 
		data:JSON.stringify(dataTransfer), 
		contentType:"application/json; charset=utf-8", 
		dataType:"json", 
		success:function(data) {
			//버튼 새로고침
			var buttonHtml = "";
			if (lastPage-4==1) {
				for (var page=1; page<=lastPage; page++) {
					buttonHtml += "<button type=\"button\" class=\"btn btn-light pageButton\" index=\"" + page%5 + "\">" + page + "</button>";
				}
			}
			else {
				buttonHtml += "<button id=\"prevButton\" type=\"button\" class=\"btn btn-light\">이전</button>";
				for (var page=lastPage-4; page<=lastPage; page++) {
					buttonHtml += "<button type=\"button\" class=\"btn btn-light pageButton\" index=\"" + page%5 + "\">" + page + "</button>";
				}
			}
			buttonHtml += "<button id=\"nextButton\" type=\"button\" class=\"btn btn-light\">다음</button>";
			
			$("#pageButtonGroup").html(buttonHtml);
			
			//이전페이지로 돌아간 후 맨 마지막 페이지 버튼 클릭된 상태 스타일로 변경
			$(".pageButton[index=0]").addClass("clicked_pageButton");
			
			//해당페이지 상품리스트 정보들을 담은 html을 jsp에 추가하는 함수 호출
			paging(data);
		}, 
		error:function() {
			alert("ERROR!!");
		}
	});
});

//해당페이지 상품리스트 정보들을 담은 html을 jsp에 추가하는 함수
function paging(data) {
	var html = "";
	var imageSrc = "";
	for (var i=0; i<data.length; i++) {
		var productStockHtml = "";
		if (data[i].thumbnail_url=='none.png') {
			imageSrc = "https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif";
		}
		else {
			imageSrc = data[i].thumbnail_url;
		}
		if (data[i].product_stock==0) {
			productStockHtml = "<p class=\"card-text\" style=\"color:red\"> 품절된 상품입니다. </p>";
		}
		html += "<div class=\"col-lg-4 col-md-6 mb-4\">";
		html += "<div class=\"card h-100\">";
		//html += "<a href=\"/ProductDetail/" + data[i].product_code + "\"><img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"></a>";
		html += "<a href=\"/ProductDetail/" + data[i].product_code + "\"><img class=\"card-img-top\" src=" + imageSrc + " alt=\"\"></a>";
		html += "<div class=\"card-body\">";
		html += "<h4 class=\"card-title\">";
		html += "<a href=\"/ProductDetail/" + data[i].product_code + "\">" + data[i].product_name + "</a>";
		html += "</h4>";
		html += "<h5>" + data[i].product_price + "원</h5>";
		html += productStockHtml;
		html += "<p class=\"card-text\">" + data[i].product_manufacturer + "</p>";
		html += "</div>";
		html += "<div class=\"card-footer\">" + data[i].product_score + "</div>";
		html += "</div>";
		html += "</div>";
	}
			
	$("#productRow").html(html);
	
	//ProductList 페이지에서 뒤로가기 버튼을 눌렀을 때 이전 페이지의 history를 기억하기 위해 pushState() 사용.(Detail 페이지에서 뒤로가기 버튼 누른거랑 다른거)
	var buttonHtml = $("#pageButtonGroup").html();
	history.pushState({"productHtml":html, "buttonHtml":buttonHtml}, null, null);
};

//ProductList 페이지에서 뒤로가기버튼을 눌렀을 때(Detail 페이지에서 뒤로가기 버튼 누른거랑 다른거)
$(window).on('popstate',function(){
	var data = history.state;
	$("#productRow").html(data.productHtml);
	$("#pageButtonGroup").html(data.buttonHtml);
}) ;