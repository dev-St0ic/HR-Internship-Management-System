<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>

    <h1>HR Dashboard</h1>

    <h2>Intern Statistics</h2>
    <ul>
        <li>Total Interns: {{ $data['total_interns'] }}</li>
        <li>Active Interns: {{ $data['active_interns'] }}</li>
        <li>Completed Interns: {{ $data['completed_interns'] }}</li>
    </ul>

    <h2>Partner Universities</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Branch</th>
                <th>Intern Count</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data['universities'] as $uni)
                <tr>
                    <td>{{ $uni->university_name }}</td>
                    <td>{{ $uni->branch }}</td>
                    <td>{{ $uni->interns_count }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Recent Activities</h2>

    @if($data['recent_activities']->count() > 0)
        <ul>
            @foreach($data['recent_activities'] as $activity)
                <li>
                    {{ $activity->description }} 
                    ({{ $activity->created_at }})
                </li>
            @endforeach
        </ul>
    @else
        <p>No recent activities</p>
    @endif

</body>
</html>