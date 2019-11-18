<?php
$errorMSG = "";

$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

//This is your email
$EmailTo = "yourname@domain.com";
$Subject = "New message from Pizza King landing page contact form";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
} else {
    if($errorMSG == "") {
        echo "Something went wrong! Please try again.";
    } else {
        echo $errorMSG;
    }
}
?>
