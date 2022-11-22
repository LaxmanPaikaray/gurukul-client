// $.ajax(
//     {
//         url: "https://gurukul123.herokuapp.com/api/students",
//         type: "GET",
//         success: function(result){
//             console.log(result)
//         }
//     }
// );

function getStudentDetails() {
    var preloader = document.getElementById('loader');
                    preloader.style.display = 'block';
    
    $.ajax(
        {
            url: "https://gurukul123.herokuapp.com/api/students/getDetails",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                "registrationNo": $("#rollNo").val()
            }),
            success: function(result){
                preloader.style.display = 'none'
                setStudentDetailsView(result.data)
            }
        }
    );
}

function logout() {
    var preloader = document.getElementById('loader');
                    preloader.style.display = 'block';
    let access_token = localStorage.getItem("access_token")
    $.ajax(
        {
            url: "http://localhost:5000/api/auth/logout",
            type: "GET",
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${access_token}`
             },
            success: function(result){
                preloader.style.display = 'none'
                localStorage.removeItem("access_token")
                location.reload();
            }
        }
    );
}


function applyRegistration() {
    var preloader = document.getElementById('loader');
    preloader.style.display = 'block';
    const data = new FormData(registration);
    const payload= {}
    for (const [name,value] of data) {
        payload[name] = value;
    }
    payload.dob = `${payload.sday}-${payload.smonth}-${payload.syear}`
    const fileData = new FormData()
    fileData.append("file", payload.news_image)
    $.ajax(
        {
            url: "http://localhost:5000/api/media",
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            data: fileData,
            success: function(result){
                preloader.style.display = 'none'
                payload.profilepic = result.data.filename
                $.ajax(
                    {
                        url: "http://localhost:5000/api/applications/create",
                        type: "POST",
                        contentType: 'application/json',
                        data: JSON.stringify(payload),
                        success: function(result){
                            preloader.style.display = 'none'
                            // location.reload();
                        }
                    }
                );
            },
            error: function(err) {
                console.log(err)
            }
        }
    );
    
}

function getAllStudentApplications() {
    var preloader = document.getElementById('loader');
    preloader.style.display = 'block';

    let access_token = localStorage.getItem("access_token")
    
    $.ajax(
        {
            url: "http://localhost:5000/api/applications",
            type: "GET",
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${access_token}`
             },
            success: function(result){
                preloader.style.display = 'none'
                setApllicationTable(result.data)
            }
        }
    );

}

function getOneStudentApplicationData(id) {
    var preloader = document.getElementById('loader');
    preloader.style.display = 'block';

    let access_token = localStorage.getItem("access_token")
    
    $.ajax(
        {
            url: "http://localhost:5000/api/applications/"+ id,
            type: "GET",
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${access_token}`
             },
            success: function(result){
                preloader.style.display = 'none'
                setApplicationDetails(result.data)
            }
        }
    );

}

function setApplicationDetails(data) {
    $("#photo").html(`<img src="http://gurukuledu.in/uploads/${data.profilepic}" style="width: 100%; height: 100%">`)
    $("#name").val(data.name)
    $("#fatherName").val(data.fatherName)
    $("#motherName").val(data.motherName)
    $("#course").val(data.course)
    $("#courseDuration").val(data.courseDuration)
    $("#addressAt").val(data.addressAt)
    $("#addressPo").val(data.addressPo)
    $("#addressPs").val(data.addressPs)
    $("#addressPin").val(data.addressPin)
    $("#addressDist").val(data.addressDist)
    $("#phoneApplicant").val(data.phoneApplicant)
    $("#examPass").val(data.examPass)
    $("#examStream").val(data.examStream)
    $("#examYear").val(data.examYear)
    $("#userGender").val(data.userGender)
    $("#userCaste").val(data.userCaste)
    $("#userReligion").val(data.userReligion)
    $("#UserStats").val(data.UserStats)
    
    

}

function redirectToViewApplicationDetails(id) {
    window.location.href = window.location.href.replace("registered_student_details.html", `application_form.html?id=${id}`)
}

function deleteApplication(id) {
    var preloader = document.getElementById('loader');
    preloader.style.display = 'block';
    let access_token = localStorage.getItem("access_token")

    $.ajax(
        {
            url: `http://localhost:5000/api/applications/${id}`,
            type: "DELETE",
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${access_token}`
             },
            success: function(result){
                preloader.style.display = 'none'
                getAllStudentApplications()
            }
        }
    );

}

function setApllicationTable(applications) {
    $('.application-data-row').remove();
    for (let i = 0; i < applications.length; i++) {
        const element = applications[i];
        $("#student_details_table").append(
            `<tr class="application-data-row">
                <td class="tdata">${element.name}</td>
                <td class="tdata">${new Date(element.createdAt).toLocaleDateString()}</td>
                <td class="tdata">${element.course}</td>
                <td class="tdata">
                    <button class="buttondetails" style="background-color: rgb(32, 125, 206);" onclick="redirectToViewApplicationDetails('${element._id}')">
                    View</button>
					<button class="buttondetails" style="background-color: rgb(196, 54, 54);" onclick="deleteApplication('${element._id}')">Delete</button>
				</td>
            </tr>`
        )
        
    }
}

function setStudentDetailsView(details) {
    $("#s-detail-cont").css("display", "block");
    $("#name").html(details.name);
    $("#roll").html(details.registrationNo);
    $("#course").html(details.course);
    $("#admission").html(details.dateOfAdmission);
    $("#duration").html(details.courseduration);
    $("#birth").html(details.dob);
    $("#mother").html(details.moteherName);
    $("#father").html(details.fatherName);
    $("#address").html(details.address);
    $("#user-icon").html(" <img src=" + "http://gurukuledu.in/uploads/" + details.profilePic + " />")
    $("#certificate-image").html("<img src=" + "http://gurukuledu.in//uploads/" + details.certificatepic + " />")

}


$(document).ready(() => {
    if(localStorage.getItem("access_token")) {
        $("#login-admin").css("display", "none")
        $("#logout-admin").css("display", "block")
        $(".admin-links").css("display", "block")
        $("#online").css("display", "block")
    } else {
        $("#login-admin").css("display", "block")
        $("#logout-admin").css("display", "none")
        $(".admin-links").css("display", "none")
        $("#online").css("display", "none")
    }
})

$( "#registration" ).submit(function( event ) {
    event.preventDefault();
    // AJAX Call here
  });