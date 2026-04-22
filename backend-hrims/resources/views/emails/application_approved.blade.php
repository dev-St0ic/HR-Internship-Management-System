<!DOCTYPE html>
<html>
<head>
    <title>Application Approved</title>
</head>
<body>
    <h1>Hello, {{ $application->first_name }}!</h1>
    <p>We are excited to inform you that your internship application has been <strong>Approved</strong>.</p>
    
    <h3>Your Account Details:</h3>
    <ul>
        <li><strong>Email:</strong> {{ $application->email }}</li>
        <li><strong>Temporary Password:</strong> {{ $password }}</li>
    </ul>

    <p>Please log in to the portal and change your password immediately.</p>
    
    <p>Welcome to the team!</p>
</body>
</html>