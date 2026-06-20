
    
    function loadUser(userId, callback) {
  //  1-second delay using setTimeout

  setTimeout(() => {
    //  user object
    const user = { id: userId, name: "Student" };
    
    // 3. Call the callback function with the user object
    callback(user);
  }, 1000);     //  1 second
}

// Calling the function

loadUser(101, function(user) {
  console.log("User loaded:", user.name);
});
