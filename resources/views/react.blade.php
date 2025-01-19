<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel with React</title>
    <link rel="stylesheet" href="{{ asset('mantis/css/base.css') }}">
    <link rel="stylesheet" href="{{ asset('mantis/css/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('mantis/icon/css/all.min.css') }}">
    @viteReactRefresh
    @vite('resources/js/app.js')
</head>

<body>
    <div id="root"></div>
</body>

</html>
