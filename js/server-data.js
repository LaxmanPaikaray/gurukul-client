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
    $.ajax(
        {
            url: "https://gurukul123.herokuapp.com/api/students/getDetails",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                "registrationNo": $("#rollNo").val()
            }),
            success: function(result){
                setStudentDetailsView(result.data)
            }
        }
    );
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
