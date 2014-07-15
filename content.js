
function timesheet(){
	$("#searchResultTable table.search-results-panel tr").each(function(){
		var href=$(this).find("a").attr("href");
		if(href){
			$.ajax({
			url:href,
			success: function( data ) {
				var timesheet=$(data);
				var title=$(".pagetitle span",timesheet).text();
				var match=/- Time Sheet for (..?\/..?\/..?)/.exec(title);
				var startdate=new Date(match[1]);
				var dates=[];
				for (var i = 0; i < 7; i++){
					dates.push(startdate);
					var nextday=new Date(startdate);
					nextday.setDate(startdate.getDate()+1);
					startdate=nextday;
				};
				dates.reverse();
				
				elms=$("#wiTable_middleDataDiv .tab-list-data-R",timesheet);
				var hours=[];
				elms.each(function(){
					var h=parseInt($(this).text());
					hours.push(h);
				});
				hours.reverse();
				var html='<table style="border-collapse:collapse;width:100px;">';
				for (var i = 0; i < dates.length; i++){
					html+="<tr>";
					var d=dates[i];
					html+='<td style="border:1px solid black;" >'+((d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear())+"</td>";
					var h=hours[i];
					html+='<td style="border:1px solid black;">'+h+"</td>";
					html+="</tr>";
				}
				html+="</table>";
				$("body").append(html);
			},
			async:false
			});
		}
	});
}

console.log("in content.js"); 
timesheet();
