<?
    if (isset($_POST["phone"])) {
        $text .= "<p>Phone number: ".$_POST["phone"]."</p>";
    }
    if (isset($_POST["name"])) {
        $text .= "<p>Name: ".$_POST["name"]."</p>";
    }
    if (isset($_POST["result"])) {
        $text .= "<p>Result: ".$_POST["result"]."</p>";
    }
    if (isset($_POST["percents"])) {
        $text .= "<p>Percents: ".$_POST["percents"]."</p>";
    }

    $to = "levkazaryancolors@gmail.com";
    $subject = "Test Result";
    $message = "
                <html>
                    <head>
                        <title>".$subject."</title>
                    </head>
                    <body>
                        ".$text."
                    </body>
                </html>";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $headers .= "From: Lev\r\n";
    mail($to, $subject, $text, $headers);
?>