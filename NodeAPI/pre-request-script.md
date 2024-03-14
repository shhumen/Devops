```js
const url = http://localhost:5000/auth/login

const payload = {
    username:"shumen02#",
    password:"Wumen021!"
}

const requestOptions = {
    method:"POST",
    body:JSON.stringfy(payload),
    headers: {
        'Content-Type' : 'application/json'
    }
}

pm.sendRequest(url,requestOptions, function(err,response) {
    if(err) {
        console.log(err);
    }
    else {
        const jsonResponse = response.json()
        pm.globals.set("authToken", jsonResponse.content.token)
    }
})

```

```js

pm.test("Status code 200", function(){
    p.response.to.have.status(200)
})

pm.test("Response must have a categroy", function() {
    var jsonData= pm.json()
    pm.expect(jsonData).to.have.property('categoryName')
    pm.expect(jsonData).to.have.property('description')
    // pm.expect(jsonData).to.have.property('_id')
    // pm.expect(jsonData).to.have.property('createdDate')

    pm.expect(jsonData.categoryName).to.eql("Yeni categroy test 5")
    pm.expect(jsonData.description).to.eql("Soft tea 5")

    pm.test("Response includes the correct name", function() {

        var jsonData= pm.json()
        pm.expect(jsonData).to.have.property('categoryName')
        pm.expect(jsonData.categoryName).to.eql("Yeni categroy test 5")

    })
})

```
