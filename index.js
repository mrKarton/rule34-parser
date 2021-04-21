var api = require('api-rule34-xxx');
var express = require('express');

var app = express();

app.listen(3000);

app.get('/', async (req, res)=>{

    console.log(req.query.tag);
    var tag = req.query.tag;
    var page = req.query.page;
    if(typeof req.query.page == 'undefined') page = 0;

    var html = `<html><head><title>${tag.toUpperCase()} PORN</title></head><body>`;

    var arr = await getURIs(tag);
    arr.forEach(uri => {
        html += `<a href = "${uri}" target="_blank" ><img src="${uri}" /></a>`;
    })
   
    html += "</body></html>"

    res.send(html);
    
})

var getURIs = async (tag) => {

    return new Promise(async (resolve) => {
        var URIArray = Array();

        for(var i = 0; i < 10; i++)
        {
            var posts = await api.searchByText(tag, i);
            posts.forEach(async postData => {
                imgSrc = await (await api.getPost(postData.id)).pages[0].imgURL[0];
                console.log(imgSrc);
                URIArray.push(imgSrc);
            })

            if(i == 8) resolve(URIArray);
        {}
        
    }})
}