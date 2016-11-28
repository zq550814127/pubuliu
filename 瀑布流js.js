window.onload=function()
{
imgLocation("container","box")//加载函数
var imgData={"data":[{"src": "a.jpg"},{"src": "b.jpg"},{"src": "d.jpg"},{"src": "e.jpg"},{"src": "f.jpg"},{"src": "g.jpg"},{"src": "h.jpg"},{"src": "i.jpg"},{"src": "j.jpg"},{"src": "k.jpg"},{"src": "l.jpg"}]}
window.onscroll=function(){
    if(checkFlag()){
        var cparent=document.getElementById("container");
        for(var i=0;i<imgData.data.length;i++){
            var ccontent=document.createElement("div");
            ccontent.className="box";
            cparent.appendChild(ccontent);
            var boximg=document.createElement("div");
            boximg.className="box_img";
            ccontent.appendChild(boximg);
            var img=document.createElement("img");
            img.src="picture/"+imgData.data[i].src;
            boximg.appendChild(img);
        }
        imgLocation("container","box")
    }
    }
}

function checkFlag()
{
    var cparent=document.getElementById("container");
    var ccontent=getChlidElement(cparent,"box");
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    //console.log(lastContentHeight+":"+scrollTop+":"+pageHeight);
    if(lastContentHeight<scrollTop+pageHeight)
    {
        return true;
    }
}

function imgLocation(parent,content)
{//将parent下的所有的content全部取出
    var cparent=document.getElementById(parent);
    var ccontent=getChlidElement(cparent,content);//得到cparent元素下的所有content元素并放到一个数组中去
    //console.log(ccontent);打印
    var imgWidth=ccontent[0].offsetWidth;//得到图片的宽度，因为每一个图片我们是固定的，所以得到任何一张图片的宽度即可
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);//得到每一行放几个图片   Math.floor是将小数换成整数
    cparent.style.cssText="width:"+imgWidth*num+"px;margin:0px auto";//设置css样式让它固定，并居中


    var BoxHeightArr=[];
    for(var i=0;i<ccontent.length;i++)
    {
        if(i<num)
        {
            BoxHeightArr[i]=ccontent[i].offsetHeight;
            console.log(BoxHeightArr[i]);
        }else {
            var minheight=Math.min.apply(null,BoxHeightArr);
            //console.log(minheight);
            var minIndex=getminheightLocation(BoxHeightArr,minheight);
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minheight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }
}
function  getminheightLocation(BoxHeightArr,minHeight){  //获取最小高度的图片的位置
    for(var i in BoxHeightArr)
    if(BoxHeightArr[i]==minHeight)
    {
        return i;
    }
}

function  getChlidElement(parent,content)
 {
    var contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for(var i=0;i<allcontent.length;i++)
    {
        if(allcontent[i].className==content)
        {
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}