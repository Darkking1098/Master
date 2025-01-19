<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel with blade</title>
    <link rel="stylesheet" href="{{ asset('mantis/css/base.css') }}">
    <link rel="stylesheet" href="{{ asset('mantis/css/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('css/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('mantis/icon/css/all.min.css') }}">
    @stack('css')
</head>

<body>
    @yield('layout')
    <script src="{{ asset('mantis/js/base.js') }}"></script>
    <script src="{{ asset('mantis/js/plugins/element.js') }}"></script>
    <script src="{{ asset('mantis/js/plugins/elementList.js') }}"></script>
    @stack('js')
</body>

</html>
