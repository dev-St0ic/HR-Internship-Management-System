<!DOCTYPE html>
<html>
<head>
    <title>Application Update</title>
</head>
<body>
    <h1>Hello, {{ $application->first_name }}!</h1>
    <p>Thank you for your interest in our internship program.</p>
    
    <p>After careful review, we regret to inform you that we will not be moving forward with your application at this time.</p>

    @if($reason)
        <p><strong>Reason for rejection:</strong> {{ $reason }}</p>
    @endif

    <p>We wish you the best of luck in your future endeavors.</p>
    
    <p>Best Regards,<br>HR Team</p>
</body>
</html>