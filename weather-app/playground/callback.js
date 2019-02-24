var getUser = (id, callback) => {
    // this user object gonna be populated from db or some service in future
    var user = {
        id: id,
        name: 'Somebody'
    };
    // this will print the callback function after 3 second(s)
    setTimeout(() => callback(user), 3000);
};

// 31 - id and second argument is callback function body
getUser(69, (userObject) => {
    console.log(userObject);
});