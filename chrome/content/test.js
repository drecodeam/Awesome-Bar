

var selectedText,queryGoogle="",queryWiki="",query;

var prepositions=new Array("a","an","the","as","at","but","by","down","for","from","in","into","like","near","next","of","off","on","onto","out","over","past","since","than","to","up");


function minify()
{
var j;
	query=document.getElementById("log-textbox").value;
	for (var i =0;i<prepositions.length;i++)
	{
		if(query.indexOf(prepositions[i])!=-1)
		{
			j=query.indexOf(prepositions[i]);
			l=prepositions[i].length;
			if(query[j+l]==" " && query[j-1]==" " )
			{
			query=query.replace(prepositions[i],"")
			}
		}
	}
	//alert("q : "+query);
	if(query.indexOf("google")==0 || query.indexOf("wiki")==0 || query.indexOf("wikipedia")==0 ||query.indexOf("map")==0)
	{
		myExtension.openTab();
	}
	else
	{
		if(query.indexOf("book")!=-1 )
		{
			query=removeKeywords(query);
			query=plusify(query);
			openUILinkIn('http://www.flipkart.com/search/a/books?query='+query,'tab');
		}
		
		if(query.indexOf("video")!=-1  || query.indexOf("videos")!=-1  )
		{
			query=removeKeywords(query);
			query=plusify(query);
			openUILinkIn('http://www.youtube.com/results?search_query='+query,'tab');
		}
		
		if(query.indexOf("image")!=-1  || query.indexOf("images")!=-1  )
		{
			query=removeKeywords(query);
			query=plusify(query);
			openUILinkIn('http://www.google.com/search?tbm=isch&q='+query,'tab');
		}
		
		if(query.indexOf("mail")!=-1  || query.indexOf("email")!=-1)
		{
			show_mail_pop();
	
		}
		
		if(query.indexOf("buy")!=-1  || query.indexOf("BUY")!=-1)
		{
		
			query=removeKeywords(query);
			query=plusify(query);
			openUILinkIn('http://www.ebay.in/sch/i.html?_nkw='+query,'tab');
	
		}
		
		if(query.indexOf("travel")!=-1 )
		{
		
			query=removeKeywords(query);
			show_flight_pop();
			//query=plusify(query);
			//openUILinkIn('http://www.ebay.in/sch/i.html?_nkw='+query,'tab');
	
		}
		
		
		
		
		
	
	}
	document.getElementById("log-panel").hidePopup();
	document.getElementById("log-textbox").value="";
}


function sendMail()
{

	var to=	document.getElementById("mailTo").value;
	var sub=document.getElementById("mailSub").value;
	var body=document.getElementById("mailBody").value;

			openUILinkIn('https://mail.google.com/mail/?view=cm&tf=0&ui=2&to='+to+'&su='+sub+'&body='+body,'tab');
			document.getElementById("mailPanel").hidePopup();




}


function searchFlights()
{

	var from=document.getElementById("flightFrom").value;
	from=plusify(from);
	var to=document.getElementById("flightTo").value;
	to=plusify(to);
	var date=document.getElementById("flightDate").value;
	var splitDate = new Array();
	splitDate = date.split('-');
	var month;
	//alert(splitDate[1])
	switch(splitDate[1])
	{
		case '1': month="Jan";
				break;
		case '2': month="Feb";
				break;
		case '3': month="Mar";
				break;
		case '4': month="Apr";
				break;
		case '5': month="May";
				break;
		case '6': month="Jun";
				break;
		case '7': month="Jul";
				break;
		case '8': month="Aug";
				break;
		case '9': month="Sep";
				break;
		case '10': month="Oct";
				break;
		case '11': month="Nov";
				break;
		case '12': month="Dec";
				break;
	
	}
			openUILinkIn('http://www.hipmunk.com/#!'+from+'.'+to+','+month+''+splitDate[0],'tab');
			document.getElementById("flightPanel").hidePopup();

}






function removeKeywords(str)
{
			str=str.replace("books","");
			str=str.replace("book","");
			str=str.replace("images","");
			str=str.replace("image","");
			str=str.replace("buy","");
			
			str=str.replace("videos","");
			str=str.replace("video","");
			str=str.replace("search","");
			return str;
}


//myExtension.openTab(event)


var myExtension = {
  openTab: function(event) {
	var toOpen=document.getElementById("log-textbox").value;
	var splitStrings = new Array();
splitStrings = toOpen.split(' ');

queryGoogle="";

queryWiki="";



for(var i=1;i<splitStrings.length-1;i++)
{
	queryGoogle+=splitStrings[i];
	
	queryGoogle+="+";
	
	

}
queryGoogle+=splitStrings[i];

queryWiki=queryGoogle.replace(/\+/g,'_');

//alert(queryWiki);
//break;


if(splitStrings[0] == 'google' && splitStrings[1] != null)
	openUILinkIn('http://www.google.co.in/#q='+queryGoogle,'tab',event);
else if((splitStrings [0] == 'wiki' || splitStrings [0] == 'wikipedia') && splitStrings[1] != null)
	openUILinkIn('http://en.wikipedia.org/wiki/'+queryWiki,"tab",event);
else if(splitStrings[0] == 'map')
{
	
	if(splitStrings[1]==null)
		openUILinkIn('http://maps.google.co.in/','tab',event);
	else if(splitStrings[1]=='this')
	{
		getselectedtext();
		openUILinkIn('http://maps.google.co.in/maps?q='+selectedText,'tab',event);
	}
	else
		openUILinkIn('http://maps.google.co.in/maps?q='+queryGoogle,'tab',event);


}

	
else 
	openUILinkIn('http://www.'+splitStrings[0]+'.com','tab',event);


	document.getElementById("log-panel").hidePopup();
	document.getElementById("log-textbox").value="";
  }
}





function plusify(toPlusify)
{
	toPlusify=toPlusify.replace(/\s/g,'+');
	return toPlusify;
}


function getselectedtext() {

   var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
         .getService(Components.interfaces.nsIWindowMediator);
   var mainWindow = wm.getMostRecentWindow("navigator:browser");
   var tabBrowser = mainWindow.getBrowser();
   
   selectedText = tabBrowser.contentWindow.getSelection();
  
   selectedText=selectedText.toString();
   
   selectedText=selectedText.replace(/\s/g,'+');

}



function show_pop()
{
var iHeight= window.screen.height;
var iWidth= window.screen.width;
//alert("height is" + iHeight);
//alert("height is" + iWidth);
document.getElementById('log-textbox').value=''; 
document.getElementById('log-panel').openPopupAtScreen((iWidth/2)-200 , iHeight/2 ,false);
}


function show_mail_pop()
{
var iHeight= window.screen.height;
var iWidth= window.screen.width;
//alert("height is" + iHeight);
//alert("height is" + iWidth);
document.getElementById('mailTo').value='';
document.getElementById('mailSub').value='';
document.getElementById('mailBody').value='';
 
document.getElementById('mailPanel').openPopupAtScreen((iWidth/2)-200 , iHeight/2 ,false);
}


function show_flight_pop()
{
var iHeight= window.screen.height;
var iWidth= window.screen.width;
//alert("height is" + iHeight);
//alert("height is" + iWidth);
document.getElementById('flightFrom').value='';
document.getElementById('flightTo').value='';
document.getElementById('flightDate').value='';
 
document.getElementById('flightPanel').openPopupAtScreen((iWidth/2)-200 , iHeight/2 ,false);
}

function auto_complete()
{  
var splitStrings=document.getElementById("log-panel");
var str1=document.getElementById("log-textbox").value;
//var str2=
document.getElementById("log-textbox").value=str1.concat(".com");
var str2=document.getElementById("log-textbox").value=str1.concat(".com");

openUILinkIn(str2,'tab');
document.getElementById("log-panel").hidePopup();



}
