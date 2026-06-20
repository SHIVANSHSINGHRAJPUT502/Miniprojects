 
 function getWeather(city) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (city === "Delhi") {
                resolve({ temp: 38, weather: "Sunny" });
            } else {
                reject("City not found");
            }
        }, 1500); // 1.5s delay
    });
}

// Handling the Promise
getWeather("Delhi")
    .then((data) => {
        console.log(`Delhi: ${data.temp}°C, ${data.weather}`);
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    })
    .finally(() => {
        console.log("Weather fetch complete");
    });

    //  ASYNC/AWAIT EXAMPLE
    
 async function loadStudentReport(id) {
    try {
        const student = await getStudent(id);
        const courses = await getCourses(student);
        const grades = await getGrades(courses);
        
        console.log("Grades:", grades);
    } catch (error) {
        // This catches any error from any of the three functions above
        console.log("Error:", error);
    }
}